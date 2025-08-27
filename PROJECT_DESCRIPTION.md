# Project Description

**Deployed Frontend URL:** [TODO: Link to your deployed frontend]  
**Solana Program ID:** [TODO: Your deployed program's public key]

## Project Overview

### Description
The Solana Tipping dApp is a decentralized application that allows users to send SOL tips directly to other users’ wallets on the Solana blockchain. It uses an Anchor program with a Program Derived Address (PDA) to securely store the total tips received. The frontend is built with React and integrates with Solana wallets via the Solana Wallet Adapter, allowing users to easily connect their wallet and send tips. The dApp ensures transparent, on-chain transactions without relying on a centralized backend.

### Key Features
- **Initialize PDA:** Creates a tipping account with `totalTips` set to 0.  
- **Send Tip:** Users can send a specified amount of SOL to any recipient wallet.  
- **Frontend Wallet Integration:** Connect to Phantom or other supported Solana wallets.  
- **Real-time Transaction Confirmation:** The frontend displays success alerts after a transaction.  
- **Testing:** Comprehensive TypeScript tests cover both success and error scenarios.

### How to Use the dApp
1. **Connect Wallet:** Open the frontend and connect your Solana wallet (Phantom, Solflare, etc.).  
2. **Input Recipient:** Enter the public key of the wallet you want to tip.  
3. **Set Tip Amount:** Enter the amount of SOL (in lamports) you want to send.  
4. **Send Tip:** Click the "Send Tip" button to initiate the transaction.  
5. **Confirm Transaction:** Wait for the transaction to be confirmed on Devnet.

## Program Architecture

### PDA Usage
Program Derived Addresses (PDAs) are used to store the tipping account on-chain. The PDA ensures a deterministic address that is derived from the program and a fixed seed.

**PDAs Used:**
- `tipping_account`: Stores the total tips received. Seed used: `b"tipping"`.

### Program Instructions
**Instructions Implemented:**
- `initialize`: Initializes the tipping account with `totalTips = 0`.  
- `sendTip(amount: u64)`: Transfers the specified tip amount from sender to recipient and updates the total tips in the PDA.

### Account Structure
```rust
#[account]
pub struct TippingAccount {
    pub total_tips: u64, // Tracks the total amount of tips received
}
