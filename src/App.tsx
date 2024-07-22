import { useState, useMemo } from "react";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { PlayHistory } from "./components/PlayHistory";
import type { History, BoardType } from "./type";
import { calculateWinner } from "./components/model";

export default function Game(): JSX.Element {
  const [playHistory, setPlayHistory] = useState<History>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentPlayHistoryIndex, setCurrentPlayHistoryIndex] =
    useState<number>(0);

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

  function handlePlayHistory(latestBoard: BoardType): void {
    setPlayHistory((prevPlayHistory) => {
      const newPlayHistory: History = [
        ...prevPlayHistory.slice(0, currentPlayHistoryIndex + 1),
        latestBoard,
      ];
      return newPlayHistory;
    });
    setCurrentPlayHistoryIndex((prevIndex) => prevIndex + 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus
          board={currentBoard}
          xIsNext={xIsNext}
          existWinner={existWinner}
        />
        <Board
          xIsNext={xIsNext}
          board={currentBoard}
          onPlay={handlePlayHistory}
          existWinner={existWinner}
        />
      </div>
      <div className="game-info">
        <PlayHistory
          history={playHistory}
          jumpTo={setCurrentPlayHistoryIndex}
        />
      </div>
    </div>
  );
}
