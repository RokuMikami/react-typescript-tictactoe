import { SquareProps } from "../../../../types";

export function Square({
  value,
  onSquareClick,
  style,
}: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={onSquareClick} style={style}>
      {value}
    </button>
  );
}
