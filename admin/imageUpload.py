import cgi

import models

from google.appengine.ext import db
from google.appengine.ext import webapp
import wsgiref.handlers

class UploadImage(webapp.RequestHandler):
    def post(self):
        if 'file' not in self.request.POST:
            self.error(400)
            self.response.out.write("file not specified!")
            return
        
        if (self.request.POST.get('file', None) is None or 
           not self.request.POST.get('file', None).filename):
            self.error(400)
            self.response.out.write("file not specified!")
            return
        
        picture = self.request.POST.get('file').file.read()
        appid = self.request.POST.get('appid')
        type = self.request.POST.get('type')
        
        im = models.Image()
        im.appid = appid
        im.type = type
        im.picture = picture
        im.save()
        self.response.out.write("image %r, %r saved." % (im.appid, im.type))
        
def main():
    application = webapp.WSGIApplication([('/admin/imageUpload', UploadImage)], debug=True)
    wsgiref.handlers.CGIHandler().run(application)

if __name__ == "__main__":
    main()            