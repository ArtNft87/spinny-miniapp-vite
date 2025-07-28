import React, { useState, useEffect } from "react";
import "./App.css";

const allOutcomes = [
  // --- WIN ---
  { type: "win", text: "You're not a degen. You're THE degen.", image: "/memes/win1.png" },
  { type: "win", text: "Legend status: UNLOCKED 🔓", image: "/memes/win2.png" },
  { type: "win", text: "Spinny loves you. Don't ruin it.", image: "/memes/win3.png" },
  { type: "win", text: "Most people lose. You’re not most people.", image: "/memes/win4.gif" },
  { type: "win", text: "Wen Lambo? Yesterday. 🚀", image: "/memes/win5.gif" },
  { type: "win", text: "You spun. You conquered. 🏆", image: "/memes/win6.png" },
  { type: "win", text: "Spinny whispered: 'This one’s special.'", image: "/memes/win7.gif" },
  { type: "win", text: "That rug missed you by one block.", image: "/memes/win8.png" },
  { type: "win", text: "You defied all TA and logic. Bravo.", image: "/memes/win9.png" },
  { type: "win", text: "Solana called. They want you listed.", image: "/memes/win10.png" },

  // --- LOSE ---
  { type: "lose", text: "You got rugged harder than Bitconnect.", image: "/memes/lose1.png" },
  { type: "lose", text: "Spinny says: Stop coping. Start spinning.", image: "/memes/lose2.gif" },
  { type: "lose", text: "Your alpha was as real as SBF's innocence.", image: "/memes/lose3.png" },
  { type: "lose", text: "Down bad. Like Terra in 2022.", image: "/memes/lose4.png" },
  { type: "lose", text: "Try again. Or go back to memecoin gambling.", image: "/memes/lose5.gif" },
  { type: "lose", text: "Spinny saw your seed phrase. It was tragic.", image: "/memes/lose6.png" },
  { type: "lose", text: "Degen level: Twitter influencer tier.", image: "/memes/lose7.gif" },
  { type: "lose", text: "You fumbled the bag. Again.", image: "/memes/lose8.png" },
  { type: "lose", text: "Your karma just shorted itself.", image: "/memes/lose9.png" },
  { type: "lose", text: "Even Bonk dumped on you. Respect.", image: "/memes/lose10.png" }
];

export default function App() {
  const [wallet, setWallet] = useState("2YFv...aLcA");
  const [cooldown, setCooldown] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((c) => c - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleSpin = () => {
    const outcome = allOutcomes[Math.floor(Math.random() * allOutcomes.length)];
    setResult(outcome);
    setCooldown(30);
  };

  const handleTweet = () => {
    if (!result) return;
    const base = "https://twitter.com/intent/tweet";
    const url = "https://t.me/spinnit_xyz";
    const typeLabel = result.type === "win" ? "🏆 I WON on Spinny!" : "💀 Got rugged by Spinny.";
    const copy = `${typeLabel} "${result.text}"\n\nTry your luck 👉 @Spinnit_xyz | $PINN buybacks degen style`;
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
          {cooldown > 0 ? `Wait ${cooldown}s` : "Spin"}
        </button>

        {result && (
          <div className="result">
            <h2>{result.type === "win" ? "You Won: Legend!" : "Better Luck Next Time: Rugged!"}</h2>
            <p>{result.text}</p>
            <img src={result.image} alt="spin-result" className="meme" />
            <button className="share-button" onClick={handleTweet}>
              Share on Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
