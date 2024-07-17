import { useState } from "react";
import { Board } from "./components/Board";
import { GameStatus } from "./components/GameStatus";
import { PlayHistory } from "./components/PlayHistory";
import type { History, BoardType } from "./type";

export default function Game(): JSX.Element {
  const [playHistory, setPlayHistory] = useState<History>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentPlayHistoryIndex, setCurrentPlayHistoryIndex] =
    useState<number>(0);

  const xIsNext: boolean = currentPlayHistoryIndex % 2 === 0;
  const currentBoard: BoardType = playHistory[currentPlayHistoryIndex];

  function handlePlayHistory(latestBoard: BoardType): void {
    const newPlayHistory: History = [
      ...playHistory.slice(0, currentPlayHistoryIndex + 1),
      latestBoard,
    ];
    setPlayHistory(newPlayHistory);
    setCurrentPlayHistoryIndex(newPlayHistory.length - 1);
  }

  return (
    <div className="game">
      <div className="game-board">
        <GameStatus board={currentBoard} xIsNext={xIsNext} />
        <Board
          xIsNext={xIsNext}
          board={currentBoard}
          onPlay={handlePlayHistory}
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
