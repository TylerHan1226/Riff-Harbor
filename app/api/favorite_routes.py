from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Favorite
import json

favorites_routes = Blueprint('favorite', __name__)


# get all favorites under the current user
# /api/favorites/current
@favorites_routes.routes('/current')
@login_required
def fav_by_user():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorites_list = [fav.to_dict() for fav in favorites]
    return {'MyFavorites': favorites_list}, 200
