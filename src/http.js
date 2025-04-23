const BASE_URL = 'http://localhost:3001/transactions';

export async function fetchAllTransactions() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createNewTransaction(transaction) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return await res.json();
}

export async function deleteTransaction(id) {
  const res = await fetch(BASE_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
}

export async function updateTransactionDetails(transaction) {
  const res = await fetch(BASE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  return await res.json();
}
