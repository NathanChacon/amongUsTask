import { useState } from 'react'
import './BaseReactorInput.css'
import BaseButton from '../baseButton/BaseButton.js'
function BaseReactorInput(props){
    const [buttons, setButtons] = useState(props.buttons)
    const handleClick = (value) => {
        props.handleInputClick(value)
    }
    return(
        <div className="input-container">
            <div className="input-buttons-container">
                {buttons.map((index, value) => {
                    return <BaseButton key = {index} value = {value} handleClick ={handleClick} disabled = {props.disableButtons} defeat = {props.defeat}></BaseButton>
                })}
            </div>
        </div>
    )
}

export default BaseReactorInput