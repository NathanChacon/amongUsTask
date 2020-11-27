import './ReactorStarter.css'
import BaseReactorOutput  from '../baseReactorOutput/BaseReactorOutput.js'
import BaseReactorInput  from '../baseReactorInput/BaseReactorInput.js'
import BaseVictoryOverlay from '../baseVictoryOverlay/BaseVictoryOverlay.js'
import buttonAudio from '../../sounds/button.mp3'
import defeat from '../../sounds/defeat.wav'
import React, { useState } from 'react'

function ReactorStarter(){
    const [squares, setSquares] = useState([
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        },
        {   
            activated: false
        }
    ]);

    const [lights, setLights] = useState([
        {
            activated: false
        },
        {
            activated: false
        },
        {
            activated: false
        },
        {
            activated: false
        },
        {
            activated: false
        }
    ])

    const [buttons, setButtons] = useState([0,1,2,3,4,5,6,7,8])

    const [activatedSquares, setActivatedSquares] = useState([])

    const [stepNumber, setStepNumber] = useState(1)

    const [isVictoryOverlayVisible, setIsVictoryOverlayVisible] = useState(false)

    const [isDefeat, setIsDefeat] = useState(false)

    const [isStartDisabled, setIsStartDisabled] = useState(false)

    const [isAnimating, setIsAnimating] = useState(false)

    const [numberOfVictories, setNumberOfVictories] = useState(0)

    const audio = new Audio(buttonAudio);
    const defeatAudio = new Audio(defeat);

    const totalSteps = 5
    let numberOfClicks = 0

    const startOutput = () => {
        setIsStartDisabled(true)
        setLightOn(0)
        setActivatedSquares([...getSquaresToActivate(true)])

        setActivatedSquares(activatedSquares => {
            animateSquares(squares, activatedSquares)
            return activatedSquares
        })
    }

    const animateSquares = (allSquares, activatedSquaresIndexes) => {
        let index = 0
        setIsAnimating(true)

        const interval = setInterval(() => {
            if(index <= activatedSquaresIndexes.length - 1){
                const indexToActivate = activatedSquaresIndexes[index]
                allSquares[indexToActivate].activated = true
                setSquares([...allSquares])
                clearActivatedClass(allSquares, indexToActivate)
                audio.play()
                index ++ 
            }
            else{
                clearInterval(interval)
                setIsAnimating(false)
            }
        }, 1000)
    }

    const clearActivatedClass = (allSquares, indexToClear) => {
        setTimeout(() => {
            allSquares[indexToClear].activated = false
            setSquares([...allSquares])
        }, 800)
    }

    const getSquaresToActivate = (firstStep) => {
        let randomNumbers = []
        if(firstStep){
            for(let i = 2; i > 0; i--){
                const randomNumber = getRandomArbitrary(0, 9)
                randomNumbers.push(randomNumber)
            }
        }
        else {
            randomNumbers = activatedSquares
            const randomNumber = getRandomArbitrary(0, 9)
            randomNumbers.push(randomNumber)
        }

        return randomNumbers
    }

   const getRandomArbitrary = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const handleInputClick = (value) => {
        audio.play()
        if(isStartDisabled){
            if(activatedSquares[numberOfClicks] === value){
                if(numberOfClicks === activatedSquares.length - 1){
                    handleNextSteps()
                }
            }
            else{
                handleDefeat()
            }
    
            numberOfClicks ++
        }
    }

    const handleDefeat = () => {
        clearValues()
        setNumberOfVictories(0)
        setIsStartDisabled(true)
        setIsDefeat(true)
        defeatAudio.play()
        setTimeout(() => {
            setIsDefeat(false)
            setIsStartDisabled(false)
        }, 1000)
    }

    const handleVictory = () => {
        clearValues()
        setNumberOfVictories(number => number + 1)
        setIsVictoryOverlayVisible(true)
    }

    const handleNextSteps = () => {
        if(stepNumber !== totalSteps){
            setStepNumber(stepNumber + 1)
            setActivatedSquares(getSquaresToActivate(false))
            animateSquares(squares, activatedSquares)
            setStepNumber((step) => {
                setLightOn(step - 1)
                return step
            })
        }
        else{
            setStepNumber((step) => {
                setLightOn(step - 1)
                return step
            })
            handleVictory()
        }
    }

    const onClickVictoryOverlay = (value) => {
        if(value){
            setIsStartDisabled(true)
            startOutput()
        }
        else{
            setIsStartDisabled(false)
        }

        setIsVictoryOverlayVisible(false)
    }

    const setLightOn = (lightIndex) => {
        setLights((lights) => {
            lights.forEach((light,index) => {
                if(index === lightIndex){
                    light.activated = true
                }
            })
            return lights
        })
    }

    const clearValues = () => {
        setActivatedSquares([])
        setStepNumber(1)
        setLights(lights => {
            lights.forEach((light) => {
                light.activated = false
            })
            return lights
        })

        numberOfClicks = 0
    }

    return (
        <section className="main-container">
            <span className="number-victories">
                <h1>WINS: {numberOfVictories}</h1>
            </span>
            <button className={isStartDisabled ? 'start-button btn-disabled' : 'start-button'} onClick = {startOutput}>START</button>
            <div className="reactor-panel-container">
                <BaseReactorOutput squares = {squares} lights = {lights}></BaseReactorOutput>
                <BaseReactorInput buttons = {buttons} handleInputClick = {handleInputClick} disableButtons = {isAnimating} defeat = {isDefeat}></BaseReactorInput>
            </div>
            <BaseVictoryOverlay isVisible = {isVictoryOverlayVisible} onAction = {onClickVictoryOverlay}></BaseVictoryOverlay>
        </section>
    )
}

export default ReactorStarter