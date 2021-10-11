from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Uncomment to use this route to explore the user follower/followed relationship
@user_routes.route('/feed')
def follows():
    user1 = User.query.filter(User.id == 1).first()
    user2 = User.query.filter(User.id == 2).first()
    user3 = User.query.filter(User.id == 3).first()

    user1.follow(user2)
    user1.follow(user3)
    user2.follow(user3)

    return {
        'user1': user1.to_dict(),
        'user2': user2.to_dict(),
        'user3': user3.to_dict()
        }

@user_routes.route('/like')
def like():
    post1 = Post.query.filter(Post.id == 1).first()
    user1 = User.query.filter(User.id == 2).first()
    user1.like(post1)

    return post1.to_dict()


@user_routes.route('/comment')
def comment():
    post1 = Post.query.filter(Post.id == 1).first()
    user1 = User.query.filter(User.id == 1).first()
    comment = Comment("user_id": user_id, "post_id": post_id, "description": description)
    db.session.add(new_comment)
    db.session.commit()
