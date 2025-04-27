import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { use } from 'react';
import { TrackerContext } from '../../store/tracker-context.jsx';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff8042',
  '#a4de6c',
  '#d0ed57',
  '#8dd1e1',
  '#d88884'
];

const ExpensePieChart = () => {
  const { transactions } = use(TrackerContext);

  const expenses = transactions.filter(t => t.type === 'expense');

  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find(e => e.name === curr.category);
    const value = Math.abs(parseFloat(curr.amount));
    if (existing) {
      existing.value += value;
    } else {
      acc.push({ name: curr.category, value });
    }
    return acc;
  }, []);

  if (data.length === 0) {
    return <p>No data to display</p>;
  }

  return (
      <div style={{ width: 300, border: '1px solid #ccc', borderRadius: '8px' }}>
        <PieChart width={300} height={300}>
          <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
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
      </div>
  );
};

export default ExpensePieChart;
