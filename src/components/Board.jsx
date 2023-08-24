import React from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board({ squares, history, xIsNext, currentStep, jumpTo, makeMove }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    makeMove(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  const getBoardStyle = (numberOfItemsPerRow) => {
    return {
      width: '102px',
      display: 'grid',
      gridTemplateColumns: `repeat(${numberOfItemsPerRow}, 1fr)`,
    }
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div style={getBoardStyle(Math.floor(Math.sqrt(squares.length)))}>
        {squares.map((square, i) => {
          return (
            <div key={i} className="board-item">
              <Square
                
                value={square}
                onSquareClick={() => handleClick(i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function compareItems(arr) {
  return arr.every((element, index) => element === arr[0] && element !== null);
}
function calculateWinner(squares) {
  let rowArray = Array.from(Array(Math.floor(Math.sqrt(squares.length))).keys());
  let arr = rowArray.map((square, j) => {
    return squares[j * (rowArray.length + 1)]
  })
  if (compareItems(arr))
    return arr[0];

  arr = rowArray.map((square, j) => {
    return squares[((rowArray.length - 1) * j) + (rowArray.length - 1)]
  })
  if (compareItems(arr))
    return arr[0];

  for (let i = 0; i < rowArray.length; i++) {

    arr = rowArray.map((square, j) => {
      return squares[i + j * rowArray.length]
    })
    if (compareItems(arr))
      return arr[0];

    arr = rowArray.map((square, j) => {
      return squares[i * rowArray.length + j]
    })
    if (compareItems(arr))
      return arr[0];
  }

  return null;
}

