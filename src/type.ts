export interface SquareProps {
  value: string;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  style: React.CSSProperties;
}

export interface GameStatusProps {
  board: string[][];
  xIsNext: boolean;
}

export interface BoardProps extends GameStatusProps {
  onPlay: (board: string[][]) => void;
}

export interface PlayHistoryProps {
  history: string[][][];
  jumpTo: (move: number) => void;
}

export interface ToggleOrderProps {
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
  playHistory: JSX.Element[];
  setPlayHistory: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}
