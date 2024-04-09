from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text
import json


def seed_favorites():
    fav1 = Favorite(
        instrument_id = 29,
        user_id = "1"
    )
    fav2 = Favorite(
        instrument_id = 33,
        user_id = "1"
    )

    db.session.add_all([fav1, fav2])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
   if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
   else:
       db.session.execute(text("DELETE FROM favorites"))

   db.session.commit()
