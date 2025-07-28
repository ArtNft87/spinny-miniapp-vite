import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

// OUTCOMES
const winOutcomes = [
  { text: "Legend! You did it.", image: "/memes/win1.png" },
  { text: "Degen God. Touch grass? Never.", image: "/memes/win2.gif" },
  { text: "Spinning since LUNA 2022. Still alive.", image: "/memes/win3.png" },
];

const loseOutcomes = [
  { text: "Rugged harder than Bitconnect.", image: "/memes/lose1.png" },
  { text: "Even FTX had better odds.", image: "/memes/lose2.gif" },
  { text: "Next time buy a lottery ticket.", image: "/memes/lose3.png" },
];

const getRandomOutcome = () => {
  const isWin = Math.random() < 0.4;
  const pool = isWin ? winOutcomes : loseOutcomes;
  const outcome = pool[Math.floor(Math.random() * pool.length)];
  return { ...outcome, type: isWin ? "win" : "lose" };
};

const shortenAddress = (addr) => addr.slice(0, 4) + "…" + addr.slice(-4);

export default function App() {
  const [outcome, setOutcome] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [wallet, setWallet] = useState("2YFvA8M9hx7Y3iQLk4nbYaLcA");

  const handleSpin = () => {
    if (cooldown > 0) return;

    const result = getRandomOutcome();
    setOutcome(result);

    if (result.type === "win") {
      confetti({ particleCount: 100, spread: 70 });
    }

    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  const handleShare = () => {
    if (!outcome) return;

    const base = "https://x.com/intent/tweet";
    const copy = outcome.type === "win"
      ? `I just spun the wheel on @Spinnit_xyz and WON 🔥\n\n"${outcome.text}"\n\nSpin now or get left behind — $PINN buybacks in full force.`
      : `I got rugged by the wheel on @Spinnit_xyz 🤡\n\n"${outcome.text}"\n\nOne spin can change your fate. Or destroy it. $PINN lives.`;

    const url = `https://spinnit.xyz`;
    const tweet = `${base}?text=${encodeURIComponent(copy)}&url=${encodeURIComponent(url)}`;
    window.open(tweet, "_blank");
  };

  return (
    <div className="app">
      <h1 className="title">Spinny Degen Roulette</h1>

      <div className="mascot-frame">
        <img src="/spinny-degen.png" className="mascot" />
        <img src="/roulette.png" className="roulette" />
      </div>

      <div className="game-frame">
        <button className="wallet-button">
          {shortenAddress(wallet)}
        </button>

        <button
          onClick={handleSpin}
          disabled={cooldown > 0}
          className="spin-button"
        >
          {cooldown > 0 ? `Wait ${cooldown}s` : "SPIN"}
        </button>

        {outcome && (
          <>
            <img src={outcome.image} alt="Meme" className="meme-image" />
            <div className={`result-text ${outcome.type}`}>
              {outcome.type === "win"
                ? `You Won: ${outcome.text}`
                : `Better Luck Next Time: ${outcome.text}`}
            </div>
            <button onClick={handleShare} className="share-button">
              Share on Twitter
            </button>
          </>
        )}
      </div>
    </div>
  );
}
