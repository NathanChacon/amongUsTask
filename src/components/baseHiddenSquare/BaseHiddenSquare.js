import './BaseHiddenSquare.css'
import React, { useEffect, useState } from 'react';
function BaseHiddenSquare(props){
    const [activated, setActivated] = useState(props.activated)
    useEffect(() => {
        setActivated(props.activated)
    }, [props.activated])
    return (
        <div className = {activated ? 'square isActivated' : 'square isNormal'}>
        </div>
    )
}

export default BaseHiddenSquare