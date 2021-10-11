from flask import Blueprint
from app.models import Post
from flask_login import login_required, current_user

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def session_user_posts():
    
    """
    Gets all of the session user's posts
    """
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    return {
        "posts": [post.to_dict() for post in posts]
    }
