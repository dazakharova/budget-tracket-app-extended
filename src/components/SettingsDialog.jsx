import {useContext, useImperativeHandle, useRef, useState} from 'react'
import { TrackerContext } from '../store/tracker-context.jsx'

const SettingsDialog = ({ ref }) => {
  const { currency, theme, changeSettings } = useContext(TrackerContext)
  const dialog = useRef()

  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [selectedTheme, setSelectedTheme] = useState(theme)

  const currencyOptions = ['EUR', 'USD']
  const themeOptions = ['light', 'dark']

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal()
      }
    }
  })

  const handleRevert = () => {
    if (selectedCurrency === currency && selectedTheme === theme) {
      return
    }

    setSelectedCurrency(currency)
    setSelectedTheme(theme)
  }

  const handleSave = () => {
    if (selectedCurrency === currency && selectedTheme === theme) {
      dialog.current.close()
    }

    changeSettings(selectedCurrency, selectedTheme)
    dialog.current.close()
  }

  return (
    <dialog ref={dialog}>
      <div className="settings">
        <h3>Settings</h3>
        <div>
          <label>Currency:</label>
          <select value={selectedCurrency} onChange={e => setSelectedCurrency(e.target.value)}>
            {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Theme:</label>
          <select value={selectedTheme} onChange={e => setSelectedTheme(e.target.value)}>
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