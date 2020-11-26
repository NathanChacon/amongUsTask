import './BaseReactorOutput.css'
import BaseHiddenSquare from '../baseHiddenSquare/BaseHiddenSquare.js'
import BaseLight from '../baseLight/BaseLight.js'
import React, { useEffect, useState } from 'react';

function BaseReactorOutput(props){
    const [squares, setSquares] = useState(props.squares)
    const [lights, setLights] = useState(props.lights)

    useEffect(() => {
    }, [props.squares])
    return (
        <div className="output-container">
            <div className="lights-container">
                {lights.map((light, index) => {
                    return <BaseLight key={index} activated = {light.activated}></BaseLight>
                })}
            </div>
            <div className="output-screen">
                {squares.map((square, index) => {
                  return <BaseHiddenSquare key={index} activated = {square.activated}></BaseHiddenSquare>
                })}
            </div>
        </div>
    )
}

export default BaseReactorOutput