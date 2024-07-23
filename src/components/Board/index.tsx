import { BoardProps } from "../type";
import { Square } from "./components/square";

export function Board({
  xIsNext,
  board,
  onPlay,
  existWinner,
}: BoardProps): JSX.Element {
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

  return (
    <>
      {board.map((_, i) => (
        <div key={i} className="board-row">
          {board[i].map((square, j) => {
            const keyIndex = j + i * 3;
            const isWinnersSquare =
              existWinner &&
              existWinner.some((elem) => elem[0] === i && elem[1] === j);

            return (
              <Square
                key={keyIndex}
                value={square}
                onSquareClick={() => handleClick(i, j)}
                isWinner={isWinnersSquare}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
