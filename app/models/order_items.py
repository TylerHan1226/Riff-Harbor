from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    instrument_id = Column(Integer, ForeignKey(add_prefix_for_prod('instruments.id')), nullable=False)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = Column(Integer, nullable=False)

    users = relationship('User', back_populates='order_items')
    instruments = relationship('Instrument', back_populates='order_items')


    def to_dict(self):
        return {
            'id': self.id,
            'instrument_id': self.instrument_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
        }
