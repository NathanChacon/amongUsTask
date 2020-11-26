import './BaseVictoryOverlay.css'

function BaseVictoryOverlay(props){
    const onClickPlay = () => {
        props.onAction(true)
    }
    if(props.isVisible){
        return (
            <div className="victory-container">
                <h1>VICTORY!!!</h1>
                <button onClick = {onClickPlay}>Play Again</button>
            </div>
        )
    }
    else{
        return null
    }
}

export default BaseVictoryOverlay