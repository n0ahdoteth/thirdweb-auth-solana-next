import { ClaimVerification } from "../../types";
import { Amount } from "../../types/currency";
import { BaseDropERC20 } from "../../types/eips";
import { DetectableFeature } from "../interfaces/DetectableFeature";
import { TransactionResult } from "../types";
import { ContractWrapper } from "./contract-wrapper";
import { DropClaimConditions } from "./drop-claim-conditions";
import { Erc20 } from "./erc-20";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
/**
 * Configure and claim ERC20 tokens
 * @remarks Manage claim phases and claim ERC20 tokens that have been lazily minted.
 * @example
 * ```javascript
 * const contract = await sdk.getContract("{{contract_address}}");
 * await contract.token.drop.claim.to("0x...", quantity);
 * ```
 */
export declare class Erc20Claimable implements DetectableFeature {
    featureName: "ERC20ClaimableWithConditions";
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
     * await contract.token.drop.claim.conditions.set(claimConditions);
     * ```
     */
    conditions: DropClaimConditions<BaseDropERC20>;
    private contractWrapper;
    private erc20;
    private storage;
    constructor(erc20: Erc20, contractWrapper: ContractWrapper<BaseDropERC20>, storage: ThirdwebStorage);
    /**
     * Claim a certain amount of tokens to a specific Wallet
     *
     * @remarks Let the specified wallet claim Tokens.
     *
     * @example
     * ```javascript
     * const address = "{{wallet_address}}"; // address of the wallet you want to claim the NFTs
     * const quantity = 42.69; // how many tokens you want to claim
     *
     * const tx = await contract.token.drop.claim.to(address, quantity);
     * const receipt = tx.receipt; // the transaction receipt
     * ```
     *
     * @param destinationAddress - Address you want to send the token to
     * @param amount - Quantity of the tokens you want to claim
     * @param checkERC20Allowance - Optional, check if the wallet has enough ERC20 allowance to claim the tokens, and if not, approve the transfer
     * @param claimData
     * @returns - The transaction receipt
     */
    to(destinationAddress: string, amount: Amount, checkERC20Allowance?: boolean, claimData?: ClaimVerification): Promise<TransactionResult>;
}
//# sourceMappingURL=erc-20-claimable.d.ts.map