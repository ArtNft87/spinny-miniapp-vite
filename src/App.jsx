import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./App.css";

const outcomes = [
  { text: "You’d be better off buying LUNA 🌕 in 2022", image: "/memes/lose3.png", type: "lose" },
  { text: "Spinny roasts Pepe — again 🐸", image: "/memes/lose5.png", type: "lose" },
  { text: "You spun worse than a normie 🫠", image: "/memes/lose6.png", type: "lose" },
  { text: "Bottom fraud. Nice buy, genius. 👎", image: "/memes/lose2.png", type: "lose" },
  { text: "SHIBA? More like Shitba. 🐕‍🦺", image: "/memes/lose7.png", type: "lose" },
  { text: "You earned another spin 🌀", image: "/memes/win3.png", type: "win" },
  { text: "Spinny approves. Degen mode on 🦊", image: "/memes/win1.png", type: "win" },
  { text: "Meme minigames coming soon... 🔥", image: "/memes/win2.png", type: "win" },
  { text: "Feeling lucky, punk? 🍀", image: "/memes/win6.png", type: "win" },
  { text: "Legendary spin. +420 $PINN 🚀", image: "/memes/win7.gif", type: "win" },
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
    setResult(getRandomOutcome());
    setCooldown(30);
  };

  const shareToTwitter = () => {
    if (!result) return;
    const quote = result.text;
    const win = result.type === "win";
    const outcomeText = win
      ? `🔥 I just WON at Spinny Degen Roulette\n"${quote}"`
      : `💀 I just got RUGGED by Spinny\n"${quote}"`;

    const url = encodeURIComponent("https://t.me/spinnit_xyz"); // Replace later
    const text = encodeURIComponent(`${outcomeText}\nSpinny’s raining $PINN and doing buybacks today. Touch grass & spin.\n${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title neon">Spinny Degen Roulette</h1>

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
        <>
          <h2 className="result-text">{result.text}</h2>
          <img src={result.image} alt="Spin result" className="result-image-small" />
          <div className={`outcome-label ${result.type}`}>
            {result.type === "win" ? "🔥 YOU WON" : "💀 RUGGED"}
          </div>
          <button className="share-button" onClick={shareToTwitter}>
            📤 Share
          </button>
        </>
      )}
    </div>
  );
}
