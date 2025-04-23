import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
      grouped[month].expense += Math.abs(parseFloat(t.amount)); // remove "-" if present
    }
  });

  const data = Object.values(grouped).sort((a, b) =>
      new Date('1 ' + a.month) - new Date('1 ' + b.month)
  );

  return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" name="Income" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="expense" name="Expense" stroke="#ff8042" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
  );
};

export default IncomeExpenseLineChart;
