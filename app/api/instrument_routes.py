from flask import Blueprint, jsonify, request, redirect
from flask_login import login_required, current_user
from app.models import db, Instrument
from app.forms import InstrumentForm
import json

instrument_routes = Blueprint('instruments', __name__)

# get all instruments
# /api/instruments
@instrument_routes.route('/')
def all_instruments():
    instruments = Instrument.query.all()
    instrument_list = [instrument.to_dict() for instrument in instruments]
    return {'Instruments': instrument_list}


# get the instrument by id
# /api/instruments/current
@instrument_routes.route('/<int:id>')
def instrument(id):
    instrument = Instrument.query.get(id)
    if not instrument:
        return {'message': 'Instrument not found'}, 404
    else:
        instrument_dict = instrument.to_dict()
        return instrument_dict


# create an instrument
# /api/instruments/new
@instrument_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_instrument():
    form = InstrumentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_instrument = Instrument(
            seller_id = current_user.id,
        )
        form.populate_obj(new_instrument)
        db.session.add(new_instrument)
        db.session.commit()
        return new_instrument.to_dict(), 201
    return form.errors, 400



# update an instrument
# /api/instruments/update
@instrument_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_instrument(id):
    form = InstrumentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        instrument = Instrument.query.get(id)
        if not instrument:
            return {'message': 'Instrument not found'}, 404
        if instrument.seller_id != current_user.id:
            return redirect('api/auth/unauthorized')
        form.populate_obj(instrument)
        db.session.commit()
        return instrument.to_dict(), 200
    return form.errors, 400


# delete an instrument
# /api/instruments/delete
@instrument_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_instrument(id):
    instrument = Instrument.query.get(id)
    if not instrument:
        return {'message': 'Instrument not found'}, 404
    if instrument.seller_id != current_user.id:
        return redirect('api/auth/unauthorized')
    db.session.delete(instrument)
    db.session.commit()
    return {'message': 'Successfully Deleted'}, 200

