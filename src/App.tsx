import { useEffect, useState } from "react";
import { PlayHistoryProps, ToggleOrderProps } from "./type";

import { Board } from "./Game/Board/components/App";

import { GameStatus } from "./Game/GameStatus/components/App";

function PlayHistory({ history, jumpTo }: PlayHistoryProps): JSX.Element {
  const [playHistory, setPlayHistory] = useState<JSX.Element[]>([]);
  const [ascending, setAscending] = useState<boolean>(true);

  useEffect(() => {
    const newPlayHistory = history.map((_, i) => {
      let description;
      if (i === 0) {
        description = "Go to game start";
      } else if (i === history.length - 1) {
        return <p>▶︎You're at move #{i}</p>;
      } else {
        description = "Go to move #" + i;
      }

      return (
        <li key={i}>
          <button onClick={() => jumpTo(i)}>{description}</button>
        </li>
      );
    });

    if (ascending) {
      setPlayHistory(newPlayHistory);
    } else {
      setPlayHistory(newPlayHistory.reverse());
    }
  }, [history, jumpTo]);

  return (
    <>
      <ToggleOrder
        ascending={ascending}
        setAscending={setAscending}
        playHistory={playHistory}
        setPlayHistory={setPlayHistory}
      />
      <ul>{playHistory}</ul>
    </>
  );
}

function ToggleOrder({
  ascending,
  setAscending,
  playHistory,
  setPlayHistory,
}: ToggleOrderProps) {
  const [order, setOrder] = useState<string>("手順:昇順");

  function handleOrder(): void {
    const newOrder = !ascending;
    setAscending(newOrder);

    if (newOrder) {
      setOrder("手順:昇順");
    } else {
      setOrder("手順:降順");
    }

    const newPlayHistory = playHistory.slice().reverse();
    setPlayHistory(newPlayHistory);
  }

  return <button onClick={() => handleOrder()}>{order}</button>;
}

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
