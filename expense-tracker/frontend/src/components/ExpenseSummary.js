import React from 'react';

const ExpenseSummary = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  
  return (
    <div className="summary">
      <div>Total Expenses: ${total.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseSummary;