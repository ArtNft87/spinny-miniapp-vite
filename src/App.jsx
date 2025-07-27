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
  { text: "Legendary spin. +420 $PINN", image: "/memes/win7.gif", type: "win" },
];

const getRandomOutcome = () => outcomes[Math.floor(Math.random() * outcomes.length)];

export default function App() {
  const { publicKey } = useWallet();
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const shortWallet = publicKey ? publicKey.toBase58().slice(0, 4) + ".." + publicKey.toBase58().slice(-4) : "";
  const mockBalance = "~69,420.00";

  const spin = () => {
    if (cooldown > 0) return;
    const outcome = getRandomOutcome();
    setResult(outcome);
    setCooldown(30);
  };

  const shareText = () => {
    if (!result) return "";

    const roastLine = `"${result.text}"`;
    const base = `I just spun with Spinny and got ${result.type === "win" ? "BLESSED" : "RUGGED"}!`;
    const kicker = result.type === "win"
      ? `Spinny's pumping harder than BONK pre-airdrop. $PINN buybacks are real.`
      : `Worse than Bitconnect and FTX combined. Spinny roasted me raw.`;

    return `${base}\n\n${roastLine}\n\n${kicker}\n\nJoin the Degen Roulette 👇\nhttps://t.me/spinnit_xyz`;
  };

  const downloadAndShare = async () => {
    const link = document.createElement("a");
    link.href = result.image;
    link.download = "spinny_result.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    navigator.clipboard.writeText(shareText());
    alert("Meme downloaded & post copy copied to clipboard.");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          <h2>{result.text}</h2>
          <img src={result.image} alt="Spin result" className="result-image" />
          <div className="outcome-label">
            {result.type === "win" ? "🔥 YOU WON!" : "💀 RUGGED"}
          </div>
          <button className="share-button" onClick={downloadAndShare}>📸 Share</button>
        </div>
      )}
    </div>
  );
}
