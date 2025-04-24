import { CSVLink } from "react-csv";
import { use } from 'react';
import { TrackerContext } from '../store/tracker-context.jsx';

const ExportCSV = () => {
  const { transactions } = use(TrackerContext);

  const headers = [
    { label: "ID", key: "id" },
    { label: "Type", key: "type" },
    { label: "Description", key: "description" },
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Date", key: "date" },
  ];

  return (
      <button>
        <CSVLink
            data={transactions}
            headers={headers}
            filename={"transactions.csv"}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Export as CSV
        </CSVLink>
      </button>
  );
};

export default ExportCSV;
