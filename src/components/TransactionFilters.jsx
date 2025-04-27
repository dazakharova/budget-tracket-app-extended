const TransactionFilters = ({ setFilters, resetFilters, filters }) => {
  const handleChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
      <div className="filters-bar">
        <select value={filters.type} onChange={(e) => handleChange('type', e.target.value)}>
          <option value="">Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select value={filters.category} onChange={(e) => handleChange('category', e.target.value)}>
          <option value="">Category</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="rent">Rent</option>
          <option value="entertainment">Entertainment</option>
        </select>

        <input type="date" value={filters.startDate} onChange={(e) => handleChange('startDate', e.target.value)} />
        <input type="date" value={filters.endDate} onChange={(e) => handleChange('endDate', e.target.value)} />
        <input type="number" placeholder="Min Amount" value={filters.minAmount} onChange={(e) => handleChange('minAmount', e.target.value)} />
        <input type="number" placeholder="Max Amount" value={filters.maxAmount} onChange={(e) => handleChange('maxAmount', e.target.value)} />

        <button onClick={resetFilters} className="reset-button">Reset</button>
      </div>
  );
};

export default TransactionFilters;
