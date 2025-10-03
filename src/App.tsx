import { useState } from "react";
import "./index.css";

type SquareProps = {
  value: string;
  onClick: () => void;
};

function Square({ value, onClick }: SquareProps) {
  return (
    <button className="btn" onClick={onClick}>
      {value}
    </button>
  );
}

function GameField({
  squares,
  onSquareClick,
}: {
  squares: string[];
  onSquareClick: (index: number) => void;
}) {
  return (
    <div className="field">
      {squares.map((value, i) => (
        <Square key={i} value={value} onClick={() => onSquareClick(i)} />
      ))}
    </div>
  );
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [historyMoves, setHistoryMoves] = useState<
    { player: "X" | "O"; square: number }[]
  >([]);

  function checkWinner(squares: string[]) {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (index: number) => {
    if (squares[index] !== "" || checkWinner(squares)) return;
    const newSquares = [...squares];
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setHistoryMoves((prev) => [
      ...prev,
      { player: currentPlayer, square: index + 1 },
    ]);

    const winner = checkWinner(newSquares);
    if (winner) {
      alert(`vyrhral ${winner}!`);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <>
      <GameField squares={squares} onSquareClick={handleClick} />
      <div>
        <h3>History Moves:</h3>
        <ul className="list">
          {historyMoves.map((move, i) => (
            <li key={i}>
              {i + 1}. Player {move.player} played{" "}
              <img
                src={`/${move.square}.png`}
                alt={`Square ${move.square}`}
                style={{ width: "24px", verticalAlign: "middle" }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
