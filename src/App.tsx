//App.tsx
import './App.css';
import './game';

import React, { useEffect, useState } from 'react';

import {
  calculateScore,
  gameEnd,
  gameOver,
  generateTwo,
  getCellClass,
  initGrid,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from './game';

function App() {
  const [grid, setGrid] = useState<number[][]>(initGrid());
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const startGame = () => {
    setGrid(initGrid());
    setScore(0);
    setWin(false);
    setLose(false);
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let newGrid;
      switch (event.key) {
        case 'ArrowUp':
          newGrid = moveUp(grid);
          break;
        case 'ArrowDown':
          newGrid = moveDown(grid);
          break;
        case 'ArrowLeft':
          newGrid = moveLeft(grid);
          break;
        case 'ArrowRight':
          newGrid = moveRight(grid);
          break;
        default:
          return;
      }

      if (JSON.stringify(grid) !== JSON.stringify(newGrid)) {
        newGrid = generateTwo(newGrid);
        setGrid(newGrid);
        setScore(calculateScore(newGrid));
      }
      if (gameOver(newGrid)) {
        setLose(true);
      }

      if (gameEnd(newGrid)) {
        setWin(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [grid]);

  return (
    <div className="grid-container">
      <h1 className="title">✧･ﾟ* 2048 *･ﾟ✧</h1>
      <button className="start-button" onClick={startGame}>
        New Game
      </button>
      {win && (
        <div className="endMessage">
          <p>Congrats, you win!! 🤩🎉👍</p>
          <p>your score: {score}</p>
          <button className="start-button" onClick={startGame}>
            New Game
          </button>
        </div>
      )}
      {lose && (
        <div className="endMessage">
          <p>womp womp, you loser 😔😔👎</p>
          <p>your score: {score}</p>
          <button className="start-button" onClick={startGame}>
            New Game
          </button>
        </div>
      )}
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={getCellClass(cell)}>
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
      -{' '}
      <div className="scoreboard">
        <div className="scoreText">SCORE</div>
        <div className="scoreNum">{score}</div>
      </div>
    </div>
  );
}

export default App;
