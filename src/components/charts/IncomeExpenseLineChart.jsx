import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { use } from 'react';
import { TrackerContext } from '../../store/tracker-context.jsx';

const IncomeExpenseLineChart = () => {
  const { transactions } = use(TrackerContext);

  const grouped = {};

  transactions.forEach((t) => {
    if (!t.date) return;

    const month = new Date(t.date).toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    if (!grouped[month]) {
      grouped[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === 'income') {
      grouped[month].income += parseFloat(t.amount);
    } else if (t.type === 'expense') {
      grouped[month].expense += Math.abs(parseFloat(t.amount)); // remove "-"
    }
  });

  const data = Object.values(grouped).sort((a, b) =>
      new Date('1 ' + a.month) - new Date('1 ' + b.month)
  );

  if (data.length === 0) {
    return <p>No data to display</p>;
  }

  return (
      <div style={{ height: '300px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <LineChart width={350} height={300} data={data} margin={{ top: 20, right: 20, bottom: 40 }} >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" name="Income" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" name="Expense" stroke="#ff8042" strokeWidth={2} />
        </LineChart>
      </div>
  );
};

export default IncomeExpenseLineChart;
