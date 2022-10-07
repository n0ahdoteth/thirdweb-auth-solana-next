import { SharedMediaProps } from "./MediaRenderer";
import { NFTMetadata } from "@thirdweb-dev/sdk";
import React from "react";
/**
 * The props for the {@link ThirdwebNftMedia} component.
 */
export interface ThirdwebNftMediaProps extends SharedMediaProps {
    /**
     * The NFT metadata of the NFT returned by the thirdweb sdk.
     */
    metadata: NFTMetadata;
}
/**
 *
 * @example
 * ```jsx
 * import { ThirdwebNftMedia, useNFTCollection, useNFT } from "@thirdweb-dev/react";
 * export default function NFTCollectionRender() {
 *   const contract = useNFTCollection(<your-contract-address>);
 *   const { data: nft, isLoading } = useNFT(contract, 0);
 *
 *   return (
 *     <div>
 *       {!isLoading && nft ? (
 *         <ThirdwebNftMedia metadata={nft.metadata} />
 *       ) : (
 *         <p>Loading...</p>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 *
 * Use this to get the primary sales recipient of your {@link SmartContract}
 * @param contract - an instance of a {@link SmartContract}
 * @returns the wallet address of the primary sales recipient
 * @beta
 */
export declare const ThirdwebNftMedia: React.ForwardRefExoticComponent<ThirdwebNftMediaProps & React.RefAttributes<HTMLMediaElement>>;
//# sourceMappingURL=NftMedia.d.ts.map