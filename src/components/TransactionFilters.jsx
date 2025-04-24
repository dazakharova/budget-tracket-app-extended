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

        <label htmlFor="type">
          Type:
        </label>
        <select id="type" name="type">
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="category">
          Category:
        </label>
        <select name="category">
          <option value="">All</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <label htmlFor="startDate">
          From:
        </label>
        <input id="startDate" type="date" name="startDate" />
        <label htmlFor="endDate">
          To:
        </label>
        <input id="endDate" type="date" name="endDate" />

        <label htmlFor="minAmount">
          Min Amount:
        </label>
        <input id="minAmount" type="number" name="minAmount" />
        <label htmlFor="maxAmount">
          Max Amount:
        </label>
        <input id="maxAmount" type="number" name="maxAmount" />

        <button type="submit">Apply Filters</button>
      </form>

  )
}

export default TransactionFilters;