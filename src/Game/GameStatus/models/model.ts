export function checkNullSquareExist(Board: string[][]): boolean {
  let isNullSquareExist = false;
  Board.forEach((nthRow) => {
    nthRow.forEach((nthSquare) => {
      if (!nthSquare) {
        isNullSquareExist = true;
      }
    });
  });

  return isNullSquareExist;
}
