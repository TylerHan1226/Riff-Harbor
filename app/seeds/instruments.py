from app.models import db, Instrument, environment, SCHEMA
from sqlalchemy.sql import text
import json




def seed_instruments():

    e_guitar_1 = Instrument(
        seller_id = 2,
        model = "Fender American Vintage II 1951 Telecaster",
        color = "Butterscotch Blonde",
        category = "Electric Guitar",
        price = 2449.99,
        details = "The Fender American Vintage II 1951 Telecaster is a premium electric guitar, meticulously crafted to capture the essence of the original 1951 Telecaster. With its vintage style and iconic sound, it's a true tribute to Fender's historic legacy.",
        body = "Maple",
        fingerBoard = "Maple",
        make = "Fender",
        is_used = False,
        image_url = "url.png",
    )
    e_guitar_2 = Instrument(
        seller_id = 2,
        model = "Fender American Ultra Stratocaster",
        color = "Cobra Blue",
        category = "Electric Guitar",
        price = 2199.99,
        details = "The Fender American Ultra Strat: Alder body, maple neck, Ultra Noiseless pickups, modern upgrades for precision, tone, and comfort.",
        body = "Maple",
        fingerBoard = "Maple",
        make = "Fender",
        is_used = False,
        image_url = "url.png",
    )
    e_guitar_3 = Instrument(
        seller_id = 2,
        make = "Gibson",
        model = "Gibson SG Standard",
        color = "Vintage Cherry",
        category = "Electric Guitar",
        price = 1999.99,
        details = "The Gibson SG Standard 61: Iconic devil horns, double-cut design, Burstbucker 61 pickups, SlimTaper neck, rosewood fingerboard, solid mahogany body—a timeless classic of innovation and versatility.",
        body = "Mahogany",
        fingerBoard = "Rosewood",
        is_used = False,
        image_url = "url.png",
    )

    db.session.add_all([e_guitar_1, e_guitar_2, e_guitar_3])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_instruments():
   if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.instruments RESTART IDENTITY CASCADE;")
   else:
       db.session.execute(text("DELETE FROM instruments"))


   db.session.commit()
