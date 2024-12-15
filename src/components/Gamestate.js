import { useEffect, useState } from "react";
import Gamepieces from "./Gamepieces";

const Gamestate = () => {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(parseInt(localStorage.getItem("highscore")) || 0);
  const [gameOver, setGameOver] = useState(false);
  const [collision, setCollisionType] = useState("");

  const handleGameOver = (type) => {
    setGameOver(true);
    if (score > highscore) {
      setHighscore(score);
      localStorage.setItem("highscore", score.toString());
    }
    setCollisionType(type);
  };

  const handleResetGame = () => {
    setScore(0);
    setGameOver(false); // Reset gameOver to false to restart the game
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleResetGame();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress); // Cleanup listener
    };
  }, [gameOver]); // Depend on gameOver to reinitialize listener when it changes

  return (
    <div className="items-center justify-center">
    <h1 className="text-center text-2xl m-5 font-bold">SnakeMania</h1>
      <p className="text-center">Score: {score}</p>
      <p className="text-center">High Score: {highscore}</p>
      {gameOver && (
        <div>
          <h4 className="text-center text-red-800">
            Game Over! {collision === "wall" ? "You hit the wall" : "You bite yourself"}
          </h4>
          <h6 className="text-center text-green-500">Please press Enter to reset the game</h6>
        </div>
      )}
      {!gameOver && (
        <Gamepieces
          score={score}
          setScore={setScore}
          onGameOver={(type) => handleGameOver(type)} // Pass handler as prop
        />
      )}
    </div>
  );
};

export default Gamestate;
