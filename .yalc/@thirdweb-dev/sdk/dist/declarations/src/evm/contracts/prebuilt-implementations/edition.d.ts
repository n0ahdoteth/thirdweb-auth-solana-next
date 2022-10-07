import { NFT } from "../../../core/schema/nft";
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
import { Erc1155 } from "../../core/classes/erc-1155";
import { Erc1155SignatureMintable } from "../../core/classes/erc-1155-signature-mintable";
import { StandardErc1155 } from "../../core/classes/erc-1155-standard";
import { GasCostEstimator } from "../../core/classes/gas-cost-estimator";
import { NetworkOrSignerOrProvider, TransactionResult, TransactionResultWithId } from "../../core/types";
import { TokenErc1155ContractSchema } from "../../schema/contracts/token-erc1155";
import { EditionMetadataOrUri } from "../../schema/tokens/edition";
import { QueryAllParams } from "../../types";
import type { TokenERC1155 } from "@thirdweb-dev/contracts-js";
import type ABI from "@thirdweb-dev/contracts-js/dist/abis/TokenERC1155.json";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, BigNumberish, CallOverrides } from "ethers";
/**
 * Create a collection of NFTs that lets you mint multiple copies of each NFT.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "edition");
 * ```
 *
 * @public
 */
export declare class Edition extends StandardErc1155<TokenERC1155> {
    static contractRoles: readonly ["admin", "minter", "transfer"];
    abi: typeof ABI;
    metadata: ContractMetadata<TokenERC1155, typeof TokenErc1155ContractSchema>;
    roles: ContractRoles<TokenERC1155, typeof Edition.contractRoles[number]>;
    sales: ContractPrimarySale<TokenERC1155>;
    platformFees: ContractPlatformFee<TokenERC1155>;
    encoder: ContractEncoder<TokenERC1155>;
    estimator: GasCostEstimator<TokenERC1155>;
    events: ContractEvents<TokenERC1155>;
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
    royalties: ContractRoyalty<TokenERC1155, typeof TokenErc1155ContractSchema>;
    /**
     * Signature Minting
     * @remarks Generate dynamic NFTs with your own signature, and let others mint them using that signature.
     * @example
     * ```javascript
     * // see how to craft a payload to sign in the `contract.signature.generate()` documentation
     * const signedPayload = contract.signature.generate(payload);
     *
     * // now anyone can mint the NFT
     * const tx = contract.signature.mint(signedPayload);
     * const receipt = tx.receipt; // the mint transaction receipt
     * const mintedId = tx.id; // the id of the NFT minted
     * ```
     */
    signature: Erc1155SignatureMintable;
    interceptor: ContractInterceptor<TokenERC1155>;
    erc1155: Erc1155<TokenERC1155>;
    owner: ContractOwner<TokenERC1155>;
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
    } | undefined, abi: typeof ABI, chainId: number, contractWrapper?: ContractWrapper<TokenERC1155>);
    /**
     * @internal
     */
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
    /** ******************************
     * READ FUNCTIONS
     *******************************/
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
    getAll(queryParams?: QueryAllParams): Promise<NFT[]>;
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
    getOwned(walletAddress?: string): Promise<NFT[]>;
    /**
     * Get the number of NFTs minted
     * @returns the total number of NFTs minted in this contract
     * @public
     */
    getTotalCount(): Promise<BigNumber>;
    /**
     * Get whether users can transfer NFTs from this contract
     */
    isTransferRestricted(): Promise<boolean>;
    /** ******************************
     * WRITE FUNCTIONS
     *******************************/
    /**
     * Mint NFT for the connected wallet
     *
     * @remarks See {@link Edition.mintTo}
     */
    mint(metadataWithSupply: EditionMetadataOrUri): Promise<TransactionResultWithId<NFT>>;
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
     * const tx = await contract.mintTo(toAddress, metadataWithSupply);
     * const receipt = tx.receipt; // the transaction receipt
     * const tokenId = tx.id; // the id of the NFT minted
     * const nft = await tx.data(); // (optional) fetch details of minted NFT
     * ```
     */
    mintTo(to: string, metadataWithSupply: EditionMetadataOrUri): Promise<TransactionResultWithId<NFT>>;
    /**
     * Increase the supply of an existing NFT and mint it to the connected wallet
     *
     * @param tokenId - the token id of the NFT to increase supply of
     * @param additionalSupply - the additional amount to mint
     */
    mintAdditionalSupply(tokenId: BigNumberish, additionalSupply: BigNumberish): Promise<TransactionResultWithId<NFT>>;
    /**
     * Increase the supply of an existing NFT and mint it to a given wallet address
     *
     * @param to - the address to mint to
     * @param tokenId - the token id of the NFT to increase supply of
     * @param additionalSupply - the additional amount to mint
     */
    mintAdditionalSupplyTo(to: string, tokenId: BigNumberish, additionalSupply: BigNumberish): Promise<TransactionResultWithId<NFT>>;
    /**
     * Mint Many NFTs for the connected wallet
     *
     * @remarks See {@link Edition.mintBatchTo}
     */
    mintBatch(metadatas: EditionMetadataOrUri[]): Promise<TransactionResultWithId<NFT>[]>;
    /**
     * Mint Many NFTs with limited supplies
     *
     * @remarks Mint many different NFTs with limited supplies to a specified wallet.
     *
     * @example
     * ```javascript
     * // Address of the wallet you want to mint the NFT to
     * const toAddress = "{{wallet_address}}"
     *
     * // Custom metadata and supplies of your NFTs
     * const metadataWithSupply = [{
     *   supply: 50, // The number of this NFT you want to mint
     *   metadata: {
     *     name: "Cool NFT #1",
     *     description: "This is a cool NFT",
     *     image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
     *   },
     * }, {
     *   supply: 100,
     *   metadata: {
     *     name: "Cool NFT #2",
     *     description: "This is a cool NFT",
     *     image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
     *   },
     * }];
     *
     * const tx = await contract.mintBatchTo(toAddress, metadataWithSupply);
     * const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
     * const firstTokenId = tx[0].id; // token id of the first minted NFT
     * const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
     * ```
     */
    mintBatchTo(to: string, metadataWithSupply: EditionMetadataOrUri[]): Promise<TransactionResultWithId<NFT>[]>;
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
    burn(tokenId: BigNumberish, amount: BigNumberish): Promise<TransactionResult>;
    /**
     * @internal
     */
    call(functionName: string, ...args: unknown[] | [...unknown[], CallOverrides]): Promise<any>;
}
//# sourceMappingURL=edition.d.ts.map