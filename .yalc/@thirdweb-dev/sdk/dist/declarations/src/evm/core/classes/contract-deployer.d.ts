import { SDKOptions } from "../../schema/sdk-options";
import { MarketplaceContractDeployMetadata, MultiwrapContractDeployMetadata, NFTContractDeployMetadata, SplitContractDeployMetadata, TokenContractDeployMetadata, VoteContractDeployMetadata } from "../../types/deploy/deploy-metadata";
import { DeploySchemaForPrebuiltContractType, NetworkOrSignerOrProvider, PrebuiltContractType } from "../types";
import { ContractRegistry } from "./registry";
import { RPCConnectionHandler } from "./rpc-connection-handler";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BytesLike, ContractInterface } from "ethers";
import { z } from "zod";
/**
 * Handles deploying new contracts
 * @public
 */
export declare class ContractDeployer extends RPCConnectionHandler {
    /**
     * @internal
     * should never be accessed directly, use {@link ContractDeployer.getFactory} instead
     */
    private _factory;
    /**
     * @internal
     * should never be accessed directly, use {@link ContractDeployer.getRegistry} instead
     */
    private _registry;
    private storage;
    constructor(network: NetworkOrSignerOrProvider, options: SDKOptions, storage: ThirdwebStorage);
    /**
     * Deploys an NFT Collection contract
     *
     * @remarks Deploys an NFT Collection contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployNFTCollection({
     *   name: "My Collection",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployNFTCollection(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new NFTDrop contract
     *
     * @remarks Deploys an NFT Drop contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployNFTDrop({
     *   name: "My Drop",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployNFTDrop(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new SignatureDrop contract
     *
     * @remarks Deploys a SignatureDrop contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deploySignatureDrop({
     *   name: "My Signature Drop",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deploySignatureDrop(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Multiwrap contract
     *
     * @remarks Deploys a Multiwrap contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployMultiwrap({
     *   name: "My Multiwrap",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     * @beta
     */
    deployMultiwrap(metadata: MultiwrapContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Edition contract
     *
     * @remarks Deploys an Edition contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployEdition({
     *   name: "My Edition",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployEdition(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new EditionDrop contract
     *
     * @remarks Deploys an Edition Drop contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployEditionDrop({
     *   name: "My Edition Drop",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployEditionDrop(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Token contract
     *
     * @remarks Deploys a Token contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployToken({
     *   name: "My Token",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployToken(metadata: TokenContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Token Drop contract
     *
     * @remarks Deploys a Token Drop contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployTokenDrop({
     *   name: "My Token Drop",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployTokenDrop(metadata: TokenContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Marketplace contract
     *
     * @remarks Deploys a Marketplace contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployMarketplace({
     *   name: "My Marketplace",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployMarketplace(metadata: MarketplaceContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Pack contract
     *
     * @remarks Deploys a Pack contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployPack({
     *   name: "My Pack",
     *   primary_sale_recipient: "your-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployPack(metadata: NFTContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Split contract
     *
     * @remarks Deploys a Split contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deploySplit({
     *   name: "My Split",
     *   primary_sale_recipient: "your-address",
     *   recipients: [
     *    {
     *      address: "your-address",
     *      sharesBps: 80 * 100, // 80%
     *    },
     *    {
     *      address: "another-address",
     *      sharesBps: 20 * 100, // 20%
     *    },
     *   ],
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deploySplit(metadata: SplitContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new Vote contract
     *
     * @remarks Deploys an Vote contract and returns the address of the deployed contract
     *
     * @example
     * ```javascript
     * const contractAddress = await sdk.deployer.deployVote({
     *   name: "My Vote",
     *   primary_sale_recipient: "your-address",
     *   voting_token_address: "your-token-contract-address",
     * });
     * ```
     * @param metadata - the contract metadata
     * @returns the address of the deployed contract
     */
    deployVote(metadata: VoteContractDeployMetadata): Promise<string>;
    /**
     * Deploys a new contract
     *
     * @internal
     * @param contractType - the type of contract to deploy
     * @param contractMetadata - the metadata to deploy the contract with
     * @returns a promise of the address of the newly deployed contract
     */
    deployBuiltInContract<TContractType extends PrebuiltContractType>(contractType: TContractType, contractMetadata: z.input<DeploySchemaForPrebuiltContractType<TContractType>>): Promise<string>;
    /**
     * Deploy any released contract by its name
     * @param releaserAddress the address of the releaser
     * @param contractName the name of the contract to deploy
     * @param constructorParams the constructor params to pass to the contract
     */
    deployReleasedContract(releaserAddress: string, contractName: string, constructorParams: any[]): Promise<string>;
    /**
     * Deploy a proxy contract of a given implementation via the given factory
     * @param factoryAddress
     * @param implementationAddress
     * @param implementationAbi
     * @param initializerFunction
     * @param initializerArgs
     */
    deployViaFactory(factoryAddress: string, implementationAddress: string, implementationAbi: ContractInterface, initializerFunction: string, initializerArgs: any[]): Promise<string>;
    /**
     * Deploy a proxy contract of a given implementation directly
     * @param implementationAddress
     * @param implementationAbi
     * @param initializerFunction
     * @param initializerArgs
     */
    deployProxy(implementationAddress: string, implementationAbi: ContractInterface, initializerFunction: string, initializerArgs: any[]): Promise<string>;
    /**
     * @internal
     */
    getRegistry(): Promise<ContractRegistry>;
    private getFactory;
    updateSignerOrProvider(network: NetworkOrSignerOrProvider): void;
    private updateContractSignerOrProvider;
    /**
     * @internal
     * @param publishMetadataUri
     * @param constructorParamValues
     * @param options
     */
    deployContractFromUri(publishMetadataUri: string, constructorParamValues: any[], options?: {
        forceDirectDeploy?: boolean;
    }): Promise<string>;
    private convertParamValues;
    /**
     * @internal
     * @param abi
     * @param bytecode
     * @param constructorParams
     */
    deployContractWithAbi(abi: ContractInterface, bytecode: BytesLike | {
        object: string;
    }, constructorParams: Array<any>): Promise<string>;
}
//# sourceMappingURL=contract-deployer.d.ts.map