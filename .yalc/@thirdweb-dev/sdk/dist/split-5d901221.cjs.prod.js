'use strict';

var defineProperty = require('./defineProperty-b8983092.cjs.prod.js');
var paperXyz = require('./paper-xyz-5d893c3a.cjs.prod.js');
var ERC20Abi = require('@thirdweb-dev/contracts-js/dist/abis/IERC20.json');
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

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var ERC20Abi__default = /*#__PURE__*/_interopDefault(ERC20Abi);

/**
 * Create custom royalty splits to distribute funds.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "split");
 * ```
 *
 * @public
 */

class Split {
  /**
   * @internal
   */
  get chainId() {
    return this._chainId;
  }

  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : undefined;
    let chainId = arguments.length > 5 ? arguments[5] : undefined;
    let contractWrapper = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new paperXyz.ContractWrapper(network, address, abi, options);

    defineProperty._defineProperty(this, "contractWrapper", void 0);

    defineProperty._defineProperty(this, "storage", void 0);

    defineProperty._defineProperty(this, "abi", void 0);

    defineProperty._defineProperty(this, "metadata", void 0);

    defineProperty._defineProperty(this, "encoder", void 0);

    defineProperty._defineProperty(this, "estimator", void 0);

    defineProperty._defineProperty(this, "events", void 0);

    defineProperty._defineProperty(this, "roles", void 0);

    defineProperty._defineProperty(this, "interceptor", void 0);

    defineProperty._defineProperty(this, "_chainId", void 0);

    this._chainId = chainId;
    this.abi = abi;
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.metadata = new paperXyz.ContractMetadata(this.contractWrapper, paperXyz.SplitsContractSchema, this.storage);
    this.roles = new paperXyz.ContractRoles(this.contractWrapper, Split.contractRoles);
    this.encoder = new paperXyz.ContractEncoder(this.contractWrapper);
    this.estimator = new paperXyz.GasCostEstimator(this.contractWrapper);
    this.events = new paperXyz.ContractEvents(this.contractWrapper);
    this.interceptor = new paperXyz.ContractInterceptor(this.contractWrapper);
  }

  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }

  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/

  /**
   * Get Recipients of this splits contract
   *
   * @remarks Get the data about the shares of every split recipient on the contract
   *
   * @example
   * ```javascript
   * const recipients = await contract.getAllRecipients();
   * console.log(recipients);
   * ```
   */


  async getAllRecipients() {
    const recipients = [];
    let index = ethers.BigNumber.from(0);
    const totalRecipients = await this.contractWrapper.readContract.payeeCount();

    while (index.lt(totalRecipients)) {
      try {
        const recipientAddress = await this.contractWrapper.readContract.payee(index);
        recipients.push(await this.getRecipientSplitPercentage(recipientAddress));
        index = index.add(1);
      } catch (err) {
        // The only way we know how to detect that we've found all recipients
        // is if we get an error when trying to get the next recipient.
        if ("method" in err && err["method"].toLowerCase().includes("payee(uint256)")) {
          break;
        } else {
          throw err;
        }
      }
    }

    return recipients;
  }
  /**
   * Returns all the recipients and their balances in the native currency.
   *
   * @returns A map of recipient addresses to their balances in the native currency.
   */


  async balanceOfAllRecipients() {
    const recipients = await this.getAllRecipients();
    const balances = {};

    for (const recipient of recipients) {
      balances[recipient.address] = await this.balanceOf(recipient.address);
    }

    return balances;
  }
  /**
   * Returns all the recipients and their balances in a non-native currency.
   *
   * @param tokenAddress - The address of the currency to check the balances in.
   * @returns A map of recipient addresses to their balances in the specified currency.
   */


  async balanceOfTokenAllRecipients(tokenAddress) {
    const recipients = await this.getAllRecipients();
    const balances = {};

    for (const recipient of recipients) {
      balances[recipient.address] = await this.balanceOfToken(recipient.address, tokenAddress);
    }

    return balances;
  }
  /**
   * Get Funds owed to a particular wallet
   *
   * @remarks Get the amount of funds in the native currency held by the contract that is owed to a specific recipient.
   *
   * @example
   * ```javascript
   * // The address to check the funds of
   * const address = "{{wallet_address}}";
   * const funds = await contract.balanceOf(address);
   * console.log(funds);
   * ```
   */


  async balanceOf(address) {
    const walletBalance = await this.contractWrapper.readContract.provider.getBalance(this.getAddress());
    const totalReleased = await this.contractWrapper.readContract["totalReleased()"]();
    const totalReceived = walletBalance.add(totalReleased);
    return this._pendingPayment(address, totalReceived, await this.contractWrapper.readContract["released(address)"](address));
  }
  /**
   * Get non-native Token Funds owed to a particular wallet
   *
   * @remarks Get the amount of funds in the non-native tokens held by the contract that is owed to a specific recipient.
   *
   * @example
   * ```javascript
   * // The address to check the funds of
   * const address = "{{wallet_address}}";
   * // The address of the currency to check the contracts funds of
   * const tokenAddress = "0x..."
   * const funds = await contract.balanceOfToken(address, tokenAddress);
   * console.log(funds);
   * ```
   */


  async balanceOfToken(walletAddress, tokenAddress) {
    const erc20 = new ethers.Contract(tokenAddress, ERC20Abi__default["default"], this.contractWrapper.getProvider());
    const walletBalance = await erc20.balanceOf(this.getAddress());
    const totalReleased = await this.contractWrapper.readContract["totalReleased(address)"](tokenAddress);
    const totalReceived = walletBalance.add(totalReleased);
    const value = await this._pendingPayment(walletAddress, totalReceived, await this.contractWrapper.readContract["released(address,address)"](tokenAddress, walletAddress));
    return await paperXyz.fetchCurrencyValue(this.contractWrapper.getProvider(), tokenAddress, value);
  }
  /**
   * Get the % of funds owed to a given address
   * @param address - the address to check percentage of
   */


  async getRecipientSplitPercentage(address) {
    const [totalShares, walletsShares] = await Promise.all([this.contractWrapper.readContract.totalShares(), this.contractWrapper.readContract.shares(address)]); // We convert to basis points to avoid floating point loss of precision

    return {
      address,
      splitPercentage: walletsShares.mul(ethers.BigNumber.from(1e7)).div(totalShares).toNumber() / 1e5
    };
  }
  /** ******************************
   * WRITE FUNCTIONS
   *******************************/

  /**
   * Withdraw Funds
   * @remarks Triggers a transfer to account of the amount of native currency they are owed.
   *
   * @example
   * ```javascript
   * // the wallet address that wants to withdraw their funds
   * const walletAddress = "{{wallet_address}}"
   * await contract.withdraw(walletAddress);
   * ```
   *
   * @param walletAddress - The address to distributes the amount to
   */


  async withdraw(walletAddress) {
    return {
      receipt: await this.contractWrapper.sendTransaction("release(address)", [walletAddress])
    };
  }
  /**
   * Triggers a transfer to account of the amount of a given currency they are owed.
   *
   * @param walletAddress - The address to distributes the amount to
   * @param tokenAddress - The address of the currency contract to distribute funds
   */


  async withdrawToken(walletAddress, tokenAddress) {
    return {
      receipt: await this.contractWrapper.sendTransaction("release(address,address)", [tokenAddress, walletAddress])
    };
  }
  /**
   * Distribute Funds
   *
   * @remarks Distribute funds held by the contract in the native currency to all recipients.
   *
   * @example
   * ```javascript
   * await contract.distribute();
   * ```
   */


  async distribute() {
    return {
      receipt: await this.contractWrapper.sendTransaction("distribute()", [])
    };
  }
  /**
   * Distribute Funds
   *
   * @remarks Distribute funds held by the contract in the native currency to all recipients.
   *
   * @example
   * ```javascript
   * // The address of the currency to distribute funds
   * const tokenAddress = "0x..."
   * await contract.distributeToken(tokenAddress);
   * ```
   *
   * @param tokenAddress - The address of the currency contract to distribute funds
   */


  async distributeToken(tokenAddress) {
    return {
      receipt: await this.contractWrapper.sendTransaction("distribute(address)", [tokenAddress])
    };
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/


  async _pendingPayment(address, totalReceived, alreadyReleased) {
    const addressReceived = totalReceived.mul(await this.contractWrapper.readContract.shares(address));
    const totalRoyaltyAvailable = addressReceived.div(await this.contractWrapper.readContract.totalShares());
    return totalRoyaltyAvailable.sub(alreadyReleased);
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

defineProperty._defineProperty(Split, "contractRoles", ["admin"]);

exports.Split = Split;