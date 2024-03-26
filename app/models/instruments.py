from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship


class Instrument(db.Model):
    __tablename__ = 'instruments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    seller_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    make = Column(String(100), nullable=False)
    model = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    details = Column(String(1000), nullable=False)
    body = Column(String(100), nullable=False)
    fingerBoard = Column(String(100), nullable=False)
    is_used = Column(String(100), nullable=False)
    image_url = Column(String(1000), nullable=False)

    users = relationship('User', back_populates='instruments')


    def to_dict(self):
        return {
            'id': self.id,
            'seller_id': self.seller_id,
            'make': self.make,
            'model': self.model,
            'category': self.category,
            'price': self.price,
            'details': self.details,
            'body': self.body,
            'fingerBoard': self.fingerBoard,
            'is_used': self.is_used,
            'image_url': self.image_url,
        }