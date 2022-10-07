import { Feature, FeatureName, FeatureWithEnabled } from "../constants/contract-features";
import { ContractWrapper } from "../core/classes/contract-wrapper";
import { DetectableFeature } from "../core/interfaces/DetectableFeature";
import { AbiEvent, AbiFunction, AbiSchema, ContractSource, FullPublishMetadata, PreDeployMetadataFetched, PublishedMetadata } from "../schema/contracts/custom";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { BaseContract, ethers } from "ethers";
import { z } from "zod";
/**
 * @internal
 */
export declare function extractConstructorParams(predeployMetadataUri: string, storage: ThirdwebStorage): Promise<{
    [x: string]: any;
    components?: {
        [x: string]: any;
        type: string;
        name: string;
    }[] | undefined;
    stateMutability?: string | undefined;
    type: string;
    name: string;
}[]>;
/**
 * @internal
 * @param predeployMetadataUri
 * @param storage
 */
export declare function extractFunctions(predeployMetadataUri: string, storage: ThirdwebStorage): Promise<AbiFunction[]>;
/**
 *
 * @param abi
 * @returns
 * @internal
 */
export declare function extractConstructorParamsFromAbi(abi: z.input<typeof AbiSchema>): {
    [x: string]: any;
    components?: {
        [x: string]: any;
        type: string;
        name: string;
    }[] | undefined;
    stateMutability?: string | undefined;
    type: string;
    name: string;
}[];
/**
 *
 * @param abi
 * @param functionName
 * @returns
 * @internal
 */
export declare function extractFunctionParamsFromAbi(abi: z.input<typeof AbiSchema>, functionName: string): {
    [x: string]: any;
    components?: {
        [x: string]: any;
        type: string;
        name: string;
    }[] | undefined;
    stateMutability?: string | undefined;
    type: string;
    name: string;
}[];
/**
 * @internal
 * @param abi
 * @param metadata
 */
export declare function extractFunctionsFromAbi(abi: z.input<typeof AbiSchema>, metadata?: Record<string, any>): AbiFunction[];
/**
 * @internal
 * @param abi
 * @param metadata
 */
export declare function extractEventsFromAbi(abi: z.input<typeof AbiSchema>, metadata?: Record<string, any>): AbiEvent[];
/**
 * @internal
 * @param address
 * @param provider
 */
export declare function resolveContractUriFromAddress(address: string, provider: ethers.providers.Provider): Promise<string | undefined>;
/**
 * @internal
 * @param address
 * @param provider
 * @param storage
 */
export declare function fetchContractMetadataFromAddress(address: string, provider: ethers.providers.Provider, storage: ThirdwebStorage): Promise<{
    name: string;
    metadata: Record<string, any>;
    abi: {
        [x: string]: any;
        type: string;
        name: string;
        outputs: {
            [x: string]: any;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            stateMutability?: string | undefined;
            type: string;
            name: string;
        }[];
        inputs: {
            [x: string]: any;
            components?: {
                [x: string]: any;
                type: string;
                name: string;
            }[] | undefined;
            stateMutability?: string | undefined;
            type: string;
            name: string;
        }[];
    }[];
    info: {
        title?: string | undefined;
        author?: string | undefined;
        details?: string | undefined;
        notice?: string | undefined;
    };
    licenses: string[];
}>;
/**
 * @internal
 * @param compilerMetadataUri
 * @param storage
 */
export declare function fetchContractMetadata(compilerMetadataUri: string, storage: ThirdwebStorage): Promise<PublishedMetadata>;
/**
 * @internal
 * @param publishedMetadata
 * @param storage
 */
export declare function fetchSourceFilesFromMetadata(publishedMetadata: PublishedMetadata, storage: ThirdwebStorage): Promise<ContractSource[]>;
/**
 * @internal
 * @param publishMetadataUri
 * @param storage
 */
export declare function fetchRawPredeployMetadata(publishMetadataUri: string, storage: ThirdwebStorage): Promise<{
    [x: string]: any;
    analytics?: any;
    name: string;
    metadataUri: string;
    bytecodeUri: string;
}>;
/**
 * Fetch the metadata coming from CLI, this is before deploying or releasing the contract.
 * @internal
 * @param publishMetadataUri
 * @param storage
 */
export declare function fetchPreDeployMetadata(publishMetadataUri: string, storage: ThirdwebStorage): Promise<PreDeployMetadataFetched>;
/**
 * Fetch and parse the full metadata AFTER creating a release, with all the extra information (version, readme, etc)
 * @internal
 * @param publishMetadataUri
 * @param storage
 */
export declare function fetchExtendedReleaseMetadata(publishMetadataUri: string, storage: ThirdwebStorage): Promise<FullPublishMetadata>;
/**
 * Processes ALL supported features and sets whether the passed in abi supports each individual feature
 * @internal
 * @param abi
 * @param features
 * @returns the nested struct of all features and whether they're detected in the abi
 */
export declare function detectFeatures(abi: z.input<typeof AbiSchema>, features?: Record<string, Feature>): Record<string, FeatureWithEnabled>;
/**
 * Checks whether the given ABI supports a given feature
 * @internal
 * @param abi
 * @param featureName
 */
export declare function isFeatureEnabled(abi: z.input<typeof AbiSchema>, featureName: FeatureName): boolean;
/**
 * Checks whether the given DetectableFeature is defined
 * @internal
 * @param namespace The namespace to check
 * @param feature The corresponding feature
 */
export declare function assertEnabled<T extends DetectableFeature>(namespace: T | undefined, feature: Feature): T;
/**
 * Type guard for contractWrappers depending on passed feature name
 * @internal
 * @param contractWrapper
 * @param featureName
 */
export declare function detectContractFeature<T extends BaseContract>(contractWrapper: ContractWrapper<BaseContract>, featureName: FeatureName): contractWrapper is ContractWrapper<T>;
/**
 * @internal
 * @param contractWrapper
 * @param functionName
 */
export declare function hasFunction<TContract extends BaseContract>(functionName: string, contractWrapper: ContractWrapper<any>): contractWrapper is ContractWrapper<TContract>;
//# sourceMappingURL=feature-detection.d.ts.map