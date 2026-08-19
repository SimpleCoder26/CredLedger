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

## 🛡️ Contract Addresses & Verifiable Links

The core logic and credential state are secured on the Stellar Testnet. You can instantly verify the smart contracts and the latest transactions via Stellar Expert:

*   **CredentialRegistry Contract (Core)**: [`CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY`](https://stellar.expert/explorer/testnet/contract/CDLEJNHA46O754EAYGOEVSC6KPZUGAGNGM4BYQVJMSLS7Q7OREZD6XVY)
*   **CredIssuer Contract (RBAC)**: [`CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5`](https://stellar.expert/explorer/testnet/contract/CD6EOBIBTAEUVKLNGMN65454HLQTLV2PXYEFXB4U3OCNATX7UCTBPRA5)
*   **Demo Transaction Hash (Issuance)**: [`76489e7c697835bf82bb7e5186ea19c88e8251cc316f384fe99d93c0f620edcb`](https://stellar.expert/explorer/testnet/tx/76489e7c697835bf82bb7e5186ea19c88e8251cc316f384fe99d93c0f620edcb)
*   **Network**: [Stellar Testnet](https://stellar.expert/explorer/testnet)
*   **Soroban RPC**: [https://soroban-testnet.stellar.org](https://soroban-testnet.stellar.org)

---

## 🏆 Stellar Belt Challenge Submission Checklist

### ⚪️ Level 1 - White Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Wallet Setup** | ✅ Integrated StellarWalletsKit (Freighter) exclusively on Testnet |
| **Wallet Connection** | ✅ Unified UI component for seamless connect/disconnect with custom Pill design |
| **Balance Handling** | ✅ Fetches and clearly displays XLM balance via Soroban RPC |
| **Transaction Flow** | ✅ UI shows success/failure toasts and verified Tx Hash |
| **Development Standards** | ✅ High-quality UI, wallet integration, and error handling |
| **Required Deliverables** | ✅ Repo, README, Setup instructions, and 4 required Screenshots |

### 🟡 Level 2 - Yellow Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **3 Error Types Handled** | ✅ Wallet rejection (`code: -1`), Prisma DB errors, Smart Contract validation failures |
| **Contract Deployed** | ✅ `CredIssuer` (RBAC) & `CredentialRegistry` (Core) Soroban contracts deployed on Testnet |
| **Contract Called** | ✅ Frontend successfully calls the deployed smart contracts to issue credentials |
| **Tx Status Visible** | ✅ Success modals and real-time ledger polling confirm execution |
| **Meaningful Commits** | ✅ Repository contains 53+ meaningful commits documenting the journey |
| **Deliverable Met** | ✅ Multi-wallet app with deployed contract and real-time events |
| **Required Deliverables** | ✅ Live demo, Multi-wallet screenshot, Verifiable Tx Hash |

### 🟠 Level 3 - Orange Belt Submission

| Requirement | Status & Implementation Details |
| :--- | :--- |
| **Advanced Contracts** | ✅ Built bespoke `CredIssuer` and `CredentialRegistry` contracts using Rust (Soroban SDK v27) |
| **Inter-Contract Comm** | ✅ `CredentialRegistry` securely cross-calls `CredIssuer` via `contractimport!` to verify issuer RBAC |
| **Event Streaming** | ✅ Live Activity Blockchain Explorer actively polls the database for real-time on-chain events |
| **CI/CD Pipeline** | ✅ GitHub Actions runs Rust contract tests, ESLint, Vitest, and Next.js builds on every push/PR |
| **Deployment Workflow** | ✅ Automated `deploy.sh` script provided for testnet deployment |
| **Mobile Responsive** | ✅ Complex dashboards, sidebars, and navigation perfectly optimized for mobile |
| **Error & Loading States** | ✅ Rich UX loading states (Zustand), transaction lifecycle UI (pending/processing/confirmed/failed), and Toast notifications |
| **Testing Suite** | ✅ 8 Vitest frontend tests passing + 3 Rust smart contract unit tests passing |
| **Production Architecture**| ✅ Built on Next.js 16 App Router, Prisma PostgreSQL ORM, Zustand, and Tailwind CSS |
| **Documentation** | ✅ Comprehensive professional README with architecture diagrams and contract details |
| **Required Deliverables** | ✅ Video Demo, Mobile/CI screenshots, Contract IDs & Hash, 3+ passing tests |

---

## 📖 Product Overview & Problem Statement

### The Problem
The education and professional certification industry is plagued by fraudulent credentials. Fake degrees, forged participation certificates, and unverifiable skill endorsements cost organizations billions in verification overhead and erode trust globally. Traditional PDF certificates can be trivially cloned, edited, or redistributed by malicious actors, making standard verification systems slow, manual, and fundamentally insecure.

### The Solution: CredLedger
CredLedger introduces a **Verifiable Digital Credential Passport**. Every certificate is cryptographically secured on the Stellar blockchain, ensuring absolute provenance and instant verification.
- **Tamper-Proof Certificates**: Organizations issue certificates as unique, immutable records on-chain. A SHA-256 data hash of the credential's content is permanently stored on the Soroban smart contract.
- **Dual-Contract Architecture**: We separate Role-Based Access Control (RBAC) from credential registry logic. Only verified, authorized issuers (registered by an admin in the `CredIssuer` contract) can issue credentials via the `CredentialRegistry` contract.
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

## 🚀 Features & Tech Stack

**Frontend Layer**
- **Framework**: Next.js 16.2.10 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Lucide Icons + Framer Motion
- **State Management**: Zustand (Global Store with `persist` middleware)
- **Wallet Integration**: StellarWalletsKit v2.5.0 (Freighter support)
- **Data Fetching**: React Query (TanStack Query v5)
- **PDF Generation**: @react-pdf/renderer for downloadable certificates
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
   - When credentials are issued, the frontend calls `/api/issue` to persist batch and certificate data (recipient emails, dynamic CSV data, data hashes) in our PostgreSQL database via Prisma ORM.
   - This allows us to power complex features like batch history, analytics dashboards, and instant QR lookups without burdening the user with gas fees for every database query.

2. **Soroban Smart Contracts (Rust)**:
   - The heavy lifting of **trust** is handled on-chain. The `CredentialRegistry` contract relies on the `CredIssuer` contract via a cross-contract call (`contractimport!`) to assert that the caller's `Address` is whitelisted as an authorized issuer.
   - Instead of storing massive credential payloads on the ledger, we compute a **SHA-256 hash** of the credential data and only store the `data_hash` on-chain. This guarantees data integrity while keeping transaction costs negligible.

3. **StellarWalletsKit & RPC Integration**:
   - The frontend uses `StellarWalletsKit` to seamlessly connect to the Freighter extension. When an issuer creates a credential, the browser delegates the signing of the XDR payload to the wallet.
   - We poll the Soroban RPC (`server.getTransaction`) to fetch live ledger confirmation, ensuring the UI reflects the true on-chain state instantly with pending → processing → confirmed transitions.

4. **Transaction Lifecycle UI**:
   - Every transaction goes through a visible lifecycle: `pending` (awaiting wallet signature) → `processing` (submitted to Soroban RPC, polling for confirmation) → `confirmed` (on-chain) or `failed` (with error message and retry option).

---

## 📁 Project Directory Structure

```text
CredLedger/
├── .github/workflows/          # CI/CD Pipeline (GitHub Actions)
│   └── ci.yml                  # Dual pipeline: Contracts + Frontend
├── contracts/                  # Soroban Smart Contracts Workspace
│   ├── contracts/cred-issuer/  # Contract 1: RBAC Issuer Registry
│   │   └── src/
│   │       ├── lib.rs          # init, add_issuer, remove_issuer, is_issuer, upgrade
│   │       └── test.rs         # Unit test: test_certifier_flow
│   ├── contracts/cred-registry/# Contract 2: Credential Registry (Core Logic)
│   │   └── src/
│   │       ├── lib.rs          # issue_credential, revoke_credential, verify_credential, upgrade
│   │       └── test.rs         # Unit test: test_registry_flow (with MockCertifier)
│   └── Cargo.toml              # Rust Workspace (Soroban SDK v27.0.0)
├── src/                        # Next.js Frontend & Backend Application
│   ├── app/                    # Next.js App Router (Pages & API Routes)
│   │   ├── page.tsx            # Landing Page (Hero)
│   │   ├── dashboard/
│   │   │   ├── issue/          # Batch & Manual Credential Issuance
│   │   │   ├── history/        # Batch History & Search
│   │   │   ├── activity/       # Real-time Blockchain Activity Feed
│   │   │   ├── analytics/      # Issuance Analytics & Charts
│   │   │   ├── settings/       # Organization Profile Settings
│   │   │   └── templates/      # Certificate Template Management
│   │   ├── verify/[id]/        # Public Credential Verification Page
│   │   ├── c/[id]/             # Public Certificate Render Page
│   │   └── api/                # Next.js API Routes (issue, certificates, analytics)
│   ├── components/             # Reusable UI elements (WalletConnect, Navbar, Templates)
│   │   └── __tests__/          # Vitest test suite (3 files, 6 tests)
│   ├── lib/                    # Shared utilities (Prisma singleton, utils)
│   ├── service/                # Blockchain service layer (contract.ts)
│   └── store/                  # Zustand global state (wallet.ts, settings.ts)
├── prisma/                     # PostgreSQL Database Schema
│   └── schema.prisma           # Organization, Template, CertificateBatch, Certificate
├── demo/img/                   # Screenshots for documentation
├── deploy.sh                   # Testnet deployment script
├── package.json                # NPM Dependencies
└── README.md                   # This document
```



## 📸 Platform Previews

### 🌟 Hero & Dashboard
*A sleek, professional landing page. Connect your Freighter wallet to sign and submit credentials directly to the Stellar network.*
**(✅ Showcasing Wallet Connection State & Live XLM Balance Retrieval)**
<div align="center">
  <img src="demo/img/Hero-wallet-connected.png" alt="Hero Dashboard" width="800"/>
</div>

### 🧰 Multi-Wallet Support
*Seamlessly connect using your preferred Stellar wallet via StellarWalletsKit's unified authentication modal.*
**(✅ Supporting Multiple Wallet Provider Options)**
<div align="center">
  <img src="demo/img/multi-wallet.png" alt="Multi Wallet Options" width="800"/>
</div>

### 📜 Credential Issuance & Transaction Feedback
*Issue credentials directly on-chain. The system generates unique, verifiable QR codes and confirms via real-time toast notifications showing the transaction hash.*
**(✅ Showcasing a Successful Testnet Transaction with Real-time User Feedback)**
<div align="center">
  <img src="demo/img/succesful-issue-toast.png" alt="Successful Issue" width="800"/>
</div>

### 🔍 Real-time Verification Page
*Anyone can visit the verification URL or scan the QR code to instantly read the entire credential provenance and verify authenticity against the Stellar ledger via Stellar Expert.*
**(✅ Successfully verified on Stellar Testnet: Transaction Hash `76489e7c697835bf82bb7e5186ea19c88e8251cc316f384fe99d93c0f620edcb`)**
<div align="center">
  <img src="demo/img/verifctaion-on-steller-testnet.png" alt="Verification Page" width="800"/>
</div>

### 🎓 The Final Product: A Verifiable Certificate
*A beautifully designed, downloadable PDF certificate with embedded QR code linking to the on-chain verification page.*
<div align="center">
  <img src="demo/img/issued-demo-certificate.png" alt="Issued Certificate" width="800"/>
</div>

### 📱 Fully Mobile Responsive
*The entire application, including complex dashboards, sidebars, and tables, is completely optimized for seamless mobile usage.*
**(✅ Built with a Fully Mobile-Responsive Architecture)**
<div align="center">
  <img src="demo/img/mobile-UI-1.png" alt="Mobile View 1" width="300"/>
  <img src="demo/img/mobile-ui-2.png" alt="Mobile View 2" width="300"/>
</div>

### 🧪 Automated Testing Suite
*Comprehensive testing ensures platform stability. Our suite includes 8 frontend tests (Vitest + React Testing Library + Integration) and 3 Rust Soroban contract tests.*
**(✅ Ensuring Stability with 8 Passing Frontend Tests + 3 Rust Contract Tests)**
<div align="center">
  <img src="demo/img/test-1.png" alt="Frontend Test Suite" width="800"/>
  <br/>
  <br/>
  <img src="demo/img/test-2-contracts.png" alt="Contract Test Suite" width="800"/>
</div>

### 🚀 CI/CD Pipeline
*Automated GitHub Actions trigger on every push and PR to `main`, running ESLint, Vitest, Next.js build, Cargo build, and Cargo test in a dual pipeline.*
**(✅ Fully Automated CI/CD Deployment Pipeline via GitHub Actions)**
<div align="center">
  <img src="demo/img/CI-CD.png" alt="CI/CD Pipeline" width="800"/>
</div>

### 🎨 Dashboard in Night Mode
*Premium UI/UX design showcasing a high-quality Night Mode integration for comfortable extended use.*
<div align="center">
  <img src="demo/img/dasboard-in-night-mode.png" alt="Night Mode Dashboard" width="800"/>
</div>

---

## 🔒 Security Considerations

- **Cross-Contract RBAC Validation:** Blockchain logic is immune to local bypass. The `CredentialRegistry` contract forcibly checks the `CredIssuer` contract state on every `issue_credential` call via `contractimport!`.
- **Credential Revocation:** Only the original issuer can revoke a credential. The contract enforces `credential.issuer != caller` checks before allowing revocation.
- **WASM Upgradability:** Both contracts include an `upgrade(new_wasm_hash)` function restricted to the Admin, ensuring long-term bug fixes and evolution.
- **Wallet Security**: Uses `StellarWalletsKit` to ensure private keys never touch the DOM or React state. All signing is delegated entirely to the secure Freighter extension.
- **Data Integrity**: SHA-256 hashing ensures the on-chain `data_hash` is a tamper-proof fingerprint of the full credential data stored off-chain.

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
   - Caches Cargo registry & target for fast builds
   - Builds both `cred-issuer` and `credledger-registry` WASM artifacts
   - Runs `cargo test` for contract unit tests

2. **Frontend Pipeline** (`frontend-test-build`):
   - Sets up Node.js v20 with npm cache
   - Installs NPM dependencies
   - Runs ESLint for code quality
   - Runs Vitest suite (8 tests)
   - Builds Next.js application

### Vercel Deployment
The frontend is continuously deployed to Vercel on every push to `main`. Environment variables are configured in the Vercel dashboard.

---
