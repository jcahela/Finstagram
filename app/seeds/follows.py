from app.models import db, User
import random

def random_user_id():
    user_id = random.randint(1,22)
    return user_id

def seed_followers():
    for i in range(50):
        random_id1 = random_user_id()
        random_id2 = random_user_id()
        user1 = User.query.filter(User.id == random_id1).first()
        user2 = User.query.filter(User.id == random_id2).first()
        user1.follow(user2)


def undo_followers():
    db.session.execute('TRUNCATE followers RESTART IDENTITY CASCADE;')
    db.session.commit()
