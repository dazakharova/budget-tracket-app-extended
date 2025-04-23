import {useContext, useState} from 'react'
import { TrackerContext } from '../store/tracker-context.jsx'

const TransactionEditor = ({ transaction, setEditing }) => {
  const { currency, updateTransaction} = useContext(TrackerContext)

  const [description, setDescription] = useState(transaction.description);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);

  const handleUpdate = (event) => {
    event.preventDefault()

    if (transaction.description === description && transaction.amount === amount && transaction.category === category) {
      setEditing(false)
      return
    }

    const updatedTransaction = {
      id: transaction.id,
      type: parseFloat(amount) > 0 ? 'income' : 'expense',
      description: description,
      amount: parseFloat(amount),
      category: category,
      date: transaction.date,
    }

    updateTransaction(updatedTransaction)
    setEditing(false)
  }

  return (
      <li className="editor-container">
        <form onSubmit={handleUpdate}>
          <div className="transaction-main">
            <input id="description" name="description" value={description} onChange={(event) => {setDescription(event.target.value)}}></input>
            <input id="amount" name="amount" value={amount} onChange={(event) => {setAmount(event.target.value)}}></input>{currency === 'EUR' ? '€' : '$'}

            <p>
              <button type="submit">Save</button>
            </p>
          </div>
          <div className="category-wrapper">
            <select id="category" name="category" value={category} onChange={(event) => {setCategory(event.target.value)}}>
              <option value="salary">Salary</option>
              <option value="gasoline">Gasoline</option>
              <option value="food">Food</option>
              <option value="magazines">Magazines</option>
            </select>
          </div>
        </form>
      </li>
  )
}

export default TransactionEditor