from app.models import db, User, Post
import random

def get_random_user_id():
    user_id = random.randint(1,22)
    return user_id

def get_random_post_id():
    user_id = random.randint(1,100)
    return user_id

def seed_likes():
    for i in range(500):
        random_user_id= get_random_user_id()
        random_post_id = get_random_post_id()
        user = User.query.filter(User.id == random_user_id).first()
        post = Post.query.filter(Post.id == random_post_id).first()
        user.like(post)


def undo_likes():
    db.session.execute('TRUNCATE likes RESTART IDENTITY CASCADE;')
    db.session.commit()
