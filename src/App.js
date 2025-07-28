import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

// WIN OUTCOMES
const winOutcomes = [
  { text: "Legend! You did it.", image: "/memes/win1.png" },
  { text: "Degen God. Touch grass? Never.", image: "/memes/win2.gif" },
  { text: "Spinning since LUNA 2022. Still alive.", image: "/memes/win3.png" },
  { text: "You’re not a degen. You’re *the* degen.", image: "/memes/win1.png" },
  { text: "You just invalidated technical analysis. Respect.", image: "/memes/win2.gif" },
  { text: "Gary Gensler can’t stop you. SEC this, baby.", image: "/memes/win3.png" },
  { text: "You spun harder than CZ’s lawyers.", image: "/memes/win1.png" },
  { text: "They said it was random. You said: *Try me.*", image: "/memes/win2.gif" },
  { text: "You flipped SOL into alpha. King of risk.", image: "/memes/win3.png" },
  { text: "Even Sam wouldn’t have bet this right.", image: "/memes/win1.png" },
  { text: "You’re why bots are crying in the memepit.", image: "/memes/win2.gif" },
  { text: "Spinny kneels. You’re now the oracle.", image: "/memes/win3.png" },
  { text: "You just turned a JPEG into pure dominance.", image: "/memes/win1.png" },
  { text: "You minted karma. Degen level: messiah.", image: "/memes/win2.gif" },
  { text: "Every time you win, a rugger cries.", image: "/memes/win3.png" },
  { text: "Degen roulette just got rugged by you.", image: "/memes/win1.png" },
  { text: "You beat the game. Next stop: God mode.", image: "/memes/win2.gif" },
  { text: "Who needs L2s? You’re L0: Legendary Origin.", image: "/memes/win3.png" },
];

const loseOutcomes = [
  { text: "Rugged harder than Bitconnect.", image: "/memes/lose1.png" },
  { text: "Even FTX had better odds.", image: "/memes/lose2.gif" },
  { text: "Next time buy a lottery ticket.", image: "/memes/lose3.png" },
  { text: "Spin harder, loser. This ain’t BitBoy’s course.", image: "/memes/lose1.png" },
  { text: "You just got rugged by a fox in a png.", image: "/memes/lose2.gif" },
  { text: "Even Terra had a better risk profile.", image: "/memes/lose3.png" },
  { text: "You got dumped harder than $PEPE on Coinbase.", image: "/memes/lose1.png" },
  { text: "Why buy top when you can lose for free?", image: "/memes/lose2.gif" },
  { text: "You just relived the Celsius exit queue.", image: "/memes/lose3.png" },
  { text: "Your karma’s stuck in a Solana NFT mint.", image: "/memes/lose1.png" },
  { text: "That spin? More cursed than 3AC spreadsheets.", image: "/memes/lose2.gif" },
  { text: "You got outperformed by a wallet drainer.", image: "/memes/lose3.png" },
  { text: "Spinny says: GTFO back to testnet.", image: "/memes/lose1.png" },
  { text: "You just got airdropped *pain*.", image: "/memes/lose2.gif" },
  { text: "Even VCs wouldn’t invest in that outcome.", image: "/memes/lose3.png" },
  { text: "You spun like Do Kwon trading on the run.", image: "/memes/lose1.png" },
  { text: "Your win is still pending. Since 2021.", image: "/memes/lose2.gif" },
  { text: "The only thing worse is your portfolio.", image: "/memes/lose3.png" },
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
        <img src="/spinny-degen.png" className="mascot" alt="mascot" />
        <img src="/roulette.png" className="roulette" alt="roulette" />
      </div>

      <div className="game-frame">
        <button className="wallet-button">{shortenAddress(wallet)}</button>

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
