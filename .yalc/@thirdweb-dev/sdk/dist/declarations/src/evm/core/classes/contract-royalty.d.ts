import { CommonRoyaltySchema } from "../../schema/contracts/common";
import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResult } from "../types";
import { ContractMetadata, IGenericSchemaType } from "./contract-metadata";
import { ContractWrapper } from "./contract-wrapper";
import type { IRoyalty } from "@thirdweb-dev/contracts-js";
import { BigNumberish } from "ethers";
import { z } from "zod";
/**
 * Handle contract royalties
 * @remarks Configure royalties for an entire contract or a particular token.
 * @example
 * ```javascript
 * const contract = await sdk.getContract("{{contract_address}}");
 * const royaltyInfo = await contract.royalties.getDefaultRoyaltyInfo();
 * await contract.roles.setTokenRoyaltyInfo(tokenId, {
 *   seller_fee_basis_points: 100, // 1% royalty fee
 *   fee_recipient: "0x...", // the fee recipient
 * });
 * ```
 * @public
 */
export declare class ContractRoyalty<TContract extends IRoyalty, TSchema extends IGenericSchemaType> implements DetectableFeature {
    featureName: "Royalty";
    private contractWrapper;
    private metadata;
    constructor(contractWrapper: ContractWrapper<TContract>, metadata: ContractMetadata<TContract, TSchema>);
    /**
     * Gets the royalty recipient and BPS (basis points) of the contract
     * @returns - The royalty recipient and BPS
     * @example
     * ```javascript
     * const royaltyInfo = await contract.royalties.getDefaultRoyaltyInfo();
     * ```
     * @public
     * @twfeature Royalty
     */
    getDefaultRoyaltyInfo(): Promise<{
        seller_fee_basis_points: number;
        fee_recipient: string;
    }>;
    /**
     * Gets the royalty recipient and BPS (basis points) of a particular token
     * @returns - The royalty recipient and BPS
     * @example
     * ```javascript
     * const royaltyInfo = await contract.royalties.getDefaultRoyaltyInfo();
     * ```
     * @public
     * @twfeature Royalty
     */
    getTokenRoyaltyInfo(tokenId: BigNumberish): Promise<{
        seller_fee_basis_points: number;
        fee_recipient: string;
    }>;
    /**
     * Set the royalty recipient and fee for a contract
     * @param royaltyData - the royalty recipient and fee
     *  @example
     * ```javascript
     * await contract.roles.setDefaultRoyaltyInfo({
     *   seller_fee_basis_points: 100, // 1% royalty fee
     *   fee_recipient: "0x...", // the fee recipient
     * });
     * ```
     * @public
     * @twfeature Royalty
     */
    setDefaultRoyaltyInfo(royaltyData: z.input<typeof CommonRoyaltySchema>): Promise<TransactionResult<z.output<typeof CommonRoyaltySchema>>>;
    /**
     * Set the royalty recipient and fee for a particular token
     * @param tokenId - the token id
     * @param royaltyData - the royalty recipient and fee
     * @example
     * ```javascript
     * await contract.roles.setTokenRoyaltyInfo(tokenId, {
     *   seller_fee_basis_points: 100, // 1% royalty fee
     *   fee_recipient: "0x...", // the fee recipient
     * });
     * ```
     * @public
     * @twfeature Royalty
     */
    setTokenRoyaltyInfo(tokenId: BigNumberish, royaltyData: z.input<typeof CommonRoyaltySchema>): Promise<{
        receipt: import("@ethersproject/abstract-provider").TransactionReceipt;
        data: () => Promise<{
            seller_fee_basis_points: number;
            fee_recipient: string;
        }>;
    }>;
}
//# sourceMappingURL=contract-royalty.d.ts.map