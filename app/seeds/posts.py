from app.models import db, Post


def seed_posts():
    test1 = Post(
        user_id=1, description="This is a description", content="This is content"
    )

    test2 = Post(
        user_id=1, description="Gotta make sure this works", content="Please work"
    )

    test3 = Post(
        user_id=2, description="This better work", content="or else"
    )

    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
