import GameState from "./GameState";
function GameOver({gameState}) {
    console.log(gameState);
    console.log()
    switch(gameState){
        case GameState.xWin:
            return <div className="game-over">X Win</div>;
        case GameState.oWin:
            return <div className="game-over">O Win</div>
        case GameState.draw:
            return <div className="game-over">Draw</div>;
        default:
            return <></>;
    }
}

export default GameOver;