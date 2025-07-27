import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import './App.css';

const outcomes = [
  { text: 'Legendary spin. +420 $PINN 🚀', image: '/memes/win7.gif', type: 'win' },
  { text: 'Spinny approves. Degen mode on 🦊', image: '/memes/win1.png', type: 'win' },
  { text: 'Feeling lucky, punk? 🍀', image: '/memes/win6.png', type: 'win' },
  { text: 'You earned another spin 🌀', image: '/memes/win3.png', type: 'win' },

  { text: 'You’d be better off buying LUNA in 2022', image: '/memes/lose3.png', type: 'lose' },
  { text: 'SHIBA? More like Shitba. 🐕‍🦺', image: '/memes/lose7.png', type: 'lose' },
  { text: 'You spun worse than a normie 🫠', image: '/memes/lose6.png', type: 'lose' },
];

const getRandomOutcome = () => outcomes[Math.floor(Math.random() * outcomes.length)];

export default function App() {
  const { publicKey } = useWallet();
  const [result, setResult] = useState(null);
  const [cooldown, setCooldown] = useState(0);

  const shortWallet = publicKey
    ? publicKey.toBase58().slice(0, 4) + '…' + publicKey.toBase58().slice(-4)
    : '';
  const mockBalance = '69,420';

  const spin = () => {
    if (cooldown > 0) return;
    const outcome = getRandomOutcome();
    setResult(outcome);
    setCooldown(30);

    if (Math.random() < 0.1) alert('You won a free spin! 🌀');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const share = () => {
    if (!result) return;
    const quote = result.text;
    const handle = '@Spinnit_xyz';
    const typeMsg =
      result.type === 'win'
        ? `I WON and Spinny blessed me with $PINN 🔥`
        : `I just got RUGGED by Spinny like it’s Bitconnect 2.0 💀`;

    const tweetText = encodeURIComponent(
      `${typeMsg}\n\n"${quote}"\n\nSpinny is doing buybacks. Are you in or out?\n${handle} (Telegram MiniApp coming hot)`
    );

    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Spinny Degen Roulette</h1>

      {publicKey && (
        <div className="wallet-row">
          <button className="wallet-display">{shortWallet}</button>
          <p className="balance">$PINN: <strong>{mockBalance}</strong></p>
        </div>
      )}

      <div className="game-box">
        <WalletMultiButton className="wallet-button" />

        {cooldown > 0 ? (
          <div className="cooldown">Cooldown: {cooldown}s</div>
        ) : (
          publicKey && (
            <button className="spin-button" onClick={spin}>
              SPIN
            </button>
          )
        )}

        {result && (
          <>
            <div className={`result ${result.type}`}>
              <img src={result.image} alt="meme" className="result-image" />
              <div className="result-quote">{result.text}</div>
              <div className="outcome-label">
                {result.type === 'win' ? 'You Won: Legend!' : 'Better Luck Next Time: Rugged!'}
              </div>
            </div>

            <button className="share-button" onClick={share}>
              Share on Twitter
            </button>
          </>
        )}
      </div>
    </div>
  );
}
