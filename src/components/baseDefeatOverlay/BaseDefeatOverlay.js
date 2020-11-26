import './BaseDefeatOverlay.css'

function BaseDefeatOverlay(props){
    const onClickPlay = () => {
        props.onAction(true)
    }

    const onClickExit = () => {
        props.onAction(false)
    }
    if(props.isVisible){
        return (
            <div className="defeat-container">
                <h1>Defeat!!!</h1>
                <button onClick = {onClickPlay}>Play Again</button>
                <button onClick = {onClickExit}>Exit</button>
            </div>
        )
    }
    else{
        return null
    }
}

export default BaseDefeatOverlay