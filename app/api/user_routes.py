from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# Uncomment to use this route to explore the user follower/followed relationship
# @user_routes.route('/follow')
# def follows():
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
