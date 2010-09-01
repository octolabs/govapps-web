import os
from google.appengine.ext.webapp import template

import wsgiref.handlers
import cgi

import models
import tools

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db

from google.appengine.ext import webapp


class Application(webapp.RequestHandler):
  def get(self):
    name=cgi.escape(self.request.get('name'))  
    person = tools.getPerson(name)

    app = db.GqlQuery("SELECT * FROM App WHERE appid = :1",name).get()

    logout = users.create_logout_url("/")
    template_values = {
      'appid': app.appid,
      'name': app.name,
      'url': app.url,
      'summary': app.summary,
      }

    path = os.path.join(os.path.dirname(__file__), 'application.html')
    self.response.out.write(template.render(path, template_values))      
