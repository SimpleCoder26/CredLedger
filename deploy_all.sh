#!/bin/bash
set -e

echo "Deploying CredIssuer..."
ISSUER_ID=$(stellar contract deploy --wasm contracts/target/wasm32v1-none/release/cred_issuer.wasm --source alice --network testnet)
echo "Issuer Contract ID: $ISSUER_ID"

echo "Initializing CredIssuer..."
stellar contract invoke --id $ISSUER_ID --source alice --network testnet -- init --admin GA6YD65G36P2HGWFQQ4DWSZVVV4NIKFE7DZF3J473YBYZCCZUSNLXE7F

echo "Deploying CredentialRegistry..."
REGISTRY_ID=$(stellar contract deploy --wasm contracts/target/wasm32v1-none/release/credledger_registry.wasm --source alice --network testnet)
echo "Registry Contract ID: $REGISTRY_ID"

echo "Initializing CredentialRegistry..."
stellar contract invoke --id $REGISTRY_ID --source alice --network testnet -- init --admin GA6YD65G36P2HGWFQQ4DWSZVVV4NIKFE7DZF3J473YBYZCCZUSNLXE7F --cred_issuer_contract $ISSUER_ID

echo "DONE!"
echo "YOUR NEW REGISTRY CONTRACT ID TO PUT IN VERCEL IS: $REGISTRY_ID"
