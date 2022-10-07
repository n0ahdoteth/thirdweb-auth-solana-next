import { ContractEncoder, ContractOwner, NetworkOrSignerOrProvider } from "../core";
import { ContractAppURI } from "../core/classes/contract-appuri";
import { ContractEvents } from "../core/classes/contract-events";
import { ContractInterceptor } from "../core/classes/contract-interceptor";
import { ContractMetadata } from "../core/classes/contract-metadata";
import { ContractPlatformFee } from "../core/classes/contract-platform-fee";
import { ContractPublishedMetadata } from "../core/classes/contract-published-metadata";
import { ContractRoles } from "../core/classes/contract-roles";
import { ContractRoyalty } from "../core/classes/contract-royalty";
import { ContractPrimarySale } from "../core/classes/contract-sales";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { Erc20 } from "../core/classes/erc-20";
import { Erc721 } from "../core/classes/erc-721";
import { Erc1155 } from "../core/classes/erc-1155";
import { GasCostEstimator } from "../core/classes/gas-cost-estimator";
import { UpdateableNetwork } from "../core/interfaces/contract";
import type { IPermissions, IPlatformFee, IPrimarySale, IRoyalty, Ownable, AppURI } from "@thirdweb-dev/contracts-js";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BaseContract, CallOverrides, ContractInterface } from "ethers";
/**
 * Custom contract dynamic class with feature detection
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK(provider);
 * const contract = await sdk.getContract("{{contract_address}}");
 *
 * // call any function in your contract
 * await contract.call("myCustomFunction", param1, param2);
 *
 * // if your contract follows the ERC721 standard, contract.nft will be present
 * const allNFTs = await contract.erc721.query.all()
 *
 * // if your contract extends IMintableERC721, contract.nft.mint() will be available
 * const tx = await contract.erc721.mint({
 *     name: "Cool NFT",
 *     image: readFileSync("some_image.png"),
 *   });
 * ```
 *
 * @beta
 */
export declare class SmartContract<TContract extends BaseContract = BaseContract> implements UpdateableNetwork {
    private contractWrapper;
    private storage;
    events: ContractEvents<TContract>;
    interceptor: ContractInterceptor<TContract>;
    encoder: ContractEncoder<TContract>;
    estimator: GasCostEstimator<TContract>;
    publishedMetadata: ContractPublishedMetadata<TContract>;
    abi: ContractInterface;
    metadata: ContractMetadata<BaseContract, any>;
    /**
     * Handle royalties
     */
    get royalties(): ContractRoyalty<IRoyalty, any>;
    /**
     * Handle permissions
     */
    get roles(): ContractRoles<IPermissions, any>;
    /**
     * Handle primary sales
     */
    get sales(): ContractPrimarySale<IPrimarySale>;
    /**
     * Handle platform fees
     */
    get platformFees(): ContractPlatformFee<IPlatformFee>;
    /**
     * Set and get the owner of the contract
     */
    get owner(): ContractOwner<Ownable>;
    /**
     * Set and get the appuri of the contract
     */
    get appURI(): ContractAppURI<AppURI>;
    /**
     * Auto-detects ERC20 standard functions.
     */
    get erc20(): Erc20;
    /**
     * Auto-detects ERC721 standard functions.
     */
    get erc721(): Erc721;
    /**
     * Auto-detects ERC1155 standard functions.
     */
    get erc1155(): Erc1155;
    private _chainId;
    get chainId(): number;
    constructor(network: NetworkOrSignerOrProvider, address: string, abi: ContractInterface, storage: ThirdwebStorage, options: {
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
    } | undefined, chainId: number, contractWrapper?: ContractWrapper<TContract>);
    onNetworkUpdated(network: NetworkOrSignerOrProvider): void;
    getAddress(): string;
    /**
     * Call any function on this contract
     * @example
     * ```javascript
     * // read functions will return the data from the contract
     * const myValue = await contract.call("myReadFunction");
     * console.log(myValue);
     *
     * // write functions will return the transaction receipt
     * const tx = await contract.call("myWriteFunction", arg1, arg2);
     * const receipt = tx.receipt;
     *
     * // Optionally override transaction options
     * await contract.call("myWriteFunction", arg1, arg2, {
     *  gasLimit: 1000000, // override default gas limit
     *  value: ethers.utils.parseEther("0.1"), // send 0.1 ether with the contract call
     * };
     * ```
     * @param functionName - the name of the function to call
     * @param args - the arguments of the function
     */
    call(functionName: string, ...args: unknown[] | [...unknown[], CallOverrides]): Promise<any>;
    /** ********************
     * FEATURE DETECTION
     * ********************/
    private detectRoyalties;
    private detectRoles;
    private detectPrimarySales;
    private detectPlatformFees;
    private detectErc20;
    private detectErc721;
    private detectErc1155;
    private detectAppURI;
    private detectOwnable;
}
//# sourceMappingURL=smart-contract.d.ts.map