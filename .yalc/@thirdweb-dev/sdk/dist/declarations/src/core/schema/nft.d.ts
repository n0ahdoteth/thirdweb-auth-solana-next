/// <reference types="bn.js" />
import { z } from "zod";
/**
 * @internal
 */
export declare const CommonNFTInput: z.ZodObject<{
    name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    external_url: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    animation_url: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>;
    background_color: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodString, string, string>, z.ZodString]>>;
    properties: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
    attributes: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: any;
    external_url?: any;
    animation_url?: any;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
}, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: any;
    external_url?: any;
    animation_url?: any;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
}>;
/**
 * @internal
 */
export declare const NFTInputOrUriSchema: z.ZodUnion<[z.ZodObject<{
    name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    external_url: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    animation_url: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>;
    background_color: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodString, string, string>, z.ZodString]>>;
    properties: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
    attributes: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: any;
    external_url?: any;
    animation_url?: any;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
}, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: any;
    external_url?: any;
    animation_url?: any;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
}>, z.ZodString]>;
/**
 * @internal
 */
export declare const CommonNFTOutput: z.ZodObject<z.extendShape<{
    name: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    image: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    external_url: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>>;
    animation_url: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodTypeAny, z.ZodObject<{
        data: z.ZodUnion<[z.ZodTypeAny, z.ZodString]>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        data?: any;
        name: string;
    }, {
        data?: any;
        name: string;
    }>]>, z.ZodString]>>;
    background_color: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodString, string, string>, z.ZodString]>>;
    properties: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
    attributes: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>, "many">, z.ZodObject<{}, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
        [x: string]: unknown;
    }, {
        [x: string]: unknown;
    }>]>>;
}, {
    id: z.ZodString;
    uri: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    external_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    animation_url: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}>, "strip", z.ZodUnion<[z.ZodEffects<z.ZodUnion<[z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>, z.ZodType<import("bn.js"), z.ZodTypeDef, import("bn.js")>]>, string, bigint | import("ethers").BigNumber | import("bn.js")>, z.ZodUnknown]>, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
    external_url?: string | null | undefined;
    animation_url?: string | null | undefined;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    id: string;
    uri: string;
}, {
    [x: string]: unknown;
    name?: string | number | undefined;
    description?: string | null | undefined;
    image?: string | null | undefined;
    external_url?: string | null | undefined;
    animation_url?: string | null | undefined;
    background_color?: string | undefined;
    properties?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    attributes?: {
        [x: string]: unknown;
    } | {
        [x: string]: unknown;
    }[] | undefined;
    id: string;
    uri: string;
}>;
/**
 * @public
 */
export declare type NFTMetadataInput = z.input<typeof CommonNFTInput>;
/**
 * @public
 */
export declare type NFTMetadataOrUri = z.input<typeof NFTInputOrUriSchema>;
/**
 * @public
 */
export declare type NFTMetadata = z.output<typeof CommonNFTOutput>;
/**
 * @public
 */
export declare type NFT = {
    metadata: NFTMetadata;
    owner: string;
    type: "ERC1155" | "ERC721" | "metaplex";
    supply: number;
    quantityOwned?: number;
};
//# sourceMappingURL=nft.d.ts.map