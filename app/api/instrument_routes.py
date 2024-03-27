from flask import Blueprint, jsonify
from app.models import Instrument

instrument_routes = Blueprint('instruments', __name__)

@instrument_routes.route('/')
def all_instruments():
    instruments = Instrument.query.all()
    instrument_list = [instrument.to_dict() for instrument in instruments]
    return {'Instruments': instrument_list}