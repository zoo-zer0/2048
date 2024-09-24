//game.tsx
function setGridValue<T>(
  grid: T[][],
  row: number,
  col: number,
  value: T,
): T[][] {
  return grid.map((gridRow, rowIndex) =>
    gridRow.map((cell, colIndex) =>
      rowIndex === row && colIndex === col ? value : cell,
    ),
  );
}
export function initGrid(): number[][] {
  const grid = Array(4)
    .fill(0)
    .map(() => new Array(4).fill(0));
  return generateTwo(generateTwo(grid));
}
export function generateTwo(grid: number[][]): number[][] {
  let emptyCells: [number, number][] = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i]?.[j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length === 0) return grid;
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];
  if (selectedCell) {
    const [row, col] = selectedCell; 
    const newGrid = setGridValue(grid, row, col, 2);

    return newGrid;
  }
  return grid;
}

export function moveDown(grid: number[][]): number[][] {
  let newGrid = grid.map((row) => [...row]);
  let merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let row = 3; row >= 0; row--) {
    for (let col = 0; col < 4; col++) {
      if (newGrid[row]?.[col] === 0) continue;
      let rowa = row;
      while (
        rowa < 3 &&
        newGrid[rowa + 1]?.[col] != null &&
        newGrid[rowa + 1]?.[col] === 0
      ) {
        newGrid = setGridValue(newGrid, rowa + 1, col, newGrid[rowa]?.[col]!);
        newGrid = setGridValue(newGrid, rowa, col, 0);
        rowa++;
      }
      if (
        rowa < 3 &&
        newGrid[rowa + 1]?.[col] === newGrid[rowa]?.[col] &&
        !merged[rowa + 1]?.[col]
      ) {
        newGrid = setGridValue(
          newGrid,
          rowa + 1,
          col,
          newGrid[rowa + 1]?.[col]! * 2,
        ); // Double the value
        newGrid = setGridValue(newGrid, rowa, col, 0); // Clear the current cell
        merged = setGridValue(merged, rowa + 1, col, true);
      }
    }
  }
  return newGrid;
}

export function moveUp(grid: number[][]): number[][] {
  let newGrid = grid.map((row) => [...row]);
  let merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (newGrid[row]?.[col] === 0) continue;
      let rowa = row;
      while (rowa > 0 && newGrid[rowa - 1]?.[col] === 0) {
        newGrid = setGridValue(newGrid, rowa - 1, col, newGrid[rowa]?.[col]!);
        newGrid = setGridValue(newGrid, rowa, col, 0);
        rowa--;
      }
      if (
        rowa > 0 &&
        newGrid[rowa - 1]?.[col] === newGrid[rowa]?.[col] &&
        !merged[rowa - 1]?.[col]
      ) {
        newGrid = setGridValue(
          newGrid,
          rowa - 1,
          col,
          newGrid[rowa - 1]?.[col]! * 2,
        );
        newGrid = setGridValue(newGrid, rowa, col, 0);
        merged = setGridValue(merged, rowa - 1, col, true);
      }
    }
  }
  return newGrid;
}

export function moveRight(grid: number[][]): number[][] {
  let newGrid = grid.map((row) => [...row]);
  let merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let x = 3; x >= 0; x--) {
    for (let y = 0; y < 4; y++) {
      if (newGrid[y]?.[x] === 0) continue;
      let xa = x;
      while (xa < 3 && newGrid[y]?.[xa + 1] === 0) {
        newGrid = setGridValue(newGrid, y, xa + 1, newGrid[y]?.[xa]!);
        newGrid = setGridValue(newGrid, y, xa, 0);
        xa++;
      }
      if (
        xa < 3 &&
        newGrid[y]?.[xa + 1] === newGrid[y]?.[xa] &&
        !merged[y]?.[xa + 1]
      ) {
        newGrid = setGridValue(newGrid, y, xa + 1, newGrid[y]?.[xa + 1]! * 2);
        newGrid = setGridValue(newGrid, y, xa, 0);
        merged = setGridValue(merged, y, xa + 1, true);
      }
    }
  }
  return newGrid;
}

export function moveLeft(grid: number[][]): number[][] {
  let newGrid = grid.map((row) => [...row]);
  let merged = Array.from({ length: 4 }, () => Array(4).fill(false));

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (newGrid[y]?.[x] === 0) continue;
      let xa = x;
      while (xa > 0 && newGrid[y]?.[xa - 1] === 0) {
        newGrid = setGridValue(newGrid, y, xa - 1, newGrid[y]?.[xa]!);
        newGrid = setGridValue(newGrid, y, xa, 0);
        xa--;
      }
      if (
        xa > 0 &&
        newGrid[y]?.[xa - 1] === newGrid[y]?.[xa] &&
        !merged[y]?.[xa - 1]
      ) {
        newGrid = setGridValue(newGrid, y, xa - 1, newGrid[y]?.[xa - 1]! * 2);
        newGrid = setGridValue(newGrid, y, xa, 0);
        merged = setGridValue(merged, y, xa - 1, true);
      }
    }
  }
  return newGrid;
}

export function calculateScore(grid: number[][]): number {
  return grid.flat().reduce((acc, val) => acc + val, 0);
}

export function gameOver(grid: number[][]): boolean {
  const moves = [moveLeft, moveRight, moveUp, moveDown];
  for (const move of moves) {
    if (JSON.stringify(grid) !== JSON.stringify(move(grid))) {
      return false;
    }
  }
  return true;
}

export function gameEnd(grid: number[][]): boolean {
  return grid.flat().includes(128);
}

export const getCellClass = (value: number) => {
  switch (value) {
    case 2:
      return 'grid-cell cell-2';
    case 4:
      return 'grid-cell cell-4';
    case 8:
      return 'grid-cell cell-8';
    case 16:
      return 'grid-cell cell-16';
    case 32:
      return 'grid-cell cell-32';
    case 64:
      return 'grid-cell cell-64';
    case 128:
      return 'grid-cell cell-128';
    default:
      return 'grid-cell';
  }
};
