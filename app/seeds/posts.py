from app.models import db, Post


def seed_posts():
    test1 = Post(
        user_id=1, description="This is a description", content="This is content"
    )

    db.session.add(test1)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
