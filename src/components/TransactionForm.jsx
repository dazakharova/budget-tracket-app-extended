import {useState, useContext, useRef, useEffect} from 'react';
import { TrackerContext } from '../store/tracker-context.jsx';

const TransactionForm = () => {
    const { addTransaction } = useContext(TrackerContext);
    const descriptionRef = useRef(null)
    const amountRef = useRef(null)

    useEffect(() => {
        descriptionRef.current?.focus()
        amountRef.current?.focus()
    }, [])

    const [description, setDescription] = useState('');
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('salary');

    const categoryOptions = ['salary', 'food', 'gasoline', 'candies', 'electricity/utilities', 'rent', 'entertainment', 'health', 'shopping', 'other' ]

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

        addTransaction(id, description, sum, category)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Description:</label>
                <input ref={descriptionRef} id='description' type='text' onChange={handleDescriptionChange} />
                <label htmlFor='sum'>Sum:</label>
                <input ref={amountRef} id='sum' type='text' onChange={handleSumChange} />
                <button type='submit'>Add Transaction</button>
                <label htmlFor='category'>Category: </label>
                <select id='category' value={category} onChange={e => setCategory(e.target.value)}>
                    {categoryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </form> 
        </div>
    )
}

export default TransactionForm;