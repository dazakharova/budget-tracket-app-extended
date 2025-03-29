import { useState, useContext } from 'react';
import { TrackerContext } from '../store/tracker-context.jsx';

const TransactionForm = () => {
    const { addTransaction } = useContext(TrackerContext);

    const [description, setDescription] = useState('');
    const [sum, setSum] = useState('');

    const handleDescriptionChange = (event) => {
        event.preventDefault();

        setDescription(event.target.value);
    }

    const handleSumChange = (event) => {
        event.preventDefault();

        if (/^-?\d*\.?\d*$/.test(event.target.value) || event.target.value == '') {
            setSum(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit pressed')
        const id = Date.now();

        addTransaction(id, description, sum)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Description:</label>
                <input id='description' type='text' onChange={handleDescriptionChange} />
                <label htmlFor='sum'>Sum:</label>
                <input id='sum' type='text' onChange={handleSumChange} />
                <button type='submit'>Add Transaction</button>
            </form> 
        </div>
    )
}

export default TransactionForm;