import { useState } from "react";

function Square({ value, onSquareClick, style }) {
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);

  function handleClick(i, j) {
    if (squares[i][j] || winner) {
      return;
    }
    const nextSquares = squares.map((square) => square.slice());
    if (xIsNext) {
      nextSquares[i][j] = "X";
    } else {
      nextSquares[i][j] = "O";
    }
    onPlay(nextSquares);
  }

  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="board-row">
          {squares[i].map((square, j) => {
            const keyIndex = j + i * 3;
            const isWinner =
              winner && winner.some((elem) => elem[0] === i && elem[1] === j);
            const squareStyle = isWinner ? { backgroundColor: "pink" } : {};

            return (
              <Square
                key={keyIndex}
                value={square}
                onSquareClick={() => handleClick(i, j)}
                style={squareStyle}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

function GameStatus({ squares, xIsNext }) {
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + squares[winner[0][0]][winner[0][1]];
  } else {
    const squaresLength = squares.reduce((total, row) => {
      return (
        total +
        row.reduce((rowTotal, item) => {
          return rowTotal + (item === null ? 1 : 0);
        }, 0)
      );
    }, 0);
    if (squaresLength > 0) {
      status = "Next player: " + (xIsNext ? "X" : "O");
    } else {
      status = "No Winner, No Loser";
    }
  }

  return (
    <>
      <div className="status">{status}</div>
    </>
  );
}

function Moves({ history, ascending, jumpTo }) {
  const arr = history.map((_, move) => {
    let description;

    if (move > 0) {
      if (move === history.length - 1) {
        return "You are at move #" + move;
      }
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const moves = arr.map((element, i) => {
    if (ascending) {
      return element;
    } else {
      return arr[arr.length - 1 - i];
    }
  });

  return <ul>{moves}</ul>;
}

export default function Game() {
  const [history, setHistory] = useState([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [ascending, setAscending] = useState(true);
  const [order, setOrder] = useState("手順:昇順");

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleOrder() {
    const newOrder = !ascending;
    setAscending(newOrder);

    if (newOrder) {
      setOrder("手順:昇順");
    } else {
      setOrder("手順:降順");
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus squares={currentSquares} xIsNext={xIsNext} />
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleOrder}>{order}</button>
        <Moves history={history} ascending={ascending} jumpTo={jumpTo} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [[a, x], [b, y], [c, z]] = lines[i];
    if (
      squares[a][x] &&
      squares[a][x] === squares[b][y] &&
      squares[a][x] === squares[c][z]
    ) {
      return lines[i];
    }
  }
  return null;
}
