'use strict';

var defineProperty = require('./defineProperty-a2d146a9.cjs.dev.js');
var paperXyz = require('./paper-xyz-60faf527.cjs.dev.js');
var zod = require('zod');
var ethers = require('ethers');
require('bn.js');
require('@thirdweb-dev/contracts-js/dist/abis/IERC165.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155.json');
require('tiny-invariant');
require('eventemitter3');
require('cross-fetch');
require('@thirdweb-dev/contracts-js/dist/abis/Forwarder.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDropSinglePhase.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMulticall.json');
require('@thirdweb-dev/contracts-js/dist/abis/ISignatureMintERC20.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IClaimableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDelayedReveal.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Enumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Supply.json');
require('@thirdweb-dev/contracts-js/dist/abis/ILazyMint.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/SignatureMintERC721.json');
require('@thirdweb-dev/contracts-js/dist/abis/DelayedReveal.json');
require('@thirdweb-dev/contracts-js/dist/abis/DropSinglePhase1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IBurnableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IClaimableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155Enumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IMintableERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/ISignatureMintERC1155.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC20Metadata.json');
require('fast-deep-equal');
require('uuid');
require('@thirdweb-dev/contracts-js/dist/abis/IERC721Metadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IERC1155Metadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IDelayedRevealDeprecated.json');
require('@thirdweb-dev/contracts-js/dist/abis/TWFactory.json');
require('@thirdweb-dev/contracts-js/dist/abis/TWRegistry.json');
require('@thirdweb-dev/contracts-js/dist/abis/ContractPublisher.json');
require('@thirdweb-dev/contracts-js/dist/abis/IThirdwebContract.json');
require('@thirdweb-dev/storage');
require('@thirdweb-dev/contracts-js/dist/abis/IAppURI.json');
require('@thirdweb-dev/contracts-js/dist/abis/IContractMetadata.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPermissions.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPermissionsEnumerable.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPlatformFee.json');
require('@thirdweb-dev/contracts-js/dist/abis/IPrimarySale.json');
require('@thirdweb-dev/contracts-js/dist/abis/IRoyalty.json');
require('@thirdweb-dev/contracts-js/dist/abis/Ownable.json');

/**
 * @internal
 */

const CommonWrappableSchema = zod.z.object({
  contractAddress: paperXyz.AddressSchema
});
/**
 * @internal
 */

const ERC20WrappableSchema = CommonWrappableSchema.extend({
  quantity: paperXyz.AmountSchema
});
/**
 * @internal
 */

const ERC721WrappableSchema = CommonWrappableSchema.extend({
  tokenId: paperXyz.BigNumberishSchema
});
/**
 * @internal
 */

const ERC1155WrappableSchema = CommonWrappableSchema.extend({
  tokenId: paperXyz.BigNumberishSchema,
  quantity: paperXyz.BigNumberishSchema
});

/**
 * @internal
 */

const ERC20RewardSchema = ERC20WrappableSchema.omit({
  quantity: true
}).extend({
  quantityPerReward: paperXyz.AmountSchema
});
/**
 * @internal
 */

const ERC721RewardSchema = ERC721WrappableSchema;
/**
 * @internal
 */

const ERC1155RewardSchema = ERC1155WrappableSchema.omit({
  quantity: true
}).extend({
  quantityPerReward: paperXyz.BigNumberishSchema
});
/**
 * @internal
 */

const ERC20RewardContentsSchema = ERC20RewardSchema.extend({
  totalRewards: paperXyz.BigNumberishSchema.default("1")
});
/**
 * @internal
 */

const ERC721RewardContentsSchema = ERC721RewardSchema;
/**
 * @internal
 */

const ERC1155RewardContentsSchema = ERC1155RewardSchema.extend({
  totalRewards: paperXyz.BigNumberishSchema.default("1")
});
/**
 * @internal
 */

zod.z.object({
  erc20Rewards: zod.z.array(ERC20RewardSchema).default([]),
  erc721Rewards: zod.z.array(ERC721RewardSchema).default([]),
  erc1155Rewards: zod.z.array(ERC1155RewardSchema).default([])
});
/**
 * @internal
 */

const PackRewardsOutputSchema = zod.z.object({
  erc20Rewards: zod.z.array(ERC20RewardContentsSchema).default([]),
  erc721Rewards: zod.z.array(ERC721RewardContentsSchema).default([]),
  erc1155Rewards: zod.z.array(ERC1155RewardContentsSchema).default([])
});
/**
 * @internal
 */

const PackMetadataInputSchema = PackRewardsOutputSchema.extend({
  packMetadata: defineProperty.NFTInputOrUriSchema,
  rewardsPerPack: paperXyz.BigNumberishSchema.default("1"),
  openStartTime: paperXyz.RawDateSchema.default(new Date())
});
/**
 * @public
 */

/**
 * Create lootboxes of NFTs with rarity based open mechanics.
 *
 * @example
 *
 * ```javascript
 * import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 *
 * const sdk = new ThirdwebSDK("{{chainName}}");
 * const contract = sdk.getContract("{{contract_address}}", "pack");
 * ```
 *
 * @public
 */

class Pack extends paperXyz.StandardErc1155 {
  /**
   * Configure royalties
   * @remarks Set your own royalties for the entire contract or per pack
   * @example
   * ```javascript
   * // royalties on the whole contract
   * contract.royalties.setDefaultRoyaltyInfo({
   *   seller_fee_basis_points: 100, // 1%
   *   fee_recipient: "0x..."
   * });
   * // override royalty for a particular pack
   * contract.royalties.setTokenRoyaltyInfo(packId, {
   *   seller_fee_basis_points: 500, // 5%
   *   fee_recipient: "0x..."
   * });
   * ```
   */

  /**
   * @internal
   */
  constructor(network, address, storage) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let abi = arguments.length > 4 ? arguments[4] : undefined;
    let chainId = arguments.length > 5 ? arguments[5] : undefined;
    let contractWrapper = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : new paperXyz.ContractWrapper(network, address, abi, options.gasless && "openzeppelin" in options.gasless ? { ...options,
      gasless: {
        openzeppelin: { ...options.gasless.openzeppelin,
          useEOAForwarder: true
        }
      }
    } : options);
    super(contractWrapper, storage, chainId);

    defineProperty._defineProperty(this, "abi", void 0);

    defineProperty._defineProperty(this, "metadata", void 0);

    defineProperty._defineProperty(this, "roles", void 0);

    defineProperty._defineProperty(this, "encoder", void 0);

    defineProperty._defineProperty(this, "events", void 0);

    defineProperty._defineProperty(this, "estimator", void 0);

    defineProperty._defineProperty(this, "royalties", void 0);

    defineProperty._defineProperty(this, "interceptor", void 0);

    defineProperty._defineProperty(this, "erc1155", void 0);

    defineProperty._defineProperty(this, "owner", void 0);

    this.abi = abi;
    this.erc1155 = new paperXyz.Erc1155(this.contractWrapper, this.storage, chainId);
    this.metadata = new paperXyz.ContractMetadata(this.contractWrapper, paperXyz.PackContractSchema, this.storage);
    this.roles = new paperXyz.ContractRoles(this.contractWrapper, Pack.contractRoles);
    this.royalties = new paperXyz.ContractRoyalty(this.contractWrapper, this.metadata);
    this.encoder = new paperXyz.ContractEncoder(this.contractWrapper);
    this.estimator = new paperXyz.GasCostEstimator(this.contractWrapper);
    this.events = new paperXyz.ContractEvents(this.contractWrapper);
    this.interceptor = new paperXyz.ContractInterceptor(this.contractWrapper);
    this.owner = new paperXyz.ContractOwner(this.contractWrapper);
  }
  /**
   * @internal
   */


  onNetworkUpdated(network) {
    this.contractWrapper.updateSignerOrProvider(network);
  }

  getAddress() {
    return this.contractWrapper.readContract.address;
  }
  /** ******************************
   * READ FUNCTIONS
   *******************************/

  /**
   * Get a single Pack
   *
   * @remarks Get all the data associated with every pack in this contract.
   *
   * By default, returns the first 100 packs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const pack = await contract.get(0);
   * console.log(packs;
   * ```
   */


  async get(tokenId) {
    return this.erc1155.get(tokenId);
  }
  /**
   * Get All Packs
   *
   * @remarks Get all the data associated with every pack in this contract.
   *
   * By default, returns the first 100 packs, use queryParams to fetch more.
   *
   * @example
   * ```javascript
   * const packs = await contract.getAll();
   * console.log(packs;
   * ```
   * @param queryParams - optional filtering to only fetch a subset of results.
   * @returns The pack metadata for all packs queried.
   */


  async getAll(queryParams) {
    return this.erc1155.getAll(queryParams);
  }
  /**
   * Get Owned Packs
   *
   * @remarks Get all the data associated with the packs owned by a specific wallet.
   *
   * @example
   * ```javascript
   * // Address of the wallet to get the packs of
   * const address = "{{wallet_address}}";
   * const packss = await contract.getOwned(address);
   * ```
   *
   * @returns The pack metadata for all the owned packs in the contract.
   */


  async getOwned(walletAddress) {
    return this.erc1155.getOwned(walletAddress);
  }
  /**
   * Get the number of packs created
   * @returns the total number of packs minted in this contract
   * @public
   */


  async getTotalCount() {
    return this.erc1155.totalCount();
  }
  /**
   * Get whether users can transfer packs from this contract
   */


  async isTransferRestricted() {
    const anyoneCanTransfer = await this.contractWrapper.readContract.hasRole(paperXyz.getRoleHash("transfer"), ethers.ethers.constants.AddressZero);
    return !anyoneCanTransfer;
  }
  /**
   * Get Pack Contents
   * @remarks Get the rewards contained inside a pack.
   *
   * @param packId - The id of the pack to get the contents of.
   * @returns - The contents of the pack.
   *
   * @example
   * ```javascript
   * const packId = 0;
   * const contents = await contract.getPackContents(packId);
   * console.log(contents.erc20Rewards);
   * console.log(contents.erc721Rewards);
   * console.log(contents.erc1155Rewards);
   * ```
   */


  async getPackContents(packId) {
    const {
      contents,
      perUnitAmounts
    } = await this.contractWrapper.readContract.getPackContents(packId);
    const erc20Rewards = [];
    const erc721Rewards = [];
    const erc1155Rewards = [];

    for (let i = 0; i < contents.length; i++) {
      const reward = contents[i];
      const amount = perUnitAmounts[i];

      switch (reward.tokenType) {
        case 0:
          {
            const tokenMetadata = await paperXyz.fetchCurrencyMetadata(this.contractWrapper.getProvider(), reward.assetContract);
            const rewardAmount = ethers.ethers.utils.formatUnits(reward.totalAmount, tokenMetadata.decimals);
            erc20Rewards.push({
              contractAddress: reward.assetContract,
              quantityPerReward: amount.toString(),
              totalRewards: ethers.BigNumber.from(rewardAmount).div(amount).toString()
            });
            break;
          }

        case 1:
          {
            erc721Rewards.push({
              contractAddress: reward.assetContract,
              tokenId: reward.tokenId.toString()
            });
            break;
          }

        case 2:
          {
            erc1155Rewards.push({
              contractAddress: reward.assetContract,
              tokenId: reward.tokenId.toString(),
              quantityPerReward: amount.toString(),
              totalRewards: ethers.BigNumber.from(reward.totalAmount).div(amount).toString()
            });
            break;
          }
      }
    }

    return {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    };
  }
  /** ******************************
   * WRITE FUNCTIONS
   *******************************/

  /**
   * Create Pack
   * @remarks Create a new pack with the given metadata and rewards and mint it to the connected wallet.
   * @remarks See {@link Pack.createTo}
   *
   * @param metadataWithRewards - the metadata and rewards to include in the pack
   * @example
   * ```javascript
   * const pack = {
   *   // The metadata for the pack NFT itself
   *   packMetadata: {
   *     name: "My Pack",
   *     description: "This is a new pack",
   *     image: "ipfs://...",
   *   },
   *   // ERC20 rewards to be included in the pack
   *   erc20Rewards: [
   *     {
   *       assetContract: "0x...",
   *       quantityPerReward: 5,
   *       quantity: 100,
   *       totalRewards: 20,
   *     }
   *   ],
   *   // ERC721 rewards to be included in the pack
   *   erc721Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *     }
   *   ],
   *   // ERC1155 rewards to be included in the pack
   *   erc1155Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *       quantityPerReward: 1,
   *       totalRewards: 100,
   *     }
   *   ],
   *   openStartTime: new Date(), // the date that packs can start to be opened, defaults to now
   *   rewardsPerPack: 1, // the number of rewards in each pack, defaults to 1
   * }
   *
   * const tx = await contract.create(pack);
   * ```
   */


  async create(metadataWithRewards) {
    const signerAddress = await this.contractWrapper.getSignerAddress();
    return this.createTo(signerAddress, metadataWithRewards);
  }
  /**
   * Add Pack Contents
   * @remarks Add contents to an existing pack.
   * @remarks See {@link Pack.addPackContents}
   *
   * @param packId - token Id of the pack to add contents to
   * @param packContents - the rewards to include in the pack
   * @example
   * ```javascript
   * const packContents = {
   *   // ERC20 rewards to be included in the pack
   *   erc20Rewards: [
   *     {
   *       assetContract: "0x...",
   *       quantityPerReward: 5,
   *       quantity: 100,
   *       totalRewards: 20,
   *     }
   *   ],
   *   // ERC721 rewards to be included in the pack
   *   erc721Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *     }
   *   ],
   *   // ERC1155 rewards to be included in the pack
   *   erc1155Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *       quantityPerReward: 1,
   *       totalRewards: 100,
   *     }
   *   ],
   * }
   *
   * const tx = await contract.addPackContents(packId, packContents);
   * ```
   */


  async addPackContents(packId, packContents) {
    const signerAddress = await this.contractWrapper.getSignerAddress();
    const parsedContents = PackRewardsOutputSchema.parse(packContents);
    const {
      contents,
      numOfRewardUnits
    } = await this.toPackContentArgs(parsedContents);
    const receipt = await this.contractWrapper.sendTransaction("addPackContents", [packId, contents, numOfRewardUnits, signerAddress]);
    const event = this.contractWrapper.parseLogs("PackUpdated", receipt === null || receipt === void 0 ? void 0 : receipt.logs);

    if (event.length === 0) {
      throw new Error("PackUpdated event not found");
    }

    const id = event[0].args.packId;
    return {
      id: id,
      receipt,
      data: () => this.erc1155.get(id)
    };
  }
  /**
   * Create Pack To Wallet
   * @remarks Create a new pack with the given metadata and rewards and mint it to the specified address.
   *
   * @param to - the address to mint the pack to
   * @param metadataWithRewards - the metadata and rewards to include in the pack
   *
   * @example
   * ```javascript
   * const pack = {
   *   // The metadata for the pack NFT itself
   *   packMetadata: {
   *     name: "My Pack",
   *     description: "This is a new pack",
   *     image: "ipfs://...",
   *   },
   *   // ERC20 rewards to be included in the pack
   *   erc20Rewards: [
   *     {
   *       assetContract: "0x...",
   *       quantityPerReward: 5,
   *       quantity: 100,
   *       totalRewards: 20,
   *     }
   *   ],
   *   // ERC721 rewards to be included in the pack
   *   erc721Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *     }
   *   ],
   *   // ERC1155 rewards to be included in the pack
   *   erc1155Rewards: [
   *     {
   *       assetContract: "0x...",
   *       tokenId: 0,
   *       quantityPerReward: 1,
   *       totalRewards: 100,
   *     }
   *   ],
   *   openStartTime: new Date(), // the date that packs can start to be opened, defaults to now
   *   rewardsPerPack: 1, // the number of rewards in each pack, defaults to 1
   * }
   *
   * const tx = await contract.createTo("0x...", pack);
   * ```
   */


  async createTo(to, metadataWithRewards) {
    const uri = await paperXyz.uploadOrExtractURI(metadataWithRewards.packMetadata, this.storage);
    const parsedMetadata = PackMetadataInputSchema.parse(metadataWithRewards);
    const {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    } = parsedMetadata;
    const rewardsData = {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    };
    const {
      contents,
      numOfRewardUnits
    } = await this.toPackContentArgs(rewardsData);
    const receipt = await this.contractWrapper.sendTransaction("createPack", [contents, numOfRewardUnits, uri, parsedMetadata.openStartTime, parsedMetadata.rewardsPerPack, to]);
    const event = this.contractWrapper.parseLogs("PackCreated", receipt === null || receipt === void 0 ? void 0 : receipt.logs);

    if (event.length === 0) {
      throw new Error("PackCreated event not found");
    }

    const packId = event[0].args.packId;
    return {
      id: packId,
      receipt,
      data: () => this.erc1155.get(packId)
    };
  }
  /**
   * Open Pack
   *
   * @remarks - Open a pack to reveal the contained rewards. This will burn the specified pack and
   * the contained assets will be transferred to the opening users wallet.
   *
   * @param tokenId - the token ID of the pack you want to open
   * @param amount - the amount of packs you want to open
   *
   * @example
   * ```javascript
   * const tokenId = 0
   * const amount = 1
   * const tx = await contract.open(tokenId, amount);
   * ```
   */


  async open(tokenId) {
    let amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    const receipt = await this.contractWrapper.sendTransaction("openPack", [tokenId, amount]);
    const event = this.contractWrapper.parseLogs("PackOpened", receipt === null || receipt === void 0 ? void 0 : receipt.logs);

    if (event.length === 0) {
      throw new Error("PackOpened event not found");
    }

    const rewards = event[0].args.rewardUnitsDistributed;
    const erc20Rewards = [];
    const erc721Rewards = [];
    const erc1155Rewards = [];

    for (const reward of rewards) {
      switch (reward.tokenType) {
        case 0:
          {
            const tokenMetadata = await paperXyz.fetchCurrencyMetadata(this.contractWrapper.getProvider(), reward.assetContract);
            erc20Rewards.push({
              contractAddress: reward.assetContract,
              quantityPerReward: ethers.ethers.utils.formatUnits(reward.totalAmount, tokenMetadata.decimals).toString()
            });
            break;
          }

        case 1:
          {
            erc721Rewards.push({
              contractAddress: reward.assetContract,
              tokenId: reward.tokenId.toString()
            });
            break;
          }

        case 2:
          {
            erc1155Rewards.push({
              contractAddress: reward.assetContract,
              tokenId: reward.tokenId.toString(),
              quantityPerReward: reward.totalAmount.toString()
            });
            break;
          }
      }
    }

    return {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    };
  }
  /** *****************************
   * PRIVATE FUNCTIONS
   *******************************/


  async toPackContentArgs(metadataWithRewards) {
    const contents = [];
    const numOfRewardUnits = [];
    const {
      erc20Rewards,
      erc721Rewards,
      erc1155Rewards
    } = metadataWithRewards;
    const provider = this.contractWrapper.getProvider();
    const owner = await this.contractWrapper.getSignerAddress();

    for (const erc20 of erc20Rewards) {
      const normalizedQuantity = await paperXyz.normalizePriceValue(provider, erc20.quantityPerReward, erc20.contractAddress); // Multiply the quantity of one reward by the number of rewards

      const totalQuantity = normalizedQuantity.mul(erc20.totalRewards);
      const hasAllowance = await paperXyz.hasERC20Allowance(this.contractWrapper, erc20.contractAddress, totalQuantity);

      if (!hasAllowance) {
        throw new Error(`ERC20 token with contract address "${erc20.contractAddress}" does not have enough allowance to transfer.\n\nYou can set allowance to the multiwrap contract to transfer these tokens by running:\n\nawait sdk.getToken("${erc20.contractAddress}").setAllowance("${this.getAddress()}", ${totalQuantity});\n\n`);
      }

      numOfRewardUnits.push(erc20.totalRewards);
      contents.push({
        assetContract: erc20.contractAddress,
        tokenType: 0,
        totalAmount: totalQuantity,
        tokenId: 0
      });
    }

    for (const erc721 of erc721Rewards) {
      const isApproved = await paperXyz.isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc721.contractAddress, erc721.tokenId, owner);

      if (!isApproved) {
        throw new Error(`ERC721 token "${erc721.tokenId}" with contract address "${erc721.contractAddress}" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getNFTCollection("${erc721.contractAddress}").setApprovalForToken("${this.getAddress()}", ${erc721.tokenId});\n\n`);
      }

      numOfRewardUnits.push("1");
      contents.push({
        assetContract: erc721.contractAddress,
        tokenType: 1,
        totalAmount: 1,
        tokenId: erc721.tokenId
      });
    }

    for (const erc1155 of erc1155Rewards) {
      const isApproved = await paperXyz.isTokenApprovedForTransfer(this.contractWrapper.getProvider(), this.getAddress(), erc1155.contractAddress, erc1155.tokenId, owner);

      if (!isApproved) {
        throw new Error(`ERC1155 token "${erc1155.tokenId}" with contract address "${erc1155.contractAddress}" is not approved for transfer.\n\nYou can give approval the multiwrap contract to transfer this token by running:\n\nawait sdk.getEdition("${erc1155.contractAddress}").setApprovalForAll("${this.getAddress()}", true);\n\n`);
      }

      numOfRewardUnits.push(erc1155.totalRewards);
      contents.push({
        assetContract: erc1155.contractAddress,
        tokenType: 2,
        totalAmount: ethers.BigNumber.from(erc1155.quantityPerReward).mul(ethers.BigNumber.from(erc1155.totalRewards)),
        tokenId: erc1155.tokenId
      });
    }

    return {
      contents,
      numOfRewardUnits
    };
  }
  /**
   * @internal
   */


  async call(functionName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return this.contractWrapper.call(functionName, ...args);
  }

}

defineProperty._defineProperty(Pack, "contractRoles", ["admin", "minter", "asset", "transfer"]);

exports.Pack = Pack;
