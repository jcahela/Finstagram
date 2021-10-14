from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
