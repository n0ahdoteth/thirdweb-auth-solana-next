import { NFT, NFTMetadata, NFTMetadataOrUri } from "../../../core/schema/nft";
import { TransactionTask } from "../../core/classes/TransactionTask";
import { ContractEncoder } from "../../core/classes/contract-encoder";
import { ContractEvents } from "../../core/classes/contract-events";
import { ContractInterceptor } from "../../core/classes/contract-interceptor";
import { ContractMetadata } from "../../core/classes/contract-metadata";
import { ContractOwner } from "../../core/classes/contract-owner";
import { ContractPlatformFee } from "../../core/classes/contract-platform-fee";
import { ContractRoles } from "../../core/classes/contract-roles";
import { ContractRoyalty } from "../../core/classes/contract-royalty";
import { ContractPrimarySale } from "../../core/classes/contract-sales";
import { ContractWrapper } from "../../core/classes/contract-wrapper";
import { DelayedReveal } from "../../core/classes/delayed-reveal";
import { DropClaimConditions } from "../../core/classes/drop-claim-conditions";
import { Erc721 } from "../../core/classes/erc-721";
import { StandardErc721 } from "../../core/classes/erc-721-standard";
import { GasCostEstimator } from "../../core/classes/gas-cost-estimator";
import { NetworkOrSignerOrProvider, TransactionResult, TransactionResultWithId } from "../../core/types";
import { PaperCheckout } from "../../integrations/paper-xyz";
import { DropErc721ContractSchema } from "../../schema/contracts/drop-erc721";
import { QueryAllParams } from "../../types/QueryParams";
import { UploadProgressEvent } from "../../types/events";
import type { DropERC721 } from "@thirdweb-dev/contracts-js";
import type ABI from "@thirdweb-dev/contracts-js/dist/abis/DropERC721.json";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, BigNumberish, CallOverrides } from "ethers";
/**
 * Setup a collection of one-of-one NFTs that are minted as users claim them.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "nft-drop");
 * ```
 *
 * @public
 */
export declare class NFTDrop extends StandardErc721<DropERC721> {
    static contractRoles: readonly ["admin", "minter", "transfer"];
    abi: typeof ABI;
    encoder: ContractEncoder<DropERC721>;
    estimator: GasCostEstimator<DropERC721>;
    metadata: ContractMetadata<DropERC721, typeof DropErc721ContractSchema>;
    sales: ContractPrimarySale<DropERC721>;
    platformFees: ContractPlatformFee<DropERC721>;
    events: ContractEvents<DropERC721>;
    roles: ContractRoles<DropERC721, typeof NFTDrop.contractRoles[number]>;
    /**
     * @internal
     */
    interceptor: ContractInterceptor<DropERC721>;
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
    royalties: ContractRoyalty<DropERC721, typeof DropErc721ContractSchema>;
    /**
     * Configure claim conditions
     * @remarks Define who can claim NFTs in the collection, when and how many.
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
     * await contract.claimConditions.set(claimConditions);
     * ```
     */
    claimConditions: DropClaimConditions<DropERC721>;
    /**
     * Delayed reveal
     * @remarks Create a batch of encrypted NFTs that can be revealed at a later time.
     * @example
     * ```javascript
     * // the real NFTs, these will be encrypted until you reveal them
     * const realNFTs = [{
     *   name: "Common NFT #1",
     *   description: "Common NFT, one of many.",
     *   image: fs.readFileSync("path/to/image.png"),
     * }, {
     *   name: "Super Rare NFT #2",
     *   description: "You got a Super Rare NFT!",
     *   image: fs.readFileSync("path/to/image.png"),
     * }];
     * // A placeholder NFT that people will get immediately in their wallet, and will be converted to the real NFT at reveal time
     * const placeholderNFT = {
     *   name: "Hidden NFT",
     *   description: "Will be revealed next week!"
     * };
     * // Create and encrypt the NFTs
     * await contract.revealer.createDelayedRevealBatch(
     *   placeholderNFT,
     *   realNFTs,
     *   "my secret password",
     * );
     * // Whenever you're ready, reveal your NFTs at any time
     * const batchId = 0; // the batch to reveal
     * await contract.revealer.reveal(batchId, "my secret password");
     * ```
     */
    revealer: DelayedReveal<DropERC721>;
    /**
     * Checkout
     * @remarks Create a FIAT currency checkout for your NFT drop.
     */
    checkout: PaperCheckout<DropERC721>;
    erc721: Erc721<DropERC721>;
    owner: ContractOwner<DropERC721>;
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
    } | undefined, abi: typeof ABI, chainId: number, contractWrapper?: ContractWrapper<DropERC721>);
    /**
     * @internal
     */
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
    /** ******************************
     * READ FUNCTIONS
     *******************************/
    /**
     * Get the total count NFTs in this drop contract, both claimed and unclaimed
     */
    totalSupply(): Promise<BigNumber>;
    /**
     * Get All Claimed NFTs
     *
     * @remarks Fetch all the NFTs (and their owners) that have been claimed in this Drop.
     *
     * * @example
     * ```javascript
     * const claimedNFTs = await contract.getAllClaimed();
     * const firstOwner = claimedNFTs[0].owner;
     * ```
     *
     * @param queryParams - optional filtering to only fetch a subset of results.
     * @returns The NFT metadata and their ownersfor all NFTs queried.
     */
    getAllClaimed(queryParams?: QueryAllParams): Promise<NFT[]>;
    /**
     * Get All Unclaimed NFTs
     *
     * @remarks Fetch all the NFTs that have been not been claimed yet in this Drop.
     *
     * * @example
     * ```javascript
     * const unclaimedNFTs = await contract.getAllUnclaimed();
     * const firstUnclaimedNFT = unclaimedNFTs[0].name;
     * ```
     *
     * @param queryParams - optional filtering to only fetch a subset of results.
     * @returns The NFT metadata for all NFTs queried.
     */
    getAllUnclaimed(queryParams?: QueryAllParams): Promise<NFTMetadata[]>;
    /**
     * Get the claimed supply
     *
     * @remarks Get the number of claimed NFTs in this Drop.
     *
     * * @example
     * ```javascript
     * const claimedNFTCount = await contract.totalClaimedSupply();
     * console.log(`NFTs claimed so far: ${claimedNFTCount}`);
     * ```
     * @returns the unclaimed supply
     */
    totalClaimedSupply(): Promise<BigNumber>;
    /**
     * Get the unclaimed supply
     *
     * @remarks Get the number of unclaimed NFTs in this Drop.
     *
     * * @example
     * ```javascript
     * const unclaimedNFTCount = await contract.totalUnclaimedSupply();
     * console.log(`NFTs left to claim: ${unclaimedNFTCount}`);
     * ```
     * @returns the unclaimed supply
     */
    totalUnclaimedSupply(): Promise<BigNumber>;
    /**
     * Get whether users can transfer NFTs from this contract
     */
    isTransferRestricted(): Promise<boolean>;
    /** ******************************
     * WRITE FUNCTIONS
     *******************************/
    /**
     * Create a batch of unique NFTs to be claimed in the future
     *
     * @remarks Create batch allows you to create a batch of many unique NFTs in one transaction.
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
    createBatch(metadatas: NFTMetadataOrUri[], options?: {
        onProgress: (event: UploadProgressEvent) => void;
    }): Promise<TransactionResultWithId<NFTMetadata>[]>;
    /**
     * Construct a claim transaction without executing it.
     * This is useful for estimating the gas cost of a claim transaction, overriding transaction options and having fine grained control over the transaction execution.
     * @param destinationAddress
     * @param quantity
     * @param checkERC20Allowance
     */
    getClaimTransaction(destinationAddress: string, quantity: BigNumberish, checkERC20Allowance?: boolean): Promise<TransactionTask>;
    /**
     * Claim unique NFTs to a specific Wallet
     *
     * @remarks Let the specified wallet claim NFTs.
     *
     * @example
     * ```javascript
     * const address = "{{wallet_address}}"; // address of the wallet you want to claim the NFTs
     * const quantity = 1; // how many unique NFTs you want to claim
     *
     * const tx = await contract.claimTo(address, quantity);
     * const receipt = tx.receipt; // the transaction receipt
     * const claimedTokenId = tx.id; // the id of the NFT claimed
     * const claimedNFT = await tx.data(); // (optional) get the claimed NFT metadata
     * ```
     *
     * @param destinationAddress - Address you want to send the token to
     * @param quantity - Quantity of the tokens you want to claim
     * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
     *
     * @returns - an array of results containing the id of the token claimed, the transaction receipt and a promise to optionally fetch the nft metadata
     */
    claimTo(destinationAddress: string, quantity: BigNumberish, checkERC20Allowance?: boolean): Promise<TransactionResultWithId<NFT>[]>;
    /**
     * Claim NFTs to the connected wallet.
     *
     * @remarks See {@link NFTDrop.claimTo}
     *
     * @returns - an array of results containing the id of the token claimed, the transaction receipt and a promise to optionally fetch the nft metadata
     */
    claim(quantity: BigNumberish, checkERC20Allowance?: boolean): Promise<TransactionResultWithId<NFT>[]>;
    /**
     * Burn a single NFT
     *
     * @param tokenId - the token Id to burn
     *
     * @example
     * ```javascript
     * const result = await contract.burnToken(tokenId);
     * ```
     *
     */
    burn(tokenId: BigNumberish): Promise<TransactionResult>;
    /******************************
     * STANDARD ERC721 FUNCTIONS
     ******************************/
    /**
     * Get a single NFT Metadata
     *
     * @example
     * ```javascript
     * const tokenId = 0;
     * const nft = await contract.get(tokenId);
     * ```
     * @param tokenId - the tokenId of the NFT to retrieve
     * @returns The NFT metadata
     */
    get(tokenId: BigNumberish): Promise<NFT>;
    /**
     * Get the current owner of a given NFT within this Contract
     *
     * @param tokenId - the tokenId of the NFT
     * @returns the address of the owner
     */
    ownerOf(tokenId: BigNumberish): Promise<string>;
    /**
     * Get NFT Balance
     *
     * @remarks Get a wallets NFT balance (number of NFTs in this contract owned by the wallet).
     *
     * @example
     * ```javascript
     * const walletAddress = "{{wallet_address}}";
     * const balance = await contract.balanceOf(walletAddress);
     * console.log(balance);
     * ```
     */
    balanceOf(address: string): Promise<BigNumber>;
    /**
     * Get NFT Balance for the currently connected wallet
     */
    balance(): Promise<BigNumber>;
    /**
     * Get whether this wallet has approved transfers from the given operator
     * @param address - the wallet address
     * @param operator - the operator address
     */
    isApproved(address: string, operator: string): Promise<boolean>;
    /**
     * Transfer a single NFT
     *
     * @remarks Transfer an NFT from the connected wallet to another wallet.
     *
     * @example
     * ```javascript
     * const walletAddress = "{{wallet_address}}";
     * const tokenId = 0;
     * await contract.transfer(walletAddress, tokenId);
     * ```
     */
    transfer(to: string, tokenId: BigNumberish): Promise<TransactionResult>;
    /**
     * Approve or remove operator as an operator for the caller. Operators can call transferFrom or safeTransferFrom for any token owned by the caller.
     * @param operator - the operator's address
     * @param approved - whether to approve or remove
     *
     * @internal
     */
    setApprovalForAll(operator: string, approved: boolean): Promise<TransactionResult>;
    /**
     * Approve an operator for the NFT owner. Operators can call transferFrom or safeTransferFrom for the specified token.
     * @param operator - the operator's address
     * @param tokenId - the tokenId to give approval for
     *
     * @internal
     */
    setApprovalForToken(operator: string, tokenId: BigNumberish): Promise<TransactionResult>;
    /** ******************************
     * PRIVATE FUNCTIONS
     *******************************/
    /**
     * Returns proofs and the overrides required for the transaction.
     *
     * @returns - `overrides` and `proofs` as an object.
     */
    private prepareClaim;
    /**
     * @internal
     */
    call(functionName: string, ...args: unknown[] | [...unknown[], CallOverrides]): Promise<any>;
}
//# sourceMappingURL=nft-drop.d.ts.map