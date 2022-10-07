'use strict';

var defineProperty = require('./defineProperty-b8983092.cjs.prod.js');
var paperXyz = require('./paper-xyz-5d893c3a.cjs.prod.js');
var ethers = require('ethers');
require('bn.js');
require('zod');
require('@thirdweb-dev/contracts-js/dist/abis/IERC165.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155.json');
require('tiny-invariant');
require('eventemitter3');
require('cross-fetch');
require('@thirdweb-dev/contracts-js/dist/abis/Forwarder.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDropSinglePhase.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMulticall.json');
require('@thirdweb-dev/contracts-js/dist/abis/ISignatureMintERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IClaimableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDelayedReveal.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Enumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Supply.json');
require('@thirdweb-dev/contracts-js/dist/abis/ILazyMint.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/SignatureMintERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/DelayedReveal.json');
require('@thirdweb-dev/contracts-js/dist/abis/DropSinglePhase1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IClaimableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155Enumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/ISignatureMintERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC20Metadata.json');
require('fast-deep-equal');
require('uuid');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Metadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155Metadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDelayedRevealDeprecated.json');
require('@thirdweb-dev/contracts-js/dist/abis/TWFactory.json');
require('@thirdweb-dev/contracts-js/dist/abis/TWRegistry.json');
require('@thirdweb-dev/contracts-js/dist/abis/ContractPublisher.json');
require('@thirdweb-dev/contracts-js/dist/abis/IThirdwebContract.json');
require('@thirdweb-dev/storage');
require('@thirdweb-dev/contracts-js/dist/abis/IAppURI.json');
require('@thirdweb-dev/contracts-js/dist/abis/IContractMetadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPermissions.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPermissionsEnumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPlatformFee.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPrimarySale.json');
require('@thirdweb-dev/contracts-js/dist/abis/IRoyalty.json');
require('@thirdweb-dev/contracts-js/dist/abis/Ownable.json');

/**
 * Setup a collection of NFTs with a customizable number of each NFT that are minted as users claim them.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "edition-drop");
 * ```
 *
 * @public
 */

class EditionDrop extends paperXyz.StandardErc1155 {
  /**
   * Configure royalties
   * @remarks Set your own royalties for the entire contract or per token
   * @example
   * ```javascript
   * // royalties on the whole contract
   * contract.royalties.setDefaultRoyaltyInfo({
   *   seller_fee_basis_points: 100, // 1%
   *   fee_recipient: "0x..."
   * });
   * // override royalty for a particular token
   * contract.royalties.setTokenRoyaltyInfo(tokenId, {
   *   seller_fee_basis_points: 500, // 5%
   *   fee_recipient: "0x..."
   * });
   * ```
   */

  /**
   * Configure claim conditions for each NFT
   * @remarks Define who can claim each NFT in the edition, when and how many.
   * @example
   * ```javascript
   * const presaleStartTime = new Date();
   * const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
   * const claimConditions = [
   *   {
   *     startTime: presaleStartTime, // start the presale now
   *     maxQuantity: 2, // limit how many mints for this presale
   *     price: 0.01, // presale price
   *     snapshot: ['0x...', '0x...'], // limit minting to only certain addresses
   *   },
   *   {
   *     startTime: publicSaleStartTime, // 24h after presale, start public sale
   *     price: 0.08, // public sale price
   *   }
   * ]);
   *
   * const tokenId = 0; // the id of the NFT to set claim conditions on
   * await contract.claimConditions.set(tokenId, claimConditions);
   * ```
   */

  /**
   * Checkout
   * @remarks Create a FIAT currency checkout for your NFT drop.
   */
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : undefined;
    let chainId = arguments.length > 5 ? arguments[5] : undefined;
    let contractWrapper = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new paperXyz.ContractWrapper(network, address, abi, options);
    super(contractWrapper, storage, chainId);

    defineProperty._defineProperty(this, "abi", void 0);

    defineProperty._defineProperty(this, "sales", void 0);

    defineProperty._defineProperty(this, "platformFees", void 0);

    defineProperty._defineProperty(this, "encoder", void 0);

    defineProperty._defineProperty(this, "estimator", void 0);

    defineProperty._defineProperty(this, "events", void 0);

    defineProperty._defineProperty(this, "metadata", void 0);

    defineProperty._defineProperty(this, "roles", void 0);

    defineProperty._defineProperty(this, "royalties", void 0);

    defineProperty._defineProperty(this, "claimConditions", void 0);

    defineProperty._defineProperty(this, "checkout", void 0);

    defineProperty._defineProperty(this, "history", void 0);

    defineProperty._defineProperty(this, "interceptor", void 0);

    defineProperty._defineProperty(this, "erc1155", void 0);

    defineProperty._defineProperty(this, "owner", void 0);

    this.abi = abi;
    this.metadata = new paperXyz.ContractMetadata(this.contractWrapper, paperXyz.DropErc1155ContractSchema, this.storage);
    this.roles = new paperXyz.ContractRoles(this.contractWrapper, EditionDrop.contractRoles);
    this.royalties = new paperXyz.ContractRoyalty(this.contractWrapper, this.metadata);
    this.sales = new paperXyz.ContractPrimarySale(this.contractWrapper);
    this.claimConditions = new paperXyz.DropErc1155ClaimConditions(this.contractWrapper, this.metadata, this.storage);
    this.events = new paperXyz.ContractEvents(this.contractWrapper);
    this.history = new paperXyz.DropErc1155History(this.events);
    this.encoder = new paperXyz.ContractEncoder(this.contractWrapper);
    this.estimator = new paperXyz.GasCostEstimator(this.contractWrapper);
    this.platformFees = new paperXyz.ContractPlatformFee(this.contractWrapper);
    this.interceptor = new paperXyz.ContractInterceptor(this.contractWrapper);
    this.erc1155 = new paperXyz.Erc1155(this.contractWrapper, this.storage, chainId);
    this.checkout = new paperXyz.PaperCheckout(this.contractWrapper);
    this.owner = new paperXyz.ContractOwner(this.contractWrapper);
  }
  /**
   * @internal
   */


  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }

  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/
  // TODO getAllClaimerAddresses() - should be done via an indexer

  /**
   * Get All Minted NFTs
   *
   * @remarks Get all the data associated with every NFT in this contract.
   *
   * By default, returns the first 100 NFTs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const nfts = await contract.getAll();
   * ```
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The NFT metadata for all NFTs queried.
   */


  async getAll(queryParams) {
    return this.erc1155.getAll(queryParams);
  }
  /**
   * Get Owned NFTs
   *
   * @remarks Get all the data associated with the NFTs owned by a specific wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to get the NFTs of
   * const address = "{{wallet_address}}";
   * const nfts = await contract.getOwned(address);
   * ```
   *
   * @returns The NFT metadata for all NFTs in the contract.
   */


  async getOwned(walletAddress) {
    return this.erc1155.getOwned(walletAddress);
  }
  /**
   * Get the number of NFTs minted
   * @returns the total number of NFTs minted in this contract
   * @public
   */


  async getTotalCount() {
    return this.erc1155.totalCount();
  }
  /**
   * Get whether users can transfer NFTs from this contract
   */


  async isTransferRestricted() {
    const anyoneCanTransfer = await this.contractWrapper.readContract.hasRole(paperXyz.getRoleHash("transfer"), ethers.constants.AddressZero);
    return !anyoneCanTransfer;
  }
  /** ******************************
   * WRITE FUNCTIONS
   *******************************/

  /**
   * Create a batch of NFTs to be claimed in the future
   *
   * @remarks Create batch allows you to create a batch of many NFTs in one transaction.
   *
   * @example
   * ```javascript
   * // Custom metadata of the NFTs to create
   * const metadatas = [{
   *   name: "Cool NFT",
   *   description: "This is a cool NFT",
   *   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
   * }, {
   *   name: "Cool NFT",
   *   description: "This is a cool NFT",
   *   image: fs.readFileSync("path/to/image.png"),
   * }];
   *
   * const results = await contract.createBatch(metadatas); // uploads and creates the NFTs on chain
   * const firstTokenId = results[0].id; // token id of the first created NFT
   * const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT
   * ```
   *
   * @param metadatas - The metadata to include in the batch.
   * @param options - optional upload progress callback
   */


  async createBatch(metadatas, options) {
    return this.erc1155.lazyMint(metadatas, options);
  }
  /**
   * Construct a claim transaction without executing it.
   * This is useful for estimating the gas cost of a claim transaction, overriding transaction options and having fine grained control over the transaction execution.
   * @param destinationAddress - Address you want to send the token to
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
   * @param claimData - Optional claim verification data (e.g. price, allowlist proof, etc...)
   */


  async getClaimTransaction(destinationAddress, tokenId, quantity) {
    let checkERC20Allowance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.erc1155.getClaimTransaction(destinationAddress, tokenId, quantity, {
      checkERC20Allowance
    });
  }
  /**
   * Claim NFTs to a specific Wallet
   *
   * @remarks Let the specified wallet claim NFTs.
   *
   * @example
   * ```javascript
   * const address = "{{wallet_address}}"; // address of the wallet you want to claim the NFTs
   * const tokenId = 0; // the id of the NFT you want to claim
   * const quantity = 1; // how many NFTs you want to claim
   *
   * const tx = await contract.claimTo(address, tokenId, quantity);
   * const receipt = tx.receipt; // the transaction receipt
   * ```
   *
   * @param destinationAddress - Address you want to send the token to
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */


  async claimTo(destinationAddress, tokenId, quantity) {
    let checkERC20Allowance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    return this.erc1155.claimTo(destinationAddress, tokenId, quantity, {
      checkERC20Allowance
    });
  }
  /**
   * Claim a token to the connected wallet
   *
   * @remarks See {@link EditionDrop.claimTo}
   *
   * @param tokenId - Id of the token you want to claim
   * @param quantity - Quantity of the tokens you want to claim
   * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
   * @param proofs - Array of proofs
   *
   * @returns - Receipt for the transaction
   */


  async claim(tokenId, quantity) {
    let checkERC20Allowance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const address = await this.contractWrapper.getSignerAddress();
    return this.claimTo(address, tokenId, quantity, checkERC20Allowance);
  }
  /**
   * Burn a specified amount of a NFT
   *
   * @param tokenId - the token Id to burn
   * @param amount - amount to burn
   *
   * @example
   * ```javascript
   * const result = await contract.burnTokens(tokenId, amount);
   * ```
   */


  async burnTokens(tokenId, amount) {
    return this.erc1155.burn(tokenId, amount);
  }
  /**
   * @internal
   */


  async call(functionName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return this.contractWrapper.call(functionName, ...args);
  }

}

defineProperty._defineProperty(EditionDrop, "contractRoles", ["admin", "minter", "transfer"]);

exports.EditionDrop = EditionDrop;
