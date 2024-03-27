from flask import Blueprint, jsonify
from app.models import Instrument

instrument_routes = Blueprint('instruments', __name__)

@instrument_routes.route('/')
def all_instruments():
    instruments = Instrument.query.all()
    return {'Instruments': [instrument.to_dict()] for instrument in instruments}