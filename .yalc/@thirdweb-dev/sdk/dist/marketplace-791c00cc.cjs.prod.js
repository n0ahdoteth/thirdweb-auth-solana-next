'use strict';

var defineProperty = require('./defineProperty-b8983092.cjs.prod.js');
var paperXyz = require('./paper-xyz-5d893c3a.cjs.prod.js');
var ethers = require('ethers');
var invariant = require('tiny-invariant');
require('bn.js');
require('zod');
require('@thirdweb-dev/contracts-js/dist/abis/IERC165.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155.json');
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

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

/**
 * Create your own whitelabel marketplace that enables users to buy and sell any digital assets.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "marketplace");
 * ```
 *
 * @public
 */

class Marketplace {
  /**
   * @internal
   */

  /**
   * Direct listings
   * @remarks Create and manage direct listings in your marketplace.
   * @example
   * ```javascript
   * // Data of the listing you want to create
   * const listing = {
   *   // address of the NFT contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *  // when should the listing open up for offers
   *   startTimestamp: new Date(),
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: NATIVE_TOKEN_ADDRESS,
   *   // how much the asset will be sold for
   *   buyoutPricePerToken: "1.5",
   * }
   *
   * const tx = await contract.direct.createListing(listing);
   * const receipt = tx.receipt; // the transaction receipt
   * const listingId = tx.id; // the id of the newly created listing
   *
   * // And on the buyers side:
   * // Quantity of the asset you want to buy
   * const quantityDesired = 1;
   * await contract.direct.buyoutListing(listingId, quantityDesired);
   * ```
   */

  /**
   * Auctions
   * @remarks Create and manage auctions in your marketplace.
   * @example
   * ```javascript
   * // Data of the auction you want to create
   * const auction = {
   *   // address of the contract the asset you want to list is on
   *   assetContractAddress: "0x...",
   *   // token ID of the asset you want to list
   *   tokenId: "0",
   *  // when should the listing open up for offers
   *   startTimestamp: new Date(),
   *   // how long the listing will be open for
   *   listingDurationInSeconds: 86400,
   *   // how many of the asset you want to list
   *   quantity: 1,
   *   // address of the currency contract that will be used to pay for the listing
   *   currencyContractAddress: NATIVE_TOKEN_ADDRESS,
   *   // how much people would have to bid to instantly buy the asset
   *   buyoutPricePerToken: "10",
   *   // the minimum bid that will be accepted for the token
   *   reservePricePerToken: "1.5",
   * }
   *
   * const tx = await contract.auction.createListing(auction);
   * const receipt = tx.receipt; // the transaction receipt
   * const listingId = tx.id; // the id of the newly created listing
   *
   * // And on the buyers side:
   * // The price you are willing to bid for a single token of the listing
   * const pricePerToken = 2.6;
   * await contract.auction.makeBid(listingId, pricePerToken);
   * ```
   */
  get chainId() {
    return this._chainId;
  }

  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : undefined;
    let chainId = arguments.length > 5 ? arguments[5] : undefined;
    let contractWrapper = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new paperXyz.ContractWrapper(network, address, abi, options);

    defineProperty._defineProperty(this, "abi", void 0);

    defineProperty._defineProperty(this, "contractWrapper", void 0);

    defineProperty._defineProperty(this, "storage", void 0);

    defineProperty._defineProperty(this, "encoder", void 0);

    defineProperty._defineProperty(this, "events", void 0);

    defineProperty._defineProperty(this, "estimator", void 0);

    defineProperty._defineProperty(this, "platformFees", void 0);

    defineProperty._defineProperty(this, "metadata", void 0);

    defineProperty._defineProperty(this, "roles", void 0);

    defineProperty._defineProperty(this, "interceptor", void 0);

    defineProperty._defineProperty(this, "direct", void 0);

    defineProperty._defineProperty(this, "auction", void 0);

    defineProperty._defineProperty(this, "_chainId", void 0);

    defineProperty._defineProperty(this, "getAll", this.getAllListings);

    this._chainId = chainId;
    this.abi = abi;
    this.contractWrapper = contractWrapper;
    this.storage = storage;
    this.metadata = new paperXyz.ContractMetadata(this.contractWrapper, paperXyz.MarketplaceContractSchema, this.storage);
    this.roles = new paperXyz.ContractRoles(this.contractWrapper, Marketplace.contractRoles);
    this.encoder = new paperXyz.ContractEncoder(this.contractWrapper);
    this.estimator = new paperXyz.GasCostEstimator(this.contractWrapper);
    this.direct = new paperXyz.MarketplaceDirect(this.contractWrapper, this.storage);
    this.auction = new paperXyz.MarketplaceAuction(this.contractWrapper, this.storage);
    this.events = new paperXyz.ContractEvents(this.contractWrapper);
    this.platformFees = new paperXyz.ContractPlatformFee(this.contractWrapper);
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
   * Convenience function to get either a direct or auction listing
   *
   * @param listingId - the listing id
   * @returns either a direct or auction listing
   *
   * @remarks Get a listing by its listing id
   * @example
   * ```javascript
   * const listingId = 0;
   * const listing = await contract.getListing(listingId);
   * ```
   */


  async getListing(listingId) {
    const listing = await this.contractWrapper.readContract.listings(listingId);

    if (listing.assetContract === ethers.constants.AddressZero) {
      throw new paperXyz.ListingNotFoundError(this.getAddress(), listingId.toString());
    }

    switch (listing.listingType) {
      case paperXyz.ListingType.Auction:
        {
          return await this.auction.mapListing(listing);
        }

      case paperXyz.ListingType.Direct:
        {
          return await this.direct.mapListing(listing);
        }

      default:
        {
          throw new Error(`Unknown listing type: ${listing.listingType}`);
        }
    }
  }
  /**
   * Get all active listings
   *
   * @remarks Fetch all the active listings from this marketplace contract. An active listing means it can be bought or bid on.
   * @example
   * ```javascript
   * const listings = await contract.getActiveListings();
   * const priceOfFirstActiveListing = listings[0].price;
   * ```
   * @param filter - optional filter parameters
   */


  async getActiveListings(filter) {
    const rawListings = await this.getAllListingsNoFilter(true);
    const filtered = this.applyFilter(rawListings, filter);
    const now = ethers.BigNumber.from(Math.floor(Date.now() / 1000));
    return filtered.filter(l => {
      return l.type === paperXyz.ListingType.Auction && ethers.BigNumber.from(l.endTimeInEpochSeconds).gt(now) && ethers.BigNumber.from(l.startTimeInEpochSeconds).lte(now) || l.type === paperXyz.ListingType.Direct && l.quantity > 0;
    });
  }
  /**
   * Get all the listings
   *
   * @remarks Fetch all the listings from this marketplace contract, including sold ones.
   * @example
   * ```javascript
   * const listings = await contract.getAllListings();
   * const priceOfFirstListing = listings[0].price;
   * ```
   *
   * @param filter - optional filter parameters
   */


  async getAllListings(filter) {
    const rawListings = await this.getAllListingsNoFilter(false);
    return this.applyFilter(rawListings, filter);
  }
  /**
   * @internal
   */


  /**
   * Get the total number of Listings
   * @returns the total number listings on the marketplace
   * @public
   */
  async getTotalCount() {
    return await this.contractWrapper.readContract.totalListings();
  }
  /**
   * Get whether listing is restricted only to addresses with the Lister role
   */


  async isRestrictedToListerRoleOnly() {
    const anyoneCanList = await this.contractWrapper.readContract.hasRole(paperXyz.getRoleHash("lister"), ethers.constants.AddressZero);
    return !anyoneCanList;
  }
  /**
   * Get the buffer in basis points between offers
   */


  async getBidBufferBps() {
    return this.contractWrapper.readContract.bidBufferBps();
  }
  /**
   * get the buffer time in seconds between offers
   */


  async getTimeBufferInSeconds() {
    return this.contractWrapper.readContract.timeBuffer();
  }
  /**
   * Get all the offers for a listing
   *
   * @remarks Fetch all the offers for a specified direct or auction listing.
   * @example
   * ```javascript
   * const offers = await marketplaceContract.getOffers(listingId);
   * const firstOffer = offers[0];
   * ```
   *
   * @param listingId - the id of the listing to fetch offers for
   */


  async getOffers(listingId) {
    // get all new offer events from this contract
    const events = await this.events.getEvents("NewOffer"); // get only the events for this listing id

    const listingEvents = events.filter(e => e.data.listingId.eq(listingId)); // derive the offers from the events

    const offers = await Promise.all(listingEvents.map(async e => {
      const offer = await paperXyz.mapOffer(this.contractWrapper.getProvider(), ethers.BigNumber.from(listingId), {
        quantityWanted: e.data.quantityWanted,
        pricePerToken: e.data.totalOfferAmount.div(e.data.quantityWanted),
        currency: e.data.currency,
        offeror: e.data.offeror
      });
      return offer;
    }));
    return offers;
  }
  /** ******************************
   * WRITE FUNCTIONS
   *******************************/

  /**
   * Purchase NFTs
   * @remarks Buy a Direct or Auction listing on your marketplace.
   * @example
   * ```javascript
   * // The listing ID of the asset you want to buy
   * const listingId = 0;
   * // Quantity of the asset you want to buy
   * const quantityDesired = 1;
   *
   * await contract.buyoutListing(listingId, quantityDesired);
   * ```
   * @param listingId - the listing ID of the listing you want to buy
   * @param quantityDesired - the quantity that you want to buy (for ERC1155 tokens)
   * @param receiver - optional receiver of the bought listing if different from the connected wallet (for direct listings only)
   */


  async buyoutListing(listingId, quantityDesired, receiver) {
    const listing = await this.contractWrapper.readContract.listings(listingId);

    if (listing.listingId.toString() !== listingId.toString()) {
      throw new paperXyz.ListingNotFoundError(this.getAddress(), listingId.toString());
    }

    switch (listing.listingType) {
      case paperXyz.ListingType.Direct:
        {
          invariant__default["default"](quantityDesired !== undefined, "quantityDesired is required when buying out a direct listing");
          return await this.direct.buyoutListing(listingId, quantityDesired, receiver);
        }

      case paperXyz.ListingType.Auction:
        {
          return await this.auction.buyoutListing(listingId);
        }

      default:
        throw Error(`Unknown listing type: ${listing.listingType}`);
    }
  }
  /**
   * Set the Auction bid buffer
   * @remarks A percentage (e.g. 5%) in basis points (5% = 500, 100% = 10000). A new bid is considered to be a winning bid only if its bid amount is at least the bid buffer (e.g. 5%) greater than the previous winning bid. This prevents buyers from making very slightly higher bids to win the auctioned items.
   * @example
   * ```javascript
   * // the bid buffer in basis points
   * const bufferBps = 5_00; // 5%
   * await contract.setBidBufferBps(bufferBps);
   * ```
   * @param bufferBps - the bps value
   */


  async setBidBufferBps(bufferBps) {
    await this.roles.verify(["admin"], await this.contractWrapper.getSignerAddress());
    const timeBuffer = await this.getTimeBufferInSeconds();
    await this.contractWrapper.sendTransaction("setAuctionBuffers", [timeBuffer, ethers.BigNumber.from(bufferBps)]);
  }
  /**
   * Set the Auction Time buffer:
   * @remarks Measured in seconds (e.g. 15 minutes or 900 seconds). If a winning bid is made within the buffer of the auction closing (e.g. 15 minutes within the auction closing), the auction's closing time is increased by the buffer to prevent buyers from making last minute winning bids, and to give time to other buyers to make a higher bid if they wish to.
   * @example
   * ```javascript
   * // the time buffer in seconds
   * const bufferInSeconds = 60;
   * await contract.setTimeBufferInSeconds(bufferInSeconds);
   * ```
   * @param bufferInSeconds - the seconds value
   */


  async setTimeBufferInSeconds(bufferInSeconds) {
    await this.roles.verify(["admin"], await this.contractWrapper.getSignerAddress());
    const bidBuffer = await this.getBidBufferBps();
    await this.contractWrapper.sendTransaction("setAuctionBuffers", [ethers.BigNumber.from(bufferInSeconds), bidBuffer]);
  }
  /**
   * Restrict listing NFTs only from the specified NFT contract address.
   * It is possible to allow listing from multiple contract addresses.
   * @param contractAddress - the NFT contract address
   */


  async allowListingFromSpecificAssetOnly(contractAddress) {
    const encoded = [];
    const members = await this.roles.get("asset");

    if (members.includes(ethers.constants.AddressZero)) {
      encoded.push(this.encoder.encode("revokeRole", [paperXyz.getRoleHash("asset"), ethers.constants.AddressZero]));
    }

    encoded.push(this.encoder.encode("grantRole", [paperXyz.getRoleHash("asset"), contractAddress]));
    await this.contractWrapper.multiCall(encoded);
  }
  /**
   * Allow listings from any NFT contract
   */


  async allowListingFromAnyAsset() {
    const encoded = [];
    const members = await this.roles.get("asset");

    for (const addr in members) {
      encoded.push(this.encoder.encode("revokeRole", [paperXyz.getRoleHash("asset"), addr]));
    }

    encoded.push(this.encoder.encode("grantRole", [paperXyz.getRoleHash("asset"), ethers.constants.AddressZero]));
    await this.contractWrapper.multiCall(encoded);
  }
  /** ******************************
   * PRIVATE FUNCTIONS
   *******************************/


  async getAllListingsNoFilter(filterInvalidListings) {
    const listings = await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async i => {
      let listing;

      try {
        listing = await this.getListing(i);
      } catch (err) {
        if (err instanceof paperXyz.ListingNotFoundError) {
          return undefined;
        } else {
          console.warn(`Failed to get listing ${i}' - skipping. Try 'marketplace.getListing(${i})' to get the underlying error.`);
          return undefined;
        }
      }

      if (listing.type === paperXyz.ListingType.Auction) {
        return listing;
      }

      if (filterInvalidListings) {
        const {
          valid
        } = await this.direct.isStillValidListing(listing);

        if (!valid) {
          return undefined;
        }
      }

      return listing;
    }));
    return listings.filter(l => l !== undefined);
  }

  applyFilter(listings, filter) {
    let rawListings = [...listings];
    const start = ethers.BigNumber.from((filter === null || filter === void 0 ? void 0 : filter.start) || 0).toNumber();
    const count = ethers.BigNumber.from((filter === null || filter === void 0 ? void 0 : filter.count) || paperXyz.DEFAULT_QUERY_ALL_COUNT).toNumber();

    if (filter) {
      if (filter.seller) {
        rawListings = rawListings.filter(seller => {
          var _filter$seller;

          return seller.sellerAddress.toString().toLowerCase() === (filter === null || filter === void 0 ? void 0 : (_filter$seller = filter.seller) === null || _filter$seller === void 0 ? void 0 : _filter$seller.toString().toLowerCase());
        });
      }

      if (filter.tokenContract) {
        rawListings = rawListings.filter(tokenContract => {
          var _filter$tokenContract;

          return tokenContract.assetContractAddress.toString().toLowerCase() === (filter === null || filter === void 0 ? void 0 : (_filter$tokenContract = filter.tokenContract) === null || _filter$tokenContract === void 0 ? void 0 : _filter$tokenContract.toString().toLowerCase());
        });
      }

      if (filter.tokenId !== undefined) {
        rawListings = rawListings.filter(tokenContract => {
          var _filter$tokenId;

          return tokenContract.tokenId.toString() === (filter === null || filter === void 0 ? void 0 : (_filter$tokenId = filter.tokenId) === null || _filter$tokenId === void 0 ? void 0 : _filter$tokenId.toString());
        });
      }

      rawListings = rawListings.filter((_, index) => index >= start);
      rawListings = rawListings.slice(0, count);
    }

    return rawListings;
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

defineProperty._defineProperty(Marketplace, "contractRoles", ["admin", "lister", "asset"]);

exports.Marketplace = Marketplace;