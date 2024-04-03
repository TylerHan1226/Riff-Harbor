from app.models import db, Instrument, environment, SCHEMA
from sqlalchemy.sql import text
import json


def seed_instruments():
    e_guitar_1 = Instrument(
        seller_id = 2,
        make = "Fender",
        model = "Fender American Vintage II 1951 Telecaster",
        color = "Butterscotch Blonde",
        category = "Electric Guitar",
        price = 2449.99,
        details = "The Fender American Vintage II 1951 Telecaster is a premium electric guitar, meticulously crafted to capture the essence of the original 1951 Telecaster. With its vintage style and iconic sound, it's a true tribute to Fender's historic legacy.",
        body = "Maple",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711508618/Riff-Harbor/eg-1_h3dpkm.jpg",
    )
    e_guitar_2 = Instrument(
        seller_id = 2,
        model = "Fender American Ultra Stratocaster HSS",
        make = "Fender",
        color = "Arctic Pearl",
        category = "Electric Guitar",
        price = 2249.99,
        details = "Iconic for 60+ years, the Fender American Ultra Strat HSS offers precision, performance, and tone. Modern design, Ultra Noiseless pickups, and versatile sound.",
        body = "Alder",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711508631/Riff-Harbor/eg-2_wikka6.jpg",
    )
    e_guitar_3 = Instrument(
        seller_id = 2,
        make = "Gibson",
        model = "Gibson SG Standard",
        color = "Vintage Cherry",
        category = "Electric Guitar",
        price = 1999.99,
        details = "The Gibson SG Standard 61: Iconic devil horns, double-cut design, Burstbucker 61 pickups, SlimTaper neck, rosewood fretboard, solid mahogany body—a timeless classic of innovation and versatility.",
        body = "Mahogany",
        fretboard = "Rosewood",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711508633/Riff-Harbor/eg-3_qx38jb.jpg",
    )
    e_guitar_4 = Instrument(
        seller_id = 2,
        make = "Gibson",
        model = "Gibson Les Paul Traditional Pro V Flame Top",
        color = "Transparent Ebony Burst",
        category = "Electric Guitar",
        price = 3199.99,
        details = "The Gibson Les Paul Traditional Pro V Flame Top elevates a classic design with advanced electronics. Featuring a mahogany body, maple top, and TradBucker pickups, it delivers versatile tones with push/pull controls for coil splitting. A comfortable asymmetrical neck and Grover tuners ensure a premium playing experience. Gibson proudly presents this innovative Les Paul.",
        body = "Mahogany",
        fretboard = "Rosewood",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711508636/Riff-Harbor/eg-4_xlvihd.jpg",
    )
    e_guitar_5 = Instrument(
        seller_id = 2,
        make = "Gibson",
        model = "Gibson Les Paul Standard '50s P-90",
        color = "Gold Top",
        category = "Electric Guitar",
        price = 2799.99,
        details = "The Gibson Les Paul Standard '50s P-90 reimagines a classic with vintage aesthetics and modern features. Mahogany body, maple top, and P-90 pickups offer rich tones, while hand-wired electronics ensure premium sound. With its nostalgic design and high-quality craftsmanship, this guitar pays homage to Gibson's legendary legacy.",
        body = "Mahogany",
        fretboard = "Rosewood",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711509117/Riff-Harbor/eg-5_rpezwk.jpg",
    )
    e_guitar_6 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "ESP LTD EX-7 Baritone Black Metal 7-String",
        color = "Black Satin",
        category = "Electric Guitar",
        price = 1099.00,
        details = "The ESP LTD EX-7 Baritone Black Metal guitar boasts a menacing all-black design with premium features like Macassar ebony fingerboards, glow-in-the-dark markers, and a single EMG 81-7H pickup. Its 27” scale baritone version delivers the intense feel of ESP's Black Metal Series in a 7-string format, featuring a mahogany body, set-thru maple neck, and TonePros locking bridge.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711509293/Riff-Harbor/eg-6_w5dqan.jpg",
    )
    e_guitar_7 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "ESP E-II Horizon-III FR",
        color = "Black Sunburst",
        category = "Electric Guitar",
        price = 2699.00,
        details = "The ESP E-II Horizon-III offers uncompromising tone and reliability. Its neck-through construction, mahogany body with flamed maple top, and Floyd Rose Original bridge ensure stability and control. With Seymour Duncan pickups, Gotoh locking tuners, and coil-splitting controls, it's a versatile powerhouse. Comes with an ESP hardshell case for protection on the go.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711509668/Riff-Harbor/eg-7_ygb6ah.jpg",
    )
    e_guitar_8 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "ESP LTD EX-7 Baritone Black Metal 7-String",
        color = "Black Satin",
        category = "Electric Guitar",
        price = 1699.00,
        details = "The ESP LTD Arrow-1000 electric guitar features a quilted maple top with a satin finish. Its neck-thru-body construction, mahogany body, and 3-piece maple neck offer stability and resonance. The Macassar ebony fingerboard sports pearloid inlays, while the Fishman Fluence Modern humbuckers provide a wide range of tones. With push-pull controls for voicing selection, a Floyd Rose 1000SE bridge, and Grover tuners, it's a versatile and reliable instrument.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711509874/Riff-Harbor/eg-8_strtro.jpg",
    )
    e_guitar_9 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "ESP E-II Eclipse",
        color = "Vintage Black",
        category = "Electric Guitar",
        price = 2399.00,
        details = "The ESP E-II Eclipse DB is a powerhouse for rock and metal enthusiasts. Featuring a set-neck design and 22 extra jumbo frets on a rosewood fingerboard, it offers swift playability. With active EMG 60 and 81 pickups, it delivers a spectrum of tones from warm to aggressive.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711510116/Riff-Harbor/eg-9_ptbrvp.jpg",
    )
    e_guitar_10 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "ESP USA Horizon II",
        color = "See-Thru Purple Fade",
        category = "Electric Guitar",
        price = 4299.00,
        details = "The ESP USA Horizon-II, made in Southern California, is a dream for shredders. Its set-thru neck construction ensures stability and sustain, complemented by an extra thin U-shaped maple neck and mahogany body. With premium components like Jescar stainless steel frets, Sperzel Trim-Lok, Schaller straplocks, and high-end pickups, it's a top-tier instrument. Comes with an ESP USA hardshell case.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711510276/Riff-Harbor/eg-10_fxnrlu.jpg",
    )
    e_guitar_11 = Instrument(
        seller_id = 2,
        make = "PRS",
        model = "PRS SE Hollowbody II",
        color = "Charcoal Burst",
        category = "Electric Guitar",
        price = 1199.00,
        details = "The PRS SE Hollowbody II blends solid-body stability with hollowbody resonance. Featuring 58/15 “S” pickups, it delivers clear, balanced tones. With a figured maple top/back, mahogany sides, and set-neck construction, it suits players of both styles. Includes a hardshell case.",
        body = "Maple",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711510540/Riff-Harbor/eg-11_rp4fve.jpg",
    )
    e_guitar_12 = Instrument(
        seller_id = 2,
        make = "ESP",
        model = "PRS Private Stock Modern Eagle V Curly Maple Top & Ebony Fretboard with Pattern Neck",
        color = "Laguna Dragon's Breath",
        category = "Electric Guitar",
        price = 4299.00,
        details = "The PRS Private Stock Modern Eagle V embodies pinnacle guitar craftsmanship. Crafted from exotic black limba with a curly maple top, its high gloss finish radiates luxury. The pattern-shaped black limba neck, adorned with curly maple binding, ensures sublime playability. Adorned with old-style bird inlays of green select abalone outlined in mother of pearl, it's visually unparalleled. Equipped with dual 408B humbuckers and a narrow single coil, its tonal versatility is unmatched. Hardware in smoked black, including the Gen III tremolo and PRS Phase III locking tuners with ebony buttons, adds a touch of elegance. Limited in availability, it comes with a paisley hardshell case and hand-signed certificate of authenticity.",
        body = "Exotic (Curly Maple Top)",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711510821/Riff-Harbor/eg-12_kticvg.jpg",
    )
    a_guitar_1 = Instrument(
        seller_id = 2,
        make = "Taylor",
        model = "Taylor 814ce V-Class Grand Auditorium",
        color = "Natural",
        category = "Acoustic Guitar",
        price = 3999.00,
        details = "The Taylor 814ce V-Class Grand Auditorium blends innovative design and top-notch features for an exceptional playing experience. Renowned for its craftsmanship and rich sound, it's a masterpiece meant to be cherished and played by discerning musicians.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711511261/Riff-Harbor/ag-1_celjqi.jpg",
    )
    a_guitar_2 = Instrument(
        seller_id = 2,
        make = "Martin",
        model = "Martin D-18 Standard Dreadnought",
        color = "Natural",
        category = "Acoustic Guitar",
        price = 2799.00,
        details = "The Martin D-18, a classic from Martin's Standard Series, epitomizes the dreadnought tone. Handcrafted with Sitka spruce and mahogany, it delivers a balanced, resonant sound. With a High Performance neck and dreadnought body, it offers enhanced playability, volume, and projection. Versatile for various genres, it embodies Martin's heritage and prestige.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711511269/Riff-Harbor/ag-2_ydzev5.jpg",
    )
    a_guitar_3 = Instrument(
        seller_id = 2,
        make = "Martin",
        model = "Martin Special X Style 000 Cutaway",
        color = "Black",
        category = "Acoustic Guitar",
        price = 589.00,
        details = "The Martin Special X Style 000 cutaway acoustic-electric guitar merges traditional craftsmanship with modern electronics. Featuring a sleek black satin finish, solid Jett Black HPL top, and Fishman MX electronics, it's perfect for live gigs or studio sessions.",
        body = "Mahogany",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711511958/Riff-Harbor/ag-3_nd7csl.jpg",
    )
    a_guitar_4 = Instrument(
        seller_id = 2,
        make = "Fender",
        model = "Fender CD-60SCE Dreadnought",
        color = "Natural",
        category = "Acoustic Guitar",
        price = 329.00,
        details = "The Fender CD-60SCE offers beginner to intermediate players a versatile experience with its powerful onboard electronics and solid spruce top. Its Venetian-cutaway body allows for easy access to upper frets, while the mahogany back and sides ensure rich, resonant tones. Perfect for any setting, from the couch to the coffeehouse.",
        body = "Mahogany",
        fretboard = "Rosewood",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711514825/Riff-Harbor/ag-4_hejvke.jpg",
    )
    bass_1 = Instrument(
        seller_id = 2,
        make = "Fender",
        model = "Fender Suona Jazz Bass Thinline Violin",
        color = "Burst",
        category = "Bass",
        price = 3099.00,
        details = "The limited-edition Fender Suona Jazz Bass Thinline blends classic design with refined elegance, delivering warm tones and unmatched beauty. Crafted with a semi-hollow ash body and bound Italian alpine spruce top, it offers clarity and resonance. The roasted flame maple modern “C” neck and compound-radius ebony fingerboard provide comfort and playability. Equipped with custom Suona Jazz Bass pickups and HiMass Vintage bridge, it delivers dynamic tones with rich harmonics and sustain.",
        body = "Ash",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711512107/Riff-Harbor/b-1_paekkg.jpg",
    )
    bass_2 = Instrument(
        seller_id = 2,
        make = "Fender",
        model = "Fender American Ultra Precision Bass Limited-Edition",
        color = "Umbra Burst",
        category = "Bass",
        price = 2799.00,
        details = "The limited-edition Fender American Ultra Precision Bass offers precision, performance, and tone. With a unique Modern D neck profile and Ultra rolled fingerboard edges, it ensures playing comfort. The Ultra Noiseless Vintage pickups and advanced wiring options deliver versatile tones without hum. Other features include a compound-radius ebony fingerboard and lightweight vintage-paddle tuning machines. Comes with a premium molded hardshell case.",
        body = "Alder",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711513320/Riff-Harbor/b-2_btvnbr.jpg",
    )
    bass_3 = Instrument(
        seller_id = 2,
        make = "Fender",
        model = "Fender Precision Bass Limited-Edition",
        color = "Black",
        category = "Bass",
        price = 999.00,
        details = "Authentically classic, the limited-edition Fender Player Precision Bass with ebony fingerboard delivers iconic style and thunderous sound for studio or stage.",
        body = "Alder",
        fretboard = "Ebony",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711513528/Riff-Harbor/b-3_wmr4zd.jpg",
    )
    bass_4 = Instrument(
        seller_id = 2,
        make = "Ernie Ball",
        model = "Music Man StingRay5 Special HH 5-String",
        color = "Candyman",
        category = "Bass",
        price = 2899.00,
        details = "The Ernie Ball Music Man StingRay bass, an icon of modern music, combines craftsmanship and innovation. With its onboard active equalization and new 18-volt 3-band preamp, the StingRay Special 5HH offers versatile tones, from modern to vintage, with warmth and punch.",
        body = "Select hardwoods",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711513685/Riff-Harbor/b-4_wpi6a5.jpg",
    )
    bass_5 = Instrument(
        seller_id = 2,
        make = "Ernie Ball",
        model = "Music Man DarkRay 4-String",
        color = "Shadow Korina",
        category = "Bass",
        price = 3099.00,
        details = "Designed with Darkglass Electronics, this four-string bass offers diverse sonic capabilities. Its modern 2-band EQ preamp features Clean, Alpha (tight distortion), and Omega (fuzz) modes, fully mixable via onboard controls. With a neodymium humbucking pickup, roasted maple neck, and 22 stainless steel frets, it maintains the StingRay Special's essence.",
        body = "Black Limba",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711514142/Riff-Harbor/b-5_s3leed.jpg",
    )
    bass_6 = Instrument(
        seller_id = 2,
        make = "Gibson",
        model = "Gibson Rex Brown Thunderbird",
        color = "Ebony",
        category = "Bass",
        price = 2799.00,
        details = "Introducing the Rex Brown Thunderbird Electric Bass by Gibson, the signature instrument of Pantera's Rex Brown. Crafted for powerful low end, it features a mahogany body and neck, with Rexbucker T-Bird pickups for bone-rattling output. Active electronics offer versatile sound control at your fingertips.",
        body = "Mahogany",
        fretboard = "Rosewood",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711514298/Riff-Harbor/b-6_bzajvj.jpg",
    )
    bass_7 = Instrument(
        seller_id = 2,
        make = "Schecter",
        model = "Schecter Guitar Research Charles Berthoud CB-4",
        color = "See Thru Black Satin",
        category = "Bass",
        price = 1499.00,
        details = "The Charles Berthoud CB-4 Electric Bass offers professional performance with premium features. EMG pickups and a 3-band EQ deliver versatile tones. With a flamed maple top, abalone inlays, and Grover tuners, it's a standout instrument for bassists of all genres.",
        body = "Ash",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711514560/Riff-Harbor/b-7_zhcnrm.jpg",
    )
    bass_8 = Instrument(
        seller_id = 2,
        make = "Schecter",
        model = "Schecter Guitar Research FreeZesicle-5 5-String",
        color = "Freeze Purple",
        category = "Bass",
        price = 1499.00,
        details = "The Schecter FreeZesicle-5 electric bass combines premium specs with stunning style. Built for professionals, it features a swamp ash body, active EMG pickups, and a versatile 3-band EQ. With a Graphtech nut, Schecter Custom bridge, and Grover tuners, it's the ultimate bass. Optional SGR-Universal bass case sold separately.",
        body = "Ash",
        fretboard = "Maple",
        is_used = False,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711514602/Riff-Harbor/b-8_npdm9g.jpg",
    )
    used_inst_1 = Instrument(
        seller_id = 1,
        make = "B.C. Rich",
        model = "B.C. Rich Ironbird Extreme with Floyd Rose",
        color = "Matte Black",
        category = "Electric Guitar",
        price = 1799.99,
        details = "The BC Rich Ironbird, designed by Joey Rico in 1983, is a metal artists favorite. Its angular body shape features sharp, dagger-like points. With a 24-fret neck and licensed Floyd Rose tremolo, it’s built for shredding.",
        body = "Basswood",
        fretboard = "Rosewood",
        is_used = True,
        image_url = "https://res.cloudinary.com/do8l6gpqp/image/upload/v1711557057/Riff-Harbor/test-eg-1_esfxhj.jpg",
    )

    db.session.add_all([e_guitar_1, e_guitar_2, e_guitar_3, e_guitar_4, e_guitar_5, e_guitar_6, e_guitar_7, e_guitar_8, e_guitar_9, e_guitar_10, e_guitar_11, e_guitar_12, a_guitar_1, a_guitar_2, a_guitar_3, a_guitar_4, bass_1, bass_2, bass_3, bass_4, bass_5, bass_6, bass_7, bass_8, used_inst_1])
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
