import { ToggleOrderProps } from "../../../type";

export function ToggleOrder({
  ascending,
  setAscending,
  setPlayHistory,
}: ToggleOrderProps) {
  function handleOrder(): void {
    setAscending((prevAscending) => !prevAscending);
    setPlayHistory((prevPlayHistory) => prevPlayHistory.slice().reverse());
  }

  return (
    <button onClick={handleOrder}>
      {ascending ? "手順:昇順" : "手順:降順"}
    </button>
  );
}
