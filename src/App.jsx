import React, { useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

const winOutcomes = [
  { text: "You just pumped $PINN like a giga chad 📈", image: "/memes/win1.png" },
  { text: "DEGEN MODE: ON 🔥 Spinny approved.", image: "/memes/win3.png" },
  { text: "You spun it. You won it. Let 'em cry 🥶", image: "/memes/win4.png" },
  { text: "This was the top. And you’re the king 👑", image: "/memes/win6.png" },
  { text: "SPINNY: Degen Roulette Legend", image: "/memes/win7.gif" },
  { text: "MiniGame incoming. You're early 🚀", image: "/memes/win2.png" },
  { text: "Feeling lucky? You ARE lucky 😏", image: "/memes/win5.gif" },
];

const loseOutcomes = [
  { text: "RUGGED. Bottom fraud simulator activated 💀", image: "/memes/lose2.png" },
  { text: "You spun worse than a normie, PEPE 🐸", image: "/memes/lose6.png" },
  { text: "You’d be better off buying LUNA 🌕 in 2022", image: "/memes/lose3.png" },
  { text: "Spinny roasts incoming... and you got cooked 🍗", image: "/memes/lose1.png" },
  { text: "Spinny says: SHIBA? More like SHEEEEESH 🐕‍🔥", image: "/memes/lose7.png" },
  { text: "You just spun... and lost your dignity 🫠", image: "/memes/lose4.png" },
  { text: "Roasted harder than a Pepe bagholder", image: "/memes/lose5.png" },
];

const OutcomeDisplay = ({ outcome }) => {
  if (!outcome) return null;
  return (
    <div className="outcome">
      <h2>{outcome.text}</h2>
      <img src={outcome.image} alt="spin result" className="meme" />
    </div>
  );
};

const SpinnyGame = () => {
  const { publicKey } = useWallet();
  const [cooldown, setCooldown] = useState(0);
  const [outcome, setOutcome] = useState(null);

  const handleSpin = () => {
    if (cooldown > 0) return;

    const isWin = Math.random() < 0.5;
    const pick = isWin
      ? winOutcomes[Math.floor(Math.random() * winOutcomes.length)]
      : loseOutcomes[Math.floor(Math.random() * loseOutcomes.length)];
    setOutcome(pick);
    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown === 0) return;
    const interval = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <div className="game-container">
      <h1>Spinny MiniApp</h1>
      {publicKey && (
        <div className="wallet-info">
          <p>Connected: {publicKey.toBase58()}</p>
          <p>$PINN Balance: ~69,420.00</p>
        </div>
      )}
      <WalletMultiButton />
      <button onClick={handleSpin} disabled={cooldown > 0} className="spin-btn">
        {cooldown > 0 ? `Cooldown: ${cooldown}s` : "Spin Now"}
      </button>
      <OutcomeDisplay outcome={outcome} />
    </div>
  );
};

const App = () => {
  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SpinnyGame />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
