from app.models import db, Post


def seed_posts():
    post1 = Post(
        user_id=1, description="This is a description", content="This is content"
    )

    post2 = Post(
        user_id=1, description="Gotta make sure this works", content="Please work"
    )

    post3 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post4 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post5 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200"
    )

    post6 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post7 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post8 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300"
    )

    post9 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post10 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post11 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200"
    )

    post12 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post13 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post14 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300"
    )

    post15 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post16 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post17 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200"
    )

    post18 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/200/300"
    )

    post19 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300/200"
    )

    post20 = Post(
        user_id=2, description="Beautiful Lorem Picsum Image", content="https://picsum.photos/300"
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
