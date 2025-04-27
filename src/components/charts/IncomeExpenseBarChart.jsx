


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { use } from 'react';
import { TrackerContext } from '../../store/tracker-context.jsx';

const IncomeExpenseBarChart = () => {
  const { transactions } = use(TrackerContext);

  const grouped = {};

  transactions.forEach((t) => {
    if (!t.date) return;

    const dateObj = new Date(t.date);
    const monthKey = t.date.slice(0, 7);

    if (!grouped[monthKey]) {
      grouped[monthKey] = {
        month: dateObj.toLocaleString('default', { month: 'short', year: 'numeric' }),
        income: 0,
        expense: 0,
      };
    }

    const amount = Math.abs(parseFloat(t.amount));

    if (t.type === 'income') {
      grouped[monthKey].income += amount;
    } else if (t.type === 'expense') {
      grouped[monthKey].expense += amount;
    }
  });

  const data = Object.entries(grouped)
      .sort(([a], [b]) => new Date(a + '-01') - new Date(b + '-01'))
      .map(([, value]) => value);

  if (data.length === 0) {
    return <p>No data to display</p>;
  }

  return (
      <div style={{ height: '300px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <BarChart width={300} height={300} data={data} margin={{ top: 20, right: 20, bottom: 40 }} >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#82ca9d" />
          <Bar dataKey="expense" name="Expense" fill="#ff8042" />
        </BarChart>
      </div>
  );
};

export default IncomeExpenseBarChart;

