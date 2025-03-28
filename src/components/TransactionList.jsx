import { use } from 'react'
import Transaction from './Transaction';
import { TrackerContext } from '../store/tracker-context';

const TransactionList = ({removeTransaction}) => {
    const trackerCtx = use(TrackerContext)
    return (
        <div>
            <h3>Transactions</h3>
            <ul id='transaction-list'>
            {trackerCtx.transactions.map((tr, i) => <Transaction key={i} data={tr} removeTransaction={removeTransaction} />)}
            </ul>
        </div>
    )
}

export default TransactionList;