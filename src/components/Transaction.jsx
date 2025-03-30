import { useRef, useContext } from 'react'
import { TrackerContext } from '../store/tracker-context.jsx'
import Confirmation from './Confirmation'

const Transaction = ({data}) => {
  const { removeTransaction, currency } = useContext(TrackerContext)
    const dialog = useRef()

    const handleTransactionRemoval = () => {
        console.log('Id need to be removed: ', data.id)
        removeTransaction(data.id);
    }

    const handleConfirmation = (event) => {
        event.preventDefault();
        console.log('handle confirmation')

        dialog.current.open()
    }
      
    if (data.sum.startsWith('-')) {
        return (
            <>
                <Confirmation ref={dialog} onConfirm={handleTransactionRemoval} />
              <li className='expense'>
                <div className="transaction-main">
                  <p className="description">{data.description}</p>
                  <p className="amount">{data.sum} {currency === 'EUR' ? '€' : '$'}</p>
                  <p><button onClick={handleConfirmation}>remove</button></p>
                </div>
                <div className="category-wrapper">
                  <span className="category-tag">{data.category}</span>
                </div>
              </li>
            </>
        )
    }

    return (
        <>
            <Confirmation ref={dialog} onConfirm={handleTransactionRemoval} />
            <li className='income'>
              <div className="transaction-main">
                <p className="description">{data.description}</p>
                <p className="amount">{data.sum} {currency === 'EUR' ? '€' : '$'}</p>
                <p><button onClick={handleConfirmation}>remove</button></p>
              </div>
              <div className="category-wrapper">
                <span className="category-tag">{data.category}</span>
              </div>
            </li>
        </>
    )
}

export default Transaction;