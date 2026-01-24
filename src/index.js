import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const Square = (props) => {
  return (
    <button 
    className="square"
    onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  ); 
};

const Board = ({onWin}) => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerReported, setWinnerReported] = useState(false);

  const handleClickEvent = (i) => {
    if (calculateWinner(squares) || squares[i]) {
    return;
    }
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X': 'O';
  
    setSquares(newSquares);
    setXIsNext(!xIsNext);
};

const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinnerReported(false);
  };
  

  const renderSquare = (i) => {
    return (
      <Square 
      value={squares[i]} 
      onClickEvent={() => handleClickEvent(i)}
      />
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?

  `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
   
  //report winner ONCE
  if (winner && !winnerReported) {
    onWin(winner);
    setWinnerReported(true);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
      <button className="reset-btn" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
};

const Game = () => {

  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  const handleWin = (winner) => {
    if (winner === 'X') {
      setXScore(prev => prev + 1);
    } else if (winner === 'O') {
      setOScore(prev => prev + 1);
    }
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>

      <div className="scoreboard">
        <span>X: {xScore}</span>
        <span>O: {oScore}</span>
      </div>
      <Board onWin={handleWin} />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' or 'O'
    }
  }

  return null;
}