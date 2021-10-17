from app.models import db, User
import random
from faker import Faker

fake = Faker()

def get_profile_picture():
    random_int = random.randint(1,99)
    gender = ['men', 'women']
    random_index = random.randint(0,1)
    profile_picture_url = f'https://randomuser.me/api/portraits/med/{gender[random_index]}/{random_int}.jpg'
    return profile_picture_url

def seed_users():
    demo = User(
        firstname='Demo', lastname='User', username='Demo', email='demo@aa.io', password='password', profile_picture=get_profile_picture())
    marnie = User(
        firstname='Marnie', lastname='Jones', username='marnie', email='marnie@aa.io', password='password', profile_picture=get_profile_picture())
    db.session.add(demo)
    db.session.add(marnie)
    db.session.commit()

    for i in range(20):
        new_user = User(
            firstname=fake.name().split()[0],
            lastname=fake.name().split()[1],
            username=fake.simple_profile()['username'],
            email=fake.safe_email(),
            password='password',
            profile_picture=get_profile_picture()
        )
        db.session.add(new_user)
    
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
