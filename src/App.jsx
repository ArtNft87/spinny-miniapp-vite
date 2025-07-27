import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const COOLDOWN = 30;

const memeFiles = [
  "1.gif", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png",
  "8.png", "9.png", "10.png", "11.png", "12.gif", "13.png", "14.png",
];

const winMessages = [
  "You spin harder than CZ dodging subpoenas 💨",
  "Elon would invest in you — and rug right after 🚀",
  "Based spin. Even Vitalik blushed 🦄",
  "You just got an airdrop of pure alpha 💎",
  "Spinny blessed you, degen legend ✨",
  "KOLs fear your bags — and your memes",
  "Your ROI is illegal in 17 countries 📈",
  "SPINNY APPROVED ✅",
  "You flipped that like 100x monkey jpegs",
  "Degen of the month, no debate 🧠",
  "That's a DAO-funded spin right there",
  "Gary Gensler saw that spin and quit 💼",
  "You’re the reason RUGs fear VCs now",
  "Big brains only — you’re cooking",
  "Feels like bull market again huh?",
  "SPINNING > STAKING, facts only",
  "You survived 3 cycles and still spun",
  "Imagine spinning like this onchain...",
  "No utility, all vibes — just how we like it",
  "Foxes don’t spin, they dominate 🦊",
];

const loseMessages = [
  "You spin like Bitconnect trades — pure regret 📉",
  "Rugged faster than Squid Game Token",
  "Wen refund? Wen common sense?",
  "Go back to buying meme coins at ATH",
  "Bro tried spinning with 0 IQ and 0 DYOR",
  "Even Terra held longer than your spin",
  "Sell your ledger. You’re not ready 🪦",
  "Imagine spinning and still being broke",
  "SPINNY SAYS: Touch grass 🌱",
  "That spin? Absolute zkNonsense",
  "Why you even online bro",
  "UFOs spotted your L from orbit 🛸",
  "Even your mom unfollowed after that",
  "No insurance, no alpha, only pain",
  "You fumbled harder than FTX lawyers",
  "Zuck wouldn’t even let you in the metaverse",
  "That spin got blacklisted by Circle",
  "Just go mint another rug NFT",
  "You spin like you vote on DAOs — badly",
  "Go read a whitepaper, then come back",
];

export default function App() {
  const [result, setResult] = useState(null);
  const [lastSpinTime, setLastSpinTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const wallet = useWallet();

  const handleSpin = () => {
    const now = Date.now();
    if (now - lastSpinTime < COOLDOWN * 1000) return;

    const isWin = Math.random() > 0.5;
    const randomMeme = memeFiles[Math.floor(Math.random() * memeFiles.length)];
    const text = isWin
      ? winMessages[Math.floor(Math.random() * winMessages.length)]
      : loseMessages[Math.floor(Math.random() * loseMessages.length)];

    setResult({
      type: isWin ? "win" : "lose",
      text,
      image: `/memes/${randomMeme}`,
    });

    setLastSpinTime(now);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((COOLDOWN * 1000 - (now - lastSpinTime)) / 1000);
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastSpinTime]);

  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "monospace" }}>
      <h1>🎰 Spinny Roulette</h1>

      <div style={{ marginBottom: "1rem" }}>
        <WalletMultiButton />
      </div>

      <button
        onClick={handleSpin}
        disabled={timeLeft > 0}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          borderRadius: "12px",
          background: timeLeft > 0 ? "#999" : "#ff007f",
          color: "#fff",
          border: "none",
          cursor: timeLeft > 0 ? "not-allowed" : "pointer",
        }}
      >
        {timeLeft > 0 ? `Cooldown: ${timeLeft}s` : "SPIN 🎯"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ color: result.type === "win" ? "#00e676" : "#ff1744" }}>
            {result.type.toUpperCase()}
          </h2>
          <p>{result.text}</p>
          <img
            src={result.image}
            alt="spin result"
            style={{ maxWidth: "100%", borderRadius: "16px", marginTop: "1rem" }}
          />
        </div>
      )}
    </div>
  );
}
