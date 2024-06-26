export interface SquareProps {
  value: string;
  onSquareClick: React.MouseEventHandler<HTMLButtonElement>;
  style: React.CSSProperties;
}

export interface GameStatusProps {
  squares: string[][];
  xIsNext: boolean;
}

export interface BoardProps extends GameStatusProps {
  onPlay: (squares: string[][]) => void;
}

export interface MovesProps {
  history: string[][][];
  jumpTo: (move: number) => void;
}

export interface OrderProps {
  order: string;
  ascending: boolean;
  setAscending: (bool: boolean) => void;
  setOrder: (str: string) => void;
}
