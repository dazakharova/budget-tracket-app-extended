import { useContext } from 'react';
import { TrackerContext } from '../store/tracker-context.jsx';

const TransactionFilters = ({ showFilters }) => {
  const { transactions } = useContext(TrackerContext);
  console.log(transactions);

  const handleSubmit = () => {
    showFilters(false);
  }


  return (
      <form onSubmit={handleSubmit} className="filter-panel">
        <h3>Filter Transactions</h3>

        <label>
          Type:
          <select name="type">
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Category:
          <select name="category">
            <option value="">All</option>
            <option value="salary">Salary</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </label>

        <label>
          From:
          <input type="date" name="startDate" />
        </label>
        <label>
          To:
          <input type="date" name="endDate" />
        </label>

        <label>
          Min Amount:
          <input type="number" name="minAmount" />
        </label>
        <label>
          Max Amount:
          <input type="number" name="maxAmount" />
        </label>

        <button type="submit">Apply Filters</button>
      </form>

  )
}

export default TransactionFilters;