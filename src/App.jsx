import { useState, useEffect } from 'react'
import { TrackerContext } from './store/tracker-context.jsx'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm.jsx'
import './App.css'
import transactionsList from './data/transactions.js';

function App() {
  const [transactions, setTransactions] = useState(transactionsList);
  const [saldo, setSaldo] = useState(0);

  const addTransaction = (id, description, sum) => {
    const newTransaction = {
      id: id,
      description: description,
      sum: sum
    }

    const updatedTransactions = [...transactions, newTransaction]
    setTransactions(updatedTransactions)
    transactionsList.push(newTransaction)
  }

  const removeTransaction = (id) => {
    const updatedTransactions = [...transactions].filter(tr => tr.id !== id);
    setTransactions(updatedTransactions);

    const index = transactionsList.findIndex(tr => tr.id === id);
    transactionsList.splice(index, 1);
  }

  const calculateSaldo = (transactions) => {
    const newSaldo = transactions.map((item) => parseInt(item.sum)).reduce((acc, curr) => acc + curr, 0);
    return newSaldo
  }

  useEffect(() => {
    const newSaldo = calculateSaldo(transactions);
    console.log('newSaldo is ', newSaldo)
    setSaldo(newSaldo)
  }, [transactions])

  const ctxValue = {
    transactions: transactions
  }

  return (
    <TrackerContext value={ctxValue}>
      <div className='container'>
      <h2>Budget Tracker</h2>
      <div className='balance-box'>
        <h3>Saldo</h3>
        <p id='balance'>{saldo} €</p>
      </div>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList removeTransaction={removeTransaction}  />  
    </div>
    </TrackerContext>
  )
}

export default App
