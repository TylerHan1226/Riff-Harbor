from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    instrument_id = Column(Integer, ForeignKey(add_prefix_for_prod('instruments.id')), nullable=False)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    quantity = Column(Integer, nullable=False)
    has_checkout = Column(Boolean, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    # updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

    users = relationship('User', back_populates='order_items')
    instruments = relationship('Instrument', back_populates='order_items')


    def to_dict(self):
        return {
            'id': self.id,
            'instrument_id': self.instrument_id,
            'user_id': self.user_id,
            'quantity': self.quantity,
            'has_checkout'; self.has_checkout,
            'created_at': str(self.created_at.strftime("%Y-%m-%d %H:%M:%S")),
        }
