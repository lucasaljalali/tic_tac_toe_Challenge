import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [x, setX] = useState<string[]>([]);
  const [gameWin, setGameWin] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    !gameWin &&
      x.map((item) => {
        const element = document.getElementById(item);
        const oddArray = x.length % 2 == 1;
        const emptyElement = element?.innerText == "";
        if (element != null && emptyElement) {
          element.innerText = oddArray ? "O" : "X";
        }
      });
    x.length > 0 && checkGameState();
  }, [x]);

  function handleCellClick(id: string) {
    !gameWin && !gameEnd && !x.includes(id) && setX([...x, id]);
  }

  function checkGameState() {
    const squares = [...document.querySelectorAll(".square")];
    const winStates = [
      [0, 1, 2], // First row
      [3, 4, 5], // Second row
      [6, 7, 8], // Third row
      [0, 3, 6], // First column
      [1, 4, 7], // Second column
      [2, 5, 8], // Third column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];
    for (const state of winStates) {
      const stateCells = state.map((index) => squares[index]);
      const firstTextContent = stateCells[0].textContent;
      const someoneWon = stateCells.every((cell) => cell.textContent === firstTextContent && firstTextContent !== "");
      if (someoneWon) {
        stateCells.map((cell) => cell.classList.add("blueCells"));
        setGameWin(true);
        return;
      }
    }
    x.length > 8 &&
      !gameWin &&
      (setGameEnd(true),
      squares.map((squares) => {
        squares.classList.add("redCells");
      }));
  }

  function cleanGame() {
    const squares = [...document.querySelectorAll(".square")];
    squares.map((squares) => {
      squares.textContent = "";
      squares.classList.remove("blueCells", "redCells");
    });
    setX([]);
    setGameWin(false);
    setGameEnd(false);
  }

  return (
    <div className="App">
      <div className="squareContainer">
        <div id="11" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="12" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="13" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="21" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="22" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="23" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="31" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="32" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
        <div id="33" className="square" onClick={(e) => handleCellClick(e.currentTarget.id)}></div>
      </div>
      {gameEnd}
      <button className="resetButton" onClick={() => cleanGame()}>
        Reset
      </button>
    </div>
  );
}
