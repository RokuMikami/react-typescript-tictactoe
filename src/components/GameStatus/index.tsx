import { useMemo } from "react";
import { GameStatusProps } from "../../type";

export function GameStatus({
  xIsNext,
  existWinner,
  isNullSquareExist,
}: GameStatusProps): JSX.Element {
  const gameStatus = useMemo(() => {
    if (existWinner) {
      return "Winner: " + (xIsNext ? "O" : "X");
    } else {
      if (isNullSquareExist) {
        return "Next player: " + (xIsNext ? "X" : "O");
      } else {
        return "No Winner, No Loser";
      }
    }
  }, [existWinner, xIsNext, isNullSquareExist]);

  return (
    <>
      <div className="gameStatus">{gameStatus}</div>
    </>
  );
}
