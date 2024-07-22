export interface SquareProps {
  value: string;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  isWinner: boolean | null;
}

export interface GameStatusProps {
  board: string[][];
  xIsNext: boolean;
  existWinner: number[][] | null;
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
}
