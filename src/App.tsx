import { useState } from "react";
import {
  SquareProps,
  BoardProps,
  GameStatusProps,
  MovesProps,
  OrderProps,
} from "./type";

function Square({ value, onSquareClick, style }: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }: BoardProps): JSX.Element {
  const existWinner: number[][] | null = calculateWinner(squares);

  function handleClick(i: number, j: number): void {
    if (squares[i][j] || existWinner) {
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

  const arr = Array.from({ length: 3 });

  return (
    <>
      {arr.map((_, i) => (
        <div key={i} className="board-row">
          {squares[i].map((square, j) => {
            const keyIndex = j + i * 3;
            const isWinnersSquare =
              existWinner &&
              existWinner.some((elem) => elem[0] === i && elem[1] === j);
            const squareStyle = isWinnersSquare
              ? { backgroundColor: "pink" }
              : {};

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

function GameStatus({ squares, xIsNext }: GameStatusProps): JSX.Element {
  const existWinner = calculateWinner(squares);

  const gameStatus: () => string = () => {
    if (existWinner) {
      return "Winner: " + squares[existWinner[0][0]][existWinner[0][1]];
    } else {
      const isSquaresFilled = calculateSquaresFilled(squares);
      if (isSquaresFilled) {
        return "Next player: " + (xIsNext ? "X" : "O");
      } else {
        return "No Winner, No Loser";
      }
    }
  };

  return (
    <>
      <div className="gameStatus">{gameStatus()}</div>
    </>
  );
}

function Moves({ history, ascending, jumpTo }: MovesProps): JSX.Element {
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

function Order({ order, ascending, setAscending, setOrder }: OrderProps) {
  function handleOrder(): void {
    const newOrder = !ascending;
    setAscending(newOrder);

    if (newOrder) {
      setOrder("手順:昇順");
    } else {
      setOrder("手順:降順");
    }
  }
  return <button onClick={handleOrder}>{order}</button>;
}

function useMove(init: number): [number, (nextMove: number) => void] {
  const [currentMove, setCurrentMove] = useState<number>(init);

  const handleMove = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  return [currentMove, handleMove];
}

export default function Game(): JSX.Element {
  const [history, setHistory] = useState<string[][][]>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentMove, handleMove] = useMove(0);
  const xIsNext: boolean = currentMove % 2 === 0;
  const currentSquares: string[][] = history[currentMove];
  const [ascending, setAscending] = useState<boolean>(true);
  const [order, setOrder] = useState<string>("手順:昇順");

  function handlePlay(nextSquares: string[][]): void {
    const nextHistory: string[][][] = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];
    setHistory(nextHistory);
    handleMove(nextHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus squares={currentSquares} xIsNext={xIsNext} />
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <Order
          order={order}
          ascending={ascending}
          setOrder={setOrder}
          setAscending={setAscending}
        />
        <Moves history={history} ascending={ascending} jumpTo={handleMove} />
      </div>
    </div>
  );
}

function calculateWinner(squares: string[][]): number[][] | null {
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

function calculateSquaresFilled(squares: string[][]): boolean {
  const squaresLength = squares.reduce((total, row) => {
    console.log(squares);
    return (
      total +
      row.reduce((rowTotal, item) => {
        return rowTotal + (item === null ? 1 : 0);
      }, 0)
    );
  }, 0);

  return squaresLength ? true : false;
}
