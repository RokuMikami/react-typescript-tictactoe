import { useEffect, useState } from "react";
import {
  SquareProps,
  BoardProps,
  GameStatusProps,
  PlayHistoryProps,
  ToggleOrderProps,
} from "./type";

function Square({ value, onSquareClick, style }: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
}

function Board({ xIsNext, board, onPlay }: BoardProps): JSX.Element {
  const existWinner: number[][] | null = calculateWinner(board);

  function handleClick(i: number, j: number): void {
    if (board[i][j] || existWinner) {
      return;
    }
    const newBoard = board.map((row) => row.slice());
    if (xIsNext) {
      newBoard[i][j] = "X";
    } else {
      newBoard[i][j] = "O";
    }
    onPlay(newBoard);
  }

  const boardRows = Array.from({ length: 3 });

  return (
    <>
      {boardRows.map((_, i) => (
        <div key={i} className="board-row">
          {board[i].map((square, j) => {
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

function GameStatus({ board, xIsNext }: GameStatusProps): JSX.Element {
  const existWinner = calculateWinner(board);

  const gameStatus: () => string = () => {
    if (existWinner) {
      return "Winner: " + board[existWinner[0][0]][existWinner[0][1]];
    } else {
      const isNullSquareExist = checkNullSquareExist(board);
      if (isNullSquareExist) {
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

function PlayHistory({ history, jumpTo }: PlayHistoryProps): JSX.Element {
  const [playHistory, setPlayHistory] = useState<JSX.Element[]>([]);
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    const newPlayHistory = history.map((_, i) => {
      let description;
      if (i === 0) {
        description = "Go to game start";
      } else if (i === history.length - 1) {
        return <p>▶︎You're at move #{i}</p>;
      } else {
        description = "Go to move #" + i;
      }

      return (
        <li key={i}>
          <button onClick={() => jumpTo(i)}>{description}</button>
        </li>
      );
    });

    if (ascending) {
      setPlayHistory(newPlayHistory);
    } else {
      setPlayHistory(newPlayHistory.reverse());
    }
  }, [history, jumpTo]);

  return (
    <>
      <ToggleOrder
        ascending={ascending}
        setAscending={setAscending}
        playHistory={playHistory}
        setPlayHistory={setPlayHistory}
      />
      <ul>{playHistory}</ul>
    </>
  );
}

function ToggleOrder({
  ascending,
  setAscending,
  playHistory,
  setPlayHistory,
}: ToggleOrderProps) {
  const [order, setOrder] = useState<string>("手順:昇順");

  function handleOrder(): void {
    const newOrder = !ascending;
    setAscending(newOrder);

    if (newOrder) {
      setOrder("手順:昇順");
    } else {
      setOrder("手順:降順");
    }

    const newPlayHistory = playHistory.slice().reverse();
    setPlayHistory(newPlayHistory);
  }

  return <button onClick={() => handleOrder()}>{order}</button>;
}

export default function Game(): JSX.Element {
  const [playHistory, setPlayHistory] = useState<string[][][]>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentPlayHistoryIndex, setCurrentPlayHistoryIndex] =
    useState<number>(0);

  const xIsNext: boolean = currentPlayHistoryIndex % 2 === 0;
  const currentBoard: string[][] = playHistory[currentPlayHistoryIndex];

  function handlePlayHistory(latestBoard: string[][]): void {
    const newPlayHistory: string[][][] = [
      ...playHistory.slice(0, currentPlayHistoryIndex + 1),
      latestBoard,
    ];
    setPlayHistory(newPlayHistory);
    setCurrentPlayHistoryIndex(newPlayHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus board={currentBoard} xIsNext={xIsNext} />
        <Board
          xIsNext={xIsNext}
          board={currentBoard}
          onPlay={handlePlayHistory}
        />
      </div>
      <div className="game-info">
        <PlayHistory
          history={playHistory}
          jumpTo={setCurrentPlayHistoryIndex}
        />
      </div>
    </div>
  );
}

function calculateWinner(board: string[][]): number[][] | null {
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
      board[a][x] &&
      board[a][x] === board[b][y] &&
      board[a][x] === board[c][z]
    ) {
      return lines[i];
    }
  }
  return null;
}

function checkNullSquareExist(Board: string[][]): boolean {
  let isNullSquareExist = false;
  Board.forEach((nthRow) => {
    nthRow.forEach((nthSquare) => {
      if (!nthSquare) {
        isNullSquareExist = true;
      }
    });
  });

  return isNullSquareExist;
}
