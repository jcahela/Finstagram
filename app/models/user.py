from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

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

    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followed_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic'
    )

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0

    def follow(self, user):
        if not self.is_following(user) and user.id != self.id:
            self.followed.append(user)
            
    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def followed_users(self):
        users = self.followed.all()
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
