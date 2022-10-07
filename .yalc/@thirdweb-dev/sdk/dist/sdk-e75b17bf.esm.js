import { _ as _defineProperty, F as FileOrBufferOrStringSchema$1, B as BasisPointsSchema$1, a as CommonNFTInput } from './defineProperty-6292d8c3.esm.js';
import { PublicKey, Keypair, clusterApiUrl, Connection } from '@solana/web3.js';
import { z } from 'zod';
import { guestIdentity, amount, SOL, isKeypairSigner, keypairIdentity, isIdentitySigner, walletAdapterIdentity, token, findMetadataPda, toBigNumber, sol, findEditionMarkerPda, toDateTime, toMetadata, toMetadataAccount, TokenProgram, Metaplex } from '@metaplex-foundation/js';
import { createCreateMetadataAccountV2Instruction, Metadata, EditionMarker, TokenStandard } from '@metaplex-foundation/mpl-token-metadata';
import BN from 'bn.js';
import bs58 from 'bs58';
import EventEmitter from 'eventemitter3';
import invariant from 'tiny-invariant';
import nacl from 'tweetnacl';
import { v4 } from 'uuid';
import { isBrowser as isBrowser$1, ThirdwebStorage, IpfsUploader } from '@thirdweb-dev/storage';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';

/**
 * @internal
 */

const MAX_BPS = 10000;
/**
 * @internal
 */

const BasisPointsSchema = z.number().max(MAX_BPS, "Cannot exeed 100%").min(0, "Cannot be below 0%");
/**
 * @internal
 */

const PercentSchema = z.number().max(100, "Cannot exeed 100%").min(0, "Cannot be below 0%");
/**
 * @internal
 */

const JsonLiteral = z.union([z.string(), z.number(), z.boolean(), z.null()]);
/**
 * @internal
 */

/**
 * @internal
 */
const PropertiesInput = z.object({}).catchall(z.unknown());
/**
 * @internal
 */

const OptionalPropertiesInput = z.union([z.array(PropertiesInput), PropertiesInput]).optional();
/**
 * @internal
 */

const AmountSchema = z.union([z.string().regex(/^([0-9]+\.?[0-9]*|\.[0-9]+)$/, "Invalid amount"), z.number().min(0, "Amount cannot be negative")]).transform(arg => typeof arg === "number" ? arg.toString() : arg);
/**
 * @internal
 */

const RawDateSchema = z.date().transform(i => {
  return Math.floor(i.getTime() / 1000);
});
/**
 * @internal
 */

/**
 * @internal
 */
const AddressSchema = z.union([z.string(), z.instanceof(PublicKey).transform(key => key.toBase58())]);

const isBrowser = () => typeof window !== "undefined";

const FileOrBufferUnionSchema = isBrowser() ? z.instanceof(File) : z.instanceof(Buffer); // @fixme, this is a hack to make browser happy for now

/**
 * @internal
 */

const FileOrBufferSchema = z.union([FileOrBufferUnionSchema, z.object({
  data: z.union([FileOrBufferUnionSchema, z.string()]),
  name: z.string()
})]);
/**
 * @internal
 */

const FileOrBufferOrStringSchema = z.union([FileOrBufferSchema, z.string()]);

/**
 * @internal
 */

const LoginOptionsSchema = z.object({
  /**
   * The optional nonce of the login request used to prevent replay attacks
   */
  nonce: z.string().optional(),

  /**
   * The optional time after which the login payload will be invalid
   */
  expirationTime: z.date().optional()
}).optional();
/**
 * @internal
 */

const LoginPayloadDataSchema = z.object({
  /**
   * The domain that the user is attempting to login to
   */
  domain: z.string(),

  /**
   * The public key of the account that is logging in
   */
  address: AddressSchema,

  /**
   * The nonce of the login request used to prevent replay attacks, defaults to a random UUID
   */
  nonce: z.string().default(v4()),

  /**
   * The time after which the login payload will be invalid, defaults to 5 minutes from now
   */
  expiration_time: z.date().transform(d => d.toISOString())
});
/**
 * @internal
 */

z.object({
  /**
   * The payload data used for login
   */
  payload: LoginPayloadDataSchema,

  /**
   * The signature of the login request used for verification
   */
  signature: z.string()
});
/**
 * @internal
 */

const AuthenticationOptionsSchema = z.object({
  /**
   * The date before which the authentication payload is invalid
   */
  invalidBefore: z.date().optional(),

  /**
   * The date after which the authentication payload is invalid
   */
  expirationTime: z.date().optional()
}).optional();
/**
 * @internal
 */

const AuthenticationPayloadDataSchema = z.object({
  /**
   * The address of the wallet issuing the payload
   */
  iss: z.string(),

  /**
   * The address of the wallet requesting to authenticate
   */
  sub: z.string(),

  /**
   * The domain intended to receive the authentication payload
   */
  aud: z.string(),

  /**
   * The date before which the authentication payload is invalid
   */
  exp: RawDateSchema,

  /**
   * The date after which the authentication payload is invalid
   */
  nbf: RawDateSchema,

  /**
   * The date on which the payload was issued
   */
  iat: RawDateSchema,

  /**
   * The unique identifier of the payload
   */
  jti: z.string().default(v4())
});
/**
 * @internal
 */

z.object({
  /**
   * The payload data used for authentication
   */
  payload: AuthenticationPayloadDataSchema,

  /**
   * The signature of the authentication payload used for authentication
   */
  signature: z.string()
});
/**
 * @public
 */

/**
 * Wallet Authenticator
 * @remarks The wallet authenticator enables server-side applications to securely identify the
 * connected wallet address of users on the client-side, and also enables users to authenticate
 * to any backend using just their wallet. It implements the JSON Web Token (JWT) authentication
 * standard.
 *
 * @example
 * ```javascript
 * // We specify the domain of the application to authenticate to
 * const domain = "example.com"
 *
 * // On the client side, we can generate a payload for the connected wallet to login
 * const loginPayload = await sdk.auth.login(domain);
 *
 * // Then on the server side, we can securely verify the connected client-side address
 * const address = sdk.auth.verify(domain, loginPayload);
 *
 * // And we can also generate an authentication token to send to the client
 * const token = sdk.auth.generate(domain, loginPayload);
 *
 * // Finally, the token can be send from the client to the server to make authenticated requests
 * // And the server can use the following function to authenticate a token and verify the associated address
 * const address = sdk.auth.authenticate(domain, token);
 * ```
 * @public
 */

class WalletAuthenticator {
  constructor(wallet) {
    _defineProperty(this, "wallet", void 0);

    this.wallet = wallet;
  }
  /**
   * Login With Connected Wallet
   * @remarks Client-side function that allows the connected wallet to login to a server-side application.
   * Generates a login payload that can be sent to the server-side for verification or authentication.
   *
   * @param domain - The domain of the server-side application to login to
   * @param options - Optional configuration options for the login request
   * @returns Login payload that can be used on the server-side to verify the login request or authenticate
   *
   * @example
   * ```javascript
   * // Add the domain of the application users will login to, this will be used throughout the login process
   * const domain = "example.com";
   * // Generate a signed login payload for the connected wallet to authenticate with
   * const loginPayload = await sdk.auth.login(domain);
   * ```
   */


  async login(domain, options) {
    const parsedOptions = LoginOptionsSchema.parse(options);
    const signerAddress = this.wallet.getAddress();
    const expirationTime = (parsedOptions === null || parsedOptions === void 0 ? void 0 : parsedOptions.expirationTime) || new Date(Date.now() + 1000 * 60 * 5);
    const payloadData = LoginPayloadDataSchema.parse({
      domain,
      address: signerAddress,
      nonce: parsedOptions === null || parsedOptions === void 0 ? void 0 : parsedOptions.nonce,
      expiration_time: expirationTime
    });
    const message = this.generateMessage(payloadData);
    const signature = await this.wallet.sign(message);
    return {
      payload: payloadData,
      signature
    };
  }
  /**
   * Verify Logged In Address
   * @remarks Server-side function to securely verify the address of the logged in client-side wallet
   * by validating the provided client-side login request.
   *
   * @param domain - The domain of the server-side application to verify the login request for
   * @param payload - The login payload to verify
   * @returns The public key of the logged in wallet
   *
   * @example
   * ```javascript
   * const domain = "example.com";
   * const loginPayload = await sdk.auth.login(domain);
   *
   * // Verify the login request
   * const address = sdk.auth.verify(domain, loginPayload);
   * ```
   */


  verify(domain, payload) {
    // Check that the intended domain matches the domain of the payload
    if (payload.payload.domain !== domain) {
      throw new Error(`Expected domain '${domain}' does not match domain on payload '${payload.payload.domain}'`);
    } // Check that the payload hasn't expired


    const currentTime = new Date();

    if (currentTime > new Date(payload.payload.expiration_time)) {
      throw new Error(`Login request has expired`);
    } // Check that the signing address is the claimed wallet address


    const message = this.generateMessage(payload.payload);
    const isValid = this.wallet.verifySignature(message, payload.signature, payload.payload.address);

    if (!isValid) {
      throw new Error(`Signer address '${payload.payload.address}' did not sign the provided message`);
    }

    return payload.payload.address;
  }
  /**
   * Generate Authentication Token
   * @remarks Server-side function that generates a JWT token from the provided login request that the
   * client-side wallet can use to authenticate to the server-side application.
   *
   * @param domain - The domain of the server-side application to authenticate to
   * @param payload - The login payload to authenticate with
   * @param options - Optional configuration options for the authentication request
   * @returns A authentication token that can be used by the client to make authenticated requests
   *
   * @example
   * ```javascript
   * const domain = "example.com";
   * const loginPayload = await sdk.auth.login(domain);
   *
   * // Generate a JWT token that can be sent to the client-side wallet and used for authentication
   * const token = await sdk.auth.generateAuthToken(domain, loginPayload);
   * ```
   */


  async generateAuthToken(domain, payload, options) {
    if (isBrowser$1()) {
      throw new Error("Authentication tokens should not be generated in the browser, as they must be signed by a server-side admin wallet.");
    }

    const parsedOptions = AuthenticationOptionsSchema.parse(options);
    const userAddress = this.verify(domain, payload);
    const adminAddress = this.wallet.getAddress();
    const payloadData = AuthenticationPayloadDataSchema.parse({
      iss: adminAddress,
      sub: userAddress,
      aud: domain,
      nbf: (parsedOptions === null || parsedOptions === void 0 ? void 0 : parsedOptions.invalidBefore) || new Date(),
      exp: (parsedOptions === null || parsedOptions === void 0 ? void 0 : parsedOptions.expirationTime) || new Date(Date.now() + 1000 * 60 * 60 * 5),
      iat: new Date()
    });
    const message = JSON.stringify(payloadData);
    const signature = await this.wallet.sign(message); // Header used for JWT token specifying hash algorithm

    const header = {
      // Specify ECDSA with SHA-256 for hashing algorithm
      alg: "ES256",
      typ: "JWT"
    };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
    const encodedData = Buffer.from(JSON.stringify(payloadData)).toString("base64").replace(/=/g, "");
    const encodedSignature = Buffer.from(signature).toString("base64"); // Generate a JWT token with base64 encoded header, payload, and signature

    const token = `${encodedHeader}.${encodedData}.${encodedSignature}`;
    return token;
  }
  /**
   * Authenticate With Token
   * @remarks Server-side function that authenticates the provided JWT token. This function verifies that
   * the provided authentication token is valid and returns the address of the authenticated wallet.
   *
   * @param domain - The domain of the server-side application doing authentication
   * @param token - The authentication token being used
   * @returns The address of the authenticated wallet
   *
   * @example
   * ```javascript
   * const domain = "example.com";
   * const loginPayload = await sdk.auth.login(domain);
   * const token = await sdk.auth.generateAuthToken(domain, loginPayload);
   *
   * // Authenticate the token and get the address of authenticating users wallet
   * const address = sdk.auth.authenticate(domain, token);
   * ```
   */


  async authenticate(domain, token) {
    if (isBrowser$1()) {
      throw new Error("Should not authenticate tokens in the browser, as they must be verified by the server-side admin wallet.");
    }

    const encodedPayload = token.split(".")[1];
    const encodedSignature = token.split(".")[2];
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64").toString());
    const signature = Buffer.from(encodedSignature, "base64").toString(); // Check that the token audience matches the domain

    if (payload.aud !== domain) {
      throw new Error(`Expected token to be for the domain '${domain}', but found token with domain '${payload.aud}'`);
    } // Check that the token is past the invalid before time


    const currentTime = Math.floor(new Date().getTime() / 1000);

    if (currentTime < payload.nbf) {
      throw new Error(`This token is invalid before epoch time '${payload.nbf}', current epoch time is '${currentTime}'`);
    } // Check that the token hasn't expired


    if (currentTime > payload.exp) {
      throw new Error(`This token expired at epoch time '${payload.exp}', current epoch time is '${currentTime}'`);
    } // Check that the connected wallet matches the token issuer


    const connectedAddress = this.wallet.getAddress();

    if (connectedAddress.toLowerCase() !== payload.iss.toLowerCase()) {
      throw new Error(`Expected the connected wallet address '${connectedAddress}' to match the token issuer address '${payload.iss}'`);
    } // Check that the connected wallet signed the token


    const isValid = this.wallet.verifySignature(JSON.stringify(payload), signature, connectedAddress);

    if (!isValid) {
      throw new Error(`The connected wallet address '${connectedAddress}' did not sign the token`);
    }

    return payload.sub;
  }
  /**
   * Generates a SIWS compliant message to sign based on the login payload
   */


  generateMessage(payload) {
    let message = ``; // Add the domain and login address for transparency

    message += `${payload.domain} wants you to sign in with your account:\n${payload.address}\n\n`; // Prompt user to make sure domain is correct to prevent phishing attacks

    message += `Make sure that the requesting domain above matches the URL of the current website.\n\n`;
    message += `Nonce: ${payload.nonce}\n`;
    message += `Expiration Time: ${payload.expiration_time}\n`;
    return message;
  }

}

/**
 * @internal
 */

function toCurrencyValue(amount) {
  return {
    value: amount.basisPoints.toString(),
    displayValue: toDisplayValue(amount)
  };
}

const toDisplayValue = value => {
  if (value.currency.decimals === 0) {
    return `${value.currency.symbol} ${value.basisPoints.toString()}`;
  }

  const power = new BN(10).pow(new BN(value.currency.decimals));
  const basisPoints = value.basisPoints;
  const {
    div,
    mod
  } = basisPoints.divmod(power);
  const units = `${div.toString()}.${mod.abs().toString(10, value.currency.decimals)}`;
  return `${units}`;
};

/**
 *
 * {@link UserWallet} events that you can subscribe to using `sdk.wallet.events`.
 *
 * @public
 */

/**
 * Handle and view info about the wallet connected to the SDK.
 *
 * @example
 * ```jsx
 * // Connect a wallet to the SDK, pass in a keypair or browser wallet adapter
 * sdk.wallet.connect(signer)
 *
 * // Then you can read data about the connected wallet
 * const address = sdk.wallet.getAddress();
 * ```
 *
 * @public
 */
class UserWallet {
  constructor(metaplex) {
    _defineProperty(this, "signer", void 0);

    _defineProperty(this, "events", new EventEmitter());

    _defineProperty(this, "metaplex", void 0);

    this.metaplex = metaplex;
  }
  /**
   * Connect a signer to the SDK. Can pass in a keypair or browser wallet adapter
   * @param wallet - The signer to connect to the SDK
   *
   * @example
   * ```jsx
   * const signer = Keypair.generate();
   * sdk.wallet.connect(signer);
   * ```
   */


  connect(wallet) {
    this.connectToMetaplex(wallet);
    this.events.emit("connected", wallet);
  }
  /**
   * Disconnect the connect wallet from the SDK
   *
   * @example
   * ```jsx
   * sdk.wallet.disconnect();
   * ```
   */


  disconnect() {
    // TODO implement our own read only identity plugin with our own error messages
    this.metaplex.use(guestIdentity());
    this.events.emit("disconnected");
  }
  /**
   * Return whether a wallet is connected
   */


  isConnected() {
    return this.metaplex.identity().publicKey !== PublicKey.default;
  }
  /**
   * Get the address of the connected wallet
   * @returns the address of the connected wallet
   *
   * @example
   * ```jsx
   * const address = sdk.wallet.getAddress()
   * ```
   */


  getAddress() {
    return this.metaplex.identity().publicKey.toBase58();
  }
  /**
   * Get the connected signer
   * @returns the signer
   *
   * @example
   * ```jsx
   * const signer = sdk.wallet.getSigner()
   * ```
   */


  getSigner() {
    return this.metaplex.identity();
  }

  async sign(message) {
    const signer = this.getSigner();
    const encodedMessage = new TextEncoder().encode(message);
    const signedMessage = await signer.signMessage(encodedMessage);
    const signature = bs58.encode(signedMessage);
    return signature;
  }

  verifySignature(message, signature, publicKey) {
    return nacl.sign.detached.verify(new TextEncoder().encode(message), bs58.decode(signature), bs58.decode(publicKey));
  }
  /**
   * Get the native balance of the connected wallet
   * @returns the native balance currency value
   *
   * @example
   * ```jsx
   * const balance = await sdk.wallet.getBalance();
   * console.log(balance.displayValue);
   * ```
   */


  async getBalance() {
    const value = await this.metaplex.connection.getBalance(this.metaplex.identity().publicKey);
    return toCurrencyValue(amount(value, SOL));
  }

  connectToMetaplex(signer) {
    invariant(signer, "Wallet is not connected");
    const plugin = isKeypairSigner(signer) ? keypairIdentity(Keypair.fromSecretKey(signer.secretKey)) : isIdentitySigner(signer) ? walletAdapterIdentity(signer) : undefined;
    invariant(plugin, "Wallet is not compatible with Metaplex");
    this.metaplex.use(plugin);
  }

}

/**
 * @internal
 */

const CommonContractSchema = z.object({
  name: z.string(),
  symbol: z.string().optional(),
  description: z.string().optional(),
  image: FileOrBufferOrStringSchema.optional(),
  external_link: z.string().url().optional()
});
/**
 * @internal
 */

const CommonContractOutputSchema = CommonContractSchema.extend({
  image: z.string().optional()
}).catchall(z.unknown()); /// NFT ///

/**
 * @internal
 */

const CreatorInputSchema = z.object({
  address: z.string(),
  sharePercentage: z.number(),
  verified: z.boolean().default(false)
});
/**
 * @internal
 */

const NFTCollectionMetadataInputSchema = CommonContractSchema.extend({
  creators: z.array(CreatorInputSchema).default([])
});
/**
 * @internal
 */

/// TOKEN ///

/**
 * @internal
 */
const TokenMetadataInputSchema = CommonContractSchema.extend({
  decimals: z.number().default(9),
  initialSupply: AmountSchema
});
/**
 * @public
 */

/**
 * @internal
 */

const CommonTokenInputSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  description: z.string().optional(),
  image: FileOrBufferOrStringSchema$1.optional(),
  external_link: z.string().url().optional()
});
/**
 * @internal
 */

const CurrencyValueSchema = z.object({
  value: z.string(),
  displayValue: z.string()
});
/**
 * Currency value and display value
 * @public
 */

/**
 * @internal
 */
CommonTokenInputSchema.extend({
  image: z.string().optional(),
  supply: CurrencyValueSchema
}).catchall(z.unknown());
/**
 * Metadata for a token
 * @public
 */

/**
 * @internal
 */

const NFTDropInitialConditionsInputSchema = z.object({
  itemsAvailable: AmountSchema
});
/**
 * @internal
 */
// TODO: Handle allow lists and end times

const NFTDropUpdateableConditionsInputSchema = z.object({
  price: AmountSchema.optional(),
  currencyAddress: z.string().optional(),
  primarySaleRecipient: z.string().optional(),
  sellerFeeBasisPoints: BasisPointsSchema$1.optional(),
  goLiveDate: z.date().optional()
});
/**
 * @internal
 */

const NFTDropUpdateableConditionsOutputSchema = z.object({
  price: CurrencyValueSchema,
  currencyAddress: z.string().nullable(),
  primarySaleRecipient: z.string(),
  sellerFeeBasisPoints: BasisPointsSchema$1,
  goLiveDate: z.date().nullable(),
  totalAvailableSupply: z.number(),
  lazyMintedSupply: z.number(),
  isReadyToClaim: z.boolean()
});
/**
 * @internal
 */

const NFTDropContractInputSchema = NFTCollectionMetadataInputSchema.merge(NFTDropInitialConditionsInputSchema);
/**
 * @public
 */

/**
 * @internal
 */

function enforceCreator() {
  let creators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let owner = arguments.length > 1 ? arguments[1] : undefined;

  if (creators.length === 0) {
    // If no creators are specified, we assume the owner is the creator
    creators = creators.concat({
      address: owner.toBase58(),
      sharePercentage: 100,
      verified: true
    });
  }

  return creators.map(creator => ({
    verified: creator.verified || false,
    address: new PublicKey(creator.address),
    share: creator.sharePercentage
  }));
}

/**
 * Deploy new programs
 *
 * @example
 * ```jsx
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * // Instantiate the SDK and pass in a signer
 * const sdk = ThirdwebSDK.fromNetwork("devnet");
 * sdk.wallet.connect(signer);
 *
 * // Define the metadata for your program
 * const metadata = {
 *   name: "NFT Contract",
 *   image: readFileSync("files/image.jpg"),
 * };
 *
 * // And deploy a new program from the connected wallet
 * const address = await sdk.deployer.createNftCollection(metadata);
 * ```
 *
 * @public
 */
class Deployer {
  constructor(metaplex, storage) {
    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "storage", void 0);

    this.metaplex = metaplex;
    this.storage = storage;
  }
  /**
   * Create a new token program
   * @param tokenMetadata - the metadata of the token program
   * @returns - the address of the new token program
   *
   * @example
   * ```jsx
   * const metadata = {
   *   name: "My Token",
   *   symbol: "TKN",
   *   initialSupply: 100,
   * };
   *
   * const address = await sdk.deployer.createToken(metadata);
   * ```
   */


  async createToken(tokenMetadata) {
    const tokenMetadataParsed = TokenMetadataInputSchema.parse(tokenMetadata);
    const uri = await this.storage.upload(tokenMetadataParsed);
    const mint = Keypair.generate();
    const owner = this.metaplex.identity().publicKey;
    const mintTx = await this.metaplex.tokens().builders().createTokenWithMint({
      decimals: tokenMetadataParsed.decimals,
      initialSupply: token(tokenMetadataParsed.initialSupply, tokenMetadataParsed.decimals),
      mint
    });
    const data = {
      name: tokenMetadataParsed.name,
      symbol: tokenMetadataParsed.symbol || "",
      sellerFeeBasisPoints: 0,
      uri,
      creators: enforceCreator([], this.metaplex.identity().publicKey),
      collection: null,
      uses: null
    };
    const metadata = findMetadataPda(mint.publicKey);
    const metaTx = createCreateMetadataAccountV2Instruction({
      metadata,
      mint: mint.publicKey,
      mintAuthority: owner,
      payer: owner,
      updateAuthority: owner
    }, {
      createMetadataAccountArgsV2: {
        data,
        isMutable: false
      }
    });
    await mintTx.add({
      instruction: metaTx,
      signers: [this.metaplex.identity()]
    }).sendAndConfirm(this.metaplex);
    return mint.publicKey.toBase58();
  }
  /**
   * Create a new NFT collection program
   * @param collectionMetadata - the metadata of the nft collection program
   * @returns - the address of the new nft collection program
   *
   * @example
   * ```jsx
   * const metadata = {
   *   name: "My NFT Collection",
   *   symbol: "NFT",
   * };
   *
   * const address = await sdk.deployer.createNftCollection(metadata);
   * ```
   */


  async createNftCollection(collectionMetadata) {
    const parsed = NFTCollectionMetadataInputSchema.parse(collectionMetadata);
    const uri = await this.storage.upload(parsed);
    const {
      nft: collectionNft
    } = await this.metaplex.nfts().create({
      name: parsed.name,
      symbol: parsed.symbol,
      sellerFeeBasisPoints: 0,
      uri,
      isCollection: true,
      creators: enforceCreator(parsed.creators, this.metaplex.identity().publicKey)
    }).run();
    return collectionNft.mint.address.toBase58();
  }
  /**
   * Create a new NFT drop program
   * @param metadata - the metadata of the nft drop program
   * @returns - the address of the new nft drop program
   *
   * @example
   * ```jsx
   * const metadata = {
   *   name: "My NFT Drop",
   *   symbol: "NFT",
   *   itemsAvailable: 5,
   * };
   *
   * const address = await sdk.deployer.createNftDrop(metadata);
   * ```
   */


  async createNftDrop(metadata) {
    const collectionInfo = NFTCollectionMetadataInputSchema.parse(metadata);
    const candyMachineInfo = NFTDropInitialConditionsInputSchema.parse(metadata);
    const uri = await this.storage.upload(collectionInfo);
    const collectionMint = Keypair.generate();
    const collectionTx = await this.metaplex.nfts().builders().create({
      useNewMint: collectionMint,
      name: collectionInfo.name,
      symbol: collectionInfo.symbol,
      sellerFeeBasisPoints: 0,
      uri,
      isCollection: true,
      creators: enforceCreator(collectionInfo.creators, this.metaplex.identity().publicKey)
    });
    const candyMachineKeypair = Keypair.generate(); // initialize candy machine with default config
    // final claim conditions can be updated later

    const candyMachineTx = await this.metaplex.candyMachines().builders().create({
      itemsAvailable: toBigNumber(candyMachineInfo.itemsAvailable),
      price: sol(0),
      sellerFeeBasisPoints: 0,
      candyMachine: candyMachineKeypair,
      collection: collectionMint.publicKey,
      creators: enforceCreator(collectionInfo.creators, this.metaplex.identity().publicKey)
    });
    const result = await collectionTx.add(candyMachineTx).sendAndConfirm(this.metaplex);

    if (!result.response.signature) {
      throw new Error("Transaction failed");
    }

    return candyMachineKeypair.publicKey.toBase58();
  }

}

/**
 * @internal
 */

class NFTHelper {
  constructor(metaplex) {
    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "connection", void 0);

    this.metaplex = metaplex;
    this.connection = metaplex.connection;
  }

  async get(nftAddress) {
    const meta = await this.metaplex.nfts().findByMint({
      mintAddress: new PublicKey(nftAddress)
    }).run();
    return await this.toNFTMetadata(meta);
  }

  async transfer(receiverAddress, nftAddress) {
    let quantity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    const result = await this.metaplex.nfts().send({
      mintAddress: new PublicKey(nftAddress),
      toOwner: new PublicKey(receiverAddress),
      amount: token(quantity, 0)
    }).run();
    return {
      signature: result.response.signature
    };
  }

  async balanceOf(walletAddress, nftAddress) {
    const address = await getAssociatedTokenAddress(new PublicKey(nftAddress), new PublicKey(walletAddress));

    try {
      const account = await getAccount(this.connection, address);
      return Number(account.amount);
    } catch (e) {
      return 0;
    }
  }

  async toNFTMetadata(meta) {
    let mint = "mint" in meta ? meta.mint : undefined;

    if (meta.model === "metadata") {
      const fetchedMint = await this.metaplex.nfts().findByMint({
        mintAddress: meta.mintAddress
      }).run();
      mint = fetchedMint.mint;
    }

    if (!mint) {
      throw new Error("No mint found for NFT");
    }

    const id = mint.address.toBase58();
    return {
      metadata: {
        id,
        uri: meta.uri,
        name: meta.name,
        symbol: meta.symbol,
        ...meta.json
      },
      owner: meta.updateAuthorityAddress.toBase58(),
      supply: mint.supply.basisPoints.toNumber(),
      type: "metaplex"
    };
  }

}

/**
 * @internal
 */
const METAPLEX_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";

/**
 * A collection of associated NFTs
 *
 * @example
 * ```jsx
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * const sdk = ThirdwebSDK.fromNetwork("devnet");
 * sdk.wallet.connect(signer);
 *
 * // Get the interface for your NFT collection program
 * const program = await sdk.getNFTCollection("{{contract_address}}");
 * ```
 *
 * @public
 */
class NFTCollection {
  get network() {
    const url = new URL(this.metaplex.connection.rpcEndpoint); // try this first to avoid hitting `custom` network for alchemy urls

    if (url.hostname.includes("devnet")) {
      return "devnet";
    }

    if (url.hostname.includes("mainnet")) {
      return "mainnet-beta";
    }

    return this.metaplex.cluster;
  }

  constructor(collectionAddress, metaplex, storage) {
    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "nft", void 0);

    _defineProperty(this, "publicKey", void 0);

    _defineProperty(this, "accountType", "nft-collection");

    this.storage = storage;
    this.metaplex = metaplex;
    this.nft = new NFTHelper(metaplex);
    this.publicKey = new PublicKey(collectionAddress);
  }
  /**
   * Get the metadata for this program.
   * @returns program metadata
   *
   * @example
   * ```jsx
   * const metadata = await program.getMetadata();
   * console.log(metadata.name);
   * ```
   */


  async getMetadata() {
    const metadata = await this.metaplex.nfts().findByMint({
      mintAddress: this.publicKey
    }).run();
    return (await this.nft.toNFTMetadata(metadata)).metadata;
  }
  /**
   * Get the metadata for a specific NFT
   * @param nftAddress - the mint address of the NFT to get
   * @returns the metadata of the NFT
   *
   * @example
   * ```jsx
   * // Specify the mint address of the NFT to get the data of
   * const nftAddress = "...";
   * // And get the data for the NFT
   * const nft = await program.get(nftAddress);
   * console.log(nft.metadata.name);
   * console.log(nft.owner);
   * ```
   */


  async get(nftAddress) {
    return this.nft.get(nftAddress);
  }
  /**
   * Get the metadata for all NFTs on this collection
   * @returns metadata for all minted NFTs
   *
   * @example
   * ```jsx
   * // Get all the NFTs that have been minted on this contract
   * const nfts = await program.getAll();
   * console.log(nfts[0].metadata.name);
   * console.log(nfts[0].owner);
   * ```
   */


  async getAll() {
    const addresses = await this.getAllNFTAddresses();
    return await Promise.all(addresses.map(async a => await this.get(a)));
  }
  /**
   * Get the mint addresses for all NFTs on this collection
   * @returns mint addresses for all minted NFTs
   *
   * @example
   * ```jsx
   * // Get just the addresses of the minted NFTs on this contract
   * const nftsAdresses = await program.getAllNFTAddresses();
   * console.log(nftsAdresses);
   * ```
   */


  async getAllNFTAddresses() {
    const allSignatures = []; // This returns the first 1000, so we need to loop through until we run out of signatures to get.

    let signatures = await this.metaplex.connection.getSignaturesForAddress(this.publicKey);
    allSignatures.push(...signatures);

    do {
      var _signatures;

      const options = {
        before: (_signatures = signatures[signatures.length - 1]) === null || _signatures === void 0 ? void 0 : _signatures.signature
      };
      signatures = await this.metaplex.connection.getSignaturesForAddress(this.publicKey, options);
      allSignatures.push(...signatures);
    } while (signatures.length > 0);

    const metadataAddresses = [];
    const mintAddresses = new Set(); // TODO RPC's will throttle this, need to do some optimizations here

    const batchSize = 1000; // alchemy RPC batch limit

    for (let i = 0; i < allSignatures.length; i += batchSize) {
      const batch = allSignatures.slice(i, Math.min(allSignatures.length, i + batchSize));
      const transactions = await this.metaplex.connection.getTransactions(batch.map(s => s.signature));

      for (const tx of transactions) {
        if (tx) {
          const programIds = tx.transaction.message.programIds().map(p => p.toString());
          const accountKeys = tx.transaction.message.accountKeys.map(p => p.toString()); // Only look in transactions that call the Metaplex token metadata program

          if (programIds.includes(METAPLEX_PROGRAM_ID)) {
            // Go through all instructions in a given transaction
            for (const ix of tx.transaction.message.instructions) {
              // Filter for setAndVerify or verify instructions in the Metaplex token metadata program
              if ((ix.data === "K" || ix.data === "S" || ix.data === "X") && accountKeys[ix.programIdIndex] === METAPLEX_PROGRAM_ID) {
                const metadataAddressIndex = ix.accounts[0];
                const metadata_address = tx.transaction.message.accountKeys[metadataAddressIndex];
                metadataAddresses.push(metadata_address);
              }
            }
          }
        }
      }
    }

    const metadataAccounts = await this.metaplex.rpc().getMultipleAccounts(metadataAddresses);

    for (const account of metadataAccounts) {
      if (account.exists) {
        const [metadata] = Metadata.deserialize(account.data);
        mintAddresses.add(metadata.mint.toBase58());
      }
    }

    return Array.from(mintAddresses);
  }
  /**
   * Get the NFT balance of the connected wallet
   * @returns the NFT balance
   *
   * @example
   * ```jsx
   * // The mint address of the NFT to check the balance of
   * const nftAddress = "..."
   * // Get the NFT balance of the currently connected wallet
   * const balance = await program.balance(nftAddress);
   * console.log(balance);
   * ```
   */


  async balance(nftAddress) {
    const address = this.metaplex.identity().publicKey.toBase58();
    return this.balanceOf(address, nftAddress);
  }
  /**
   * Get the NFT balance of the specified wallet
   * @param walletAddress - the wallet address to get the balance of
   * @param nftAddress - the mint address of the NFT to get the balance of
   * @returns the NFT balance
   *
   * @example
   * ```jsx
   * // Specify the address of the wallet to get the balance of
   * const walletAddress = "..."
   * // Specify the mint address of the NFT to get the balance of
   * const nftAddress = "..."
   * const balance = await program.balanceOf(walletAddress, nftAddress);
   * ```
   */


  async balanceOf(walletAddress, nftAddress) {
    return this.nft.balanceOf(walletAddress, nftAddress);
  }
  /**
   * Get the supply of NFT editions minted from a specific NFT
   * @param nftAddress - the mint address of the NFT to check the supply of
   * @returns the supply of the specified NFT
   *
   * @example
   * ```jsx
   * const address = "...";
   * const supply = await program.supplyOf(addres);
   * ```
   */


  async supplyOf(nftAddress) {
    let editionMarkerNumber = 0;
    let totalSupply = 1;

    cursedBitwiseLogicLoop: while (true) {
      const editionMarkerAddress = findEditionMarkerPda(new PublicKey(nftAddress), toBigNumber(editionMarkerNumber * 248));
      const editionMarker = await EditionMarker.fromAccountAddress(this.metaplex.connection, editionMarkerAddress); // WARNING: Ugly bitwise operations because of Rust :(

      const indexCap = editionMarkerNumber === 0 ? 247 : 248;

      for (let editionIndex = 0; editionIndex < indexCap; editionIndex++) {
        const ledgerIndex = editionMarkerNumber > 0 ? Math.floor(editionIndex / 8) : editionIndex < 7 ? 0 : Math.floor((editionIndex - 7) / 8) + 1;
        const size = editionMarkerNumber === 0 && ledgerIndex === 0 ? 7 : 8;
        const shiftBase = 0b1 << size - 1;
        const bitmask = ledgerIndex === 0 ? shiftBase >> editionIndex : editionMarkerNumber > 0 ? shiftBase >> editionIndex % (ledgerIndex * 8) : ledgerIndex === 1 ? shiftBase >> editionIndex - 7 : shiftBase >> (editionIndex - 7) % ((ledgerIndex - 1) * 8);
        const editionExists = (editionMarker.ledger[ledgerIndex] & bitmask) !== 0;

        if (editionExists) {
          totalSupply += 1;
        } else {
          break cursedBitwiseLogicLoop;
        }
      }

      editionMarkerNumber++;
    }

    return BigInt(totalSupply);
  }
  /**
   * Transfer the specified NFTs to another wallet
   * @param receiverAddress - The address to send the tokens to
   * @param nftAddress - The mint address of the NFT to transfer
   * @returns the transaction result of the transfer
   *
   * @example
   * ```jsx
   * // The wallet address to transfer the NFTs to
   * const to = "...";
   * // The mint address of the NFT to transfer
   * const nftAddress = "...";
   * const tx = await program.transfer(to, nftAddress);
   * ```
   */


  async transfer(receiverAddress, nftAddress) {
    return this.nft.transfer(receiverAddress, nftAddress);
  }
  /**
   * Mint NFTs to the connected wallet
   * @param metadata - the metadata of the NFT to mint
   * @returns the mint address of the minted NFT
   *
   * @example
   * ```jsx
   * // Add the metadata of your NFT
   * const metadata = {
   *   name: "NFT #1",
   *   description: "My first NFT!",
   *   image: readFileSync("files/image.jpg"),
   *   properties: [
   *     {
   *        name: "coolness",
   *        value: "very cool!"
   *     }
   *   ]
   * }
   *
   * // Then mint the new NFT and get its address
   * const address = await program.mint(metadata);
   * console.log(address);
   * ```
   */


  async mint(metadata) {
    const address = this.metaplex.identity().publicKey.toBase58();
    return this.mintTo(address, metadata);
  }
  /**
   * Mint an NFT to the specified wallet
   * @param to - the address to mint the NFT to
   * @param metadata - the metadata of the NFT to mint
   * @returns the mint address of the minted NFT
   *
   * @example
   * ```jsx
   * // Specify who to mint the NFT to
   * const to = "...";
   *
   * // Add the metadata of your NFT
   * const metadata = {
   *   name: "NFT #1",
   *   description: "My first NFT!",
   *   image: readFileSync("files/image.jpg"),
   *   properties: [
   *     {
   *        name: "coolness",
   *        value: "very cool!"
   *     }
   *   ]
   * }
   *
   * // Then mint the new NFT and get its address
   * const address = await program.mintTo(to, metadata);
   * console.log(address);
   * ```
   */


  async mintTo(to, metadata) {
    var _metadata$name;

    // TODO add options param for initial/maximum supply
    const uri = typeof metadata === "string" ? metadata : await this.storage.upload(metadata);
    const name = typeof metadata === "string" ? "" : ((_metadata$name = metadata.name) === null || _metadata$name === void 0 ? void 0 : _metadata$name.toString()) || "";
    const {
      nft
    } = await this.metaplex.nfts().create({
      name,
      uri,
      sellerFeeBasisPoints: 0,
      collection: this.publicKey,
      collectionAuthority: this.metaplex.identity(),
      tokenOwner: new PublicKey(to),
      // Always sets max supply to unlimited so editions can be minted
      maxSupply: null
    }).run();
    return nft.address.toBase58();
  }
  /**
   * Mint additional supply of an NFT to the connected wallet
   * @param nftAddress - the mint address to mint additional supply to
   * @returns the mint address of the minted NFT
   *
   * @example
   * ```jsx
   * // The address of the already minted NFT
   * const nftAddress = "..."
   * // Mint an additional NFT of the original NFT
   * const address = await program.mintAdditionalSupply(nftAddress);
   * ```
   */


  async mintAdditionalSupply(nftAddress) {
    const address = this.metaplex.identity().publicKey.toBase58();
    return this.mintAdditionalSupplyTo(address, nftAddress);
  }
  /**
   * Mint additional supply of an NFT to the specified wallet
   * @param to - the address to mint the NFT to
   * @param nftAddress - the mint address to mint additional supply to
   * @returns the mint address of the minted NFT
   *
   * @example
   * ```jsx
   * // Specify who to mint the additional NFT to
   * const to = "..."
   * // The address of the already minted NFT
   * const nftAddress = "..."
   * // Mint an additional NFT of the original NFT
   * const address = await program.mintAdditionalSupplyTo(to, nftAddress);
   * ```
   */


  async mintAdditionalSupplyTo(to, nftAddress) {
    // TODO add quantity param
    const result = await this.metaplex.nfts().printNewEdition({
      originalMint: new PublicKey(nftAddress),
      newOwner: new PublicKey(to)
    }).run();
    return result.nft.address.toBase58();
  }
  /**
   * Burn an NFT
   * @param nftAddress - the mint address of the NFT to burn
   * @returns the transaction signature
   *
   * @example
   * ```jsx
   * // Specify the address of the NFT to burn
   * const nftAddress = "..."
   * // And send the actual burn transaction
   * const tx = await program.burn(nftAddress);
   * ```
   */


  async burn(nftAddress) {
    const tx = await this.metaplex.nfts().delete({
      mintAddress: new PublicKey(nftAddress),
      collection: this.publicKey
    }).run();
    return {
      signature: tx.response.signature
    };
  }
  /**
   * Update the settings of the collection
   * @param settings - the settings to update
   */


  async updateSettings(settings) {
    const updateData = { ...(settings.creators && {
        creators: enforceCreator(settings.creators, this.metaplex.identity().publicKey)
      })
    };
    this.metaplex.nfts().update({
      nftOrSft: await this.getCollection(),
      ...updateData
    });
  }

  async getCollection() {
    return await this.metaplex.nfts().findByMint({
      mintAddress: this.publicKey
    }).run();
  }

}

/**
 * Set the claim conditions for your NFT Drop to control how people can claim NFTs
 *
 * @example
 * ```jsx
 * const program = await sdk.getNFTDrop("{{contract_address}}");
 *
 * // Get the data of the claim condition on the drop
 * const claimCondition = await program.claimConditions.get();
 * // View the price of the drop
 * console.log(claimCondition.price);
 * // View the date when the drop will go live
 * console.log(claimCondition.goLiveDate);
 * ```
 *
 * @public
 */

class ClaimConditions {
  constructor(dropAddress, metaplex) {
    _defineProperty(this, "dropMintAddress", void 0);

    _defineProperty(this, "metaplex", void 0);

    this.dropMintAddress = new PublicKey(dropAddress);
    this.metaplex = metaplex;
  }
  /**
   * Get the claim condition for this contract
   * @returns - The claim condition data for this NFT Drop
   *
   * @example
   * ```jsx
   * // Get the data of the claim condition on the drop
   * const claimCondition = await program.claimConditions.get();
   * // View the price of the drop
   * console.log(claimCondition.price);
   * // View the date when the drop will go live
   * console.log(claimCondition.goLiveDate);
   * ```
   */


  async get() {
    var _candyMachine$tokenMi;

    const candyMachine = await this.getCandyMachine();
    const totalAvailableSupply = candyMachine.itemsAvailable.toNumber();
    const lazyMintedSupply = candyMachine.itemsLoaded.toNumber();
    const goLiveDate = candyMachine.goLiveDate ? new Date(candyMachine.goLiveDate.toNumber() * 1000) : null;
    const isWithinGoLiveDate = candyMachine.goLiveDate ? candyMachine.goLiveDate.toNumber() * 1000 >= Date.now() : true; // TODO add allowlist/hidden settings here

    return {
      price: toCurrencyValue(candyMachine.price),
      currencyAddress: ((_candyMachine$tokenMi = candyMachine.tokenMintAddress) === null || _candyMachine$tokenMi === void 0 ? void 0 : _candyMachine$tokenMi.toBase58()) || null,
      primarySaleRecipient: candyMachine.walletAddress.toBase58(),
      sellerFeeBasisPoints: candyMachine.sellerFeeBasisPoints,
      goLiveDate,
      totalAvailableSupply,
      lazyMintedSupply,
      isReadyToClaim: candyMachine.isFullyLoaded && isWithinGoLiveDate
    };
  }
  /**
   * Set the claim condition settings to configure how people can claim your NFT Drop
   * @param metadata - The settings to use for the claim condition of this program
   * @returns - The transaction result of setting the claim condition
   *
   * @example
   * ```jsx
   * // Specify the settings for your claim condition
   * const claimCondition = {
   *   // The price of each NFT in this drop (in SOL or SPL tokens)
   *   price: 0.1,
   *   // The date for this drop to start
   *   goLiveDate: new Date(),
   *   // ...
   * };
   *
   * const tx = await program.claimConditions.set(claimCondition);
   * ```
   */


  async set(metadata) {
    const parsed = NFTDropUpdateableConditionsInputSchema.parse(metadata); // recipients

    const wallet = parsed.primarySaleRecipient ? new PublicKey(parsed.primarySaleRecipient) : undefined;
    const sellerFeeBasisPoints = parsed.sellerFeeBasisPoints; // price

    let price = parsed.price ? sol(Number(parsed.price)) : undefined;
    let tokenMint = undefined;

    if (parsed.currencyAddress && parsed.price) {
      const fetchedToken = await this.metaplex.tokens().findMintByAddress({
        address: new PublicKey(parsed.currencyAddress)
      }).run();
      price = token(Number(parsed.price), fetchedToken.decimals);
      tokenMint = fetchedToken.address;
    } // dates


    const goLiveDate = parsed.goLiveDate ? toDateTime(parsed.goLiveDate) : undefined; // TODO add allowlist/hidden settings here

    const data = { ...(wallet && {
        wallet
      }),
      ...(tokenMint && {
        tokenMint
      }),
      ...(price && {
        price
      }),
      ...(goLiveDate && {
        goLiveDate
      }),
      ...(sellerFeeBasisPoints && {
        sellerFeeBasisPoints
      })
    };
    const result = await this.metaplex.candyMachines().update({
      candyMachine: await this.getCandyMachine(),
      ...data
    }).run();
    return {
      signature: result.response.signature
    };
  }

  async getCandyMachine() {
    return this.metaplex.candyMachines().findByAddress({
      address: this.dropMintAddress
    }).run();
  }

}

/**
 * A collection of NFTs that can be lazy minted and claimed
 *
 * @example
 * ```jsx
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * const sdk = ThirdwebSDK.fromNetwork("devnet");
 * sdk.wallet.connect(signer);
 *
 * // Get the interface for your NFT Drop program
 * const program = await sdk.getNFTDrop("{{contract_address}}");
 * ```
 *
 * @public
 */

class NFTDrop {
  get network() {
    const url = new URL(this.metaplex.connection.rpcEndpoint); // try this first to avoid hitting `custom` network for alchemy urls

    if (url.hostname.includes("devnet")) {
      return "devnet";
    }

    if (url.hostname.includes("mainnet")) {
      return "mainnet-beta";
    }

    return this.metaplex.cluster;
  }

  constructor(dropAddress, metaplex, storage) {
    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "nft", void 0);

    _defineProperty(this, "accountType", "nft-drop");

    _defineProperty(this, "publicKey", void 0);

    _defineProperty(this, "claimConditions", void 0);

    this.storage = storage;
    this.metaplex = metaplex;
    this.nft = new NFTHelper(metaplex);
    this.publicKey = new PublicKey(dropAddress);
    this.claimConditions = new ClaimConditions(dropAddress, metaplex);
  }
  /**
   * Get the metadata for this program.
   * @returns program metadata
   *
   * @example
   * ```jsx
   * const metadata = await program.getMetadata();
   * console.log(metadata.name);
   * ```
   */


  async getMetadata() {
    const info = await this.getCandyMachine();
    invariant(info.collectionMintAddress, "Collection mint address not found");
    const metadata = await this.metaplex.nfts().findByMint({
      mintAddress: info.collectionMintAddress
    }).run();
    return (await this.nft.toNFTMetadata(metadata)).metadata;
  }
  /**
   * Get the metadata for a specific NFT
   * @param nftAddress - the mint address of the NFT to get
   * @returns the metadata of the NFT
   *
   * @example
   * ```jsx
   * // Specify the mint address of the NFT to get the data of
   * const nftAddress = "...";
   * // And get the data for the NFT
   * const nft = await program.get(nftAddress);
   *
   * console.log(nft.name);
   * ```
   */


  async get(nftAddress) {
    return this.nft.get(nftAddress);
  }
  /**
   * Get the metadata for all NFTs on this drop
   * @returns metadata for all minted NFTs
   *
   * @example
   * ```jsx
   * // Get all the NFTs that have been minted on this contract
   * const nfts = await program.getAll();
   *
   * console.log(nfts[0].metadata.name);
   * ```
   */


  async getAll() {
    // TODO: Add pagination to get NFT functions
    const info = await this.getCandyMachine();
    const claimed = await this.getAllClaimed();
    return await Promise.all(info.items.map(async item => {
      // Check if the NFT has been claimed
      // TODO: This only checks name/uri which is potentially not unique
      const claimedNFT = claimed.find(nft => nft.metadata.name === item.name && nft.metadata.uri === item.uri);

      if (claimedNFT) {
        return claimedNFT;
      } // not claimed yet, return a unclaimed NFT with just the metadata


      const metadata = await this.storage.downloadJSON(item.uri);
      return {
        metadata: { ...metadata,
          id: PublicKey.default.toBase58(),
          uri: item.uri
        },
        owner: PublicKey.default.toBase58(),
        supply: 0,
        type: "metaplex"
      };
    }));
  }
  /**
   * Get the metadata for all the claimed NFTs on this drop
   * @returns metadata for all claimed NFTs
   *
   * @example
   * ```jsx
   * // Get all the NFTs that have already been claimed from this drop
   * const nfts = await program.getAllClaimed();
   * console.log(nfts[0].name)
   * ```
   */


  async getAllClaimed() {
    const nfts = await this.metaplex.candyMachines().findMintedNfts({
      candyMachine: this.publicKey
    }).run();
    return await Promise.all(nfts.map(async nft => this.nft.toNFTMetadata(nft)));
  }
  /**
   * Get the NFT balance of the connected wallet
   * @returns the NFT balance
   *
   * @example
   * ```jsx
   * // The mint address of the NFT to check the balance of
   * const nftAddress = "..."
   * // Get the NFT balance of the currently connected wallet
   * const balance = await program.balance(nftAddress);
   * console.log(balance);
   * ```
   */


  async balance(nftAddress) {
    const address = this.metaplex.identity().publicKey.toBase58();
    return this.balanceOf(address, nftAddress);
  }
  /**
   * Get the NFT balance of the specified wallet
   * @param walletAddress - the wallet address to get the balance of
   * @param nftAddress - the mint address of the NFT to get the balance of
   * @returns the NFT balance
   *
   * @example
   * ```jsx
   * // The address of the wallet to check the balance of
   * const walletAddress = "..."
   * // The mint address of the NFT to check the balance of
   * const nftAddress = "..."
   * // Get the actual NFT balance of the specified wallet
   * const balance = await program.balanceOf(walletAddress, nftAddress);
   * ```
   */


  async balanceOf(walletAddress, nftAddress) {
    return this.nft.balanceOf(walletAddress, nftAddress);
  }
  /**
   * Get the total unclaimed supply of this drop
   * @returns the total supply
   *
   * @example
   * ```jsx
   * // Get the total number of lazy minted NFTs that aren't yet claimed
   * const supply = await program.totalUnclaimedSupply();
   * ```
   */


  async totalUnclaimedSupply() {
    const info = await this.getCandyMachine();
    return Math.min(info.itemsLoaded.toNumber(), info.itemsRemaining.toNumber());
  }
  /**
   * Get the total claimed supply of this drop
   * @returns the total supply
   *
   * @example
   * ```jsx
   * // Get the total number of lazy minted NFTs that have already been claimed
   * const supply = await program.totalClaimedSupply();
   * ```
   */


  async totalClaimedSupply() {
    const info = await this.getCandyMachine();
    return info.itemsMinted.toNumber();
  }
  /**
   * Transfer the specified NFTs to another wallet
   * @param receiverAddress - The address to send the tokens to
   * @param nftAddress - The mint address of the NFT to transfer
   * @returns the transaction result of the transfer
   *
   * @example
   * ```jsx
   * // The wallet address to transfer the NFTs to
   * const to = "...";
   * // The mint address of the NFT to transfer
   * const nftAddress = "...";
   * const tx = await program.transfer(to, nftAddress);
   * ```
   */


  async transfer(receiverAddress, nftAddress) {
    return this.nft.transfer(receiverAddress, nftAddress);
  }
  /**
   * Lazy mint NFTs to be claimed later
   * @param metadatas - The metadata of the NFTs to lazy mint
   * @returns the transaction result of the lazy mint
   *
   * @example
   * ```jsx
   * // Add the metadata of your NFTs
   * const metadata = [
   *   {
   *     name: "NFT #1",
   *     description: "My first NFT!",
   *     image: readFileSync("files/image.jpg"),
   *     properties: [
   *       {
   *         name: "coolness",
   *         value: "very cool!"
   *       }
   *     ]
   *   }
   * ];
   *
   * // And lazy mint NFTs to your program
   * const tx = await program.lazyMint(metadatas);
   * ```
   */


  async lazyMint(metadatas, options) {
    const candyMachine = await this.getCandyMachine();
    const parsedMetadatas = metadatas.map(metadata => CommonNFTInput.parse(metadata));
    const uris = await this.storage.uploadBatch(parsedMetadatas, options);
    const items = uris.map((uri, i) => {
      var _parsedMetadatas$i$na;

      return {
        name: ((_parsedMetadatas$i$na = parsedMetadatas[i].name) === null || _parsedMetadatas$i$na === void 0 ? void 0 : _parsedMetadatas$i$na.toString()) || "",
        uri
      };
    });
    const result = await this.metaplex.candyMachines().insertItems({
      candyMachine,
      authority: this.metaplex.identity(),
      items
    }).run();
    return {
      signature: result.response.signature
    };
  }
  /**
   * Claim an NFT from the drop with connected wallet
   * @returns - the mint address of the claimed NFT
   *
   * @example
   * ```jsx
   * // Specify the quantity of NFTs to claim
   * const quantity = 1;
   * // Claim NFTs and get their mint addresses
   * const claimedAddresses = await program.claim(quantity);
   * console.log("Claimed NFT at address", claimedAddresses[0]);
   * ```
   */


  async claim(quantity) {
    const address = this.metaplex.identity().publicKey.toBase58();
    return this.claimTo(address, quantity);
  }
  /**
   * Claim an NFT from the drop for the specified wallet
   * @returns - the mint address of the claimed NFT
   *
   * @example
   * ```jsx
   * // Specify which address to claim the NFTs to
   * const receiverAddress =  "...";
   * // Claim the NFTs to the specified wallet and get the mint addresses of the NFTs
   * const claimedAddresses = await program.claimTo(receiverAddress, 1);
   * console.log("Claimed NFT at address", claimedAddresses[0]);
   * ```
   */


  async claimTo(receiverAddress, quantity) {
    const candyMachine = await this.getCandyMachine();

    if (!candyMachine.isFullyLoaded) {
      throw new Error(`Drop is not to be claimed - Only ${candyMachine.itemsLoaded} out of ${candyMachine.itemsAvailable} NFTs have been lazy minted`);
    }

    const results = []; // has to claim sequentially

    for (let i = 0; i < quantity; i++) {
      results.push(await this.metaplex.candyMachines().mint({
        candyMachine,
        newOwner: new PublicKey(receiverAddress)
      }).run());
    }

    return results.map(result => result.nft.address.toBase58());
  }
  /**
   * Burn an NFT
   * @param nftAddress - the mint address of the NFT to burn
   * @returns the transaction signature
   *
   * @example
   * ```jsx
   * // Specify the address of the NFT to burn
   * const nftAddress = "..."
   * // And send the actual burn transaction
   * const tx = await program.burn(nftAddress);
   * ```
   */


  async burn(nftAddress) {
    const candyMachine = await this.getCandyMachine();
    const collection = candyMachine.collectionMintAddress ? candyMachine.collectionMintAddress : undefined;
    const tx = await this.metaplex.nfts().delete({
      mintAddress: new PublicKey(nftAddress),
      collection
    }).run();
    return {
      signature: tx.response.signature
    };
  }

  async getCandyMachine() {
    return this.metaplex.candyMachines().findByAddress({
      address: this.publicKey
    }).run();
  }

}

/**
 * Standard token or cryptocurrency.
 *
 * @example
 * ```jsx
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * const sdk = ThirdwebSDK.fromNetwork("devnet");
 * sdk.wallet.connect(signer);
 *
 * // Get the interface for your token program
 * const program = await sdk.getToken("{{contract_address}}");
 * ```
 *
 * @public
 */
class Token {
  get network() {
    const url = new URL(this.metaplex.connection.rpcEndpoint); // try this first to avoid hitting `custom` network for alchemy urls

    if (url.hostname.includes("devnet")) {
      return "devnet";
    }

    if (url.hostname.includes("mainnet")) {
      return "mainnet-beta";
    }

    return this.metaplex.cluster;
  }

  constructor(tokenAddress, metaplex, storage) {
    _defineProperty(this, "connection", void 0);

    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "accountType", "token");

    _defineProperty(this, "publicKey", void 0);

    this.storage = storage;
    this.metaplex = metaplex;
    this.connection = metaplex.connection;
    this.publicKey = new PublicKey(tokenAddress);
  }
  /**
   * Get the metadata for this token including the name, supply, and decimals.
   * @returns Token metadata
   *
   * @example
   * ```jsx
   * const metadata = await program.getMetadata();
   * console.log(metadata.supply);
   * console.log(metadata.decimals);
   * ```
   */


  async getMetadata() {
    const mint = await this.getMint();
    const addr = findMetadataPda(this.publicKey);
    const account = await this.metaplex.rpc().getAccount(addr);
    const meta = toMetadata(toMetadataAccount(account));
    return { ...meta.json,
      id: meta.address.toBase58(),
      uri: meta.uri,
      name: meta.name,
      symbol: meta.symbol,
      decimals: mint.decimals,
      supply: toCurrencyValue(mint.supply)
    };
  }
  /**
   * Get the total minted supply of this token
   * @returns the total supply
   *
   * @example
   * ```jsx
   * const supply = await program.totalSupply();
   * ```
   */


  async totalSupply() {
    const info = await this.getMint();
    return toCurrencyValue(info.supply);
  }
  /**
   * Mints the specified amount of new tokens to the connected wallet
   * @param amount - The amount of tokens to mint
   * @returns the transaction result of the mint
   *
   * @example
   * ```jsx
   * // Specify the amount of tokens to mint
   * const amount = 1;
   * // And then you can mint the tokens
   * const tx = await program.mint(amount);
   * ```
   */


  async mint(amount) {
    return this.mintTo(this.metaplex.identity().publicKey.toBase58(), amount);
  }
  /**
   * Mints the specified amount of new tokens to a specific wallet
   * @param amount - The amount of tokens to mint
   * @returns the transaction result of the mint
   *
   * @example
   * ```jsx
   * // Specify the address to mint tokens to
   * const address = "{{wallet_address}}"";
   * // And the amount of tokens to mint
   * const amount = 1;
   * // And then you can make a mint transaction
   * const tx = await program.mintTo(address, 1);
   * ```
   */


  async mintTo(receiverAddress, amount) {
    const amountParsed = AmountSchema.parse(amount);
    const info = await this.getMint();
    const result = await this.metaplex.tokens().mint({
      amount: token(amountParsed, info.decimals),
      mintAddress: this.publicKey,
      toOwner: new PublicKey(receiverAddress)
    }).run();
    return {
      signature: result.response.signature
    };
  }
  /**
   * Transfer the specified amount of tokens to another wallet
   * @param receiverAddress - The address to send the tokens to
   * @param amount - The amount of tokens to send
   * @returns the transaction result of the transfer
   *
   * @example
   * ```jsx
   * // Specify the address to transfer tokens to
   * const to = "...";
   * // And the amount of tokens to transfer
   * const amount = 1;
   * // And then you can make the transfer transaction
   * const tx = await program.transfer(to, amount);
   * ```
   */


  async transfer(receiverAddress, amount) {
    const info = await this.getMint();
    const result = await this.metaplex.tokens().send({
      mintAddress: this.publicKey,
      amount: token(amount, info.decimals),
      toOwner: new PublicKey(receiverAddress)
    }).run();
    return {
      signature: result.response.signature
    };
  }
  /**
   * Get the token balance of the connected wallet
   * @returns the currency value balance
   *
   * @example
   * ```jsx
   * const balance = await program.balance();
   * console.log(balance.displayValue);
   * ```
   */


  async balance() {
    return this.balanceOf(this.metaplex.identity().publicKey.toBase58());
  }
  /**
   * Get the token balance of the specified wallet
   * @param walletAddress - the wallet address to get the balance of
   * @returns the currency value balance
   *
   * @example
   * ```jsx
   * const address = "..."
   * const balance = await program.balanceOf(address);
   * console.log(balance.displayValue);
   * ```
   */


  async balanceOf(walletAddress) {
    const mint = await this.getMint();
    const addr = await getAssociatedTokenAddress(this.publicKey, new PublicKey(walletAddress));

    try {
      const account = await getAccount(this.connection, addr);
      return toCurrencyValue({
        basisPoints: toBigNumber(account.amount.toString()),
        currency: {
          symbol: "",
          decimals: mint.decimals,
          namespace: "spl-token"
        }
      });
    } catch (e) {
      throw Error(`No balance found for address '${walletAddress}' - ${e}`);
    }
  }

  async getMint() {
    return await this.metaplex.tokens().findMintByAddress({
      address: this.publicKey
    }).run(); // TODO abstract types away
  }

}

/**
 * @internal
 */

class Registry {
  constructor(metaplex) {
    _defineProperty(this, "metaplex", void 0);

    this.metaplex = metaplex;
  }

  async getAccountType(address) {
    try {
      const candyMachine = await this.metaplex.candyMachines().findByAddress({
        address: new PublicKey(address)
      }).run();

      if (candyMachine) {
        return "nft-drop";
      }
    } catch (err) {// ignore and try next
    }

    const metadata = await this.metaplex.nfts().findByMint({
      mintAddress: new PublicKey(address)
    }).run();

    if (metadata) {
      if (metadata.collectionDetails) {
        return "nft-collection";
      } else {
        if (metadata.tokenStandard === TokenStandard.Fungible) {
          return "token";
        }
      }
    }

    throw new Error("Unknown account type");
  }

  async getAccountsForWallet(walletAddress) {
    const mints = await this.getOwnedTokenAccountsForWallet(walletAddress);
    const metadatas = await this.metaplex.nfts().findAllByMintList({
      mints
    }).run();
    const candyMachines = await this.metaplex.candyMachines().findAllBy({
      type: "authority",
      publicKey: new PublicKey(walletAddress)
    }).run();
    return metadatas.map(mintMetadata => {
      const meta = mintMetadata;

      if (!meta) {
        return undefined;
      }

      if (meta !== null && meta !== void 0 && meta.collectionDetails) {
        // check if it's part of a candy machine
        const drop = this.getDropForCollection(candyMachines, meta);

        if (drop) {
          return {
            type: "nft-drop",
            address: drop.address.toBase58(),
            name: meta.name
          };
        } else {
          return {
            type: "nft-collection",
            address: meta.mintAddress.toBase58(),
            name: meta.name
          };
        }
      } else {
        if (meta.tokenStandard === TokenStandard.Fungible) {
          return {
            type: "token",
            address: meta.mintAddress.toBase58(),
            name: meta.name
          };
        }
      }
    }).filter(account => account !== undefined);
  }

  getDropForCollection(candyMachines, meta) {
    return candyMachines.find(candyMachine => {
      var _candyMachine$collect;

      return ((_candyMachine$collect = candyMachine.collectionMintAddress) === null || _candyMachine$collect === void 0 ? void 0 : _candyMachine$collect.toBase58()) === meta.mintAddress.toBase58();
    });
  }

  async getOwnedTokenAccountsForWallet(walletAddress) {
    return await TokenProgram.tokenAccounts(this.metaplex).selectMint().whereOwner(new PublicKey(walletAddress)).getDataAsPublicKeys();
  }

}

/**
 * @internal
 * This is a community API key that is subject to rate limiting. Please use your own key.
 */

const DEFAULT_API_KEY = "_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC";
/**
 * @internal
 */

function getUrlForNetwork(network) {
  switch (network) {
    case "localnet":
      return "http://127.0.0.1:8899";

    case "testnet":
      return clusterApiUrl(network);

    case "mainnet-beta":
      return `https://solana-mainnet.g.alchemy.com/v2/${DEFAULT_API_KEY}`;

    case "devnet":
      return `https://solana-devnet.g.alchemy.com/v2/${DEFAULT_API_KEY}`;

    default:
      return network;
  }
}

/**
 * The main entry-point for the thirdweb Solana SDK.
 *
 * @example
 * ```jsx
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
 *
 * // Create SDK on specified network, and then pass a signer
 * const sdk = ThirdwebSDK.fromNetwork("devnet");
 * // Signer can be a keypair or browser wallet adapter
 * sdk.wallet.connect(signer);
 * ```
 *
 * @public
 */

class ThirdwebSDK {
  /**
   * Create a new SDK instance for the specified network
   * @param network - The network to connect to
   * @param storage - The storage provider to use or IPFS by default
   * @returns an SDK instance
   */
  static fromNetwork(network, storage) {
    return new ThirdwebSDK(new Connection(getUrlForNetwork(network), {
      disableRetryOnRateLimit: true,
      commitment: "confirmed"
    }), storage);
  }
  /**
   * reate a new SDK instance connected with the given private key
   * @param network - The network to connect to
   * @param privateKey - The private key to use
   * @param storage - The storage provider to use or IPFS by default
   * @returns an SDK instance
   */


  static fromPrivateKey(network, privateKey, storage) {
    const sdk = ThirdwebSDK.fromNetwork(network, storage);
    const keypair = Keypair.fromSecretKey(bs58.decode(privateKey));
    sdk.wallet.connect(keypair);
    return sdk;
  }

  /**
   * The currently connected network
   */
  get network() {
    const url = new URL(this.connection.rpcEndpoint); // try this first to avoid hitting `custom` network for alchemy urls

    if (url.hostname.includes("devnet")) {
      return "devnet";
    }

    if (url.hostname.includes("mainnet")) {
      return "mainnet-beta";
    }

    return this.metaplex.cluster;
  }

  constructor(connection) {
    let storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new ThirdwebStorage({
      uploader: new IpfsUploader({
        uploadWithGatewayUrl: true
      })
    });

    _defineProperty(this, "connection", void 0);

    _defineProperty(this, "metaplex", void 0);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "registry", void 0);

    _defineProperty(this, "deployer", void 0);

    _defineProperty(this, "wallet", void 0);

    _defineProperty(this, "auth", void 0);

    this.connection = connection;
    this.storage = storage;
    this.metaplex = Metaplex.make(this.connection);
    this.wallet = new UserWallet(this.metaplex);
    this.auth = new WalletAuthenticator(this.wallet);
    this.deployer = new Deployer(this.metaplex, this.storage);
    this.registry = new Registry(this.metaplex);
  }
  /**
   * Get an SDK interface for an NFT Collection program
   * @param address - Address of the program
   * @returns SDK interface for the program
   */


  async getNFTCollection(address) {
    return this.getProgram(address, "nft-collection");
  }
  /**
   * Get an SDK interface for an NFT Drop program
   * @param address - Address of the program
   * @returns SDK interface for the program
   */


  async getNFTDrop(address) {
    return this.getProgram(address, "nft-drop");
  }
  /**
   * Get an SDK interface for an Token program
   * @param address - Address of the program
   * @returns SDK interface for the program
   */


  async getToken(address) {
    return this.getProgram(address, "token");
  }
  /**
   * Get an SDK interface for a deployed program
   * @param address - Address of the program
   * @returns SDK interface for the program
   *
   * @example
   * ```jsx
   * // Get the interface for your anchor program
   * const program = await sdk.getProgram("{{contract_address}}");
   * ```
   */


  async getProgram(address, programTypeOrIdl) {
    // if we have a programType or IDL
    if (programTypeOrIdl) {
      // if it's a prebuilt program type
      if (typeof programTypeOrIdl === "string") {
        switch (programTypeOrIdl) {
          case "nft-collection":
            return new NFTCollection(address, this.metaplex, this.storage);

          case "nft-drop":
            return new NFTDrop(address, this.metaplex, this.storage);

          case "token":
            return new Token(address, this.metaplex, this.storage);

          default:
            throw new Error("Invalid program type");
        }
      } // otherwise, it's an IDL, so return a program with that IDL


      return this.getProgramWithIdl(address, programTypeOrIdl);
    }

    const anchor = await import('@project-serum/anchor');
    const idl = await anchor.Program.fetchIdl(address, new anchor.AnchorProvider(this.connection, this.metaplex.identity(), {}));

    if (!idl) {
      throw new Error(`Could not fetch IDL for program at address '${address}'`);
    }

    return this.getProgramWithIdl(address, idl);
  }
  /**
   * Get an SDK interface for a deployed program
   * @param address - Address of the program
   * @param idl - The IDL of the program
   * @returns SDK interface for the program
   *
   * @example
   * ```jsx
   * import idl from "path/to/idl.json"
   *
   * // Alternatively, you can pass in your own IDL
   * const program = await sdk.getProgramWithIdl(address, idl);
   * ```
   */


  async getProgramWithIdl(address, idl) {
    const program = await import('./program-4ac4a1b3.esm.js');
    return new program.Program(address, idl, this.connection, this.wallet);
  }

}

export { AmountSchema as A, BasisPointsSchema as B, CommonContractSchema as C, Deployer as D, FileOrBufferSchema as F, JsonLiteral as J, MAX_BPS as M, NFTCollectionMetadataInputSchema as N, OptionalPropertiesInput as O, PercentSchema as P, RawDateSchema as R, TokenMetadataInputSchema as T, UserWallet as U, WalletAuthenticator as W, NFTDropContractInputSchema as a, NFTCollection as b, NFTDrop as c, Token as d, ThirdwebSDK as e, AddressSchema as f, FileOrBufferOrStringSchema as g, CommonContractOutputSchema as h, CreatorInputSchema as i, NFTDropInitialConditionsInputSchema as j, NFTDropUpdateableConditionsInputSchema as k, NFTDropUpdateableConditionsOutputSchema as l, getUrlForNetwork as m };
