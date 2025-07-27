import React, { useState, useEffect } from 'react';
import './App.css';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

const outcomes = [
  {
    text: "Spinny approves. Degen mode on",
    image: "/gifs/win-1.png",
    type: "win",
  },
  {
    text: "Bottom fraud. Nice buy, genius.",
    image: "/gifs/lose-1.png",
    type: "lose",
  },
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    try {
      if (window?.Telegram?.WebApp?.initData) {
        const provider = window.solana;
        if (provider?.isPhantom) {
          const res = await provider.connect();
          setWalletAddress(res.publicKey.toString());
          return;
        }
      }

      const adapter = new PhantomWalletAdapter();
      await adapter.connect();
      setWalletAddress(adapter.publicKey.toString());
    } catch (err) {
      console.error('Wallet connection error:', err);
    }
  };

  const spin = () => {
    if (cooldown > 0) return;

    const result = outcomes[Math.floor(Math.random() * outcomes.length)];
    setOutcome(result);
    setCooldown(30);
  };

  const shareToTwitter = () => {
    if (!outcome) return;
    const baseUrl = "https://twitter.com/intent/tweet";
    const win = outcome.type === 'win';
    const message = win
      ? `I just WON with Spinny! 🤑\n"${outcome.text}"\nSpin. Roast. Win. \n@Spinnit_xyz raining $PINN\nhttps://t.me/SpinnIt_Bot`
      : `Just got RUGGED by Spinny 🤡\n"${outcome.text}"\nDegen losses paid in memes. @Spinnit_xyz doing buybacks.\nhttps://t.me/SpinnIt_Bot`;

    window.open(`${baseUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="app">
      <div className="frame">
        <h1 className="title">Spinny Degen Roulette</h1>
        <div className="wallet-bar">
          <span className="wallet-tag">{walletAddress ? `${walletAddress.slice(0, 4)}..${walletAddress.slice(-4)}` : 'Not Connected'}</span>
          <span className="balance">$PINN Balance: ~69,420.00</span>
        </div>
        <div className="btn-row">
          <button className="phantom" onClick={connectWallet}>🟣 Connect</button>
          <button className="spin" disabled={cooldown > 0} onClick={spin}>
            {cooldown > 0 ? `Cooldown: ${cooldown}s` : 'Spin'}
          </button>
        </div>

        {outcome && (
          <>
            <div className={`result-text ${outcome.type}`}>
              {outcome.type === 'win'
                ? '🦊 You Won: Legend!'
                : '💀 Better Luck Next Time: Rugged!'}
            </div>
            <div className="outcome-quote">{outcome.text}</div>
            <img src={outcome.image} alt="result meme" className="meme" />
            <button className="share-btn" onClick={shareToTwitter}>Share on Twitter</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
