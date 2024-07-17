export interface SquareProps {
  value: string;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  isWinner: boolean|null;
}

export interface GameStatusProps {
  board: string[][];
  xIsNext: boolean;
}

export type BoardType = string[][];

export interface BoardProps extends GameStatusProps {
  onPlay: (board: string[][]) => void;
}

export type History = string[][][];

export interface PlayHistoryProps {
  history: History;
  jumpTo: (move: number) => void;
}

export interface ToggleOrderProps {
  ascending: boolean;
  setAscending: React.Dispatch<React.SetStateAction<boolean>>;
  playHistory: JSX.Element[];
  setPlayHistory: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}
