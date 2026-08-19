<div align="center">
  
# 🎓 CredLedger

**Enterprise-grade Credential Issuance & Verification Platform built on the Stellar network using Soroban Smart Contracts.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stellar](https://img.shields.io/badge/Network-Stellar_Testnet-black)](https://stellar.org/)
[![Soroban](https://img.shields.io/badge/Smart_Contracts-Soroban-orange)](https://soroban.stellar.org/)

  <h3>🚀 Live Production Deployment: <a href="https://cred-ledger-coral.vercel.app/">https://cred-ledger-coral.vercel.app/</a></h3>
  <h3>🎥 Video Walkthrough: <a href="https://youtu.be/_7xV6pcz-0s">https://youtu.be/_7xV6pcz-0s</a></h3>

![Hero Dashboard](./demo/img/Hero-wallet-connected.png)

*"Every credential has a digital passport — cryptographically secure, immutable, and instantly verifiable on the Stellar network to ensure academic and professional authenticity globally."*

</div>

---

## 📖 Product Overview & Problem Statement

### The Problem
The education and professional certification industry is plagued by fraudulent credentials. Fake degrees, forged participation certificates, and unverifiable skill endorsements cost organizations billions in verification overhead and erode trust globally. Traditional PDF certificates can be trivially cloned, edited, or redistributed by malicious actors, making standard verification systems slow, manual, and fundamentally insecure.

### The Solution: CredLedger
CredLedger introduces a **Verifiable Digital Credential Passport**. Every certificate is cryptographically secured on the Stellar blockchain, ensuring absolute provenance and instant verification.

- **Tamper-Proof Certificates**: Organizations issue certificates as unique, immutable records on-chain. A SHA-256 data hash of the credential's content is permanently stored on the Soroban smart contract.
- **Dual-Contract Architecture**: We separate **Role-Based Access Control (RBAC)** from credential registry logic. Only verified, authorized issuers (registered by an admin in the `CredIssuer` contract) can issue credentials via the `CredentialRegistry` contract.
- **Sequential On-Chain Batch Signing**: For CSV-based bulk issuance, CredLedger implements a sequential wallet signing loop that prompts the issuer to authenticate each credential individually, ensuring every single certificate receives its own genuine `transactionHash` on the Stellar network.
- **Instant QR Verification**: Anyone can scan the QR code on a physical or digital certificate to instantly read its provenance, verify authenticity against the Stellar ledger via Stellar Expert, and confirm the credential hasn't been revoked.
- **Revocation & Lifecycle**: If a certificate is revoked by the original issuer, the on-chain status is updated to `is_revoked: true`, instantly invalidating the QR code scan for any future verifiers.

---

## 🏗️ Architecture & Core Mechanism

### High-Level System Architecture

```mermaid
graph TD
    A[Issuer / Organization] -->|Issues Credential| B(CredentialRegistry Smart Contract)
    B -->|Cross-Contract Auth| C(CredIssuer RBAC Registry)
    C -.->|Returns Auth Result| B
    B -->|Stores Data Hash & Emits Event| D[(Stellar Testnet)]
    E[Verifier / Public] -->|Scans QR & Reads Provenance| D
    F[Next.js App Router] -->|CRUD & Analytics| G[(Prisma PostgreSQL DB)]
    F -->|Signs Transactions| H[Freighter Wallet via StellarWalletsKit]
```

### Smart Contract Execution Sequence

We implemented a **Dual-Contract Architecture** for security, upgradability, and modularity:

1. **CredIssuer Contract (`cred-issuer`)**
   - **Role:** Handles strict Role-Based Access Control (RBAC).
   - **Storage:** Persists `Admin` and an authorized `Issuer(Address)` registry using Soroban persistent storage.
   - **Functions:** `init`, `add_issuer`, `remove_issuer`, `is_issuer`, `upgrade`.

2. **CredentialRegistry Contract (`cred-registry`)**
   - **Role:** Handles the actual issuance, verification, and revocation of credentials.
   - **Storage:** Persists `Credential` structs containing `issuer`, `data_hash`, `issue_date`, and `is_revoked` state.
   - **Inter-Contract Communication:** When a user calls `issue_credential()`, the Registry contract dynamically invokes the CredIssuer contract via `contractimport!` to assert the caller is an authorized issuer.
   - **Event Emission:** Emits `issued` and `revoked` events for frontend subscription and real-time activity feeds.

**Inter-Contract Communication Flow:**
```mermaid
sequenceDiagram
    participant UI as Next.js Client
    participant Registry as CredentialRegistry
    participant RBAC as CredIssuer (RBAC)
    
    UI->>Registry: invoke issue_credential(caller, id, hash, date)
    Registry->>RBAC: invoke is_issuer(caller)
    RBAC-->>Registry: true
    Registry->>Registry: Store Credential Data
    Registry->>Registry: Emit "issued" Event
    Registry-->>UI: Success & txHash
```

---

## 🛡️ Contract Addresses & Verifiable Links

The core logic and credential state are secured on the Stellar Testnet. You can instantly verify the smart contracts and the latest transactions via Stellar Expert:

*   **CredentialRegistry Contract (Core)**: [`CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY`](https://stellar.expert/explorer/testnet/contract/CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY)
*   **CredIssuer Contract (RBAC)**: [`CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5`](https://stellar.expert/explorer/testnet/contract/CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5)
*   **Demo Transaction Hash (Issuance)**: [`e6fb32868b2508841d51cd0aa8cb5cff432de839ae8dd15faaf60b7205b92eba`](https://stellar.expert/explorer/testnet/tx/e6fb32868b2508841d51cd0aa8cb5cff432de839ae8dd15faaf60b7205b92eba)
*   **Network**: [Stellar Testnet](https://stellar.expert/explorer/testnet)
*   **Soroban RPC**: [https://soroban-testnet.stellar.org](https://soroban-testnet.stellar.org)

---

## 🏆 Stellar Belt Challenge Submission Checklist

### ⚪️ Level 1 - White Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Wallet Setup** | ✅ Integrated `@creit.tech/stellar-wallets-kit@0.1.2` in `src/service/contract.ts:45` using `defaultModules()` initialized with Freighter exclusively on `Networks.TESTNET`. |
| **Wallet Connection** | ✅ Built `src/components/ConnectWallet.tsx` managing global state via `zustand` (`src/store/wallet.ts`), capturing `address` and exposing unified connect/disconnect handlers. |
| **Balance Handling** | ✅ Fetches XLM balance via `rpc.Server('https://soroban-testnet.stellar.org').getAccount(address)` inside `fetchBalance()` in `src/store/wallet.ts:25`. |
| **Transaction Flow** | ✅ `TransactionBuilder.fromXDR()` broadcasts signed XDR to Soroban RPC in `src/service/contract.ts:63` and parses success/failure into `react-hot-toast` notifications (`src/app/dashboard/issue/page.tsx:150`). |
| **Development Standards** | ✅ Next.js App Router architecture (`src/app`), strictly typed `interface` definitions in TypeScript, and exhaustive `try-catch` blocks across all API routes (`src/app/api`). |
| **Required Deliverables** | ✅ Repository is public, `README.md` contains robust architecture diagrams, setup instructions in `# Installation`, and 4 explicit screenshots embedded in `# Visual Proof`. |

### 🟡 Level 2 - Yellow Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **3 Error Types Handled** | ✅ 1. **Wallet Rejection (`code: -1`)**: Trapped explicitly in `StellarWalletsKit.signTransaction()` try-catch. 2. **Prisma DB Constraints**: `P2002` trapped in `api/organization/route.ts` preventing duplicate wallets. 3. **Smart Contract Panics**: Caught Soroban `WasmVm` Trap `Func(MismatchingParameterLen)` and `UnexpectedSize` via RPC error decoding in `contract.ts:67`. |
| **Contract Deployed** | ✅ Deployed via `deploy_all.sh` to Soroban Testnet. Core: `CDLE...6XVY` (WASM hash `69af3688...`), RBAC: `CD6E...PRA5` (WASM hash `f7ca6149...`). |
| **Contract Called** | ✅ `buildIssueCredentialTx` in `contract.ts:28` natively parses strings via `nativeToScVal(credentialId, { type: 'string' })` and invokes `issue_credential()` via `contract.call()`. |
| **Tx Status Visible** | ✅ Polling logic via `pollTransaction(hash)` in `contract.ts:74` queries `server.getTransaction()` in a 3s interval loop up to 20 attempts before rendering the Success Modal. |
| **Meaningful Commits** | ✅ 53+ highly descriptive, semantic commits (e.g., `feat(contracts): fix architectural rigidities...`, `fix: deploy properly built wasm with 3 params`) fully documenting the iteration cycle. |
| **Deliverable Met** | ✅ Functional mult-wallet capable architecture via `stellar-wallets-kit`, deployed Soroban contracts with native cross-contract calls, and live real-time `issued` events. |
| **Required Deliverables** | ✅ Live Vercel deployment link, Multi-wallet (`demo/img/multi-wallet.png`), and Verifiable Hash (`e6fb32868b25...`) prominently displayed. |

### 🟠 Level 3 - Orange Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Advanced Contracts** | ✅ Dual-contract architecture written in pure Rust `no_std`. Uses `env.ledger().timestamp()` in `cred-registry/src/lib.rs:66` for unforgeable issuance timing, preventing client-side spoofing. |
| **Inter-Contract Comm** | ✅ `CredentialRegistry` safely uses `cred_issuer_contract::Client::new(&env, &certifier_id)` to invoke `is_issuer(&caller)` in `cred-registry/src/lib.rs:54`. |
| **Event Streaming** | ✅ `env.events().publish((symbol_short!("issued"), credential_id.clone()), ...)` synchronously emits on-chain events (`cred-registry/src/lib.rs:79`) for history tracking. |
| **CI/CD Pipeline** | ✅ Implemented `.github/workflows/test.yml` running `cargo test` on contracts and `npm run test` on the Next.js frontend for every push to `main`. |
| **Deployment Workflow** | ✅ Custom bash script `deploy_all.sh` dynamically builds optimized WASM, initializes `CredIssuer`, extracts the dynamic `ISSUER_ID`, and passes it to `CredentialRegistry`'s init sequence. |
| **Mobile Responsive** | ✅ Leveraged Tailwind CSS breakpoints (`md:`, `lg:`) across complex grids in `src/app/dashboard/layout.tsx` to reflow sidebars into hamburger menus. |
| **Error & Loading States** | ✅ Global asynchronous `isLoading` state managed by Zustand (`src/store/wallet.ts`), gracefully disabling UI buttons during RPC polling and transaction signing windows. |
| **Testing Suite** | ✅ 8 distinct frontend Vitest units targeting React components, and 2 extensive Rust integration tests (`test_registry_flow`, `test_unauthorized_revoke`) in `cred-registry/src/test.rs`. |
| **Production Architecture**| ✅ Built atop Next.js 16 App Router, Prisma ORM targeting Neon serverless Postgres, and `@stellar/stellar-sdk` version `12.x`. |
| **Documentation** | ✅ Embedded Mermaid.js architecture diagrams (`graph TD` and `sequenceDiagram`) directly detailing the cross-contract execution sequence. |
| **Required Deliverables** | ✅ Functional YouTube Demo Walkthrough, complete testnet integration, robust README, and passing GitHub Actions pipeline. |

---

## 🚀 Features & Tech Stack

**Frontend Layer**
- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons + Framer Motion
- **State Management**: Zustand (Global Store with `persist` middleware)
- **Wallet Integration**: StellarWalletsKit v2.5.0 (Freighter support)
- **Data Fetching**: React Query (TanStack Query v5)
- **PDF Generation**: `@react-pdf/renderer` for downloadable certificates
- **Charts**: Recharts for analytics dashboards

**Blockchain & Backend Layer**
- **Smart Contracts**: Rust (Soroban SDK v27.0.0)
- **Network**: Stellar Testnet
- **RPC**: Soroban RPC (`https://soroban-testnet.stellar.org`)
- **Database**: Prisma ORM + PostgreSQL (Neon serverless)
- **Testing**: Vitest + React Testing Library (Frontend), `cargo test` (Contracts)
- **CI/CD**: GitHub Actions (Lint, Test, Build on every push/PR)

---

## ⚙️ How It Works Under the Hood

To achieve a seamless, Web2-like user experience while maintaining Web3 immutability, CredLedger leverages a hybrid architecture:

1. **Next.js API Routes & Prisma**:
   - When credentials are issued, the frontend calls `/api/issue` to persist batch and certificate data in PostgreSQL via Prisma.
   - This powers complex features like personalized batch history, analytics dashboards, and instant QR lookups without burdening the user with gas fees for every query.

2. **Soroban Smart Contracts (Rust)**:
   - The heavy lifting of **trust** is handled on-chain. The `CredentialRegistry` contract relies on the `CredIssuer` contract via a cross-contract call (`contractimport!`) to assert that the caller's `Address` is whitelisted.
   - Instead of storing massive payloads on the ledger, we compute a **SHA-256 hash** of the credential data and only store the `data_hash` on-chain. 

3. **StellarWalletsKit & RPC Integration**:
   - The frontend uses `StellarWalletsKit` to securely connect to the Freighter extension. When an issuer creates a credential, the browser delegates the XDR signing to the wallet.
   - We poll the Soroban RPC (`server.getTransaction`) to fetch live ledger confirmations.

4. **Transaction Lifecycle UI**:
   - Every transaction goes through a visible lifecycle: `pending` (awaiting wallet signature) → `processing` (submitted to RPC, polling) → `confirmed` (on-chain) or `failed`.

---

## 📸 Platform Previews Gallery

| 🌟 Hero & Dashboard | 🧰 Multi-Wallet Support |
| :---: | :---: |
| *A sleek, professional landing page. Connect your Freighter wallet to sign and submit credentials directly to the Stellar network.*<br/><br/>**(✅ Showcasing Wallet Connection State & Live XLM Balance Retrieval)** | *Seamlessly connect using your preferred Stellar wallet via StellarWalletsKit's unified authentication modal.*<br/><br/>**(✅ Supporting Multiple Wallet Provider Options)** |
| <img src="demo/img/Hero-wallet-connected.png" width="400"/> | <img src="demo/img/multi-wallet.png" width="400"/> |

| 📜 Credential Issuance Feedback | 🔍 Real-time Verification Page |
| :---: | :---: |
| *Issue credentials directly on-chain. Generates unique, verifiable QR codes and confirms via real-time toast notifications.*<br/><br/>**(✅ Showcasing a Successful Testnet Transaction with Real-time User Feedback)** | *Instantly read the entire credential provenance and verify authenticity against the Stellar ledger.*<br/><br/>**(✅ Successfully verified on Stellar Testnet: Transaction Hash `e6fb32868b2508841d51cd0aa8cb5cff432de839ae8dd15faaf60b7205b92eba`)** |
| <img src="demo/img/succesful-issue-toast.png" width="400"/> | <img src="demo/img/sucessfull-testnet.png" width="400"/> |

| 🎓 The Final Verifiable Certificate | 🎨 Dashboard in Night Mode |
| :---: | :---: |
| *A beautifully designed, downloadable PDF certificate with an embedded QR code linking to the on-chain verification page.* | *Premium UI/UX design showcasing a high-quality Night Mode integration for comfortable extended use.* |
| <img src="demo/img/an-issued-certific-new.png" width="400"/> | <img src="demo/img/dasboard-in-night-mode.png" width="400"/> |

### 📱 Fully Mobile Responsive
*The entire application, including complex dashboards, sidebars, and tables, is completely optimized for seamless mobile usage.*
**(✅ Built with a Fully Mobile-Responsive Architecture)**
<div align="center">
  <img src="demo/img/mobile-UI-1.png" alt="Mobile View 1" width="300"/>
  <img src="demo/img/mobile-ui-2.png" alt="Mobile View 2" width="300"/>
</div>

### 🧪 Automated CI/CD & Testing Suite
*Comprehensive testing ensures platform stability. Our suite includes 8 frontend tests (Vitest) and 3 Rust Soroban contract tests. GitHub Actions handles automated CI/CD.*
**(✅ Fully Automated CI/CD Deployment Pipeline via GitHub Actions & 8 Passing Frontend Tests + 3 Rust Contract Tests)**
<div align="center">
  <img src="demo/img/ci-cd-pipe-new.png" alt="CI/CD Pipeline" width="800"/>
  <br/><br/>
  <img src="demo/img/test-new.png" alt="Frontend Test Suite" width="800"/>
  <br/><br/>
  <img src="demo/img/test-2-contracts.png" alt="Contract Test Suite" width="800"/>
</div>

---

## 🔒 Security Considerations

- **Cross-Contract RBAC Validation:** Blockchain logic is immune to local bypass. The `CredentialRegistry` contract forcibly checks the `CredIssuer` contract state on every `issue_credential` call.
- **Data Privacy & Personalization:** The Next.js dashboard intelligently routes and isolates credential history queries purely based on the cryptographically connected Freighter wallet session. Issuers exclusively see their own data.
- **Credential Revocation:** Only the original issuer can revoke a credential. The contract enforces `credential.issuer != caller` checks before allowing revocation.
- **WASM Upgradability:** Both contracts include an `upgrade(new_wasm_hash)` function restricted to the Admin, ensuring long-term bug fixes.
- **Wallet Security**: Uses `StellarWalletsKit` to ensure private keys never touch the DOM or React state. All signing is delegated entirely to the secure Freighter extension.
- **Data Integrity**: SHA-256 hashing ensures the on-chain `data_hash` is a tamper-proof fingerprint of the full credential data stored off-chain.

---

## 📁 Project Directory Structure

```text
CredLedger/
├── .github/workflows/          # CI/CD Pipeline (GitHub Actions)
├── contracts/                  # Soroban Smart Contracts Workspace
│   ├── contracts/cred-issuer/  # Contract 1: RBAC Issuer Registry
│   ├── contracts/cred-registry/# Contract 2: Credential Registry (Core Logic)
│   └── Cargo.toml              # Rust Workspace (Soroban SDK v27.0.0)
├── src/                        # Next.js Frontend & Backend Application
│   ├── app/                    # Next.js App Router (Pages & API Routes)
│   ├── components/             # Reusable UI elements
│   ├── lib/                    # Shared utilities
│   ├── service/                # Blockchain service layer
│   └── store/                  # Zustand global state
├── prisma/                     # PostgreSQL Database Schema
├── demo/img/                   # Screenshots for documentation
├── deploy.sh                   # Testnet deployment script
└── package.json                # NPM Dependencies
```

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
DATABASE_URL="postgresql://user:password@localhost:5432/credledger"
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
git clone https://github.com/YourUsername/CredLedger.git
cd CredLedger
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Running Tests
```bash
# Frontend Tests (Vitest — 8 passing tests)
npm run test

# Smart Contract Tests (Cargo — 3 passing tests)
npm run test:contracts
```

### Deploying Contracts Manually
If you wish to redeploy to testnet, run our provided bash script:
```bash
chmod +x deploy.sh
./deploy.sh
```
*(Ensure your `stellar keys` are configured and funded by [Friendbot](https://friendbot.stellar.org/) first!)*

---

## 🚢 CI/CD & Deployment

### GitHub Actions Pipeline (`ci.yml`)
Our dual pipeline runs automatically on every push to `main` and on every PR:

1. **Smart Contracts Pipeline** (`contracts-test-build`):
   - Sets up Rust toolchain with `wasm32v1-none` target
   - Builds both `cred-issuer` and `credledger-registry` WASM artifacts
   - Runs `cargo test` for contract unit tests

2. **Frontend Pipeline** (`frontend-test-build`):
   - Sets up Node.js v20 with npm cache
   - Installs NPM dependencies
   - Runs ESLint and Vitest suite (8 tests)
   - Builds Next.js application

### Vercel Deployment
The frontend is continuously deployed to Vercel on every push to `main`. Environment variables are configured in the Vercel dashboard.
