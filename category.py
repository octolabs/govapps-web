import os
from google.appengine.ext.webapp import template

import wsgiref.handlers
import cgi

import models

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

from google.appengine.ext import webapp


class Category(webapp.RequestHandler):
  def get(self):
    category=cgi.escape(self.request.get('category'))  

    govapps = db.GqlQuery('SELECT * FROM App WHERE gov = True AND category = :1 AND status = :2 ORDER BY rating DESC', category, "Approved")
    nongovapps = db.GqlQuery('SELECT * FROM App WHERE gov = FALSE AND category = :1 AND status = :2 ORDER BY rating DESC', category, "Approved")

    template_values = {
          'govapps':govapps,
          'nongovapps':nongovapps,
          'category':category,
      }

    path = os.path.join(os.path.dirname(__file__), 'category.html')
    self.response.out.write(template.render(path, template_values))      
