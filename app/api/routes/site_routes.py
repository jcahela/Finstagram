"""Creating Site Routes."""

from flask import Blueprint, render_template, redirect

site_routes = Blueprint('site', __name__, url_prefix='/')

@site_routes.route('/about')
def about():
        """Get About Page."""
        pass

@site_routes.route('/contact')
def contact():
    """Get Contact Page."""
    pass

