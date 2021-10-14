"""User Routes."""

from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post, Comment

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def users():
    """Get all users."""
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """Get user."""
    user = User.query.get(id)
    return user.to_dict()

# Uncomment to use this route to explore the user follower/followed relationship
# @user_routes.route('/feed')
# def follows():
#     """Get followers. Hit this route to load followers onto db."""
#     user1 = User.query.filter(User.id == 1).first()
#     user2 = User.query.filter(User.id == 2).first()
#     user3 = User.query.filter(User.id == 3).first()

#     user1.follow(user2)
#     user1.follow(user3)
#     user2.follow(user3)

#     return {
#         'user1': user1.to_dict(),
#         'user2': user2.to_dict(),
#         'user3': user3.to_dict()
#         }

@user_routes.route('/like')
def like():
    """Get likes. Hit this route to load likes onto db."""
    post25 = Post.query.filter(Post.id == 25).first()
    user2 = User.query.filter(User.id == 2).first()
    user3 = User.query.filter(User.id == 3).first()
    user2.like(post25)
    user3.like(post25)

    return post25.to_dict()


@user_routes.route('/comment')
def comment():
    """Get comments. Hit this route to load comments onto db."""
    post25 = Post.query.filter(Post.id == 25).first()
    user2 = User.query.filter(User.id == 2).first()
    user2.comment(post25, "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'")
    user2.comment(post25, "vable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't an")
    return "Lets gooooooooooooooooo"
