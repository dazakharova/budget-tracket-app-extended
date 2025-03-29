import {createContext, useEffect, useState} from 'react'
import transactionsList from "../data/transactions.js";

export const TrackerContext = createContext({
    transactions: [],
    saldo: 0,
    addTransaction: () => {},
    removeTransaction: () => {},
})

export default function TrackerContextProvider({ children }) {
    const [transactions, setTransactions] = useState(transactionsList);
    const [saldo, setSaldo] = useState(0);

    const addTransaction = (id, description, sum) => {
        const newTransaction = {
            id: id,
            description: description,
            sum: sum
        }

        const updatedTransactions = [...transactions, newTransaction]
        setTransactions(updatedTransactions)
        transactionsList.push(newTransaction)
    }

    const removeTransaction = (id) => {
        const updatedTransactions = [...transactions].filter(tr => tr.id !== id);
        setTransactions(updatedTransactions);

        const index = transactionsList.findIndex(tr => tr.id === id);
        transactionsList.splice(index, 1);
    }

    const calculateSaldo = (transactions) => {
        const newSaldo = transactions.map((item) => parseInt(item.sum)).reduce((acc, curr) => acc + curr, 0);
        return newSaldo
    }

    useEffect(() => {
        const newSaldo = calculateSaldo(transactions);
        console.log('newSaldo is ', newSaldo)
        setSaldo(newSaldo)
    }, [transactions])

    const ctxValue = {
        transactions: transactions,
        saldo: saldo,
        addTransaction: addTransaction,
        removeTransaction: removeTransaction,
    }

    return <TrackerContext.Provider value={ctxValue}>{children}</TrackerContext.Provider>;
}