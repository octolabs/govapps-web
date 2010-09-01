import cgi
import models
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.api import memcache
from datetime import datetime
import wsgiref.handlers

class LogVote (webapp.RequestHandler):
	def get(self):
		appid = self.request.get('appid', '')
		stars = int(self.request.get('stars', 0))
		comment = self.request.get('comment', '')
		username = self.request.get('username', 'anonymous')
		ipaddress = self.request.remote_addr
		
		# check if appid exists
		q = db.GqlQuery("SELECT * FROM App WHERE appid = :1", appid)
		app = q.get()
		if not app:
			self.response.out.write("No app named %s." % appid)
			return
		
		# check if the comment has 2 chars
		if len(comment) < 2:
			self.response.out.write("Comment not long enough.")
			return
		
		# check if there is a username
		if len(username) == 0:
			self.response.out.write("Username not long enough.")
			return
		
		# in the future we should only have one vote per username/appid
		# for now, we should check the memcache
		voted = memcache.get(key=ipaddress, namespace=appid)
		if voted:
			self.response.out.write("Already voted for %s." % appid)
			return
		
		v = models.Vote(
			appid=appid,
			stars=stars,
			comment=comment,
			username=username,
			timestamp=datetime.now(),
			ipaddress=ipaddress)
		v.put()
		
		if app.stars: app.stars = app.stars+stars
		else: app.stars = stars
		
		if app.votes: app.votes = app.votes+1
		else: app.votes = 1
		
		app.rating = float(app.stars) / float(app.votes)
		db.put(app)
		
		memcache.set(key=ipaddress, value=True, namespace=appid)
		self.response.out.write("Thank you for your vote!")
		

class VoteFeed (webapp.RequestHandler):
	def get(self):
		self.response.out.write('''
<?xml version="1.0"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
		<description>DC App Store</description>
		<language>en-us</language>
		''')

		query = models.Vote.all()

		appid = self.request.get('appid', '')
		if appid:
			query.filter('appid =', appid)

		query.order('-timestamp')

		results = query.fetch(limit=5)
		for vote in results:
			self.response.out.write('''
		<item>
			<title>%s</title>
			<description><![CDATA[''' % vote.comment)
			
			if vote.stars == 0:
				self.response.out.write('No stars')
			elif vote.stars == 1:
				self.response.out.write('1 star')
			else:
				self.response.out.write('%s stars' % vote.stars)
			
			self.response.out.write(''']]></description>
			<dc:creator>%s</dc:creator>
			<pubDate>%s</pubDate>
		</item>
		''' % (vote.username, vote.timestamp.strftime('%a, %d %b %Y %H:%M:%S')))

		self.response.out.write('''
	</channel>
</rss>''')


def main():
	application = webapp.WSGIApplication([('/vote', LogVote), ('/vote/feed', VoteFeed)], debug=True)
	wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
	main()

