import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import "./App.css";

const outcomes = [
  { text: "You’d be better off buying LUNA in 2022", image: "/memes/lose3.png", type: "lose" },
  { text: "Spinny roasts Pepe — again", image: "/memes/lose5.png", type: "lose" },
  { text: "You spun worse than a normie", image: "/memes/lose6.png", type: "lose" },
  { text: "Bottom fraud. Nice buy, genius.", image: "/memes/lose2.png", type: "lose" },
  { text: "SHIBA? More like Shitba.", image: "/memes/lose7.png", type: "lose" },
  { text: "You earned another spin", image: "/memes/win3.png", type: "win" },
  { text: "Spinny approves. Degen mode on", image: "/memes/win1.png", type: "win" },
  { text: "Meme minigames coming soon...", image: "/memes/win2.png", type: "win" },
  { text: "Feeling lucky, punk?", image: "/memes/win6.png", type: "win" },
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

  const share = () => {
    if (!result) return;
    const base = "https://twitter.com/intent/tweet";
    const roast = result.text;
    const url = "https://t.me/spinnit_xyz";
    const message =
      result.type === "win"
        ? `🦊 I just WON big on Spinny (@Spinnit_xyz): "${roast}"\nSpinny’s doing $PINN buybacks — it's raining degen gold!\n${url}`
        : `💀 I just got RUGGED by Spinny (@Spinnit_xyz): "${roast}"\nSpinny’s raining $PINN and buying back like Bitconnect on steroids.\n${url}`;
    const encoded = encodeURIComponent(message);
    window.open(`${base}?text=${encoded}`, "_blank");

    // 10% free spin chance
    if (Math.random() < 0.1) {
      setTimeout(() => {
        alert("🔥 You earned a bonus spin!");
        setCooldown(0);
      }, 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-bg">
      <div className="game-box">
        <h1 className="title">Spinny Degen Roulette</h1>

        {publicKey && (
          <div className="wallet-info">
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
            <div className="label">
              {result.type === "win"
                ? "🦊 You Won: Legend!"
                : "💀 Better Luck Next Time: Rugged!"}
            </div>
            <h2 className="quote">{result.text}</h2>
            <img src={result.image} alt="Spinny Meme" className="meme" />
            <button className="share-button" onClick={share}>
              Share on Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
