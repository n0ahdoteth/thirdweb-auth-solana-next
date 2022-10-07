import { ContractEncoder } from "../../core/classes/contract-encoder";
import { ContractEvents } from "../../core/classes/contract-events";
import { ContractInterceptor } from "../../core/classes/contract-interceptor";
import { ContractMetadata } from "../../core/classes/contract-metadata";
import { ContractWrapper } from "../../core/classes/contract-wrapper";
import { GasCostEstimator } from "../../core/classes/gas-cost-estimator";
import { UpdateableNetwork } from "../../core/interfaces/contract";
import { NetworkOrSignerOrProvider, TransactionResult, TransactionResultWithId } from "../../core/types";
import { VoteType } from "../../enums";
import { VoteContractSchema } from "../../schema/contracts/vote";
import { CurrencyValue } from "../../types/currency";
import { Proposal, ProposalExecutable, ProposalVote, VoteSettings } from "../../types/vote";
import type { VoteERC20 } from "@thirdweb-dev/contracts-js";
import type ABI from "@thirdweb-dev/contracts-js/dist/abis/VoteERC20.json";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BigNumber, BigNumberish, CallOverrides } from "ethers";
/**
 * Create a decentralized organization for token holders to vote on proposals.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "vote");
 * ```
 *
 * @public
 */
export declare class Vote implements UpdateableNetwork {
    private contractWrapper;
    private storage;
    abi: typeof ABI;
    metadata: ContractMetadata<VoteERC20, typeof VoteContractSchema>;
    encoder: ContractEncoder<VoteERC20>;
    estimator: GasCostEstimator<VoteERC20>;
    events: ContractEvents<VoteERC20>;
    /**
     * @internal
     */
    interceptor: ContractInterceptor<VoteERC20>;
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
    } | undefined, abi: typeof ABI, chainId: number, contractWrapper?: ContractWrapper<VoteERC20>);
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
    /** ******************************
     * READ FUNCTIONS
     *******************************/
    /**
     * Get a proposal by id.
     *
     * @param proposalId - The proposal id to get.
     * @returns - The proposal.
     */
    get(proposalId: BigNumberish): Promise<Proposal>;
    /**
     * Get All Proposals
     *
     * @remarks Get all the proposals in this contract.
     *
     * @example
     * ```javascript
     * const proposals = await contract.getAll();
     * console.log(proposals);
     * ```
     *
     * @returns - All the proposals in the contract.
     */
    getAll(): Promise<Proposal[]>;
    /**
     * Get the votes for a specific proposal
     * @param proposalId - the proposalId
     */
    getProposalVotes(proposalId: BigNumber): Promise<ProposalVote[]>;
    /**
     * Check If Wallet Voted
     *
     * @remarks Check if a specified wallet has voted a specific proposal
     *
     * @example
     * ```javascript
     * // The proposal ID of the proposal you want to check
     * const proposalId = "0";
     * // The address of the wallet you want to check to see if they voted
     * const address = "{{wallet_address}}";
     *
     * await contract.hasVoted(proposalId, address);
     * ```
     *
     * @param proposalId - The unique identifier of a proposal .
     * @param account - (optional) wallet account address. Defaults to connected signer.
     * @returns - True if the account has already voted on the proposal.
     */
    hasVoted(proposalId: string, account?: string): Promise<boolean>;
    /**
     * Can Execute
     *
     * @remarks Check if a proposal can be executed (if the proposal has succeeded).
     *
     * @example
     * ```javascript
     * // The proposal ID of the proposal you want to check
     * const proposalId = "0";
     * const canExecute = await contract.canExecute(proposalId);
     * console.log(canExecute);
     * ```
     *
     * @param proposalId - The proposal ID to check.
     * @returns - True if the proposal can be executed, false otherwise.
     */
    canExecute(proposalId: string): Promise<boolean>;
    /**
     * Check the balance of the project wallet in the native token of the chain
     *
     * @returns - The balance of the project in the native token of the chain
     */
    balance(): Promise<CurrencyValue>;
    /**
     * Check the balance of the project wallet in a particular
     * ERC20 token contract
     *
     * @returns - The balance of the project in the native token of the chain
     */
    balanceOfToken(tokenAddress: string): Promise<CurrencyValue>;
    /**
     * Find a proposal by its id.
     *
     * @internal
     * @param proposalId - Proposal to check for
     */
    private ensureExists;
    /**
     * Get the Vote contract configuration
     */
    settings(): Promise<VoteSettings>;
    /** ******************************
     * WRITE FUNCTIONS
     *******************************/
    /**
     * Create Proposal
     *
     * @remarks Create a new proposal for token holders to vote on.
     *
     * @example
     * ```javascript
     * // The description of the proposal you want to pass
     * const description = "This is a great proposal - vote for it!"
     * // You can (optionally) pass in contract calls that will get executed when the proposal is executed.
     * const executions = [
     *   {
     *     // The contract you want to make a call to
     *     toAddress: "0x...",
     *     // The amount of the native currency to send in this transaction
     *     nativeTokenValue: 0,
     *     // Transaction data that will be executed when the proposal is executed
     *     // This is an example transfer transaction with a token contract (which you would need to setup in code)
     *     transactionData: tokenContract.encoder.encode(
     *       "transfer", [
     *         fromAddress,
     *         amount,
     *       ]
     *     ),
     *   }
     * ]
     *
     * const proposal = await contract.propose(description, executions);
     * ```
     *
     * @param description - The description of the proposal.
     * @param executions - A set of executable transactions that will be run if the proposal is passed and executed.
     * @returns - The id of the created proposal and the transaction receipt.
     */
    propose(description: string, executions?: ProposalExecutable[]): Promise<TransactionResultWithId>;
    /**
     * Vote
     *
     * @remarks Vote on an active proposal
     *
     * @example
     * ```javascript
     * // The proposal ID of the proposal you want to vote on
     * const proposalId = "0";
     * // The vote type you want to cast, can be VoteType.Against, VoteType.For, or VoteType.Abstain
     * const voteType = VoteType.For;
     * // The (optional) reason for the vote
     * const reason = "I like this proposal!";
     *
     * await contract.vote(proposalId, voteType, reason);
     * ```
     * @param proposalId - The proposal to cast a vote on.
     * @param voteType - The position the voter is taking on their vote.
     * @param reason - (optional) The reason for the vote.
     */
    vote(proposalId: string, voteType: VoteType, reason?: string): Promise<TransactionResult>;
    /**
     * Execute Proposal
     *
     * @remarks Execute the related transactions for a proposal if the proposal succeeded.
     *
     * @example
     * ```javascript
     * // The proposal ID ofthe proposal you want to execute
     * const proposalId = "0"
     * await contract.execute(proposalId);
     * ```
     *
     * @param proposalId - The proposal id to execute.
     */
    execute(proposalId: string): Promise<TransactionResult>;
    /**
     * @internal
     */
    call(functionName: string, ...args: unknown[] | [...unknown[], CallOverrides]): Promise<any>;
}
//# sourceMappingURL=vote.d.ts.map