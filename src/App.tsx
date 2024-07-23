import { useState, useMemo, useCallback } from "react";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { PlayHistory } from "./components/PlayHistory";
import type { History,BoardType } from "./components/type";
import { calculateWinner }from "./components/model";
import { checkNullSquareExist } from "./components/GameStatus/model";

export default function Game(): JSX.Element {
  const [playHistory, setPlayHistory] = useState<History>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentPlayHistoryIndex, setCurrentPlayHistoryIndex] =
    useState<number>(0);

  const jumpTo: (index: number) => void = useCallback(
    (index: number) => setCurrentPlayHistoryIndex(index),
    []
  );

  const xIsNext: boolean = useMemo(
    () => currentPlayHistoryIndex % 2 === 0,
    [currentPlayHistoryIndex]
  );

  const currentBoard: BoardType = useMemo(
    () => playHistory[currentPlayHistoryIndex],
    [playHistory, currentPlayHistoryIndex]
  );

  const existWinner: number[][] | null = useMemo(
    () => calculateWinner(currentBoard),
    [currentBoard]
  );

  const isNullSquareExist: boolean = useMemo(
    () => checkNullSquareExist(currentBoard),
    [currentBoard]
  );

  const handlePlayHistory = useCallback(
    function handlePlayHistory(latestBoard: BoardType): void {
      setPlayHistory((prevPlayHistory) => {
        const newPlayHistory: History = [
          ...prevPlayHistory.slice(0, currentPlayHistoryIndex + 1),
          latestBoard,
        ];
        return newPlayHistory;
      });
      setCurrentPlayHistoryIndex((prevIndex) => prevIndex + 1);
    },
    [currentPlayHistoryIndex]
  );

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus
          board={currentBoard}
          xIsNext={xIsNext}
          existWinner={existWinner}
          isNullSquareExist={isNullSquareExist}
        />
        <Board
          xIsNext={xIsNext}
          board={currentBoard}
          onPlay={handlePlayHistory}
          existWinner={existWinner}
        />
      </div>
      <div className="game-info">
        <PlayHistory history={playHistory} jumpTo={jumpTo} />
      </div>
    </div>
  );
}
