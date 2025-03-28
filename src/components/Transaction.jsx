import { useRef } from 'react'
import Confirmation from './Confirmation'

const Transaction = ({data, removeTransaction}) => {
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
                    <p>{data.description}</p>
                    <p>{data.sum} €</p>
                    <p><button onClick={handleConfirmation}>remove</button></p>
                </li>
            </>
        )
    }

    return (
        <>
            <Confirmation ref={dialog} onConfirm={handleTransactionRemoval} />
            <li className='income'>
                <p>{data.description}</p>
                <p>{data.sum} €</p>
                <p><button onClick={handleConfirmation}>remove</button></p>
            </li>
        </>
    )
}

export default Transaction;