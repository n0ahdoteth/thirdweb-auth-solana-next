import { ContractEncoder } from "../../core/classes/contract-encoder";
import { ContractEvents } from "../../core/classes/contract-events";
import { ContractInterceptor } from "../../core/classes/contract-interceptor";
import { ContractMetadata } from "../../core/classes/contract-metadata";
import { ContractPlatformFee } from "../../core/classes/contract-platform-fee";
import { ContractRoles } from "../../core/classes/contract-roles";
import { ContractWrapper } from "../../core/classes/contract-wrapper";
import { GasCostEstimator } from "../../core/classes/gas-cost-estimator";
import { MarketplaceAuction } from "../../core/classes/marketplace-auction";
import { MarketplaceDirect } from "../../core/classes/marketplace-direct";
import { UpdateableNetwork } from "../../core/interfaces/contract";
import { NetworkOrSignerOrProvider, TransactionResult } from "../../core/types";
import { MarketplaceContractSchema } from "../../schema/contracts/marketplace";
import { AuctionListing, DirectListing, Offer } from "../../types/marketplace";
import { MarketplaceFilter } from "../../types/marketplace/MarketPlaceFilter";
import type { Marketplace as MarketplaceContract } from "@thirdweb-dev/contracts-js";
import type ABI from "@thirdweb-dev/contracts-js/dist/abis/Marketplace.json";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, BigNumberish, CallOverrides } from "ethers";
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
export declare class Marketplace implements UpdateableNetwork {
    static contractRoles: readonly ["admin", "lister", "asset"];
    abi: typeof ABI;
    private contractWrapper;
    private storage;
    encoder: ContractEncoder<MarketplaceContract>;
    events: ContractEvents<MarketplaceContract>;
    estimator: GasCostEstimator<MarketplaceContract>;
    platformFees: ContractPlatformFee<MarketplaceContract>;
    metadata: ContractMetadata<MarketplaceContract, typeof MarketplaceContractSchema>;
    roles: ContractRoles<MarketplaceContract, typeof Marketplace.contractRoles[number]>;
    /**
     * @internal
     */
    interceptor: ContractInterceptor<MarketplaceContract>;
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
    direct: MarketplaceDirect;
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
    auction: MarketplaceAuction;
    private _chainId;
    get chainId(): number;
    constructor(network: NetworkOrSignerOrProvider, address: string, storage: ThirdwebStorage, options: {
        readonlySettings?: {
            chainId?: number | undefined;
            rpcUrl: string;
        } | undefined;
        gasSettings?: {
            maxPriceInGwei?: number | undefined;
            speed?: "standard" | "fast" | "fastest" | undefined;
        } | undefined;
        gasless?: {
            experimentalChainlessSupport?: boolean | undefined;
            openzeppelin: {
                relayerForwarderAddress?: string | undefined;
                useEOAForwarder?: boolean | undefined;
                relayerUrl: string;
            };
        } | {
            biconomy: {
                deadlineSeconds?: number | undefined;
                apiId: string;
                apiKey: string;
            };
        } | undefined;
    } | undefined, abi: typeof ABI, chainId: number, contractWrapper?: ContractWrapper<MarketplaceContract>);
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
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
    getListing(listingId: BigNumberish): Promise<AuctionListing | DirectListing>;
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
    getActiveListings(filter?: MarketplaceFilter): Promise<(AuctionListing | DirectListing)[]>;
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
    getAllListings(filter?: MarketplaceFilter): Promise<(AuctionListing | DirectListing)[]>;
    /**
     * @internal
     */
    getAll: (filter?: MarketplaceFilter) => Promise<(AuctionListing | DirectListing)[]>;
    /**
     * Get the total number of Listings
     * @returns the total number listings on the marketplace
     * @public
     */
    getTotalCount(): Promise<BigNumber>;
    /**
     * Get whether listing is restricted only to addresses with the Lister role
     */
    isRestrictedToListerRoleOnly(): Promise<boolean>;
    /**
     * Get the buffer in basis points between offers
     */
    getBidBufferBps(): Promise<BigNumber>;
    /**
     * get the buffer time in seconds between offers
     */
    getTimeBufferInSeconds(): Promise<BigNumber>;
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
    getOffers(listingId: BigNumberish): Promise<Offer[]>;
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
    buyoutListing(listingId: BigNumberish, quantityDesired?: BigNumberish, receiver?: string): Promise<TransactionResult>;
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
    setBidBufferBps(bufferBps: BigNumberish): Promise<void>;
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
    setTimeBufferInSeconds(bufferInSeconds: BigNumberish): Promise<void>;
    /**
     * Restrict listing NFTs only from the specified NFT contract address.
     * It is possible to allow listing from multiple contract addresses.
     * @param contractAddress - the NFT contract address
     */
    allowListingFromSpecificAssetOnly(contractAddress: string): Promise<void>;
    /**
     * Allow listings from any NFT contract
     */
    allowListingFromAnyAsset(): Promise<void>;
    /** ******************************
     * PRIVATE FUNCTIONS
     *******************************/
    private getAllListingsNoFilter;
    private applyFilter;
    /**
     * @internal
     */
    call(functionName: string, ...args: unknown[] | [...unknown[], CallOverrides]): Promise<any>;
}
//# sourceMappingURL=marketplace.d.ts.map