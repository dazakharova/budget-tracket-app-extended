import {useState} from 'react';

const TransactionFilters = ({ showFilters, setFilters }) => {

  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const filters = {
      type,
      category,
      startDate,
      endDate,
      minAmount,
      maxAmount,
    };

    setFilters(filters);
    showFilters(false);
  }


  return (
      <form onSubmit={handleSubmit} className="filter-panel">
        <h3>Filter Transactions</h3>

        <label htmlFor="type">
          Type:
        </label>
        <select onChange={(event) => setType(event.target.value)} id="type" name="type">
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="category">
          Category:
        </label>
        <select onChange={(event) => setCategory(event.target.value)} id="category" name="category">
          <option value="">All</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <label htmlFor="startDate">
          From:
        </label>
        <input onChange={(event) => setStartDate(event.target.value)} id="startDate" type="date" name="startDate" />
        <label htmlFor="endDate">
          To:
        </label>
        <input onChange={(event) => setEndDate(event.target.value)} id="endDate" type="date" name="endDate" />

        <label htmlFor="minAmount">
          Min Amount:
        </label>
        <input onChange={(event) => setMinAmount(event.target.value)} id="minAmount" type="number" name="minAmount" />
        <label htmlFor="maxAmount">
          Max Amount:
        </label>
        <input onChange={(event) => setMaxAmount(event.target.value)} id="maxAmount" type="number" name="maxAmount" />

        <button type="submit">Apply Filters</button>
      </form>

  )
}

export default TransactionFilters;