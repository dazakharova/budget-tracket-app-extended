import { createPortal } from 'react-dom'
import {useImperativeHandle, useRef, forwardRef } from 'react'

const Confirmation = forwardRef(
    function Confirmation({ onConfirm }, ref) {
        const dialog = useRef()
    
        const handleYesClick = (event) => {
            event.preventDefault()

            onConfirm()
            console.log('typed yes')

            dialog.current.close()
        }

        const handleNoClick = (event) => {
            event.preventDefault()

            dialog.current.close()
        }
    
        useImperativeHandle(ref, () => {
            return {
              open() {
                dialog.current.showModal()
              }
            }
          })
    
        return createPortal(
            <dialog className="confirmation" ref={dialog}>
                <h2>Are you sure you want to delete this item?</h2>
                <form method='dialog'>
                    <button className="confirmation-buttons" type='button' onClick={handleYesClick}>Yes</button>
                    <button className="confirmation-buttons" type='button' onClick={handleNoClick}>No</button>
                </form>
            </dialog>,
            document.getElementById('modal')
        )
    }
)

export default Confirmation