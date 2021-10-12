from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__="comments"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    description = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())


    user = db.relationship("User", back_populates="comments")
    post = db.relationship("Post", back_populates="comments")

    # def add_comment(self, post_id, user_id, description):
    #     new_comment = self("user_id": user_id, "post_id": post_id, "description": description)
    #     db.session.add(new_comment)
    #     db.session.commit()
