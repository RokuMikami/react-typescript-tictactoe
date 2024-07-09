import { useState, useEffect } from "react";
import { GameStatusProps } from "../../../type";
import { calculateWinner } from "../../models/model";

export function GameStatus({ board, xIsNext }: GameStatusProps): JSX.Element {
  const existWinner = calculateWinner(board);
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

    setGameStatus(newGameStatus);
  }, [board, xIsNext]);

  return (
    <>
      <div className="gameStatus">{gameStatus}</div>
    </>
  );
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
