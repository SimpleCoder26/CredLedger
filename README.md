<div align="center">
  
# 🎓 CredLedger

**Enterprise-grade Credential Issuance & Verification Platform built on the Stellar network using Soroban Smart Contracts.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stellar](https://img.shields.io/badge/Network-Stellar_Testnet-black)](https://stellar.org/)
[![Soroban](https://img.shields.io/badge/Smart_Contracts-Soroban-orange)](https://soroban.stellar.org/)

  <h3>🚀 Live Demo: <a href="https://cred-ledger-coral.vercel.app/">https://cred-ledger-coral.vercel.app/</a></h3>
  <h3>🎥 Video Walkthrough: <a href="https://youtu.be/_7xV6pcz-0s">https://youtu.be/_7xV6pcz-0s</a></h3>

![Hero Dashboard](./demo/img/Hero-wallet-connected.png)

*"Tamper-evident and cryptographically verifiable credential records secured by the Stellar network, bringing professional authenticity to the global stage."*

</div>

---

## 📖 What is CredLedger?
**CredLedger is a blockchain-backed credential passport that enables organizations to issue, revoke, and verify tamper-evident digital credentials through Stellar and Soroban.**

### The Problem
The education and professional certification industry is plagued by fraudulent credentials. Fake degrees, forged participation certificates, and unverifiable skill endorsements cost organizations billions in verification overhead and erode trust globally. Traditional PDF certificates can be trivially cloned, edited, or redistributed by malicious actors, making standard verification systems slow, manual, and fundamentally insecure.

### The Solution
CredLedger solves this by replacing easily forgeable documents with **cryptographically verifiable credential records**. 
- Organizations issue certificates as unique records anchored on-chain. 
- A SHA-256 data hash of the credential's content is securely stored in a Soroban smart contract.
- Role-Based Access Control (RBAC) ensures only whitelisted organizational wallets can issue or revoke credentials.

---

## 💎 Why Stellar?

CredLedger was intentionally designed around the Stellar network for several critical architectural reasons:
- **Low transaction costs** make individual credential issuance economically viable for institutions at scale.
- **Fast finality** enables near-real-time verification and a seamless user experience.
- **Soroban** provides highly programmable authorization (RBAC) and complex credential lifecycle logic (issuance, verification, revocation).
- **Stellar addresses** provide a portable, cryptographically secure issuer identity.
- **On-chain events** provide a transparent, auditable credential history.

---

## 🔄 Core User Flow

```text
Organization registers
        ↓
Admin authorizes issuer wallet
        ↓
Issuer connects Freighter Wallet
        ↓
Issuer creates credential payload
        ↓
Credential data → SHA-256 Hash
        ↓
Hash submitted to Soroban Smart Contract
        ↓
Transaction confirmed on Stellar Testnet
        ↓
QR Code generated dynamically
        ↓
Recipient receives verifiable PDF certificate
        ↓
Verifier scans QR code
        ↓
CredLedger Verification Page validates on-chain hash + status
```

---

## ⚙️ Credential Lifecycle

- **ISSUED** → Credential hash and metadata recorded securely on-chain.
- **VERIFIED** → QR scan triggers near-real-time verification, comparing the credential's payload against the immutable Stellar ledger.
- **REVOKED** → Authorized issuer changes the on-chain status, instantly invalidating all future verification attempts.

---

## 🏗️ Architecture

To achieve a seamless user experience while maintaining Web3 security, CredLedger leverages a hybrid on-chain/off-chain architecture.

```text
                    ┌──────────────────────────────┐
                    │        CREDLEDGER            │
                    │                              │
Issuer ────────────►│ Next.js Application          │
                    │        │                     │
                    │        ├── PostgreSQL        │
                    │        │   (metadata)        │
                    │        │                     │
                    │        └── Freighter         │
                    │             │                │
                    └─────────────┼────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────────┐
                    │       STELLAR TESTNET        │
                    │                              │
                    │ CredentialRegistry           │
                    │        │                     │
                    │        ▼                     │
                    │ CredIssuer (RBAC)            │
                    │                              │
                    │ Hash + issuer + timestamp    │
                    │ + revocation state           │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                              Verifier / QR
```

### Data Boundaries

**ON-CHAIN (Soroban Contracts):**
- Credential ID
- SHA-256 Payload Hash
- Issuer Wallet Address
- Issuance Timestamp
- Revocation State

**OFF-CHAIN (PostgreSQL / Application):**
- Recipient Information & Emails
- Certificate Design Metadata
- PDF Rendering Engine
- Analytical Data (Counts, Trends)
- Application-level History & Sorting

### Smart Contract Architecture

We implemented a **Dual-Contract Architecture** written in pure Rust (`no_std`) for security, upgradability, and modularity:

1. **CredIssuer Contract (`cred-issuer`)**
   - **Role:** Handles strict Role-Based Access Control (RBAC).
   - **Storage:** Persists `Admin` and an authorized `Issuer(Address)` registry using Soroban persistent storage.
   - **Functions:** `init`, `add_issuer`, `remove_issuer`, `is_issuer`, `upgrade`.

2. **CredentialRegistry Contract (`cred-registry`)**
   - **Role:** Handles the actual issuance, verification, and revocation of credentials.
   - **Storage:** Persists `Credential` structs containing `issuer`, `data_hash`, `issue_date`, and `is_revoked` state.
   - **Cross-Contract Call:** When a user calls `issue_credential()`, the Registry contract dynamically invokes the CredIssuer contract via `contractimport!` to assert the caller is an authorized issuer.

---

## 🔍 Verifiable Testnet Deployment

The core logic and credential state are secured on the Stellar Testnet. You can instantly audit the smart contracts and transactions via Stellar Expert:

*   **CredentialRegistry Contract**: [`CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY`](https://stellar.expert/explorer/testnet/contract/CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY)
*   **CredIssuer Contract (RBAC)**: [`CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5`](https://stellar.expert/explorer/testnet/contract/CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5)
*   **Demo Transaction Hash (Issuance)**: [`e6fb32868b2508841d51cd0aa8cb5cff432de839ae8dd15faaf60b7205b92eba`](https://stellar.expert/explorer/testnet/tx/e6fb32868b2508841d51cd0aa8cb5cff432de839ae8dd15faaf60b7205b92eba)
*   **Network**: Stellar Testnet
*   **Soroban RPC**: `https://soroban-testnet.stellar.org`

---

## 🚀 Features & Tech Stack

**Frontend Layer**
- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **State Management**: Zustand
- **Wallet Integration**: StellarWalletsKit v2.5.0 (Freighter support)
- **PDF Generation**: `@react-pdf/renderer`

**Blockchain & Backend Layer**
- **Smart Contracts**: Rust (Soroban SDK v27.0.0)
- **Database**: Prisma ORM + PostgreSQL (Neon serverless)
- **Testing**: Vitest (Frontend), `cargo test` (Contracts)
- **CI/CD**: GitHub Actions

---

## 📸 Platform Previews

### 🧰 Multi-Wallet Support
*Seamlessly connect using your preferred Stellar wallet via StellarWalletsKit's unified authentication modal.*
<div align="center">
  <img src="demo/img/multi-wallet.png" alt="Multi Wallet Options" width="800"/>
</div>

### 📜 Credential Issuance Feedback
*Issue credentials directly on-chain. Generates unique, verifiable QR codes and confirms via real-time toast notifications.*
<div align="center">
  <img src="demo/img/succesful-issue-toast.png" alt="Successful Issue" width="800"/>
</div>

### 🔍 Real-time Verification Page
*Scanning a certificate's QR code leads directly to the CredLedger verification page, which validates the payload against the tamper-evident hash stored on the Stellar ledger.*
<div align="center">
  <img src="demo/img/sucessfull-testnet.png" alt="Verification Page" width="800"/>
</div>

### 🎓 The Final Verifiable Certificate
*A beautifully designed, downloadable PDF certificate with an embedded QR code linking to the verification page.*
<div align="center">
  <img src="demo/img/an-issued-certific-new.png" alt="Issued Certificate" width="800"/>
</div>

### 🎨 Dashboard in Night Mode
*Premium UI/UX design showcasing a high-quality Night Mode integration.*
<div align="center">
  <img src="demo/img/dasboard-in-night-mode.png" alt="Night Mode Dashboard" width="800"/>
</div>

---

## 🔒 Security Model

- **Cross-Contract RBAC Validation:** Authorization is enforced on-chain. The `CredentialRegistry` contract independently validates the caller against the `CredIssuer` registry, preventing frontend-level authorization bypasses.
- **Data Privacy & Personalization:** The Next.js dashboard intelligently routes and isolates credential history queries purely based on the cryptographically connected Freighter wallet session. Issuers exclusively see their own data.
- **Credential Revocation:** Only the original issuer can revoke a credential. The contract enforces `credential.issuer == caller` logic to ensure only authorized wallet accounts can alter a credential's state.
- **WASM Upgradability:** Both contracts include an `upgrade(new_wasm_hash)` function restricted to the Admin, ensuring long-term bug fixes.
- **Wallet Security**: Uses `StellarWalletsKit` to ensure private keys never touch the DOM or React state. All signing is delegated entirely to the secure Freighter extension.
- **Data Integrity**: SHA-256 hashing ensures the on-chain `data_hash` is a tamper-evident fingerprint of the full credential data stored off-chain.

---

## 💻 Local Development & Setup

### Prerequisites
- Node.js 20+
- Rust Toolchain & Stellar CLI (for smart contract development)
- PostgreSQL database (or use [Neon](https://neon.tech/) serverless)
- Freighter Wallet browser extension

### Environment Variables
Create a `.env` file at the root:
```env
# Standard Prisma Postgres connection
DATABASE_URL="postgresql://user:password@localhost:5432/credledger"
# Required by Neon serverless for direct, non-pooled connections during migrations
DATABASE_URL_UNPOOLED="postgresql://user:password@localhost:5432/credledger"
```

Create a `.env.local` file at the root:
```env
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_REGISTRY_CONTRACT_ID=CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY
```

### Installation
```bash
git clone https://github.com/SimpleCoder26/CredLedger.git
cd CredLedger
npm install
npx prisma generate
npx prisma db push
npm run dev
```

---

## 📉 Limitations & Future Roadmap

To ensure maximum engineering maturity, we clearly document our current architectural constraints and future development path:

### Current Limitations
- **Testnet Only**: Currently deployed exclusively on the Stellar Testnet.
- **Off-chain Payload**: Credential payloads remain off-chain; only their cryptographic fingerprint is stored on-chain.
- **Revocation Dependency**: Revocation depends strictly on the issuer's authorized wallet.
- **Browser Signing**: Wallet signing is currently browser-based.
- **Database Role**: PostgreSQL provides application-level indexing and analytics, but is *not* the source of blockchain truth.

### Future Roadmap
- Stellar Mainnet deployment.
- Decentralized issuer governance.
- IPFS/Arweave integration for decentralized credential metadata.
- W3C Verifiable Credentials (VC) compatibility.
- Batch transaction optimization (issuing multiple credentials in a single Soroban invocation).
- Credential expiry mechanisms.

---

## 🏆 Stellar Belt Challenge Submission Evidence

*This section explicitly documents our satisfaction of the hackathon judging criteria.*

### ⚪️ Level 1 - White Belt

### 🌟 Hero Dashboard
**(✅ Showcasing Wallet Connection State & Live XLM Balance Retrieval)**
<div align="center">
  <img src="demo/img/Hero-wallet-connected.png" alt="Hero Dashboard" width="800"/>
</div>

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Wallet Setup** | ✅ Integrated `@creit.tech/stellar-wallets-kit@2.5.0` in `src/service/contract.ts` initialized with Freighter exclusively on `Networks.TESTNET`. |
| **Wallet Connection** | ✅ Built `src/components/ConnectWallet.tsx` managing global state via `zustand` (`src/store/wallet.ts`), capturing `address` and exposing unified connect/disconnect handlers. |
| **Balance Handling** | ✅ Fetches XLM balance via `rpc.Server('https://soroban-testnet.stellar.org').getAccount(address)` inside `fetchBalance()`. |
| **Transaction Flow** | ✅ `TransactionBuilder.fromXDR()` broadcasts signed XDR to Soroban RPC in `src/service/contract.ts` and parses success/failure into notifications. |
| **Development Standards** | ✅ Next.js App Router architecture (`src/app`), strictly typed `interface` definitions in TypeScript, and exhaustive `try-catch` blocks across all API routes. |
| **Required Deliverables** | ✅ Repository is public, `README.md` contains robust architecture diagrams, setup instructions, and core screenshots embedded. |

### 🟡 Level 2 - Yellow Belt

### 📱 Fully Mobile Responsive
**(✅ Built with a Fully Mobile-Responsive Architecture)**
<div align="center">
  <img src="demo/img/mobile-UI-1.png" alt="Mobile View 1" width="300"/>
  <img src="demo/img/mobile-ui-2.png" alt="Mobile View 2" width="300"/>
</div>

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **3 Error Types Handled** | ✅ 1. **Wallet Rejection**: Trapped explicitly in `StellarWalletsKit.signTransaction()` try-catch. 2. **Prisma Constraints**: Trapped preventing duplicate wallets. 3. **Smart Contract Panics**: Caught Soroban `WasmVm` Trap `Func(MismatchingParameterLen)`. |
| **Contract Deployed** | ✅ Deployed via `deploy.sh` to Soroban Testnet. Core: `CDLE...6XVY` (WASM hash `69af3688...`), RBAC: `CD6E...PRA5`. |
| **Contract Called** | ✅ `buildIssueCredentialTx` in `contract.ts` natively parses strings and invokes `issue_credential()` via `contract.call()`. |
| **Tx Status Visible** | ✅ Polling logic via `pollTransaction(hash)` queries `server.getTransaction()` in a 3s interval loop. |
| **Meaningful Commits** | ✅ 53+ highly descriptive, semantic commits (e.g., `feat(contracts): fix architectural rigidities...`) fully documenting the iteration cycle. |
| **Deliverable Met** | ✅ Functional mult-wallet capable architecture via `stellar-wallets-kit`, deployed Soroban contracts with native cross-contract calls. |
| **Required Deliverables** | ✅ Live Vercel deployment link, Multi-wallet functionality, and Verifiable Hash prominently displayed. |

### 🟠 Level 3 - Orange Belt

### 🧪 Automated CI/CD & Testing Suite
**(✅ 8 frontend tests + 3 Rust contract tests (including 2 integration tests) run via GitHub Actions `.github/workflows/ci.yml`)**
<div align="center">
  <img src="demo/img/ci-cd-pipe-new.png" alt="CI/CD Pipeline" width="800"/>
  <br/><br/>
  <img src="demo/img/test-new.png" alt="Frontend Test Suite" width="800"/>
  <br/><br/>
  <img src="demo/img/test-2-contracts.png" alt="Contract Test Suite" width="800"/>
</div>

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Advanced Contracts** | ✅ Dual-contract architecture written in pure Rust `no_std`. Uses `env.ledger().timestamp()` for unforgeable issuance timing. |
| **Inter-Contract Comm** | ✅ `CredentialRegistry` safely uses `cred_issuer_contract::Client::new(&env, &certifier_id)` to invoke `is_issuer(&caller)`. |
| **Event Streaming** | ✅ `env.events().publish((symbol_short!("issued"), credential_id.clone()), ...)` synchronously emits on-chain events. |
| **CI/CD Pipeline** | ✅ Implemented `.github/workflows/ci.yml` running `cargo test` on contracts and `npm run test` on the Next.js frontend. |
| **Deployment Workflow** | ✅ Custom bash script `deploy.sh` dynamically builds optimized WASM, initializes `CredIssuer`, extracts the dynamic `ISSUER_ID`, and passes it to `CredentialRegistry`. |
| **Mobile Responsive** | ✅ Leveraged Tailwind CSS breakpoints across complex grids to reflow sidebars into hamburger menus. |
| **Error & Loading States** | ✅ Global asynchronous `isLoading` state managed by Zustand gracefully disables UI buttons during RPC polling. |
| **Testing Suite** | ✅ 8 frontend tests + 3 Rust contract tests (including 2 integration tests: `test_registry_flow`, `test_unauthorized_revoke`). |
| **Production Architecture**| ✅ Built atop Next.js 16 App Router, Prisma ORM targeting Neon serverless Postgres, and `@stellar/stellar-sdk`. |
| **Documentation** | ✅ Embedded Mermaid.js architecture diagrams and ASCII boundaries explicitly detailing the hybrid Web3 execution sequence. |
| **Required Deliverables** | ✅ Functional YouTube Demo Walkthrough, complete testnet integration, robust README, and passing GitHub Actions pipeline. |
