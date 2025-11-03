import React from 'react';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses recorded yet.</p>
      ) : (
        <div className="expense-list">
          {expenses.map(expense => (
            <div key={expense._id} className="expense-item">
              <div className="expense-details">
                <div className="expense-description">{expense.description}</div>
                <div>
                  <span className={`category ${expense.category}`}>{expense.category}</span>
                  <span> • {expense.date}</span>
                </div>
              </div>
              <div className="amount">${parseFloat(expense.amount).toFixed(2)}</div>
              <div className="actions">
                <button 
                  className="btn btn-success" 
                  onClick={() => onEdit(expense)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => onDelete(expense._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;