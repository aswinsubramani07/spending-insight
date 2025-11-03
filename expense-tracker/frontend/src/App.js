import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';


const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  // Fetch expenses on initial load
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });
      const newExpense = await response.json();
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const updateExpense = async (id, updatedData) => {
    try {
      await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      setExpenses(expenses.map(exp => 
        exp._id === id ? { ...exp, ...updatedData } : exp
      ));
      setEditingExpense(null);
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE'
      });
      setExpenses(expenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Expense Tracker</h1>
        <p>Manage your personal expenses efficiently</p>
      </div>
      
      <ExpenseForm 
        onAddExpense={addExpense}
        editingExpense={editingExpense}
        onUpdateExpense={updateExpense}
      />
      
      <ExpenseSummary expenses={expenses} />
      <ExpenseList 
        expenses={expenses} 
        onDelete={deleteExpense}
        onEdit={setEditingExpense}
      />
    </div>
  );
}

export default App;