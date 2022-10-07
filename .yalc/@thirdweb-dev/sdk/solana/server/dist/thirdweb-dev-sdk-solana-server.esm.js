import { e as ThirdwebSDK } from '../../../dist/sdk-7eca672b.esm.js';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';
import os from 'os';
import path from 'path';
import yaml from 'yaml';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import '../../../dist/defineProperty-6292d8c3.esm.js';
import 'bn.js';
import 'ethers';
import 'zod';
import '@metaplex-foundation/js';
import '@metaplex-foundation/mpl-token-metadata';
import '@project-serum/anchor';
import 'buffer/';
import 'bs58';
import 'eventemitter3';
import 'tiny-invariant';
import 'tweetnacl';
import 'uuid';
import '@solana/spl-token';

/**
 * @internal
 */

function getConfig() {
  // Path to Solana CLI config file
  const CONFIG_FILE_PATH = path.resolve(os.homedir(), ".config", "solana", "cli", "config.yml");
  const configYml = fs.readFileSync(CONFIG_FILE_PATH, {
    encoding: "utf8"
  });
  return yaml.parse(configYml);
}
/**
 * Load and parse the Solana CLI config file to determine which payer to use
 */

function getPayer() {
  try {
    const config = getConfig();

    if (!config.keypair_path) {
      throw new Error("Missing keypair path");
    }

    return createKeypairFromFile(config.keypair_path);
  } catch (err) {
    console.warn("Failed to create keypair from CLI config file, falling back to new random keypair");
    return Keypair.generate();
  }
}
/**
 * Create a Keypair from a secret key stored in file as bytes' array
 */

function createKeypairFromFile(filePath) {
  const secretKeyString = fs.readFileSync(filePath, {
    encoding: "utf8"
  });
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

/**
 * Create an SDK instance using the local configuration generated by the Solana CLI
 *
 * @example
 * ```jsx
 * import { createThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * // Select the network to create the SDK on
 * const sdk = createThirdwebSDK("devnet");
 * ```
 *
 * @public
 */

function createThirdwebSDK(network) {
  let storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ThirdwebStorage();
  const payer = getPayer();
  const signer = {
    publicKey: payer.publicKey,
    secretKey: payer.secretKey
  };
  const sdk = ThirdwebSDK.fromNetwork(network, storage);
  sdk.wallet.connect(signer);
  return sdk;
}

export { createThirdwebSDK };
