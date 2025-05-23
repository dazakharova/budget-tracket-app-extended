import { TrackerContext } from './store/tracker-context.jsx'
import TransactionList from './components/TransactionList'
import TransactionForm from './components/TransactionForm.jsx'
import ExpensePieChart from './components/charts/ExpensePieChart.jsx'
import IncomeExpenseBarChart from './components/charts/IncomeExpenseBarChart.jsx'
import IncomeExpenseLineChart from './components/charts/IncomeExpenseLineChart.jsx'
import Settings from './components/Settings'
import './App.css'
import {useContext} from "react";

function App() {
  const { saldo, theme, currency} = useContext(TrackerContext)

  const containerClass = `container container-${theme}`
  const chartsContainerClass = `charts-container container-${theme}`;

  return (
      <>
        <div className='control-panel'>
          <Settings />
          <p>{currency}</p>
        </div>
        <div className={containerClass}>
          <h2>Budget Tracker</h2>
          <div className='balance-box'>
            <h3>Saldo</h3>
            <p id='balance'>{saldo} {currency === 'EUR' ? '€' : '$'}</p>
          </div>
          <TransactionForm />
          <TransactionList />
        </div>
        <div className={chartsContainerClass}>
          <ExpensePieChart />
          <IncomeExpenseBarChart />
          <IncomeExpenseLineChart />
        </div>
      </>
  )
}

export default App
