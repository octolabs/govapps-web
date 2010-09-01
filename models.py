from google.appengine.ext import db

# Dmitry - Feel free to change anything, I'm just working with Votes

class App(db.Model):
	appid = db.StringProperty(required=True)
	gov = db.BooleanProperty(required=True)
	name = db.StringProperty(required=True)
	url = db.StringProperty(required=True)
	summary = db.StringProperty(required=True)
	description = db.TextProperty(required=True)
	category = db.StringProperty(required=True)
	tags = db.StringProperty()
	submittername = db.StringProperty(required=True)
	submitterphone = db.StringProperty()
	submitteremail = db.StringProperty(required=True)
	sourcecode = db.StringProperty()
	license = db.StringProperty()
							    
	stars = db.IntegerProperty()
	votes = db.IntegerProperty()
	rating = db.FloatProperty()
	
	status = db.StringProperty(default="Pending")
	
class Image(db.Model):
    appid = db.StringProperty()
    picture = db.BlobProperty(default=None)	
    format = db.StringProperty()
    type = db.StringProperty()

class Developer(db.Model):
	appid = db.StringProperty(required=True)
	name = db.StringProperty(required=True)
	url = db.StringProperty(required=True)

class Vote(db.Model):
	appid = db.StringProperty()
	stars = db.IntegerProperty()
	timestamp= db.DateTimeProperty()
	comment = db.StringProperty()
	username = db.StringProperty()
	ipaddress = db.StringProperty()
	
