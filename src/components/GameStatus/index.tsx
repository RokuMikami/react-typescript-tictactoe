import { useState, useEffect } from "react";
import { GameStatusProps } from "../../type";
import { checkNullSquareExist } from "../../model";

export function GameStatus({
  board,
  xIsNext,
  existWinner,
}: GameStatusProps): JSX.Element {
  const [gameStatus, setGameStatus] = useState<string>("");

  useEffect(() => {
    const newGameStatus = () => {
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

    setGameStatus(newGameStatus());
  }, [board, xIsNext, existWinner]);

  return (
    <>
      <div className="gameStatus">{gameStatus}</div>
    </>
  );
}
