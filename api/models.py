from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Item(models.Model):
	CATEGORY_CHOICES = (
	    ('1', 'Restaurant'),
	    ('2', 'Public Place'),
	    ('3', 'Monument'),
	)
	user = models.ForeignKey('User')
	category = models.CharField(max_length = 100, choices = CATEGORY_CHOICES)
	title = models.CharField(max_length = 100)
	brief_description = models.CharField(max_length = 500)
	post_date = models.DateTimeField(auto_now_add = True)
	likes = models.PositiveIntegerField(default=0)
	deleted = models.BooleanField(default = False)
	lat = models.FloatField(default=0)
	lng = models.FloatField(default=0)
	city = models.CharField(max_length = 100, default='None')
	def __unicode__ (self):
		return str(self.title)

class User(models.Model):
	name = models.CharField(max_length = 100)
	followers = models.ManyToManyField('self', related_name='followed', symmetrical=False, blank=True)
	following = models.ManyToManyField('self', related_name='follows', symmetrical=False, blank=True)
	about_me = models.CharField(max_length = 500, null=True, blank=True)
	website_or_blog = models.CharField(max_length = 100, null=True, blank=True)
	email_id = models.CharField(null=True, max_length = 100)
	def __unicode__ (self):
		return str(self.name)

class Comment(models.Model):
	item = models.ForeignKey('Item')
	added_by = models.IntegerField(default=0)
	text = models.CharField(max_length = 500)
