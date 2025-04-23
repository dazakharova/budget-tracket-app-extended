import { use } from 'react'
import Transaction from './Transaction';
import { TrackerContext } from '../store/tracker-context';

const TransactionList = () => {
    const trackerCtx = use(TrackerContext)
    return (
        <div>
            <h3>Transactions</h3>
            <p>{trackerCtx.transactions.length === 0 && 'no transactions yet'}</p>
            <ul id='transaction-list'>
            {trackerCtx.transactions && trackerCtx.transactions.map((tr, i) => <Transaction key={i} data={tr} />)}
            </ul>
        </div>
    )
}

export default TransactionList;