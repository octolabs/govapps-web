import cgi
import models
from google.appengine.ext import db
from google.appengine.ext import webapp
from google.appengine.api import memcache
from datetime import datetime
import wsgiref.handlers

class GetImage(webapp.RequestHandler):
  def get(self):
    appid = self.request.get('appid')
    type = self.request.get('type')
    
    image = self.getImage(appid, type)
    if (image and image.picture):
      self.response.headers['Content-Type'] = 'image/jpeg'
      self.response.out.write(image.picture)
    else:
      self.redirect('/static/noimage.jpg')

  def getImage(self, appid, type):
    result = db.GqlQuery("SELECT * FROM Image WHERE appid = :1 AND type = :2 LIMIT 1", 
                       appid, type).fetch(1)
    if (len(result) > 0):
      return result[0]
    else:
      return None      
      
def main():
    application = webapp.WSGIApplication([('/dynamic/image', GetImage)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
    main()      