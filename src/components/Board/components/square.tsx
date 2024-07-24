import { SquareProps } from "../../type";

export function Square({
  value,
  onSquareClick,
  isWinner,
}: SquareProps): JSX.Element {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={
        isWinner ? { backgroundColor: "pink" } : { backgroundColor: "white" }
      }
    >
      {value}
    </button>
  );
}
