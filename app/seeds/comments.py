from app.models import db, Comment
import random
from faker import Faker

fake = Faker()

def get_random_user_id():
    user_id = random.randint(1,22)
    return user_id

def get_random_post_id():
    user_id = random.randint(1,100)
    return user_id

def random_description():
    random_no_sentences = random.randint(1,5)
    description = fake.paragraph(nb_sentences=random_no_sentences, variable_nb_sentences=False)
    return description

def seed_comments():
    for i in range(500):
        comment = Comment(
            user_id=get_random_user_id(),
            post_id=get_random_post_id(),
            description=random_description()
        )
        db.session.add(comment)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
