import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { use } from 'react';
import { TrackerContext } from '../../store/tracker-context.jsx';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

const ExpensePieChart = () => {
  const { transactions } = use(TrackerContext);

  const expenses = transactions.filter(t => t.type === 'expense');

  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find(e => e.name === curr.category);
    const value = Math.abs(parseFloat(curr.amount)); // Remove "-"
    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name: curr.category, value });
    }
    return acc;
  }, []);

  return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
          >
            {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

  );
};

export default ExpensePieChart;
