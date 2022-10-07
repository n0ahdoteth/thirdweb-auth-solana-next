import { RequiredParam } from "../../../core/types/shared";
/**
 * Hook for getting an instance of a `Token Drop` contract.
 * @param contractAddress - the address of the Token Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useTokenDrop } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const tokenDrop = useTokenDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the token drop contract in the rest of the component
 *
 *   // For example, this function will get the connected wallets token balance
 *   async function balance() {
 *     const balance = await tokenDrop.balance()
 *     return balance
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const token = await sdk.useTokenDrop("0x1234...");
 * + const token = await sdk.useContract("0x1234...", "token-drop").contract;
 * ```
 */
export declare function useTokenDrop(contractAddress: RequiredParam<string>): import("@thirdweb-dev/sdk").TokenDrop | undefined;
//# sourceMappingURL=useTokenDrop.d.ts.map