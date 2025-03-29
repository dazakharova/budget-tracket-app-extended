import TrackerContextProvider, { TrackerContext } from './store/tracker-context.jsx'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm.jsx'
import './App.css'
import {useContext} from "react";

function App() {
  const { saldo, addTransaction, removeTransaction } = useContext(TrackerContext)


  return (
    <TrackerContextProvider>
      <div className='container'>
      <h2>Budget Tracker</h2>
      <div className='balance-box'>
        <h3>Saldo</h3>
        <p id='balance'>{saldo} €</p>
      </div>
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList removeTransaction={removeTransaction}  />
    </div>
    </TrackerContextProvider>
  )
}

export default App
