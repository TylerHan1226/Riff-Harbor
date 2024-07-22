from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
import json, requests

news_routes = Blueprint('news', __name__)

# get all the news
# /api/news
@news_routes.route('/')
def all_news():
    api_key = "4780de20273648b0b968dbc62a48cc20"
    url = "https://newsapi.org/v2/everything"
    # ?q=music%20concert%20OR%20music%20artist&language=en&sortBy=publishedAt&apiKey=4780de20273648b0b968dbc62a48cc20
    params = {
        "q": 'music concert',
        'language': 'en',
        'sortBy': 'publishedAt',
        'apiKey': api_key
    }
    response = requests.get(url, params=params)
    data = response.json()
    return jsonify(data), 200