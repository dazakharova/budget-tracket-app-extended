import Transaction from './Transaction';

const TransactionList = ({transactionList, removeTransaction}) => {
    return (
        <div>
            <h3>Transactions</h3>
            <ul id='transaction-list'>
            {transactionList.map((tr, i) => <Transaction key={i} data={tr} removeTransaction={removeTransaction} />)}
            </ul>
            
        </div>
    )
}

export default TransactionList;