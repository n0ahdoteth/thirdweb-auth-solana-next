import { NFTMetadata, NFTMetadataOrUri } from "../../../core/schema/nft";
import { BaseDelayedRevealERC1155, BaseDropERC1155 } from "../../types/eips";
import { UploadProgressEvent } from "../../types/events";
import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResultWithId } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import { DelayedReveal } from "./delayed-reveal";
import { Erc1155 } from "./erc-1155";
import { ERC1155Claimable } from "./erc-1155-claimable";
import { Erc1155ClaimableWithConditions } from "./erc-1155-claimable-with-conditions";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
export declare class Erc1155LazyMintable implements DetectableFeature {
    featureName: "ERC1155LazyMintable";
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
     * await contract.edition.drop.revealer.createDelayedRevealBatch(
     *   placeholderNFT,
     *   realNFTs,
     *   "my secret password",
     * );
     * // Whenever you're ready, reveal your NFTs at any time
     * const batchId = 0; // the batch to reveal
     * await contract.edition.drop.revealer.reveal(batchId, "my secret password");
     * ```
     */
    revealer: DelayedReveal<BaseDelayedRevealERC1155> | undefined;
    /**
     * Claim tokens and configure claim conditions
     * @remarks Let users claim NFTs. Define who can claim NFTs in the collection, when and how many.
     * @example
     * ```javascript
     * const quantity = 10;
     * const tokenId = 0;
     * await contract.erc1155.claimTo("0x...", 0, quantity);
     * ```
     */
    claimWithConditions: Erc1155ClaimableWithConditions | undefined;
    claim: ERC1155Claimable | undefined;
    private contractWrapper;
    private erc1155;
    private storage;
    constructor(erc1155: Erc1155, contractWrapper: ContractWrapper<BaseDropERC1155>, storage: ThirdwebStorage);
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
     * const results = await contract.erc1155.lazyMint(metadatas); // uploads and creates the NFTs on chain
     * const firstTokenId = results[0].id; // token id of the first created NFT
     * const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT
     * ```
     *
     * @param metadatas - The metadata to include in the batch.
     * @param options - optional upload progress callback
     */
    lazyMint(metadatas: NFTMetadataOrUri[], options?: {
        onProgress: (event: UploadProgressEvent) => void;
    }): Promise<TransactionResultWithId<NFTMetadata>[]>;
    /** ******************************
     * PRIVATE FUNCTIONS
     *******************************/
    private detectErc1155Claimable;
    private detectErc1155ClaimableWithConditions;
    private detectErc721Revealable;
    private isLegacyEditionDropContract;
}
//# sourceMappingURL=erc-1155-lazymintable.d.ts.map