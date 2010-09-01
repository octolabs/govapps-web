import os
import cgi

import models

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext import db

import wsgiref.handlers

class Form(webapp.RequestHandler):
  def get(self):

    template_values = {
      }

    path = os.path.join(os.path.dirname(__file__), 'form.html')
    self.response.out.write(template.render(path, template_values))      
  
  def post(self):
    app=models.App(
        name=cgi.escape(self.request.POST.get('name')),  
        appid=cgi.escape(self.request.POST.get('name')),
        gov=False,
        url=cgi.escape(self.request.POST.get('url')),
        summary=cgi.escape(self.request.POST.get('summary')),
        description=cgi.escape(self.request.POST.get('description')),
        category=cgi.escape(self.request.POST.get('category')),
        tags=cgi.escape(self.request.POST.get('tags')),
        submittername=cgi.escape(self.request.POST.get('submittername')),
        submitterphone=cgi.escape(self.request.POST.get('submitterphone')),
        submitteremail=cgi.escape(self.request.POST.get('submitteremail'))
    )
    if (cgi.escape(self.request.POST.get('gov'))=="True"):
        app.gov=True
    else:
        app.gov=False
    app.sourcecode=cgi.escape(self.request.POST.get('sourcecode'))
    app.license=cgi.escape(self.request.POST.get('license'))
    #authors=cgi.escape(self.request.get('name'))

    if 'iconfile' in self.request.POST:
        if (self.request.POST.get('iconfile', None) is None or 
           not self.request.POST.get('iconfile', None).filename):
            pass
        else:
            picture = self.request.POST.get('iconfile').file.read()
            appid = cgi.escape(self.request.POST.get('name'))
            type = "icon"
            
            im = models.Image()
            im.appid = appid
            im.type = type
            im.picture = picture
            im.save()

    for i in range(5):
        file="file"+str(i)
        if file in self.request.POST:
            if (self.request.POST.get(file) == ""):
                pass
            else:
                picture = self.request.POST.get(file).file.read()
                appid = cgi.escape(self.request.POST.get('name'))
                type = "screenshot"+str(i)
                
                im = models.Image()
                im.appid = appid
                im.type = type
                im.picture = picture
                im.save()

    for i in range(5):
        author="author"+str(i)
        url="url"+str(i)
        if author in self.request.POST:
            if (self.request.POST.get(author) == "" or self.request.POST.get(url, None) == ""):
                pass
            else:
                dev=models.Developer(
                    appid = app.appid, 
                    name = cgi.escape(self.request.POST.get(author)), 
                    url = cgi.escape(self.request.POST.get(url)))
                dev.save()
                                
    app.stars=0
    app.votes=0
    app.rating=0.0

    app.save()
    
    template_values = {
      }

    path = os.path.join(os.path.dirname(__file__), 'submit.html')
    self.response.out.write(template.render(path, template_values))      

def main():
    application = webapp.WSGIApplication([('/submit', Form)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
    main()  
