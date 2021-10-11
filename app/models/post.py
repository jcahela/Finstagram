from .db import db
from datetime import datetime

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

# comments = db.Table(
#     "comments",
#     db.Column(
#         "post_id",
#         db.Integer,
#         db.ForeignKey("posts.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "user_id",
#         db.Integer,
#         db.ForeignKey("users.id"),
#         primary_key=True
#     ),
#     db.Column(
#         "description",
#         db.Text
#     )
# )

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

    # users_commented = db.relationship(
    #     "User",
    #     secondary=comments,
    #     back_populates="commented_posts"
    # )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'description': self.description,
            'content': self.content,
            # 'likes': self.users_liked
        }
