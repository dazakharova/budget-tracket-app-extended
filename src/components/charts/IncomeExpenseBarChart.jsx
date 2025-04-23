import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { use } from 'react';
import { TrackerContext } from '../../store/tracker-context.jsx';

const IncomeExpenseBarChart = () => {
  const { transactions } = use(TrackerContext);

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') {
      income += parseFloat(t.amount);
    } else if (t.type === 'expense') {
      expense += Math.abs(parseFloat(t.amount));
    }
  });

  const data = [
    {
      name: 'Total',
      income,
      expense,
    },
  ];

  return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" name="Income" fill="#82ca9d" />
          <Bar dataKey="expense" name="Expense" fill="#ff8042" />
        </BarChart>
      </ResponsiveContainer>
  );
};

export default IncomeExpenseBarChart;
