import { useState, useMemo, useCallback } from "react";
import { PlayHistoryProps } from "../type";
import { ToggleOrder } from "./components/ToggleOrder";

export function PlayHistory({
  history,
  jumpTo,
}: PlayHistoryProps): JSX.Element {
  const [ascending, setAscending] = useState<boolean>(true);

  const changeOrder = useCallback(setAscending, [setAscending]);

  const playHistory = useMemo(() => {
    const newPlayHistory = history.map((_, i) => {
      let description;
      if (i === 0) {
        description = "Go to game start";
      } else if (i === history.length - 1) {
        return <p key={i}>▶︎You're at move #{i}</p>;
      } else {
        description = "Go to move #" + i;
      }

      return (
        <li key={i}>
          <button onClick={() => jumpTo(i)}>{description}</button>
        </li>
      );
    });

    return ascending ? newPlayHistory : newPlayHistory.reverse();
  }, [history, jumpTo, ascending]);

  return (
    <>
      <ToggleOrder ascending={ascending} changeOrder={changeOrder} />
      <ul>{playHistory}</ul>
    </>
  );
}
