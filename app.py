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


class App(webapp.RequestHandler):
  def get(self):
    appid=cgi.escape(self.request.get('appid'))  

    app = db.GqlQuery("SELECT * FROM App WHERE appid = :1",appid).get()

    template_values = {
      'app': app,
      }

    path = os.path.join(os.path.dirname(__file__), 'app.html')
    self.response.out.write(template.render(path, template_values))      
