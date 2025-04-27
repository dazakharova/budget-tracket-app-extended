import {createContext, useEffect, useReducer} from 'react'
import { fetchAllTransactions, createNewTransaction, deleteTransaction, updateTransactionDetails } from '../http.js'

export const TrackerContext = createContext({
    transactions: [],
    saldo: 0,
    addTransaction: () => {},
    removeTransaction: () => {},
    updateTransaction: () => {},
    currency: '',
    theme: '',
    changeSettings: () => {},
})

const trackerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTIONS': {
            return {
                ...state,
                transactions: [...action.payload.transactions]
            }
        }
        case 'ADD_TRANSACTION': {
            const newTransaction = {
                id: action.payload.id,
                type: action.payload.type,
                description: action.payload.description,
                amount: action.payload.amount,
                category: action.payload.category,
                date: action.payload.date,
            }

            const updatedTransactions = [...state.transactions, newTransaction]
            return {
                ...state,
                transactions: updatedTransactions,
            }
        }
        case 'REMOVE_TRANSACTION': {
            const updatedTransactions = [...state.transactions].filter(tr => tr.id !== action.payload.id);
            return {
                ...state,
                transactions: updatedTransactions,
            }
        }
        case 'CALCULATE_SALDO': {
            const newSaldo = state.transactions.map((item) => item.amount).reduce((acc, curr) => acc + curr, 0);
            return {
                ...state,
                saldo: newSaldo.toFixed(2),
            }
        }
        case 'CHANGE_SETTINGS': {
            let updatedTransactions = [...state.transactions]
            if (action.payload.newCurrency !== state.currency) {
                const currencyRates = {
                    EUR: 1,
                    USD: 1.1,
                }

                const rateFrom = currencyRates[state.currency]
                const rateTo = currencyRates[action.payload.newCurrency]

                const conversionRate = rateTo / rateFrom

                updatedTransactions = state.transactions.map((transaction) => {
                    const convertedSum = parseFloat((transaction.amount * conversionRate).toFixed(2))

                    return {
                        ...transaction,
                        amount: convertedSum,
                    }
                })
            }

            return {
                ...state,
                transactions: updatedTransactions,
                currency: action.payload.newCurrency,
                theme: action.payload.newTheme,
            }
        }
        case 'UPDATE_TRANSACTION': {
            return {
                ...state,
                transactions: state.transactions.map(transaction => transaction.id === action.payload.id ? action.payload : transaction)
            }
        }
    }

    return state
}

export default function TrackerContextProvider({ children }) {
    const [ trackerState, trackerDispatch ] = useReducer(trackerReducer, {
        transactions: [],
        saldo: 0,
        currency: 'EUR',
        theme: 'light',
    })


    const addTransaction = async (transaction) => {
        trackerDispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        })

        try {
            await createNewTransaction(transaction);
            console.log("ADDED TO DB SUCCESSFULLY")
        } catch (error) {
            console.log(error);
        }
    }

    const removeTransaction = async (id) => {
        trackerDispatch({
            type: 'REMOVE_TRANSACTION',
            payload: { id }
        })

        try {
            await deleteTransaction(id);
            console.log("DELETED TRANSACTION SUCCESSFULLY")
        } catch (error) {
            console.log(error);
        }
    }

    const updateTransaction = async (transaction) => {
        trackerDispatch({
            type: 'UPDATE_TRANSACTION',
            payload: transaction,
        })

        try {
            await updateTransactionDetails(transaction);
            console.log("UPDATED TRANSACTION SUCCESSFULLY")
        } catch (error) {
            console.log(error);
        }
    }

    const calculateSaldo = () => {
        trackerDispatch({
            type: 'CALCULATE_SALDO'
        })
    }

    const changeSettings = (newCurrency, newTheme) => {
        trackerDispatch({
            type: 'CHANGE_SETTINGS',
            payload: {
                newCurrency: newCurrency,
                newTheme: newTheme,
            }
        })
    }

    const addTransactions = (transactions) => {
        trackerDispatch({
            type: 'ADD_TRANSACTIONS',
            payload: {
                transactions: transactions
            }
        })
    }

    useEffect(() => {
        if (trackerState.transactions) {
            calculateSaldo(trackerState.transactions);
        }
    }, [trackerState.transactions])

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const transactions = await fetchAllTransactions();
                addTransactions(transactions)
                console.log('Fetched transactions are: ', transactions)
            } catch(error) {
                console.log(error);
            }
        }

        fetchTransactions()
    }, [])

    const ctxValue = {
        transactions: trackerState.transactions,
        saldo: trackerState.saldo,
        addTransaction: addTransaction,
        removeTransaction: removeTransaction,
        updateTransaction: updateTransaction,
        currency: trackerState.currency,
        theme: trackerState.theme,
        changeSettings: changeSettings,
    }

    return <TrackerContext.Provider value={ctxValue}>{children}</TrackerContext.Provider>;
}