import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h1>Spinny MiniApp</h1>
      <WalletMultiButton />
    </div>
  );
}

export default App;
