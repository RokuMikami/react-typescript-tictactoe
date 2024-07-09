import { useState } from "react";
import { Board } from "./Board/components/App";
import { GameStatus } from "./GameStatus/components/App";
import { PlayHistory } from "./PlayHistory/components/App";

export default function Game(): JSX.Element {
  const [playHistory, setPlayHistory] = useState<string[][][]>([
    Array.from({ length: 3 }, () => Array(3).fill(null)),
  ]);
  const [currentPlayHistoryIndex, setCurrentPlayHistoryIndex] =
    useState<number>(0);

  const xIsNext: boolean = currentPlayHistoryIndex % 2 === 0;
  const currentBoard: string[][] = playHistory[currentPlayHistoryIndex];

  function handlePlayHistory(latestBoard: string[][]): void {
    const newPlayHistory: string[][][] = [
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
