from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text
import json




def seed_order_items():


    order_1 = OrderItem(
        instrument_id = 1,
        user_id = "1",
        quantity = 1,
    )
    order_2 = OrderItem(
        instrument_id = 3,
        user_id = "3",
        quantity = 1,
    )

    db.session.add_all([order_1, order_2])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_order_items():
   if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
   else:
       db.session.execute(text("DELETE FROM instruments"))


   db.session.commit()
