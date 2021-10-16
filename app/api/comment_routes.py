from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Comment, db
from flask_login import login_required, current_user
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment_to_delete = Comment.query.filter(Comment.id == comment_id).first()
    if comment_to_delete.user_id != current_user.id:
        return {
            "error": "You are not authorized to delete this comment"
        }
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {
            "comment": comment_to_delete.to_dict()
        }

@comment_routes.route('/<int:comment_id>', methods=['PATCH'])
@login_required
def edit_comment(comment_id):
    comment = CommentForm()
    comment['csrf_token'].data = request.cookies['csrf_token']
    if comment.validate_on_submit():
        commentToUpdate = Comment.query.filter(Comment.id == comment_id).first()
        if commentToUpdate.user_id != current_user.id:
            return {"errors": ["You are not permitted to edit this comment"]}, 400
        commentToUpdate.description = comment.data['description']
        db.session.add(commentToUpdate)
        db.session.commit()
        return {
            "message": "successful"
        }
    return {'errors': ["You cannot post an empty comment"]}, 401
