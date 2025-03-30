import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TrackerContextProvider, {TrackerContext} from './store/tracker-context.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <TrackerContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </TrackerContextProvider>,
)
