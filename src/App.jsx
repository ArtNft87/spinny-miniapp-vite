import React, { useEffect, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import WebApp from "@twa-dev/sdk";
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
    const outcome = getRandomOutcome();
    setResult(outcome);
    setCooldown(30);
  };

  const share = () => {
    if (!result) return;

    const baseText =
      result.type === "win"
        ? `I just WON in Spinny's Telegram Mini App. "${result.text}" — Spinny is doing $PINN buybacks today. Respect the fox.`
        : `I just got RUGGED by Spinny. "${result.text}" — Degen pain is real. But $PINN buybacks are LIVE.`;

    const tweet = `${baseText} 👉 t.me/SpinnIt_Bot?startapp`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      <h1 className="app-title">Spinny Degen Roulette</h1>

      <div className="game-frame">
        {publicKey && (
          <div className="wallet-row">
            <button className="wallet-display">{shortWallet}</button>
            <p className="balance">$PINN: <strong>{mockBalance}</strong></p>
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
            <img src={result.image} alt="Result" className="result-image" />
            <div className="result-text">{result.text}</div>
            <div className="outcome-label">
              {result.type === "win" ? "You Won: Legend!" : "Better Luck Next Time: Rugged!"}
            </div>

            <button className="share-button" onClick={share}>
              Share on Twitter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
