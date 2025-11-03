from datetime import datetime
from bson import ObjectId

class Expense:
    def __init__(self, description, amount, category, date=None):
        self.description = description
        self.amount = amount
        self.category = category
        self.date = date or datetime.utcnow().strftime('%Y-%m-%d')

    def to_dict(self):
        return {
            'description': self.description,
            'amount': self.amount,
            'category': self.category,
            'date': self.date
        }

    @staticmethod
    def from_dict(data):
        return Expense(
            description=data['description'],
            amount=data['amount'],
            category=data['category'],
            date=data.get('date')
        )