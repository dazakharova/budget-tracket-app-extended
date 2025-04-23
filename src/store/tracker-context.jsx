import {createContext, useEffect, useReducer} from 'react'

export const TrackerContext = createContext({
    transactions: [],
    saldo: 0,
    addTransaction: () => {},
    removeTransaction: () => {},
    currency: '',
    theme: '',
    changeSettings: () => {},
})

const trackerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TRANSACTION': {
            const newTransaction = {
                id: action.payload.id,
                type: action.payload.type,
                description: action.payload.description,
                sum: action.payload.sum,
                category: action.payload.category,
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
            const newSaldo = state.transactions.map((item) => parseFloat(item.sum)).reduce((acc, curr) => acc + curr, 0);
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
                    GBP: 0.85,
                }

                const rateFrom = currencyRates[state.currency]
                const rateTo = currencyRates[action.payload.newCurrency]

                const conversionRate = rateTo / rateFrom

                updatedTransactions = state.transactions.map((transaction) => {
                    const convertedSum = (parseFloat(transaction.sum) * conversionRate).toFixed(2).toString()
                    return {
                        ...transaction,
                        sum: convertedSum,
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


    const addTransaction = (transaction) => {
        trackerDispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction,
        })
    }

    const removeTransaction = (id) => {
        trackerDispatch({
            type: 'REMOVE_TRANSACTION',
            payload: { id }
        })
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

    useEffect(() => {
        if (trackerState.transactions) {
            calculateSaldo(trackerState.transactions);
        }
    }, [trackerState.transactions])

    const ctxValue = {
        transactions: trackerState.transactions,
        saldo: trackerState.saldo,
        addTransaction: addTransaction,
        removeTransaction: removeTransaction,
        currency: trackerState.currency,
        theme: trackerState.theme,
        changeSettings: changeSettings,
    }

    return <TrackerContext.Provider value={ctxValue}>{children}</TrackerContext.Provider>;
}