"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/sign_up', methods=['POST'])
def handle_sign_up():
    body = request.json
    new_email = body["email"]
    new_password = body["password"]
    new_user = User(
        email = new_email, 
        password= generate_password_hash(new_password)
    )
    response_body = {
        "message": "User created succesfully!",
        "user": new_user.serialize()
    }
    db.session.add(new_user)
    db.session.commit()
    return jsonify(response_body), 200

@api.route('/log_in', methods=['POST'])
def handle_log_in():
    body = request.json
    new_email = body["email"]
    new_password = body["password"]
    main_user = User.query.filter_by(email = new_email).first()

    if not main_user:
        return jsonify("No matching email found!"), 401
    if not check_password_hash(main_user.password, new_password):
        return jsonify("Invalid password, please try again"), 401
    response_body = {
        "message": "Welcome, User",
        "user": main_user.serialize()
    }
    
    return jsonify(response_body), 200


# {
#     "email":email@email.com
#     "password": pass123
# }