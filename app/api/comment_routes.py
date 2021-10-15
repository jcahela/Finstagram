from flask import Blueprint, request
from app.models import Comment, db
from flask_login import login_required, current_user
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment_to_delete = Comment.query.filter(Comment.id == comment_id).first()
    db.session.delete(comment_to_delete)
    db.session.commit()
    return {
            "comment": comment_to_delete.to_dict()
        }
