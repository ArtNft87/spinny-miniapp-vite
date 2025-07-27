import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./App.css";

const outcomes = [
  { text: "You’d be better off buying LUNA in 2022", image: "/memes/lose3.png", type: "lose" },
  { text: "SHIBA? More like Shitba.", image: "/memes/lose7.png", type: "lose" },
  { text: "Spinny roasts Pepe — again", image: "/memes/lose5.png", type: "lose" },
  { text: "You spun worse than a normie", image: "/memes/lose6.png", type: "lose" },
  { text: "Bottom fraud. Nice buy, genius.", image: "/memes/lose2.png", type: "lose" },

  { text: "You earned another spin", image: "/memes/win3.png", type: "win" },
  { text: "Spinny approves. Degen mode on", image: "/memes/win1.png", type: "win" },
  { text: "Meme minigames coming soon...", image: "/memes/win2.png", type: "win" },
  { text: "Feeling lucky, punk?", image: "/memes/win6.png", type: "win" },
  { text: "Legendary spin. +420 $PINN", image: "/memes/win7.gif", type: "win" },
];

const getRandomOutcome = () => outcomes[Math.floor(Math.random() * outcomes.length)];

export default function App() {
  const { publicKey } = useWallet();
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const shortWallet = publicKey
    ? publicKey.toBase58().slice(0, 4) + ".." + publicKey.toBase58().slice(-4)
    : "";
  const mockBalance = "~69,420.00";

  const spin = () => {
    if (cooldown > 0) return;
    const outcome = getRandomOutcome();
    setResult(outcome);
    setCooldown(30);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const shareToTwitter = () => {
    if (!result) return;

    const winOrLose = result.type === "win" ? "WON" : "RUGGED";
    const label = result.type === "win" ? "Legend!" : "RUGGED";
    const quote = result.text;
    const link = "https://t.me/spinnit_xyz"; // future TG mini app
    const tweetText = `💀 I just got ${winOrLose} by Spinny (@Spinnit_xyz)\n"${quote}"\nSpinny’s raining $PINN and doing buybacks today.\nTouch grass & spin.\n${link}`;

    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, "_blank");
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Spinny Degen Roulette</h1>

      {publicKey && (
        <div className="wallet-row">
          <button className="wallet-display">{shortWallet}</button>
          <p className="balance">$PINN Balance: <strong>{mockBalance}</strong></p>
        </div>
      )}

      <div className="controls">
        <WalletMultiButton className="wallet-button" />
        {cooldown > 0 ? (
          <div className="cooldown">Cooldown: {cooldown}s</div>
        ) : (
          publicKey && (
            <button className="spin-button" onClick={spin}>
              Spin
            </button>
          )
        )}
      </div>

      {result && (
        <div className={`result ${result.type}`}>
          <div className="outcome-label">
            {result.type === "win" ? "🦊 You Won: Legend!" : "💀 Better Luck Next Time: Rugged!"}
          </div>
          <h2>{result.text}</h2>
          <img src={result.image} alt="Spin result" className="result-image" />
          <button className="share-button" onClick={shareToTwitter}>🔁 Share</button>
        </div>
      )}
    </div>
  );
}
