from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, OrderHistory, Instrument, OrderItem
import json

history_routes = Blueprint('history', __name__)

# get all the order history
# /api/history
@history_routes.route('/')
# @login_required
def all_history():
    histories = OrderHistory.query.all()
    history_list = [history.to_dict() for history in histories]
    return {'OrderHistory': history_list}, 200

# get histories by current user
# /api/history/current
@history_routes.route('/current')
@login_required
def history_by_user():
    cur_history = OrderHistory.query.filter_by(user_id=current_user.id).all()
    cur_history_list = [history.to_dict() for history in cur_history]

    order_id_list = [history["order_id"] for history in cur_history_list]
    orders = OrderItem.query.filter(OrderItem.id.in_(order_id_list)).all()
    orders_list = [order.to_dict() for order in orders]

    instrument_id_list = [order["instrument_id"] for order in orders_list]
    instruments = Instrument.query.filter(Instrument.id.in_(instrument_id_list)).all()
    instrument_list = [instrument.to_dict() for instrument in instruments]
    
    return {'UserOrderHistory': cur_history_list, 'Orders': orders_list, 'Instruments': instrument_list}, 200


# add to history
# /api/history/new
@history_routes.route('/new', methods=['POST'])
@login_required
def add_history():
    data = request.json
    order_id = data.get('order_id')
    new_history = OrderHistory(user_id=current_user.id, order_id=order_id)
    if not new_history:
        return {'message': 'Cannot Add to history'}, 400
    db.session.add(new_history)
    db.session.commit()
    return {'message': 'History is stored successfully'}


# delete a history
# /api/history/delete
@history_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_history(id):
    history = OrderHistory.query.get(id)
    if not history:
        return {'message': 'Order history is not found'}, 404
    if history.user_id != current_user.id:
        return redirect('api/auth/unauthorized')
    db.session.delete(history)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200
    