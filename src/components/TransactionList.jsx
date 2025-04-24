import { use, useState } from 'react'
import Transaction from './Transaction';
import { TrackerContext } from '../store/tracker-context';
import TransactionFilters from "./TransactionFilters.jsx";

const TransactionList = () => {
    const trackerCtx = use(TrackerContext)
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div>
          <h3>Transactions</h3>
          {!showFilters && <button onClick={() => setShowFilters(true)}>Filter transactions</button>}
          {showFilters && <TransactionFilters showFilters={setShowFilters} />}
          <p>{trackerCtx.transactions.length === 0 && 'no transactions yet'}</p>
          <ul id='transaction-list'>
            {trackerCtx.transactions && trackerCtx.transactions.map((tr, i) => <Transaction key={i} data={tr} />)}
          </ul>
        </div>
    )
}

export default TransactionList;