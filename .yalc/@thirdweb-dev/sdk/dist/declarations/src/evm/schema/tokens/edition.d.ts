/// <reference types="bn.js" />
import { z } from "zod";
/**
 * @internal
 */
export declare const EditionMetadataOutputSchema: z.ZodObject<{
    supply: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>]>, import("ethers").BigNumber, string | number | bigint | import("ethers").BigNumber>;
    metadata: z.ZodObject<z.extendShape<{
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
}, "strip", z.ZodTypeAny, {
    supply: import("ethers").BigNumber;
    metadata: {
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
    };
}, {
    supply: string | number | bigint | import("ethers").BigNumber;
    metadata: {
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
    };
}>;
/**
 * @internal
 */
export declare const EditionMetadataWithOwnerOutputSchema: z.ZodObject<z.extendShape<{
    supply: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>]>, import("ethers").BigNumber, string | number | bigint | import("ethers").BigNumber>;
    metadata: z.ZodObject<z.extendShape<{
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
}, {
    owner: z.ZodString;
    quantityOwned: z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>]>, import("ethers").BigNumber, string | number | bigint | import("ethers").BigNumber>;
}>, "strip", z.ZodTypeAny, {
    supply: import("ethers").BigNumber;
    owner: string;
    metadata: {
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
    };
    quantityOwned: import("ethers").BigNumber;
}, {
    supply: string | number | bigint | import("ethers").BigNumber;
    owner: string;
    metadata: {
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
    };
    quantityOwned: string | number | bigint | import("ethers").BigNumber;
}>;
/**
 * @internal
 */
export declare const EditionMetadataInputSchema: z.ZodObject<{
    supply: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>]>, import("ethers").BigNumber, string | number | bigint | import("ethers").BigNumber>, string, string | number | bigint | import("ethers").BigNumber>;
    metadata: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    supply: string;
    metadata: {
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
    };
}, {
    supply: string | number | bigint | import("ethers").BigNumber;
    metadata: {
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
    };
}>;
/**
 * @internal
 */
export declare const EditionMetadataInputOrUriSchema: z.ZodObject<{
    supply: z.ZodEffects<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBigInt, z.ZodType<import("ethers").BigNumber, z.ZodTypeDef, import("ethers").BigNumber>]>, import("ethers").BigNumber, string | number | bigint | import("ethers").BigNumber>, string, string | number | bigint | import("ethers").BigNumber>;
    metadata: z.ZodUnion<[z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    supply: string;
    metadata: string | {
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
    };
}, {
    supply: string | number | bigint | import("ethers").BigNumber;
    metadata: string | {
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
    };
}>;
/**
 * @public
 */
export declare type EditionMetadataInput = z.input<typeof EditionMetadataInputSchema>;
/**
 * @public
 */
export declare type EditionMetadataOrUri = z.input<typeof EditionMetadataInputOrUriSchema>;
//# sourceMappingURL=edition.d.ts.map