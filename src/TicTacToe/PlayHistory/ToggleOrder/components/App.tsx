import { useState } from "react";
import { ToggleOrderProps } from "../../../../types";

export function ToggleOrder({
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
