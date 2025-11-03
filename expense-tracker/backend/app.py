from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from models import Expense
import os
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient(os.getenv('MONGODB_URI'))
db = client.expense_tracker
expenses_collection = db.expenses

# Helper function to convert ObjectId to string
def serialize_expense(expense):
    expense['_id'] = str(expense['_id'])
    return expense

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    expenses = list(expenses_collection.find())
    return jsonify([serialize_expense(exp) for exp in expenses])

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    expense = Expense.from_dict(data)
    result = expenses_collection.insert_one(expense.to_dict())
    expense_dict = expense.to_dict()
    expense_dict['_id'] = str(result.inserted_id)
    return jsonify(expense_dict), 201

@app.route('/api/expenses/<id>', methods=['PUT'])
def update_expense(id):
    data = request.get_json()
    updated_expense = Expense.from_dict(data).to_dict()
    expenses_collection.update_one({'_id': ObjectId(id)}, {'$set': updated_expense})
    updated_expense['_id'] = id
    return jsonify(updated_expense)

@app.route('/api/expenses/<id>', methods=['DELETE'])
def delete_expense(id):
    expenses_collection.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Expense deleted successfully'}), 200

@app.route('/')
def home():
    return jsonify({"message": "Expense Tracker API is running!"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)