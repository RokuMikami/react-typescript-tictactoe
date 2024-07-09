import { BoardProps } from "../../types/type";
import { Square } from "../Square/components/App";
import { calculateWinner } from "../../models/model";

export function Board({ xIsNext, board, onPlay }: BoardProps): JSX.Element {
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
