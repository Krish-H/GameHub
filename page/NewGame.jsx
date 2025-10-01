import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import pic1 from "../src/assets/images/pic1.jpeg";
import pic2 from "../src/assets/images/pic2.jpeg";
import pic3 from "../src/assets/images/pic3.jpeg";
import pic4 from "../src/assets/images/pic4.jpeg";

const roles = ["Raja", "Rani", "Police", "Thief"];
const players = ["You", "Bot 1", "Bot 2", "Bot 3"];

const points = {
  Raja: 10,
  Rani: 5,
  Police: 3,
  Thief: 0,
};

const targets = {
  Raja: "Rani",
  Rani: "Police",
  Police: "Thief",
};

const playerImages = {
  You: pic1,
  "Bot 1": pic2,
  "Bot 2": pic3,
  "Bot 3": pic4,
};

const NewGame = () => {
  const [round, setRound] = useState(1);
  const [rolesAssigned, setRolesAssigned] = useState({});
  const [scores, setScores] = useState({
    You: 0,
    "Bot 1": 0,
    "Bot 2": 0,
    "Bot 3": 0,
  });
  const [turn, setTurn] = useState(null);
  const [flipped, setFlipped] = useState({});
  const [message, setMessage] = useState("");
  const [activePlayers, setActivePlayers] = useState([]);
  const [guessing, setGuessing] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const startRound = () => {
    const shuffled = [...roles].sort(() => Math.random() - 0.5);
    const newRoles = {};
    players.forEach((p, i) => (newRoles[p] = shuffled[i]));
    setRolesAssigned(newRoles);
    setFlipped({});
    setActivePlayers([...players]);
    const rajaPlayer = Object.keys(newRoles).find((p) => newRoles[p] === "Raja");
    setTurn(rajaPlayer);
    setMessage(`🎮 Round ${round} started! ${rajaPlayer} (Raja) begins.`);
    setGuessing(false);
  };

  useEffect(() => {
    startRound();
  }, []);

  useEffect(() => {
    if (turn && turn.startsWith("Bot") && activePlayers.includes(turn)) {
      setGuessing(true);
      setMessage(`${turn} is thinking... 🤔`);
      const timer = setTimeout(() => {
        const possible = activePlayers.filter((p) => p !== turn);
        const guess = possible[Math.floor(Math.random() * possible.length)];
        handleGuess(turn, guess);
        setGuessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [turn, activePlayers]);

  const updateScore = (player, role) => {
    setScores((prev) => ({ ...prev, [player]: prev[player] + points[role] }));
  };

  const handleGuess = (guesser, targetPlayer) => {
    if (!activePlayers.includes(guesser)) return;

    const role = rolesAssigned[guesser];
    const targetRole = targets[role];

    if (!targetRole) {
      setMessage(`💀 ${guesser} got the Thief! Round ends.`);
      setFlipped({ ...rolesAssigned });
      endRound();
      return;
    }

    if (rolesAssigned[targetPlayer] === targetRole) {
      setMessage(`✅ ${guesser} (${role}) found ${targetRole} (${targetPlayer})`);
      updateScore(guesser, role);
      updateScore(targetPlayer, targetRole);
      setFlipped((prev) => ({ ...prev, [targetPlayer]: true }));
      setActivePlayers((prev) => prev.filter((p) => p !== guesser));

      const remaining = activePlayers.filter((p) => p !== guesser);
      if (remaining.length === 0) {
        endRound();
      } else {
        setTurn(remaining[0]);
      }
    } else {
      setMessage(
        `❌ ${guesser} (${role}) guessed wrong! (${targetPlayer} was ${rolesAssigned[targetPlayer]})`
      );
      setRolesAssigned((prev) => {
        const newRoles = { ...prev };
        [newRoles[guesser], newRoles[targetPlayer]] = [newRoles[targetPlayer], newRoles[guesser]];
        return newRoles;
      });
      setTurn(targetPlayer);
    }
  };

  const endRound = () => {
    setTimeout(() => {
      if (round < 3) {
        setRound((prev) => prev + 1);
        startRound();
      } else {
        setMessage("🏆 Game Over! Final Scores:");
        setTurn(null);
        setFlipped({ ...rolesAssigned });

        const maxScore = Math.max(...Object.values(scores));
        const winners = Object.keys(scores).filter((p) => scores[p] === maxScore);
        setWinner(winners.join(", "));
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setRound(1);
    setScores({ You: 0, "Bot 1": 0, "Bot 2": 0, "Bot 3": 0 });
    setGameOver(false);
    setWinner("");
    startRound();
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {gameOver && <Confetti />}

      {/* Winner on top */}
      {gameOver && (
        <p className="text-2xl font-bold text-yellow-300 mb-4 text-center">
          🏅 Winner: {winner} 🎉
        </p>
      )}

      <h1 className="text-3xl font-bold mb-4 text-center">Raja Rani Police Thief 🎭</h1>
      <p className="mb-6 text-center px-2">{message}</p>

      {/* Player Cards - 2 column grid always */}
      <div className="grid grid-cols-2 gap-4 mb-6 w-full max-w-md">
        {players.map((p, i) => (
          <div
            key={i}
            onClick={() =>
              turn === "You" && p !== "You" && activePlayers.includes("You")
                ? handleGuess("You", p)
                : null
            }
            className={`w-full h-44 bg-white text-black rounded-xl flex flex-col items-center justify-center cursor-pointer shadow-lg transition ${
              turn === p ? "border-4 border-green-400" : ""
            }`}
          >
            <img
              src={playerImages[p]}
              alt={p}
              className="w-16 h-16 rounded-full mb-2"
            />
            <p className="font-bold">{p}</p>
            <p>
              {p === "You" || flipped[p] || !activePlayers.includes(p)
                ? rolesAssigned[p]
                : "?"}
            </p>
          </div>
        ))}
      </div>

      {/* Scores */}
      <h2 className="text-xl font-bold mb-2">Scores</h2>
      <ul className="bg-white text-black rounded-lg shadow-md p-4 w-full max-w-xs">
        {Object.entries(scores).map(([player, score]) => (
          <li key={player} className="flex justify-between text-sm">
            <span>{player}</span>
            <span>{score}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-lg font-semibold">Round {round} / 3</p>

      {gameOver && (
        <button
          onClick={restartGame}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default NewGame;
