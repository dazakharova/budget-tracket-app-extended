import { useRef } from 'react'
import SettingsDialog from './SettingsDialog'

const Settings = () => {
  const dialog = useRef()

  const handleClick = () => {
    dialog.current.open()
  }

  return (
      <div>
        <SettingsDialog ref={dialog} />
        <button onClick={handleClick}>Settings</button>
      </div>
  )
}

export default Settings;