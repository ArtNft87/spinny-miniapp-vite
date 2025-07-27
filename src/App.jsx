import React, { useState, useEffect } from 'react'
import './App.css'

const outcomes = [
  {
    type: 'win',
    text: 'Spinny approves. Degen mode on',
    image: '/gifs/1g.gif',
  },
  {
    type: 'lose',
    text: 'Bottom fraud. Nice buy, genius.',
    image: '/gifs/2g.gif',
  },
]

function App() {
  const [wallet, setWallet] = useState('2YFv..aLcA')
  const [balance, setBalance] = useState('69,420.00')
  const [cooldown, setCooldown] = useState(30)
  const [outcome, setOutcome] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSpin = () => {
    const result = outcomes[Math.floor(Math.random() * outcomes.length)]
    setOutcome(result)
    setCooldown(30)
  }

  const handleShare = () => {
    const message = outcome
      ? `${outcome.text} — Powered by @Spinnit_xyz and $PINN buybacks.`
      : 'Try your luck on Spinny Degen Roulette!'
    const url = `https://t.me/SpinnIt_Bot`
    const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(url)}`
    window.open(tweet, '_blank')
  }

  return (
    <div className="container">
      <div className="header">Spinny Degen Roulette</div>
      <div>
        <button className="wallet-button">🔐 {wallet}</button>
        <span style={{ marginLeft: 10 }}>$PINN Balance: ~{balance}</span>
      </div>
      <div style={{ marginTop: 10 }}>
        <button className="wallet-button">🟣 Connect</button>
        <span className="cooldown">Cooldown: {cooldown}s</span>
      </div>

      {outcome && (
        <>
          <h4 style={{ marginTop: 16 }}>
            {outcome.type === 'win' ? '🦊 You Won: Legend!' : '💀 Rugged!'}
          </h4>
          <p style={{ fontWeight: 'bold' }}>{outcome.text}</p>
          <img
            src={outcome.image}
            alt="result meme"
            className="result-image"
          />
        </>
      )}

      <div>
        <button className="wallet-button" onClick={handleSpin}>
          🎰 Spin
        </button>
        <button className="share-button" onClick={handleShare}>
          Share on Twitter
        </button>
      </div>
    </div>
  )
}

export default App
