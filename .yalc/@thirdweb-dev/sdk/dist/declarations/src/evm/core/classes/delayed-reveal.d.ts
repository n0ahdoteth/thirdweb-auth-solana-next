import { NFTMetadataInput } from "../../../core/schema/nft";
import { FeatureName } from "../../constants/contract-features";
import { BatchToReveal } from "../../types/delayed-reveal";
import { BaseDelayedRevealERC1155, BaseDelayedRevealERC721 } from "../../types/eips";
import { UploadProgressEvent } from "../../types/events";
import { TransactionResult, TransactionResultWithId } from "../index";
import { ContractWrapper } from "./contract-wrapper";
import type { DropERC721, SignatureDrop } from "@thirdweb-dev/contracts-js";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, BigNumberish } from "ethers";
/**
 * Handles delayed reveal logic
 * @public
 */
export declare class DelayedReveal<T extends DropERC721 | BaseDelayedRevealERC721 | SignatureDrop | BaseDelayedRevealERC1155> {
    featureName: "ERC1155" | "ERC721" | "ERC20" | "ERC20Burnable" | "ERC20Mintable" | "ERC20BatchMintable" | "ERC20ClaimableWithConditions" | "ERC20SignatureMintable" | "ERC721Burnable" | "ERC721Supply" | "ERC721Enumerable" | "ERC721Mintable" | "ERC721BatchMintable" | "ERC721LazyMintable" | "ERC721Revealable" | "ERC721Claimable" | "ERC721ClaimableWithConditions" | "ERC721SignatureMint" | "ERC1155Burnable" | "ERC1155Enumerable" | "ERC1155Mintable" | "ERC1155BatchMintable" | "ERC1155LazyMintable" | "ERC1155Claimable" | "ERC1155ClaimableWithConditions" | "ERC1155Revealable" | "ERC1155SignatureMintable" | "Royalty" | "PlatformFee" | "PrimarySale" | "Permissions" | "PermissionsEnumerable" | "ContractMetadata" | "AppURI" | "Ownable";
    private contractWrapper;
    private storage;
    private nextTokenIdToMintFn;
    constructor(contractWrapper: ContractWrapper<T>, storage: ThirdwebStorage, fetureName: FeatureName, nextTokenIdToMintFn: () => Promise<BigNumber>);
    /**
     * Create a batch of encrypted NFTs that can be revealed at a later time.
     * @remarks Create a batch of encrypted NFTs that can be revealed at a later time.
     * @example
     * ```javascript
     * // the real NFTs, these will be encrypted until your reveal them!
     * const realNFTs = [{
     *   name: "Common NFT #1",
     *   description: "Common NFT, one of many.",
     *   image: fs.readFileSync("path/to/image.png"),
     * }, {
     *   name: "Super Rare NFT #2",
     *   description: "You got a Super Rare NFT!",
     *   image: fs.readFileSync("path/to/image.png"),
     * }];
     * // A placeholder NFT that people will get immediately in their wallet, until the reveal happens!
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
     * ```
     * @public
     * @param placeholder - the placeholder NFT to show before the reveal
     * @param metadatas - the final NFTs that will be hidden
     * @param password - the password that will be used to reveal these NFTs
     * @param options - additional options like upload progress
     */
    createDelayedRevealBatch(placeholder: NFTMetadataInput, metadatas: NFTMetadataInput[], password: string, options?: {
        onProgress: (event: UploadProgressEvent) => void;
    }): Promise<TransactionResultWithId[]>;
    /**
     * Reveal a batch of hidden NFTs
     * @remarks Reveal the NFTs of a batch using the password.
     * @example
     * ```javascript
     * // the batch to reveal
     * const batchId = 0;
     * // reveal the batch
     * await contract.revealer.reveal(batchId, "my secret password");
     * ```
     * @public
     * @param batchId - the id of the batch to reveal
     * @param password - the password
     */
    reveal(batchId: BigNumberish, password: string): Promise<TransactionResult>;
    /**
     * Gets the list of unrevealed NFT batches.
     * @remarks Gets the list of unrevealed NFT batches.
     * @example
     * ```javascript
     * const batches = await contract.revealer.getBatchesToReveal();
     * ```
     * @public
     */
    getBatchesToReveal(): Promise<BatchToReveal[]>;
    /**
     * Algorithm to hash delay reveal password, so we don't broadcast the input password on-chain.
     *
     * @internal
     */
    private hashDelayRevealPasword;
    private getNftMetadata;
    private isLegacyContract;
    private getLegacyEncryptedData;
}
//# sourceMappingURL=delayed-reveal.d.ts.map