from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import JsonResponse

from models import *

import json

# Create your views here.
def index(request):
    return render_to_response('index.html')

def item(request):
    query = request.GET.get('query')
    item_data = Item.objects.get(pk=int(query))
    response_data = {}
    response_data['title'] = item_data.title
    response_data['category'] = item_data.category
    response_data['brief_description'] = item_data.brief_description
    response_data['post_date'] = item_data.post_date
    response_data['likes'] = item_data.likes
    response_data['lat'] = item_data.lat
    response_data['lng'] = item_data.lng
    response_data['user'] = item_data.user.id
    response_data['city'] = item_data.city
    return JsonResponse(response_data)

def feed(request):
	user_id = request.GET.get('userid')
	city = request.GET.get('city')
	user_data = User.objects.get(pk=int(user_id))
	following = user_data.following.all()
	feed_data = []
	for f in following:
		f_items = Item.objects.filter(city=city, user__id=f.id)
		for item_data in f_items:
			data = {}
			data['title'] = item_data.title
			data['category'] = item_data.category
			data['brief_description'] = item_data.brief_description
			data['post_date'] = item_data.post_date
			data['likes'] = item_data.likes
			data['lat'] = item_data.lat
			data['lng'] = item_data.lng
			data['user'] = item_data.user.id
			data['city'] = item_data.city
			print data
			feed_data.append(data)
	return JsonResponse(feed_data, safe=False)
