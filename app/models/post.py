from .db import db
from datetime import datetime
from .comment import Comment

likes = db.Table(
    "likes",
    db.Column(
        "post_id",
        db.Integer,
        db.ForeignKey("posts.id"),
        primary_key=True
    ),
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    )
)

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    description = db.Column(db.Text)
    content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="posts")
    comments = db.relationship("Comment", back_populates="post")

    users_liked = db.relationship(
        "User",
        secondary=likes,
        back_populates="liked_posts"
    )

    def post_likes(self):
        users = self.users_liked
        all_users = {}
        for user in users:
            all_users[user.id] = {
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'email': user.email,
            }
        return all_users

    def post_comments(self):
        comments = Comment.query.filter(Comment.post_id == self.id).all()
        all_comments = {}
        for comment in comments:
            all_comments[comment.id] = {
                'user_id': comment.user_id,
                'post_id': comment.post_id,
                'description': comment.description,
                'created_at': comment.createdAt,
            }
        return all_comments

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'content': self.content,
            'likes': self.post_likes(),
            'comments': self.post_comments()
        }
