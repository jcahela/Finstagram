from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .post import likes
from .comment import Comment

followers = db.Table('followers',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_id', db.Integer, db.ForeignKey('users.id'))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.Text, default="https://cdn.discordapp.com/attachments/886336420552269847/897242211253645332/Default_pfp.png")
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    posts = db.relationship("Post", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")

    liked_posts = db.relationship(
        "Post",
        secondary=likes,
        back_populates="users_liked"
    )

    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )

    def like(self, post):
        self.liked_posts.append(post)
        db.session.add(self)
        db.session.commit()

    def comment(self, post, description):
        comment = Comment(user_id=self.id, post_id=post.id, description=description)
        db.session.add(comment)
        db.session.commit()


    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def follow(self, user):
        if not self.is_following(user) and user.id != self.id:
            self.followed.append(user)
            db.session.add(self)
            db.session.commit()

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            db.session.add(self)
            db.session.commit()

    def followed_users(self):
        users = self.followed
        followed_ids = {}
        for user in users:
            followed_ids[user.id] = {
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'email': user.email,
            }
        return followed_ids

    def follower_users(self):
        users = self.followers.all()
        follower_ids = {}
        for user in users:
            follower_ids[user.id] = {
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'email': user.email,
            }
        return follower_ids

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname': self.firstname,
            'lastname': self.lastname,
            'username': self.username,
            'email': self.email,
            'followed': self.followed_users(),
            'followers': self.follower_users()
        }
