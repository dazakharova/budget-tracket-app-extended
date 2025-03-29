import {useImperativeHandle, useRef, useState} from 'react'

const SettingsDialog = ({ ref }) => {
  const dialog = useRef()

  const [currency, setCurrency] = useState('EUR')
  const [theme, setTheme] = useState('light')

  const currencyOptions = ['EUR', 'USD', 'GBP']
  const themeOptions = ['light', 'dark']

  const initialCurrency = 'EUR'
  const initialTheme = 'light'

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      }
    }
  })

  const handleRevert = () => {
    setCurrency(initialCurrency)
    setTheme(initialTheme)
    dialog.current.close()
  }

  const handleSave = () => {
    dialog.current.close()
  }

  return (
    <dialog ref={dialog}>
      <div className="settings">
        <h3>Settings</h3>
        <div>
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <form method='dialog'>
          <button className="settings-buttons" type='button' onClick={handleSave}>Save</button>
          <button className="settings-buttons" type='button' onClick={handleRevert}>Revert to initial</button>
        </form>
      </div>
    </dialog>
  )
}

export default SettingsDialog