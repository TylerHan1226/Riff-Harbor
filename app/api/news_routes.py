from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user

import json

news_routes = Blueprint('news', __name__)

# get all the news
# /api/news
@news_routes.route('/')
def all_news():
    return {'News': 'All my news!'}, 200