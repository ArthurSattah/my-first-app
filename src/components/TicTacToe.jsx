import Board from "./Board";
import GameOver from "./GameOver";
import { useState , useEffect} from "react";
import Tile from "./Tile";
import GameState from "./GameState";
import Reset from "./Reset";
import clickSound from "../sounds/clickSound.mp3"
import gameOverSound from "../sounds/gameOverSound.mp3"

const PLAYER_X = "X";
const PLAYER_O = "O";
const GameOverSound = new Audio(gameOverSound);
GameOverSound.volume=0.5;
const ClickSound = new Audio(clickSound);
ClickSound.volume=0.2;
const winnerCombo =[
    {combo:[0,1,2] , strike:"strike-row-1"},
    {combo:[3,4,5] , strike:"strike-row-2"},
    {combo:[6,7,8] , strike:"strike-row-3"},
    {combo:[0,3,6] , strike:"strike-column-1"},
    {combo:[1,4,7] , strike:"strike-column-2"},
    {combo:[2,5,8] , strike:"strike-column-3"},
    {combo:[0,4,8] , strike:"strike-diagonal-1"},
    {combo:[2,4,6] , strike:"strike-diagonal-2"}
];
function checkWinner(tiles,setStrikeType,setGameState) {
    for (const {combo ,strike} of winnerCombo)
    {
        const val1=tiles[combo[0]];
        const val2=tiles[combo[1]];
        const val3=tiles[combo[2]];
        if(val1!=null && val1==val2 && val2==val3)
        {
            setStrikeType(strike);
            if(val1==PLAYER_X)
                setGameState(GameState.xWin);
            else
                setGameState(GameState.oWin);
            return ;
        }
    }

    const allGood= tiles.every((tile)=>tile!=null);
    if(allGood)
        setGameState(GameState.draw);
}
function TicTacToe() {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeType, setStrikeType] = useState();
    const [gameState, setGameState] = useState(GameState.inProgres);
    const handleTileClick = (index) => {
        if(gameState !=GameState.inProgres)
            return;
        if (tiles[index] != null)
            return;
        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        if (playerTurn == PLAYER_X) 
            setPlayerTurn(PLAYER_O);
        else 
            setPlayerTurn(PLAYER_X);
        setTiles(newTiles);
    };
    const handleResetClick=()=>{
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeType();
        setGameState(GameState.inProgres);
    }
    useEffect(()=>{
        checkWinner(tiles,setStrikeType,setGameState);
    },[tiles]);

    useEffect(()=>{
        if(tiles.some((tile)=>tile!=null))
            ClickSound.play();
    },[tiles]);

    useEffect(()=>{
        if(gameState!=GameState.inProgres)
            GameOverSound.play();
    },[gameState]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board
                tiles={tiles}
                onTileClick={handleTileClick}
                playerTurn={playerTurn}
                strikeType={strikeType}
            />
            <GameOver gameState={gameState}/>
            <Reset gameState={gameState} onReset={handleResetClick}/>
        </div>
    );
}

export default TicTacToe;
