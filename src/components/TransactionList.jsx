import { use, useState } from 'react'
import Transaction from './Transaction';
import { TrackerContext } from '../store/tracker-context';
import TransactionFilters from "./TransactionFilters.jsx";
import ExportCSV from './ExportCSV.jsx';

const TransactionList = () => {
    const trackerCtx = use(TrackerContext)

    const [filters, setFilters] = useState({
      type: '',
      category: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: ''
    });

    const filtered = trackerCtx.transactions.filter(tr => {
      if (filters.type && tr.type !== filters.type) return false;
      if (filters.category && tr.category !== filters.category) return false;
      if (filters.startDate && tr.date < filters.startDate) return false;
      if (filters.endDate && tr.date > filters.endDate) return false;
      if (filters.minAmount && tr.amount < filters.minAmount) return false;
      if (filters.maxAmount && tr.amount > filters.maxAmount) return false;
      return true;
    });

    const resetFilters = () => {
      setFilters({
        type: '',
        category: '',
        startDate: '',
        endDate: '',
        minAmount: '',
        maxAmount: ''
      })
    }

  return (
      <div>
        <h3>Transactions</h3>
        <TransactionFilters setFilters={setFilters} resetFilters={resetFilters} filters={filters} />
        <p>{filtered.length === 0 && 'No transactions yet'}</p>
        <ul id="transaction-list">
          {filtered.map((tr, i) => (
              <Transaction key={i} data={tr} />
          ))}
        </ul>
        <ExportCSV />
      </div>
  );
};

export default TransactionList;