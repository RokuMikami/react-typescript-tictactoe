import { GameStatusProps } from "../../type";

export const GameStatus = function GameStatus({
  xIsNext,
  existWinner,
  isNullSquareExist,
}: GameStatusProps): JSX.Element {
  const winner: string = xIsNext ? "O" : "X";
  const nextPlayer: string = xIsNext ? "X" : "O";

  return (
    <div className="gameStatus">
      {existWinner
        ? "Winner: " + winner
        : isNullSquareExist
          ? "Next player: " + nextPlayer
          : "No Winner, No Loser"}
    </div>
  );
};
