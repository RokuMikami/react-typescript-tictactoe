import { ToggleOrderProps } from "../../../type";

export function ToggleOrder({
  ascending,
  changeOrder,
}: ToggleOrderProps) {
  function handleOrder(): void {
    changeOrder((prevAscending) => !prevAscending);
  }

  return (
    <button onClick={handleOrder}>
      {ascending ? "手順:昇順" : "手順:降順"}
    </button>
  );
}
