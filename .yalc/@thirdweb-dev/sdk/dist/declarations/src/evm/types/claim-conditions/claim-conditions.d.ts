import { ClaimConditionInputSchema, ClaimConditionOutputSchema, PartialClaimConditionInputSchema } from "../../schema/contracts/common/claim-conditions";
import { SnapshotInfoSchema, SnapshotInputSchema, SnapshotSchema } from "../../schema/contracts/common/snapshots";
import { Price } from "../currency";
import { BigNumber, BigNumberish, BytesLike, CallOverrides } from "ethers";
import { z } from "zod";
/**
 * Represents a claim condition fetched from the SDK
 * @public
 */
export declare type ClaimCondition = z.output<typeof ClaimConditionOutputSchema>;
/**
 * @public
 */
export declare type SnapshotInfo = z.output<typeof SnapshotInfoSchema>;
/**
 * @public
 */
export declare type Snapshot = z.output<typeof SnapshotSchema>;
/**
 * Input model to pass a snapshot of addresses + amount claimable for a claim condition
 * @public
 */
export declare type SnapshotInput = z.input<typeof SnapshotInputSchema>;
/**
 * Input model to create a claim condition with optional snapshot of wallets
 * @public
 */
export declare type ClaimConditionInput = z.input<typeof PartialClaimConditionInputSchema>;
/**
 * @public
 */
export declare type FilledConditionInput = z.output<typeof ClaimConditionInputSchema>;
/**
 * @public
 */
export declare type ClaimVerification = {
    overrides: CallOverrides;
    proofs: BytesLike[];
    maxQuantityPerTransaction: BigNumber;
    price: BigNumber;
    currencyAddress: string;
};
export declare type ClaimConditionsForToken = {
    tokenId: BigNumberish;
    claimConditions: ClaimConditionInput[];
};
export declare type ClaimOptions = {
    /**
     * The price to pay for each token claimed
     */
    pricePerToken?: Price;
    /**
     * The currency to pay for each token claimed, defaults to NATIVE_TOKEN_ADDRESS for native currency
     */
    currencyAddress?: string;
    /**
     * Whether to check the ERC20 allowance of the sender, defaults to true
     */
    checkERC20Allowance?: boolean;
};
//# sourceMappingURL=claim-conditions.d.ts.map