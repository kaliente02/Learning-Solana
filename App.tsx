import { useState } from "react";
import * as anchor from "@project-serum/anchor";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "./idl.json";

const programID = new PublicKey("ReplaceWithYourProgramID");
const network = "https://api.devnet.solana.com";
const opts = { preflightCommitment: "processed" as const };

function App() {
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  const sendTip = async () => {
    const connection = new Connection(network);
    const provider = new anchor.AnchorProvider(connection, window.solana, opts.preflightCommitment);
    const program = new anchor.Program(idl as any, programID, provider);

    const [tippingAccount, _] = await PublicKey.findProgramAddress(
      [Buffer.from("tipping")],
      programID
    );

    await program.methods.sendTip(new anchor.BN(tipAmount))
      .accounts({
        tippingAccount,
        sender: provider.wallet.publicKey,
        recipient: new PublicKey(recipient),
        systemProgram: SystemProgram.programId
      }).rpc();

    alert("Tip sent!");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Solana Tipping dApp</h1>
      <input
        type="text"
        placeholder="Recipient PublicKey"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: "400px", margin: "10px 0", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Amount in lamports"
        value={tipAmount}
        onChange={(e) => setTipAmount(Number(e.target.value))}
        style={{ width: "200px", margin: "10px 0", padding: "5px" }}
      />
      <br />
      <button onClick={sendTip} style={{ padding: "10px 20px" }}>Send Tip</button>
    </div>
  );
}

export default App;
