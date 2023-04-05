import { useEffect, useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Game() {
  const [clickCount, setClickCount] = useState(0);
  const [time, setTime] = useState(5);
  const [gameOver, setGameOver] = useState(true);

  useEffect(()=>{
    let intervalID;

    console.log("Start Timer")
    if(!gameOver && time > 0){
      intervalID = setInterval(()=>{
        console.log("One second", time)
        setTime((currentTime)=>{
          if(currentTime === 0) {
            setGameOver(true)
            return 0
          };
          return currentTime - 1
        })
      }, 1000)
    }

    if(time === 0){
      console.log("Game Over End of Timer")
      setGameOver(true)
      clearInterval(intervalID)
    }

    
  }, [gameOver])

  const resetClick = () =>{
    setClickCount(0)
    setGameOver(false)
    setTime(5);
  }

  return (
    <div>
      <h1>Click Attack!</h1>
      <Stats time={time} clickCount={clickCount} />

      <GameContainer time={time} gameOver={gameOver} resetGame={resetClick} setClickCount={setClickCount} />
    </div>
  )
}

function GameContainer({time, gameOver, resetGame, setClickCount}){
  return (
    <div className="game-container">
      
      <ClickyButton gameOver={gameOver} resetGame={resetGame} time={time} setClickCount={setClickCount} />

      <button onClick={()=>{
        console.log(gameOver)
        resetGame();
      }}>Reset Game</button>
    </div>
  )
}

function Stats({time, clickCount}){
  return (
    <div className="stats">
      <p>Time Left: {time} Seconds</p>
      <p>Click Count: {clickCount}</p>  
    </div>
  )
}

function ClickyButton({gameOver, resetGame, time, setClickCount}){
  // clickcount 
  
  let text;
  
  if(!gameOver && time > 0){
    text = "Click Click Click"
  } else if(gameOver && time === 0){
    text= "Game Over"
  } else {
    text = "Click here to start!"
  }

  return (
    <div className="button" onClick={()=>{
      if(!gameOver && time > 0){
        setClickCount((currentCount)=>{
          return currentCount + 1;
        })
      } else {
        resetGame()
      }
    }}>
      <p>{text}</p>
    </div>
  )
}
export default App;
