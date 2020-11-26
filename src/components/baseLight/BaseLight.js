import './BaseLight.css'
import React, { useEffect, useState } from 'react';

function BaseLight(props){
    const [activated, setActivated] = useState(props.activated)

    useEffect(() => {
        setActivated(props.activated)
    }, [props.activated])

    return(
        <div className={activated ? 'circle is-enabled' : 'circle is-disabled'}>
        </div>
    )
}

export default BaseLight