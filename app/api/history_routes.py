from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, OrderHistory
import json

history_routes = Blueprint('history', __name__)

# get all the order history
# /api/history
@history_routes.route('/')
@login_required
def all_history():
    histories = OrderHistory.query.all()
    history_list = [history.to_dict() for history in histories]
    return {'OrderHistory': history_list}, 200