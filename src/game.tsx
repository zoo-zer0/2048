//game.tsx
export function initGrid(): number[][] {
  const grid = Array(4)
    .fill(0)
    .map(() => new Array(4).fill(0));
  return generateTwo(generateTwo(grid));
}
export function generateTwo(grid: number[][]): number[][] {
  let emptyCells: [number, number][]= [];
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
    const [row, col] = selectedCell; // Now this is safe

    // Create a copy of the grid to avoid mutation
    const newGrid = grid.map(row => [...row]);

    // Set the selected cell to 2
    newGrid[row][col] = 2;

    return newGrid;
    }
  return grid;
}

/*
function slide(row: number[]): number[] {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  }
  
  function combine(row: number[]): number[] {
    for (let i = 3; i >= 1; i--) {
      if (row[i] === row[i - 1]) {
        row[i] = row[i] * 2;
        row[i - 1] = 0;
      }
    }
    return row;
  }
  
  function operate(row: number[]): number[] {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
  }
  export function moveLeft(grid: number[][]): number[][] {
    let newGrid = grid.map(row => operate(row).reverse());
    return newGrid;
  }
  export function moveLefty(grid: number[][]): number[][] {
    let newGrid = grid.map(row => operate(row));
    return newGrid;
  }
  
  export function moveRight(grid: number[][]): number[][] {
    let newGrid = grid.map(row => operate(row.reverse()).reverse());
    return newGrid;
  }
  
  export function moveUp(grid: number[][]): number[][] {
    let newGrid = rotateGrid(grid);
    newGrid = moveLefty(newGrid);
    newGrid = rotateGrid(newGrid, true);
    return newGrid;
  }
  
  export function moveDown(grid: number[][]): number[][] {
    let newGrid = rotateGrid(grid);
    newGrid = moveRight(newGrid);
    newGrid = rotateGrid(newGrid, true);
    return newGrid;
  }
  
  function rotateGrid(grid: number[][], counterClockwise = false): number[][] {
    let newGrid = Array(4).fill(0).map(() => new Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (counterClockwise) {
          newGrid[i][j] = grid[j][3 - i];
        } else {
          newGrid[i][j] = grid[3 - j][i];
        }
      }
    }
    return newGrid;
  }
  */
export function moveDown(grid: number[][]): number[][] {
  const newGrid = grid.map((row) => [...row]);
  const merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let row = 3; row >= 0; row--) {
    for (let col = 0; col < 4; col++) {
      if (newGrid[row]?.[col] === 0) continue;
      let rowa = row;
      while (rowa < 3 && newGrid[rowa + 1]?.[col] === 0) {
        newGrid[rowa + 1][col] = newGrid[rowa]?.[col];
        newGrid[rowa][col] = 0; 
        rowa++;
      }
      if (
        rowa < 3 &&
        newGrid[rowa + 1]?.[col] === newGrid[rowa]?.[col] &&
        !merged[rowa + 1]?.[col]
      ) {
        newGrid[rowa + 1][col] *= 2;
        newGrid[rowa][col] = 0;
        merged[rowa + 1][col] = true;
      }
    }
  }
  return newGrid;
}

export function moveUp(grid: number[][]): number[][] {
  const newGrid = grid.map((row) => [...row]);
  const merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (newGrid[row]?.[col] === 0) continue;
      let rowa = row;
      while (rowa > 0 && newGrid[rowa - 1]?.[col] === 0) {
        newGrid[rowa - 1][col] = newGrid[rowa]?.[col];
        newGrid[rowa][col] = 0;
        rowa--;
      }
      if (
        rowa > 0 &&
        newGrid[rowa - 1]?.[col] === newGrid[rowa]?.[col] &&
        !merged[rowa - 1]?.[col]
      ) {
        newGrid[rowa - 1][col] *= 2;
        newGrid[rowa][col] = 0;
        merged[rowa - 1][col] = true; // Mark as merged
      }
    }
  }
  return newGrid;
}

export function moveRight(grid: number[][]): number[][] {
  const newGrid = grid.map((row) => [...row]);
  const merged = Array.from({ length: 4 }, () => Array(4).fill(false));
  for (let x = 3; x >= 0; x--) {
    for (let y = 0; y < 4; y++) {
      if (newGrid[y]?.[x] === 0) continue;
      let xa = x;
      while (xa < 3 && newGrid[y]?.[xa + 1] === 0) {
        newGrid[y][xa + 1] = newGrid[y]?.[xa];
        newGrid[y][xa] = 0;
        xa++;
      }
      if (
        xa < 3 &&
        newGrid[y][xa + 1] === newGrid[y]?.[xa] &&
        !merged[y][xa + 1]
      ) {
        newGrid[y][xa + 1] *= 2;
        newGrid[y][xa] = 0;
        merged[y][xa + 1] = true;
      }
    }
  }
  return newGrid;
}

export function moveLeft(grid: number[][]): number[][] {
  const newGrid = grid.map((row) => [...row]);
  const merged = Array.from({ length: 4 }, () => Array(4).fill(false));

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (newGrid[y]?.[x] === 0) continue;
      let xa = x;
      while (xa > 0 && newGrid[y]?.[xa - 1] === 0) {
        newGrid[y][xa - 1] = newGrid[y]?.[xa];
        newGrid[y][xa] = 0;
        xa--;
      }
      if (
        xa > 0 &&
        newGrid[y][xa - 1] === newGrid[y]?.[xa] &&
        !merged[y]?.[xa - 1]
      ) {
        newGrid[y][xa - 1] *= 2;
        newGrid[y][xa] = 0;
        merged[y][xa - 1] = true; // Mark as merged
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
