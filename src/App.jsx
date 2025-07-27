import React, { useEffect, useState } from "react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";

import "./App.css";

const memes = [
  { text: "Spinny approves. Degen mode on", image: "/gifs/degen.png", type: "win" },
  { text: "Bottom fraud. Nice buy, genius.", image: "/gifs/fraud.png", type: "lose" },
];

function InnerApp() {
  const { publicKey, connect, disconnect, connected } = useWallet();
  const [cooldown, setCooldown] = useState(0);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const shortKey = (key) => key?.toBase58().slice(0, 4) + ".." + key?.toBase58().slice(-4);

  const spin = () => {
    if (cooldown > 0) return;
    const result = memes[Math.floor(Math.random() * memes.length)];
    setOutcome(result);
    setCooldown(30);
  };

  const share = () => {
    const base = outcome?.type === "win" ? "🔥 You Won: Legend!" : "💀 Better Luck Next Time: Rugged!";
    const message = `${base}\n${outcome?.text}\nRugged by Spinny (@Spinnit_xyz)\nhttps://t.me/SpinnIt_Bot`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterURL, "_blank");
  };

  return (
    <div className="app-wrapper">
      <h1>Spinny Degen Roulette</h1>
      <div>
        <button>{connected ? shortKey(publicKey) : "Not Connected"}</button>
        <span style={{ marginLeft: "10px", color: "#ccc" }}>$PINN Balance: ~69,420.00</span>
      </div>
      <div style={{ margin: "10px 0" }}>
        <button className="phantom-button" onClick={connect}>
          🟣 {connected ? "Connected" : "Connect"}
        </button>
        <button style={{ background: "#600", color: "white", marginLeft: "10px" }}>
          Cooldown: {cooldown}s
        </button>
      </div>
      {outcome && (
        <>
          <div style={{ color: outcome.type === "win" ? "lime" : "red", marginTop: "10px" }}>
            {outcome.type === "win" ? "🦊 You Won: Legend!" : "💀 Better Luck Next Time: Rugged!"}
          </div>
          <p><b>{outcome.text}</b></p>
          <img src={outcome.image} alt="result meme" className="outcome-image" />
        </>
      )}
      <button onClick={spin} style={{ marginTop: "10px" }}>🎰 Spin</button>
      {outcome && (
        <button className="share-button" onClick={share}>Share on Twitter</button>
      )}
    </div>
  );
}

export default function App() {
  const endpoint = clusterApiUrl("mainnet-beta");
  const wallet = new PhantomWalletAdapter();

  return (
    <WalletProvider wallets={[wallet]} autoConnect>
      <InnerApp />
    </WalletProvider>
  );
}
