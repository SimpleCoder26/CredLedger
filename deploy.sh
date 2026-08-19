#!/bin/bash
set -e

echo "Starting CredLedger Deployment..."

# 1. Build Contracts
echo "Building Soroban smart contracts..."
cd contracts
stellar contract build

# 2. Deploy Registry Contract to Testnet
echo "Deploying Registry Contract to Stellar Testnet..."
# Requires ALICE_SECRET_KEY to be set in environment
    stellar contract deploy \
        --wasm target/wasm32v1-none/release/credledger_registry.wasm \
        --source alice \
        --network testnet > contract_id.txt
        
    CONTRACT_ID=$(cat contract_id.txt)
    echo "Deployed Registry Contract ID: $CONTRACT_ID"

cd ..

# 3. Setup Frontend Environment
echo "Configuring Frontend Environment..."
cat > .env.local << EOF
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
NEXT_PUBLIC_REGISTRY_CONTRACT_ID=$CONTRACT_ID
EOF

# 4. Build Frontend
echo "Building Next.js application..."
npm install
npm run build

echo "Deployment preparation complete! 🚀"
echo "To serve the frontend locally, run: cd web && npm run start"
