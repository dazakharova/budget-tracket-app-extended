import {createContext, useEffect, useState} from 'react'
import transactionsList from "../data/transactions.js";

export const TrackerContext = createContext({
    transactions: [],
    saldo: 0,
    addTransaction: () => {},
    removeTransaction: () => {},
    currency: '',
    theme: '',
    changeSettings: () => {},
})

export default function TrackerContextProvider({ children }) {
    const [transactions, setTransactions] = useState(transactionsList);
    const [saldo, setSaldo] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [theme, setTheme] = useState('light');

    const addTransaction = (id, description, sum, category) => {
        const newTransaction = {
            id: id,
            description: description,
            sum: sum,
            category: category,
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
        const newSaldo = transactions.map((item) => parseFloat(item.sum)).reduce((acc, curr) => acc + curr, 0);
        return newSaldo.toFixed(2);
    }

    const recalculateCost = (prevCurrency, newCurrency) => {
        const currencyRates = {
            EUR: 1,
            USD: 1.1,
            GBP: 0.85,
        }

        const rateFrom = currencyRates[prevCurrency]
        const rateTo = currencyRates[newCurrency]

        const conversionRate = rateTo / rateFrom

        const updatedTransactions = transactions.map((transaction) => {
            const convertedSum = (parseFloat(transaction.sum) * conversionRate).toFixed(2).toString()
            return {
                ...transaction,
                sum: convertedSum,
            }
        })

        setTransactions(updatedTransactions)
    }

    const changeSettings = (newCurrency, newTheme) => {
        if (newCurrency !== currency) {
            recalculateCost(currency, newCurrency)
        }
        setCurrency(newCurrency)
        setTheme(newTheme)
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
        currency: currency,
        theme: theme,
        changeSettings: changeSettings,
    }

    return <TrackerContext.Provider value={ctxValue}>{children}</TrackerContext.Provider>;
}