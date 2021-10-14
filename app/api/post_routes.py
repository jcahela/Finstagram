"""Post Routes."""

from operator import pos
from flask import Blueprint, request
from app.models import Post, User, db
from flask_login import login_required, current_user
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename
)
from app.forms import PostForm
from app.forms import CommentForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def session_user_posts():
    """Get all of the session user's posts."""
    posts = Post.query.filter(Post.user_id == current_user.id).all()

    return {
        "posts": [post.to_dict() for post in posts]
    }

@post_routes.route('/feed')
@login_required
def get_feed_posts():
    """Get all of a user's feed page posts."""
    posts = Post.query.filter(Post.user_id.query(followers.followed) == current_user.id).all()
    print(posts)
    return {
        "followed_users_posts": [post.to_dict for post in posts]
    }

@post_routes.route('/explore')
@login_required
def explore_posts():
    """Get all of the explore page posts."""
    followed_users = current_user.followed_users()
    followed_ids = followed_users.keys()

    posts = Post.query.filter(Post.user_id not in followed_ids and Post.user_id != current_user.id).all()
    return {
        "posts": [post.to_dict() for post in posts]
    }

@post_routes.route('/', methods=['POST'])
@login_required
def add_post():
    # aws upload and error handling
    if "content" not in request.files:
        return {"errors": "content required"}, 400

    content = request.files["content"]

    if not allowed_file(content.filename):
        return {"errors": "file type not permitted"}, 400

    content.filename = get_unique_filename(content.filename)

    upload = upload_file_to_s3(content)

    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    # post form submission to database, once url is retrieved from aws
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            user_id=current_user.id,
            description=form.data['description'],
            content=url
        )
        db.session.add(new_post)
        db.session.commit()
        return {
            "post": new_post.to_dict()
        }

@post_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def add_comment(post_id):
    post = Post.query.filter(Post.id == post_id).first()
    comment = CommentForm()
    comment['csrf_token'].data = request.cookies['csrf_token']
    if comment.validate_on_submit():
        description = comment.data['description']
        current_user.comment(post, description)
        return {
            "message": "successful!"
        }
