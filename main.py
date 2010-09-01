import wsgiref.handlers
import os
from google.appengine.ext.webapp import template


from google.appengine.ext import webapp

import app
import category

import models
from google.appengine.ext import db

class MainHandler(webapp.RequestHandler):

  def get(self):
    govapps = db.GqlQuery('SELECT * FROM App WHERE gov = True AND status = :1 ORDER BY rating DESC LIMIT 10', "Approved")
    nongovapps = db.GqlQuery('SELECT * FROM App WHERE gov = False AND status = :1 ORDER BY rating DESC LIMIT 10', "Approved")

    #publicsafetyapps = db.GqlQuery('SELECT * FROM App WHERE category = :1 ORDER BY rating DESC', "Public Safety")

    #publicsafetyapps.fetch(1)

    template_values = {
          'govapps':govapps,
          'nongovapps':nongovapps,
      }

    path = os.path.join(os.path.dirname(__file__), 'main.html')
    self.response.out.write(template.render(path, template_values))


def main():
  application = webapp.WSGIApplication([('/', MainHandler),
                                        ('/category', category.Category),
                                        ('/app', app.App)],
					debug=True)
  wsgiref.handlers.CGIHandler().run(application)

if __name__ == '__main__':
  main()
