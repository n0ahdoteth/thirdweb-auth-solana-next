import { NFT } from "../../../core/schema/nft";
import { EditionMetadataOrUri } from "../../schema";
import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResultWithId } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import { Erc1155 } from "./erc-1155";
import { Erc1155BatchMintable } from "./erc-1155-batch-mintable";
import type { IMintableERC1155 } from "@thirdweb-dev/contracts-js";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumberish } from "ethers";
/**
 * Mint ERC1155 NFTs
 * @remarks NFT minting functionality that handles IPFS storage for you.
 * @example
 * ```javascript
 * const contract = await sdk.getContract("{{contract_address}}");
 * await contract.edition.mint.to(walletAddress, nftMetadata);
 * ```
 * @public
 */
export declare class Erc1155Mintable implements DetectableFeature {
    featureName: "ERC1155Mintable";
    private contractWrapper;
    private erc1155;
    private storage;
    /**
     * Batch mint Tokens to many addresses
     */
    batch: Erc1155BatchMintable | undefined;
    constructor(erc1155: Erc1155, contractWrapper: ContractWrapper<IMintableERC1155>, storage: ThirdwebStorage);
    /**
     * Mint an NFT with a limited supply
     *
     * @remarks Mint an NFT with a limited supply to a specified wallet.
     *
     * @example
     * ```javascript
     * // Address of the wallet you want to mint the NFT to
     * const toAddress = "{{wallet_address}}"
     *
     * // Custom metadata of the NFT, note that you can fully customize this metadata with other properties.
     * const metadata = {
     *   name: "Cool NFT",
     *   description: "This is a cool NFT",
     *   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
     * }
     *
     * const metadataWithSupply = {
     *   metadata,
     *   supply: 1000, // The number of this NFT you want to mint
     * }
     *
     * const tx = await contract.edition.mint.to(toAddress, metadataWithSupply);
     * const receipt = tx.receipt; // the transaction receipt
     * const tokenId = tx.id; // the id of the NFT minted
     * const nft = await tx.data(); // (optional) fetch details of minted NFT
     * ```
     */
    to(to: string, metadataWithSupply: EditionMetadataOrUri): Promise<TransactionResultWithId<NFT>>;
    /**
     * Increase the supply of an existing NFT and mint it to a given wallet address
     *
     * @param to - the address to mint to
     * @param tokenId - the token id of the NFT to increase supply of
     * @param additionalSupply - the additional amount to mint
     *
     * @example
     * ```javascript
     * // Address of the wallet you want to mint the NFT to
     * const toAddress = "{{wallet_address}}"
     * const tokenId = 0;
     * const additionalSupply = 1000;
     *
     * const tx = await contract.edition.mint.additionalSupplyTo(toAddress, tokenId, additionalSupply);
     * ```
     */
    additionalSupplyTo(to: string, tokenId: BigNumberish, additionalSupply: BigNumberish): Promise<TransactionResultWithId<NFT>>;
    private detectErc1155BatchMintable;
}
//# sourceMappingURL=erc-1155-mintable.d.ts.map