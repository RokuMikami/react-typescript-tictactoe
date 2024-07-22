export interface SquareProps {
  value: string;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  isWinner: boolean | null;
}

export interface GameStatusProps {
  board: string[][];
  xIsNext: boolean;
  existWinner: number[][] | null;
  isNullSquareExist: boolean;
}

export type BoardType = string[][];

export interface BoardProps {
  board: string[][];
  xIsNext: boolean;
  existWinner: number[][] | null;
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
