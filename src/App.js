import React from 'react';
import { useState, useEffect } from 'react';
import './Style.scss'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

function App() {
  const [total, setTotal] = useState(0);
  const [income, setIncome] = useState(0);
  const [expaense, setExpense] = useState(0);
  const [history, setHistory] = useState(localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []);

  const addTransaction = (e) => {
    e.preventDefault();
    const transaction = {
      id: Math.floor(Math.random() * 100000000),
      text: e.target.text.value,
      amount: e.target.amount.value
    }
    setHistory([...history, transaction]);
    localStorage.setItem('history', JSON.stringify([...history, transaction]));
    e.target.text.value = '';
    e.target.amount.value = '';
  }

  const deleteTransaction = (id) => {
    setHistory(history.filter(transaction => transaction.id !== id));
    localStorage.setItem('history', JSON.stringify(history.filter(transaction => transaction.id !== id)));
  }

  const calculateTotal = () => {
    let total = 0;
    history.forEach(transaction => {
      total += parseInt(transaction.amount);
    });
    setTotal(total);
  }

  const calculateIncome = () => {
    let income = 0;
    history.forEach(transaction => {
      if (transaction.amount > 0) {
        income += parseInt(transaction.amount);
      }
    });
    setIncome(income);
  }

  const calculateExpense = () => {
    let expense = 0;
    history.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += parseInt(transaction.amount);
      }
    });
    setExpense(expense);
  }

  useEffect(() => {
    calculateTotal();
    calculateIncome();
    calculateExpense();
  }, [history]);

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="container">
        <div className="balance">
          <div>
          <h2>Your Balance</h2>
          <h3>${total}</h3>
          </div>
        <div className="income-expense">
          <div className="details">
            <h4>Income</h4>
            <p>${income}</p>
          </div>
          <div className="details">
            <h4>Expense</h4>
            <p>${expaense}</p>
          </div>
        </div>
        </div>
        <div className="history-container">
        <h3>History</h3>
        {history.length > 0 ?
        <List sx={{ width: '100%', bgcolor: 'background.paper', height: '300px', overflow: 'auto' }}>
        {history.map(transaction => (
          <ListItem key={transaction.id} className={transaction.amount > 0 ? 'plus' : 'minus'}>
            {transaction.text} <span>{transaction.amount > 0 ? '+' : ''}${transaction.amount}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
          </ListItem>
        ))}
      </List>
      : <p className="no-history">No history</p>}
        </div>
      </div>
        <div className="transaction-container">
        <h3>Add new transaction</h3>
        <form onSubmit={addTransaction} className='form'>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" id="text" placeholder="Enter text..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" placeholder="Enter amount..." />
          </div>
          <button className="btn">Add transaction</button>
        </form>
        </div>
    </div>
  );
   
}

export default App;
