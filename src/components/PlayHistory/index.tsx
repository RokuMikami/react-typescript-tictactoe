import { useState, useEffect } from "react";
import { PlayHistoryProps } from "../../type";
import { ToggleOrder } from "./components/ToggleOrder";

export function PlayHistory({
  history,
  jumpTo,
}: PlayHistoryProps): JSX.Element {
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

    setPlayHistory(ascending ? newPlayHistory : newPlayHistory.reverse());
  }, [history, jumpTo, ascending]);

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
