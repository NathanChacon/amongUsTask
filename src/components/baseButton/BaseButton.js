import './BaseButton.css'
import React, { useEffect, useState } from 'react';
function BaseButton(props){
    const [disabled, setDisabled] = useState(props.disabled)
    const [defeat, setDefeat] = useState(props.defeat)
    
    useEffect(() => {
        setDisabled(props.disabled)
        setDefeat(props.defeat)
    }, [props.disabled, props.defeat])

    const handleClick = (event) => {
        props.handleClick(props.value)
    }

    return (
        <button className={`basic-button ${disabled ? 'basic-btn-disabled' : ''}  ${defeat ? 'basic-btn-defeat' : ''} `} onClick={handleClick}>
        </button>
    )
}

export default BaseButton