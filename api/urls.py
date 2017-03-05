from django.conf.urls import include, url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'), # Index URL
    url(r'^item/$', views.item, name='item'),
    url(r'^feed/$', views.feed, name='feed'),
]
