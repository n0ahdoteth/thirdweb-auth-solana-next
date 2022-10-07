'use strict';

var ethers = require('ethers');
var invariant = require('tiny-invariant');
var wagmi = require('wagmi');
var sdk = require('@thirdweb-dev/sdk');
var React = require('react');
var coinbaseWallet = require('wagmi/connectors/coinbaseWallet');
var injected = require('wagmi/connectors/injected');
var walletConnect = require('wagmi/connectors/walletConnect');
var jsxRuntime = require('react/jsx-runtime');
var reactQuery = require('@tanstack/react-query');
var mime = require('mime/lite.js');
var useDimensions = require('react-cool-dimensions');
var queryKey = require('./query-key-9e6c1d17.cjs.dev.js');
var detectBrowser = require('detect-browser');
var reactDom = require('react-dom');
var copy = require('copy-to-clipboard');
var styled = require('@emotion/styled');
var react = require('@emotion/react');
var color = require('color');
var FiCheck = require('@react-icons/all-files/fi/FiCheck');
var FiChevronDown = require('@react-icons/all-files/fi/FiChevronDown');
var FiCopy = require('@react-icons/all-files/fi/FiCopy');
var FiLock = require('@react-icons/all-files/fi/FiLock');
var FiShuffle = require('@react-icons/all-files/fi/FiShuffle');
var FiWifi = require('@react-icons/all-files/fi/FiWifi');
var FiXCircle = require('@react-icons/all-files/fi/FiXCircle');
var menu = require('@zag-js/menu');
var react$1 = require('@zag-js/react');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var invariant__default = /*#__PURE__*/_interopDefault(invariant);
var React__default = /*#__PURE__*/_interopDefault(React);
var mime__default = /*#__PURE__*/_interopDefault(mime);
var useDimensions__default = /*#__PURE__*/_interopDefault(useDimensions);
var copy__default = /*#__PURE__*/_interopDefault(copy);
var styled__default = /*#__PURE__*/_interopDefault(styled);
var color__default = /*#__PURE__*/_interopDefault(color);
var menu__namespace = /*#__PURE__*/_interopNamespace(menu);

const ThirdwebAuthConfigContext = /*#__PURE__*/React.createContext(undefined);
const ThirdwebAuthConfigProvider = _ref => {
  let {
    value,
    children
  } = _ref;
  // Remove trailing slash from URL if present
  const authConfig = React.useMemo(() => value ? { ...value,
    authUrl: value.authUrl.replace(/\/$/, "")
  } : undefined, [value]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebAuthConfigContext.Provider, {
    value: authConfig,
    children: children
  });
};
function useThirdwebAuthConfig() {
  return React.useContext(ThirdwebAuthConfigContext);
}

// eslint-disable-next-line turbo/no-undeclared-env-vars
const __DEV__ = process.env.NODE_ENV !== "production";

const chain = {
  mainnet: {
    id: sdk.ChainId.Mainnet,
    name: "Ethereum Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Mainnet],
    rpcUrls: ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://etherscan.io"
    }]
  },
  goerli: {
    id: sdk.ChainId.Goerli,
    name: "Goerli",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Goerli],
    rpcUrls: ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://goerli.etherscan.io"
    }],
    testnet: true
  },
  polygonMainnet: {
    id: sdk.ChainId.Polygon,
    name: "Polygon Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Polygon],
    rpcUrls: ["https://polygon-rpc.com", "https://rpc-mainnet.matic.network", "https://matic-mainnet.chainstacklabs.com", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro", "https://matic-mainnet-full-rpc.bwarelabs.com"],
    blockExplorers: [{
      name: "Polygonscan",
      url: "https://polygonscan.com"
    }]
  },
  polygonTestnetMumbai: {
    id: sdk.ChainId.Mumbai,
    name: "Mumbai",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Mumbai],
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com", "https://rpc-mumbai.maticvigil.com", "https://matic-testnet-archive-rpc.bwarelabs.com"],
    blockExplorers: [{
      name: "PolygonScan",
      url: "https://mumbai.polygonscan.com"
    }],
    testnet: true
  },
  avalanche: {
    id: sdk.ChainId.Avalanche,
    name: "Avalanche",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Avalanche],
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc", "https://rpc.ankr.com/avalanche"],
    blockExplorers: [{
      name: "SnowTrace",
      url: "https://snowtrace.io/"
    }],
    testnet: false
  },
  avalancheFujiTestnet: {
    id: sdk.ChainId.AvalancheFujiTestnet,
    name: "Avalanche Fuji Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.AvalancheFujiTestnet],
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorers: [{
      name: "SnowTrace",
      url: "https://testnet.snowtrace.io/"
    }],
    testnet: true
  },
  fantom: {
    id: sdk.ChainId.Fantom,
    name: "Fantom Opera",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Fantom],
    rpcUrls: ["https://rpc.ftm.tools"],
    blockExplorers: [{
      name: "FTMscan",
      url: "https://ftmscan.com/"
    }],
    testnet: false
  },
  fantomTestnet: {
    id: sdk.ChainId.FantomTestnet,
    name: "Fantom Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.FantomTestnet],
    rpcUrls: ["https://rpc.testnet.fantom.network"],
    blockExplorers: [{
      name: "FTMscan",
      url: "https://testnet.ftmscan.com/"
    }],
    testnet: true
  },
  optimism: {
    id: sdk.ChainId.Optimism,
    name: "Optimism",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Optimism],
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://optimistic.etherscan.io/"
    }],
    testnet: false
  },
  optimismGoerli: {
    id: sdk.ChainId.OptimismGoerli,
    name: "Optimism Goerli Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.OptimismGoerli],
    rpcUrls: ["https://goerli.optimism.io/"],
    blockExplorers: [{
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io/"
    }],
    testnet: true
  },
  arbitrum: {
    id: sdk.ChainId.Arbitrum,
    name: "Arbitrum One",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.Arbitrum],
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorers: [{
      name: "Arbiscan",
      url: "https://arbiscan.io/"
    }],
    testnet: false
  },
  arbitrumGoerli: {
    id: sdk.ChainId.ArbitrumGoerli,
    name: "Arbitrum Goerli",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.ArbitrumGoerli],
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc/"],
    blockExplorers: [{
      name: "Arbitrum Goerli Rollup Explorer",
      url: "https://goerli-rollup-explorer.arbitrum.io"
    }],
    testnet: true
  },
  binanceSmartChainMainnet: {
    id: sdk.ChainId.BinanceSmartChainMainnet,
    name: "Binance Smart Chain Mainnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.BinanceSmartChainMainnet],
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
    blockExplorers: [{
      name: "BscScan",
      url: "https://bscscan.com/"
    }],
    testnet: false
  },
  binanceSmartChainTestnet: {
    id: sdk.ChainId.BinanceSmartChainTestnet,
    name: "Binance Smart Chain Testnet",
    nativeCurrency: sdk.NATIVE_TOKENS[sdk.ChainId.BinanceSmartChainTestnet],
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorers: [{
      name: "BscScan",
      url: "https://testnet.bscscan.com/"
    }],
    testnet: true
  }
};
const defaultSupportedChains = Object.values(chain);
function getChainFromChainId(chainId) {
  return defaultSupportedChains.find(c => c.id === chainId);
}

const defaultChainRpc = {
  [sdk.ChainId.Mainnet]: "mainnet",
  [sdk.ChainId.Goerli]: "goerli",
  [sdk.ChainId.Polygon]: "polygon",
  [sdk.ChainId.Mumbai]: "mumbai",
  [sdk.ChainId.Fantom]: "fantom",
  [sdk.ChainId.Avalanche]: "avalanche"
};
const ThirdwebConfigContext = /*#__PURE__*/React.createContext({
  rpcUrlMap: defaultChainRpc,
  supportedChains: defaultSupportedChains
});
const ThirdwebConfigProvider = _ref => {
  let {
    value,
    children
  } = _ref;
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConfigContext.Provider, {
    value: value,
    children: children
  });
};
function useThirdwebConfigContext() {
  return React.useContext(ThirdwebConfigContext);
}

const INITIAL_CONTEXT_VALUE = {
  wallet: undefined,
  address: undefined,
  chainId: undefined,
  signer: undefined
};
const ThirdwebConnectedWalletContext = /*#__PURE__*/React.createContext(INITIAL_CONTEXT_VALUE);
const ThirdwebConnectedWalletProvider = _ref => {
  let {
    signer,
    children
  } = _ref;
  const {
    rpcUrlMap
  } = useThirdwebConfigContext();
  const [contextValue, setContextValue] = React.useState(INITIAL_CONTEXT_VALUE);
  React.useEffect(() => {
    let s = signer;

    if (signer) {
      // just get both of these up front and keep them around with the context
      Promise.all([signer.getAddress(), signer.getChainId()]).then(_ref2 => {
        let [address, chainId] = _ref2;
        const rpcUrl = rpcUrlMap[chainId]; // only if the signer is still the same!

        if (signer === s) {
          const wallet = new sdk.UserWallet(signer, {
            readonlySettings: rpcUrl ? {
              rpcUrl,
              chainId
            } : undefined
          });
          setContextValue({
            wallet,
            address,
            chainId,
            signer
          });
        }
      }).catch(err => {
        if (__DEV__) {
          console.warn("failed to get wallet instance in `<ThirdwebConnectedWalletProvider />`", err);
        }
      });
    } else {
      // if signer is not provided, re-set the context value to initial values
      setContextValue(INITIAL_CONTEXT_VALUE);
    }

    return () => {
      // set the previous signer to undefined because it is invalid now
      s = undefined;
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConnectedWalletContext.Provider, {
    value: contextValue,
    children: children
  });
};
function useThirdwebConnectedWalletContext() {
  return React.useContext(ThirdwebConnectedWalletContext);
}

const ThirdwebSDKContext = /*#__PURE__*/React.createContext({
  desiredChainId: -1
});

/**
 *
 * @internal
 */
const WrappedThirdwebSDKProvider = _ref => {
  let {
    sdkOptions,
    desiredChainId,
    storageInterface,
    provider,
    queryClient,
    authConfig,
    children
  } = _ref;
  const {
    signer
  } = useThirdwebConnectedWalletContext();
  const sdk$1 = React.useMemo(() => {
    if (!desiredChainId || typeof window === "undefined") {
      return undefined;
    }

    const _sdk = new sdk.ThirdwebSDK(provider, sdkOptions, storageInterface);

    _sdk._constructedAt = Date.now();
    _sdk._chainId = desiredChainId;
    return _sdk;
  }, [provider, sdkOptions, storageInterface, desiredChainId]);
  React.useEffect(() => {
    if (signer && sdk$1 && sdk$1._chainId === desiredChainId) {
      sdk$1.updateSignerOrProvider(signer);
    }
  }, [signer, sdk$1, desiredChainId]);
  const ctxValue = React.useMemo(() => ({
    sdk: sdk$1,
    desiredChainId: desiredChainId || -1,
    _inProvider: true
  }), [desiredChainId, sdk$1]);
  return /*#__PURE__*/jsxRuntime.jsx(queryKey.QueryClientProviderWithDefault, {
    queryClient: queryClient,
    children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebAuthConfigProvider, {
      value: authConfig,
      children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKContext.Provider, {
        value: ctxValue,
        children: children
      })
    })
  });
};
/**
 * A basic wrapper around the Thirdweb SDK.
 *
 * You can use this in order to be able to pass a provider & signer directly to the SDK.
 *
 * @remarks Utilizing this provider will mean hooks for wallet management are not available, if you need those please use the {@link ThirdwebProvider} instead.
 *
 * @public
 */

const ThirdwebSDKProvider = _ref2 => {
  let {
    signer,
    children,
    ...restProps
  } = _ref2;
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConnectedWalletProvider, {
    signer: signer,
    children: /*#__PURE__*/jsxRuntime.jsx(WrappedThirdwebSDKProvider, { ...restProps,
      children: children
    })
  });
};
/**
 * @internal
 */

function useSDKContext() {
  const ctx = React.useContext(ThirdwebSDKContext);
  invariant__default["default"](ctx._inProvider, "useSDK must be called from within a ThirdwebProvider, did you forget to wrap your app in a <ThirdwebProvider />?");
  return ctx;
}
/**
 *
 * @returns {@link ThirdwebSDK}
 * Access the instance of the thirdweb SDK created by the ThirdwebProvider
 * to call methods using the connected wallet on the desiredChainId.
 * @example
 * ```javascript
 * const sdk = useSDK();
 * ```
 */


function useSDK() {
  const {
    sdk
  } = useSDKContext();
  return sdk;
}
/**
 * @internal
 */

function useDesiredChainId() {
  const {
    desiredChainId
  } = useSDKContext();
  return desiredChainId;
}
/**
 * @internal
 */

function useSDKChainId() {
  const sdk = useSDK();
  return sdk === null || sdk === void 0 ? void 0 : sdk._chainId;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

const CHAIN_ID_TO_GNOSIS_SERVER_URL = {
  [sdk.ChainId.Mainnet]: "https://safe-transaction.mainnet.gnosis.io",
  [sdk.ChainId.Avalanche]: "https://safe-transaction.avalanche.gnosis.io",
  [sdk.ChainId.Polygon]: "https://safe-transaction.polygon.gnosis.io",
  [sdk.ChainId.Goerli]: "https://safe-transaction.goerli.gnosis.io"
};

const __IS_SERVER__$1 = typeof window === "undefined";

class GnosisSafeConnector extends wagmi.Connector {
  // config
  constructor(config) {
    var _config$chains;

    // filter out any chains that gnosis doesnt support before passing to connector
    config.chains = (_config$chains = config.chains) === null || _config$chains === void 0 ? void 0 : _config$chains.filter(c => c.id in CHAIN_ID_TO_GNOSIS_SERVER_URL);
    super({ ...config,
      options: undefined
    });

    _defineProperty(this, "id", "gnosis");

    _defineProperty(this, "ready", __IS_SERVER__$1);

    _defineProperty(this, "name", "Gnosis Safe");

    _defineProperty(this, "previousConnector", void 0);

    _defineProperty(this, "config", void 0);

    _defineProperty(this, "safeSigner", void 0);

    if (!__IS_SERVER__$1) {
      this.ready = true;
    }
  }

  async connect() {
    this.safeSigner = await this.createSafeSigner();
    const account = await this.getAccount();
    const provider = await this.getProvider();
    const id = await this.getChainId();
    return {
      account,
      provider,
      chain: {
        id,
        unsupported: this.isChainUnsupported(id)
      }
    };
  }

  async createSafeSigner() {
    var _this$previousConnect, _this$config, _this$config2;

    const signer = await ((_this$previousConnect = this.previousConnector) === null || _this$previousConnect === void 0 ? void 0 : _this$previousConnect.getSigner());
    const safeAddress = (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.safeAddress;
    const safeChainId = (_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : _this$config2.safeChainId;
    invariant__default["default"](signer, "cannot create Gnosis Safe signer without a personal signer");
    const signerChainId = await signer.getChainId();
    invariant__default["default"](signerChainId === safeChainId, "chainId of personal signer has to match safe chainId");
    invariant__default["default"](safeAddress, "safeConfig.safeAddress is required, did you forget to call setSafeConfig?");
    invariant__default["default"](safeChainId, "safeConfig.safeChainId is required, did you forget to call setSafeConfig?");
    const serverUrl = CHAIN_ID_TO_GNOSIS_SERVER_URL[safeChainId];
    invariant__default["default"](serverUrl, "Chain not supported");
    const [safeEthersAdapters, safeCoreSdk, safeEthersLib] = await Promise.all([Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@gnosis.pm/safe-ethers-adapters')); }), Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@gnosis.pm/safe-core-sdk')); }), Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('@gnosis.pm/safe-ethers-lib')); })]);
    const ethAdapter = new safeEthersLib.default({
      ethers: ethers.ethers,
      signer
    });
    const safe = await safeCoreSdk.default.create({
      ethAdapter: ethAdapter,
      safeAddress
    });
    const service = new safeEthersAdapters.SafeService(serverUrl);
    return new safeEthersAdapters.SafeEthersSigner(safe, service, signer.provider);
  }

  async disconnect() {
    this.config = undefined;
    this.safeSigner = undefined;
    this.previousConnector = undefined;
    return undefined;
  }

  async getAccount() {
    const signer = await this.getSigner();
    return await signer.getAddress();
  }

  async getChainId() {
    return (await this.getSigner()).getChainId();
  }

  async getProvider() {
    return (await this.getSigner()).provider;
  }

  async getSigner() {
    if (!this.safeSigner) {
      this.safeSigner = await this.createSafeSigner();
    }

    return this.safeSigner;
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  onAccountsChanged(accounts) {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", {
        account: ethers.utils.getAddress(accounts[0])
      });
    }
  }

  isChainUnsupported(chainId) {
    var _this$config3;

    return (_this$config3 = this.config) !== null && _this$config3 !== void 0 && _this$config3.safeChainId ? chainId === this.config.safeChainId : false;
  }

  onChainChanged(chainId) {
    const id = wagmi.normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", {
      chain: {
        id,
        unsupported
      }
    });
  }

  onDisconnect() {
    this.emit("disconnect");
  }

  setConfiguration(connector, config) {
    this.previousConnector = connector;
    this.config = config;
  }

}

const __IS_SERVER__ = typeof window === "undefined";

const LOCAL_STORAGE_KEY = "--magic-link:configuration";
class MagicConnector extends wagmi.Connector {
  getConfiguration() {
    if (__IS_SERVER__) {
      return undefined;
    }

    const config = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (config) {
      this.configuration = JSON.parse(config);
    }

    return this.configuration;
  }

  constructor(config) {
    super({ ...config,
      options: config === null || config === void 0 ? void 0 : config.options
    });

    _defineProperty(this, "id", "magic");

    _defineProperty(this, "name", "Magic");

    _defineProperty(this, "ready", __IS_SERVER__);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "configuration", void 0);

    _defineProperty(this, "magic", void 0);

    this.options = config.options;

    if (!__IS_SERVER__) {
      this.ready = true;

      if (this.options.doNotAutoConnect || !this.getConfiguration()) {
        return;
      }

      this.connect(true);
    }
  }

  async connect(isAutoConnect) {
    const {
      apiKey,
      ...options
    } = this.options;
    const configuration = this.getConfiguration();

    try {
      invariant__default["default"](configuration, "did you forget to set the configuration via: setConfiguration()?");

      if (isAutoConnect) {
        configuration.showUI = false;
      }

      return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('magic-sdk')); }).then(async m => {
        this.magic = new m.Magic(apiKey, options);
        await this.magic.auth.loginWithMagicLink(configuration);
        const provider = this.getProvider();

        if (provider.on) {
          provider.on("accountsChanged", this.onAccountsChanged);
          provider.on("chainChanged", this.onChainChanged);
          provider.on("disconnect", this.onDisconnect);
        }

        const account = await this.getAccount();
        const id = await this.getChainId();
        return {
          account,
          provider,
          chain: {
            id,
            unsupported: this.isChainUnsupported(id)
          }
        };
      });
    } catch (e) {
      if (!isAutoConnect) {
        throw e;
      }

      return {
        account: undefined,
        provider: undefined,
        chain: undefined
      };
    }
  }

  async disconnect() {
    const provider = this.getProvider();

    if (provider !== null && provider !== void 0 && provider.removeListener) {
      provider.removeListener("accountsChanged", this.onAccountsChanged);
      provider.removeListener("chainChanged", this.onChainChanged);
      provider.removeListener("disconnect", this.onDisconnect);
    }

    this.setConfiguration(undefined);
  }

  async switchChain(chainId) {
    invariant__default["default"](!this.isChainUnsupported(chainId), "chain is not supported");
    const provider = this.getProvider();

    if (provider !== null && provider !== void 0 && provider.removeListener) {
      provider.removeListener("accountsChanged", this.onAccountsChanged);
      provider.removeListener("chainChanged", this.onChainChanged);
      provider.removeListener("disconnect", this.onDisconnect);
    }

    this.options.network = {
      chainId,
      rpcUrl: this.options.rpcUrls[chainId]
    };
    await this.connect();
    this.onChainChanged(chainId);
    return this.chains.find(c => c.id === chainId);
  }

  async getAccount() {
    const signer = await this.getSigner();
    return await signer.getAddress();
  }

  async getChainId() {
    const signer = await this.getSigner();
    return await signer.getChainId();
  }

  getProvider() {
    invariant__default["default"](this.magic, "connector is not initialized");
    return new ethers.providers.Web3Provider(this.magic.rpcProvider);
  }

  async getSigner() {
    if (!this.magic) {
      await this.connect();
    }

    return this.getProvider().getSigner();
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  onAccountsChanged(accounts) {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", {
        account: ethers.utils.getAddress(accounts[0])
      });
    }
  }

  isChainUnsupported(chainId) {
    return !this.chains.some(x => x.id === chainId);
  }

  onChainChanged(chainId) {
    const id = wagmi.normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", {
      chain: {
        id,
        unsupported
      }
    });
  }

  onDisconnect() {
    this.emit("disconnect");
  }

  setConfiguration(configuration) {
    if (configuration) {
      this.configuration = configuration;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(configuration));
    } else {
      this.configuration = undefined;
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

}

// SDK handles this under the hood for us
const defaultdAppMeta = {
  name: "thirdweb powered dApp"
};
const defaultWalletConnectors = ["metamask", "walletConnect", "walletLink"];
/**
 *
 * The `<ThirdwebProvider />` component lets you control what networks you want users to connect to, what types of wallets can connect to your app, and the settings for the [Typescript SDK](https://docs.thirdweb.com/typescript).
 *
 * @example
 * You can wrap your application with the provider as follows:
 *
 * ```jsx title="App.jsx"
 * import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   return (
 *     <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
 *       <YourApp />
 *     </ThirdwebProvider>
 *   );
 * };
 * ```
 *
 * @public
 *
 */

const ThirdwebProvider = _ref => {
  let {
    sdkOptions,
    chainRpc = defaultChainRpc,
    supportedChains = defaultSupportedChains.map(c => c.id),
    walletConnectors = defaultWalletConnectors,
    dAppMeta = defaultdAppMeta,
    desiredChainId,
    authConfig,
    storageInterface,
    queryClient,
    autoConnect = true,
    children
  } = _ref;

  // construct the wagmi options
  const _supporrtedChains = React.useMemo(() => {
    return supportedChains.map(c => {
      if (typeof c === "number") {
        return defaultSupportedChains.find(sc => sc.id === c);
      }

      return c;
    }).filter(c => c !== undefined);
  }, [supportedChains]);

  const _rpcUrlMap = React.useMemo(() => {
    return _supporrtedChains.reduce((prev, curr) => {
      prev[curr.id] = curr.id in chainRpc ? sdk.getProviderForNetwork(chainRpc[curr.id] || curr.rpcUrls[0]) : curr.rpcUrls[0];
      return prev;
    }, {});
  }, [chainRpc, _supporrtedChains]);

  const wagmiProps = React.useMemo(() => {
    const walletConnectClientMeta = {
      name: dAppMeta.name,
      url: dAppMeta.url || "",
      icons: [dAppMeta.logoUrl || ""],
      description: dAppMeta.description || ""
    };
    const walletLinkClientMeta = {
      appName: dAppMeta.name,
      appLogoUrl: dAppMeta.logoUrl,
      darkMode: dAppMeta.isDarkMode
    };
    return {
      autoConnect,
      connectorStorageKey: "tw:provider:connectors",
      connectors: _ref2 => {
        let {
          chainId
        } = _ref2;
        return walletConnectors.map(connector => {
          // injected connector
          if (typeof connector === "string" && (connector === "injected" || connector === "metamask") || typeof connector === "object" && (connector.name === "injected" || connector.name === "metamask")) {
            return new injected.InjectedConnector({
              options: typeof connector === "string" ? {
                shimDisconnect: true,
                shimChainChangedDisconnect: true
              } : connector.options,
              chains: _supporrtedChains
            });
          }

          if (typeof connector === "string" && connector === "walletConnect" || typeof connector === "object" && connector.name === "walletConnect") {
            return new walletConnect.WalletConnectConnector({
              options: typeof connector === "string" ? {
                chainId,
                rpc: _rpcUrlMap,
                clientMeta: walletConnectClientMeta,
                qrcode: true
              } : {
                chainId,
                rpc: _rpcUrlMap,
                clientMeta: walletConnectClientMeta,
                qrcode: true,
                ...connector.options
              },
              chains: _supporrtedChains
            });
          }

          if (typeof connector === "string" && (connector === "coinbase" || connector === "walletLink") || typeof connector === "object" && (connector.name === "coinbase" || connector.name === "walletLink")) {
            const jsonRpcUrl = _rpcUrlMap[chainId || desiredChainId || 1];
            return new coinbaseWallet.CoinbaseWalletConnector({
              chains: _supporrtedChains,
              options: typeof connector === "string" ? { ...walletLinkClientMeta,
                jsonRpcUrl
              } : { ...walletLinkClientMeta,
                jsonRpcUrl,
                ...connector.options
              }
            });
          }

          if (typeof connector === "object" && connector.name === "magic") {
            const jsonRpcUrl = _rpcUrlMap[chainId || desiredChainId || 1];
            return new MagicConnector({
              chains: _supporrtedChains,
              options: { ...connector.options,
                network: {
                  rpcUrl: jsonRpcUrl,
                  chainId: desiredChainId || 1
                },
                rpcUrls: _rpcUrlMap
              }
            });
          }

          if (typeof connector === "string" && connector === "gnosis" || typeof connector === "object" && connector.name === "gnosis") {
            return new GnosisSafeConnector({
              chains: _supporrtedChains
            });
          }

          return null;
        }).filter(c => c !== null);
      }
    };
  }, [dAppMeta.name, dAppMeta.url, dAppMeta.logoUrl, dAppMeta.description, dAppMeta.isDarkMode, autoConnect, walletConnectors, _supporrtedChains, _rpcUrlMap, desiredChainId]);
  const readonlySettings = React.useMemo(() => {
    var _sdkOptions$readonlyS, _sdkOptions$readonlyS2;

    if (sdkOptions !== null && sdkOptions !== void 0 && (_sdkOptions$readonlyS = sdkOptions.readonlySettings) !== null && _sdkOptions$readonlyS !== void 0 && _sdkOptions$readonlyS.rpcUrl && sdkOptions !== null && sdkOptions !== void 0 && (_sdkOptions$readonlyS2 = sdkOptions.readonlySettings) !== null && _sdkOptions$readonlyS2 !== void 0 && _sdkOptions$readonlyS2.chainId) {
      return sdkOptions.readonlySettings;
    }

    if (!desiredChainId) {
      return undefined;
    }

    let rpcUrl = _rpcUrlMap[desiredChainId];

    try {
      rpcUrl = sdk.getProviderForNetwork(rpcUrl);
    } catch (e) {
      console.error(`failed to configure rpc url for chain: "${desiredChainId}". Did you forget to pass "desiredChainId" to the <ThirdwebProvider /> component?`); // cannot set readonly without a valid rpc url

      return undefined;
    }

    return {
      chainId: desiredChainId,
      rpcUrl
    };
  }, [_rpcUrlMap, desiredChainId, sdkOptions === null || sdkOptions === void 0 ? void 0 : sdkOptions.readonlySettings]);
  const sdkOptionsWithDefaults = React.useMemo(() => {
    const opts = sdkOptions;
    return { ...opts,
      readonlySettings
    };
  }, [sdkOptions, readonlySettings]);
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebConfigProvider, {
    value: {
      rpcUrlMap: _rpcUrlMap,
      supportedChains: _supporrtedChains
    },
    children: /*#__PURE__*/jsxRuntime.jsx(wagmi.WagmiProvider, { ...wagmiProps,
      children: /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKProviderWagmiWrapper, {
        queryClient: queryClient,
        desiredChainId: desiredChainId,
        sdkOptions: sdkOptionsWithDefaults,
        storageInterface: storageInterface,
        authConfig: authConfig,
        children: children
      })
    })
  });
};

const ThirdwebSDKProviderWagmiWrapper = _ref3 => {
  let {
    children,
    ...props
  } = _ref3;
  const provider = wagmi.useProvider();
  const [signer] = wagmi.useSigner();
  return /*#__PURE__*/jsxRuntime.jsx(ThirdwebSDKProvider, {
    signer: signer.data,
    provider: provider,
    ...props,
    children: children
  });
};

const warnSet = new Set();
const showDeprecationWarning = (deprecated, replacement) => {
  // deprecation warnings only in dev only in dev
  if (__DEV__) {
    if (warnSet.has(`${deprecated}:${replacement}`)) {
      return;
    }

    warnSet.add(`${deprecated}:${replacement}`);
    console.warn(`\`${deprecated}\` is deprecated and will be removed in a future major version. Please use \`${replacement}\` instead.`);
  }
};

const TW_CACHE_KEY_PREFIX = "tw-cache";
/**
 * @internal
 */

function enforceCachePrefix(input) {
  return [TW_CACHE_KEY_PREFIX, ...input.filter(i => typeof i !== "string" || i !== TW_CACHE_KEY_PREFIX)];
}
/**
 * @internal
 */


function createContractCacheKey() {
  let contractAddress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ethers.constants.AddressZero;
  let input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return enforceCachePrefix(["contract", contractAddress, ...input]);
}
/**
 @internal
 */

function createCacheKeyWithNetwork(input, chainId) {
  return enforceCachePrefix(cacheKeys.network.active(chainId).concat(input));
}
/**
 * @internal
 */

function invalidateContractAndBalances(queryClient, contractAddress, chainId) {
  return Promise.all([queryClient.invalidateQueries(enforceCachePrefix(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), chainId))), queryClient.invalidateQueries(enforceCachePrefix(createCacheKeyWithNetwork(["balance"], chainId)))]);
}
/**
 @internal
 */

const cacheKeys = {
  auth: {
    user: () => enforceCachePrefix(["user"])
  },
  network: {
    active: chainId => enforceCachePrefix(["chainId", chainId])
  },
  wallet: {
    balance: (chainId, walletAddress, tokenAddress) => enforceCachePrefix(createCacheKeyWithNetwork(enforceCachePrefix(["balance", {
      walletAddress,
      tokenAddress
    }]), chainId))
  },
  contract: {
    read: (contractAddress, fnIdentity) => createContractCacheKey(contractAddress, ["read", fnIdentity]),
    type: contractAddress => createContractCacheKey(contractAddress, ["contract-type"]),
    compilerMetadata: contractAddress => createContractCacheKey(contractAddress, ["publish-metadata"]),
    typeAndCompilerMetadata: contractAddress => createContractCacheKey(contractAddress, ["contract-type-and-metadata"]),
    metadata: contractAddress => createContractCacheKey(contractAddress, ["metadata"]),
    extractFunctions: contractAddress => createContractCacheKey(contractAddress, ["extractFunctions"]),
    call: (contractAddress, functionName, args) => createContractCacheKey(contractAddress, ["call", functionName, args]),
    events: {
      getEvents: (contractAddress, eventName) => createContractCacheKey(contractAddress, ["events", "getEvents", {
        eventName
      }]),
      getAllEvents: contractAddress => createContractCacheKey(contractAddress, ["events", "getAllEvents"])
    },
    // specific contract types
    nft: {
      get: (contractAddress, tokenId) => createContractCacheKey(contractAddress, ["get", {
        tokenId
      }]),
      balanceOf: (contractAddress, owner, tokenId) => createContractCacheKey(contractAddress, ["balanceOf", {
        owner,
        tokenId
      }]),
      query: {
        all: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["query", "all", params] : ["query", "all"]),
        totalCirculatingSupply: contractAddress => createContractCacheKey(contractAddress, ["query", "totalCirculatingSupply"]),
        totalCount: contractAddress => createContractCacheKey(contractAddress, ["query", "totalCount"]),
        owned: {
          all: (contractAddress, owner) => createContractCacheKey(contractAddress, ["query", "owned", "all", owner])
        }
      },
      drop: {
        getAllUnclaimed: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getAllUnclaimed", params] : ["getAllUnclaimed"]),
        totalUnclaimedSupply: contractAddress => createContractCacheKey(contractAddress, ["totalUnclaimedSupply"]),
        totalClaimedSupply: contractAddress => createContractCacheKey(contractAddress, ["totalClaimedSupply"]),
        revealer: {
          getBatchesToReveal: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getBatchesToReveal", params] : ["getBatchesToReveal"])
        }
      }
    },
    token: {
      totalSupply: contractAddress => createContractCacheKey(contractAddress, ["totalSupply"]),
      decimals: contractAddress => createContractCacheKey(contractAddress, ["decimals"]),
      balanceOf: (contractAddress, walletAddress) => createContractCacheKey(contractAddress, ["balanceOf", {
        walletAddress
      }])
    },
    marketplace: {
      getListing: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["getListing", {
        listingId
      }]),
      getAllListings: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getAllListings", params] : ["getAllListings"]),
      getTotalCount: contractAddress => createContractCacheKey(contractAddress, ["getTotalCount"]),
      getActiveListings: (contractAddress, params) => createContractCacheKey(contractAddress, params ? ["getActiveListings", params] : ["getActiveListings"]),
      getBidBufferBps: contractAddress => createContractCacheKey(contractAddress, ["getBidBufferBps"]),
      auction: {
        getWinningBid: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["auction", "getWinningBid", {
          listingId
        }]),
        getWinner: (contractAddress, listingId) => createContractCacheKey(contractAddress, ["auction", "getWinner", {
          listingId
        }])
      }
    }
  },
  // extensions
  extensions: {
    claimConditions: {
      getActive: (contractAddress, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getActive", {
        tokenId
      }] : ["claimConditions", "getActive"]),
      getAll: (contractAddress, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getAll", {
        tokenId
      }] : ["claimConditions", "getAll"]),
      getClaimIneligibilityReasons: (contractAddress, params, tokenId) => createContractCacheKey(contractAddress, tokenId ? ["claimConditions", "getIneligibilityReasons", {
        tokenId
      }, params] : ["claimConditions", "getIneligibilityReasons", params])
    },
    // primary sale contracts
    sales: {
      getRecipient: contractAddress => createContractCacheKey(contractAddress, ["sales"])
    },
    // royalties
    royalties: {
      getDefaultRoyaltyInfo: contractAddress => createContractCacheKey(contractAddress, ["royalties"])
    },
    // platform fees
    platformFees: {
      get: contractAddress => createContractCacheKey(contractAddress, ["platformFees"])
    },
    // contract metadata
    metadata: {
      get: contractAddress => createContractCacheKey(contractAddress, ["metadata"])
    },
    roles: {
      getAll: contractAddress => createContractCacheKey(contractAddress, ["roles"]),
      get: (contractAddress, role) => createContractCacheKey(contractAddress, ["roles", {
        role
      }])
    }
  }
};

/** @internal */

function useQueryWithNetwork(queryKey, queryFn, options) {
  const activeChainId = useSDKChainId();
  const mergedOptions = { ...options,
    enabled: !!(activeChainId && options !== null && options !== void 0 && options.enabled)
  };
  return reactQuery.useQuery(createCacheKeyWithNetwork(queryKey, activeChainId), queryFn, mergedOptions);
}

/**
 * A hook to get the native or (optional) ERC20 token balance of the connected wallet.
 *
 * @param tokenAddress - the address of the token contract, if empty will use the chain's native token
 * @returns the balance of the connected wallet (native or ERC20)
 * @beta
 */

function useBalance(tokenAddress) {
  const walletAddress = useAddress();
  const {
    wallet,
    address,
    chainId
  } = useThirdwebConnectedWalletContext();
  const cacheKey = React.useMemo(() => {
    return cacheKeys.wallet.balance(chainId || -1, address, tokenAddress);
  }, [chainId, tokenAddress, address]);
  return reactQuery.useQuery(cacheKey, () => {
    return wallet === null || wallet === void 0 ? void 0 : wallet.balance(tokenAddress);
  }, {
    // if user is not logged in no reason to try to fetch
    enabled: !!wallet && !!walletAddress && !!chainId,
    retry: true,
    keepPreviousData: false
  });
}
/**
 * @internal
 */

function useConnectedWallet() {
  return useThirdwebConnectedWalletContext().wallet;
}
/**
 * Hook for accessing the address of the connected wallet
 *
 * ```javascript
 * import { useAddress } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * To get the address of the connected wallet, you can use the hook as follows:
 *
 * ```javascript
 * import { useAddress } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const address = useAddress()
 *
 *   return <div>{address}</div>
 * }
 * ```
 *
 * The `address` variable will hold the address of the connected wallet if a user has connected using one of the supported wallet connection hooks.
 *
 * @public
 */

function useAddress() {
  return useThirdwebConnectedWalletContext().address;
}
/**
 * Hook for accessing the chain ID of the network the current wallet is connected to
 *
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 * ```
 *
 * @example
 * You can get the chain ID of the connected wallet by using the hook as follows:
 * ```javascript
 * import { useChainId } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const chainId = useChainId()
 *
 *   return <div>{chainId}</div>
 * }
 * ```
 * @public
 */

function useChainId() {
  return useThirdwebConnectedWalletContext().chainId;
}

async function fetchContractType(contractAddress, sdk) {
  if (!contractAddress || !sdk) {
    return null;
  }

  try {
    return await sdk.resolveContractType(contractAddress);
  } catch (err) {
    console.error("failed to resolve contract type", err); // this error can happen if the contract is a custom contract -> assume "custom"

    return "custom";
  }
}

function useContractType(contractAddress) {
  const sdk = useSDK();
  return useQueryWithNetwork(cacheKeys.contract.type(contractAddress), () => fetchContractType(contractAddress, sdk), // is immutable, so infinite stale time
  {
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk
  });
}
const contractType = {
  cacheKey: (contractAddress, chainId) => createCacheKeyWithNetwork(cacheKeys.contract.type(contractAddress), chainId),
  useQuery: useContractType,
  fetchQuery: fetchContractType
}; // end contract type
// contract compiler metadata

function fetchCompilerMetadata(contractAddress, sdk) {
  if (!contractAddress || !sdk) {
    return null;
  }

  try {
    return sdk.getPublisher().fetchCompilerMetadataFromAddress(contractAddress);
  } catch (err) {
    // if we fail to get contract metadata just return null;
    return null;
  }
}

function useCompilerMetadata(contractAddress) {
  const sdk = useSDK();
  return useQueryWithNetwork(cacheKeys.contract.compilerMetadata(contractAddress), () => fetchCompilerMetadata(contractAddress, sdk), // is immutable, so infinite stale time
  {
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk
  });
}
const compilerMetadata = {
  cacheKey: (contractAddress, chainId) => createCacheKeyWithNetwork(cacheKeys.contract.compilerMetadata(contractAddress), chainId),
  useQuery: useCompilerMetadata,
  fetchQuery: fetchCompilerMetadata
}; // end compiler metadata
// useContract

function useContract(contractAddress, contractTypeOrABI) {
  const sdk = useSDK();
  const queryClient = reactQuery.useQueryClient();
  const activeChainId = useSDKChainId();
  const wallet = useAddress();
  const walletChainId = useChainId(); // it's there because we put it there.

  const sdkTimestamp = sdk === null || sdk === void 0 ? void 0 : sdk._constructedAt;
  const contractQuery = useQueryWithNetwork( // need to add the wallet and walletChainId into the query key so this gets refreshed when the wallet / chain changes!
  queryKey.neverPersist(["contract-instance", contractAddress, {
    wallet,
    walletChainId,
    sdkTimestamp
  }]), async () => {
    invariant__default["default"](contractAddress, "contract address is required");
    invariant__default["default"](sdk, "SDK not initialized");
    invariant__default["default"](activeChainId, "active chain id is required"); // if we don't have a contractType or ABI then we will have to resolve it regardless
    // we also handle it being "custom" just in case...

    if (!contractTypeOrABI || contractTypeOrABI === "custom") {
      // we just resolve here (sdk does this internally anyway)
      const resolvedContractType = await queryClient.fetchQuery(contractType.cacheKey(contractAddress, activeChainId), () => contractType.fetchQuery(contractAddress, sdk), {
        cacheTime: Infinity,
        staleTime: Infinity
      });
      let abi;

      if (resolvedContractType === "custom") {
        var _await$queryClient$fe;

        abi = (_await$queryClient$fe = await queryClient.fetchQuery(compilerMetadata.cacheKey(contractAddress, activeChainId), () => compilerMetadata.fetchQuery(contractAddress, sdk), {
          cacheTime: Infinity,
          staleTime: Infinity
        })) === null || _await$queryClient$fe === void 0 ? void 0 : _await$queryClient$fe.abi;
      }

      invariant__default["default"](resolvedContractType, "failed to resolve contract type"); // just let the sdk handle the rest
      // if we have resolved an ABI for a custom contract, use that otherwise use contract type

      return sdk.getContract(contractAddress, abi || resolvedContractType);
    } // every other case can just be handled by the sdk directly


    return sdk.getContract(contractAddress, contractTypeOrABI);
  }, {
    // keep the previous value around while we fetch the new one
    // this is important because otherwise it can lead to flickering (because we need to re-fetch the contract when sdk things change)
    keepPreviousData: true,
    // is immutable, so infinite cache & stale time (for a given key)
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!contractAddress && !!sdk && !!activeChainId
  }); // const previousCountract = usePrevious(contractQuery.data);

  return { ...contractQuery,
    data: contractQuery.data,
    contract: contractQuery.data
  };
}
/**
 * Use this to get the contract metadata for a (built-in or custom) contract.
 *
 * @example
 * ```javascript
 * const { data: contractMetadata, isLoading, error } = useContractMetadata(>);
 * ```
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to get the metadata for
 * @returns a response object that includes the contract metadata of the deployed contract
 * @twfeature ContractMetadata
 * @beta
 */

function useContractMetadata(contract) {
  return useQueryWithNetwork(cacheKeys.contract.metadata(contract === null || contract === void 0 ? void 0 : contract.getAddress()), async () => {
    invariant__default["default"](contract, "contract is required");
    return await contract.metadata.get();
  }, {
    enabled: !!contract
  });
}
/**
 * @internal
 */

function useContractMetadataUpdate(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async metadata => {
    invariant__default["default"](contract, "contract must be defined");
    return contract.metadata.update(metadata);
  }, {
    onSettled: () => queryClient.invalidateQueries(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), activeChainId))
  });
}
/**
 * CONTRACT EVENTS
 */

/**
 * Use this to query (and subscribe) to events or a specific event on a contract.
 *
 * @param contract - the {@link ValidContractInstance} instance of the contract to listen to events for
 * @param eventName - the name of the event to query for (omit this or pass `undefined` to query for all events)
 * @param options - options incldues the filters ({@link QueryAllEvents}) for the query as well as if you want to subscribe to real-time updates (default: true)
 * @returns a response object that includes the contract events
 * @beta
 */

function useContractEvents(contract, eventName) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    subscribe: true
  };
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const activeChainId = useSDKChainId();
  const cacheKey = React.useMemo(() => createCacheKeyWithNetwork(eventName ? cacheKeys.contract.events.getAllEvents(contractAddress) : cacheKeys.contract.events.getEvents(contractAddress, eventName), activeChainId), [activeChainId, contractAddress, eventName]);
  React.useEffect(() => {
    // if we're not subscribing or query is not enabled yet we can early exit
    if (!options.subscribe || !contract || !contract) {
      return;
    }

    const cleanupListener = contract.events.listenToAllEvents(contractEvent => {
      // if we have a specific event name we are looking for we can early exist if it doesn't match
      if (eventName && eventName !== contractEvent.eventName) {
        return;
      } // insert new event to the front of the array (no duplicates, though)


      queryClient.setQueryData(cacheKey, oldData => {
        if (!oldData) {
          return [contractEvent];
        }

        const eventIsNotAlreadyInEventsList = oldData.findIndex(e => e.transaction.transactionHash === contractEvent.transaction.transactionHash && e.transaction.logIndex === contractEvent.transaction.logIndex) === -1;

        if (eventIsNotAlreadyInEventsList) {
          return [contractEvent, ...oldData];
        }

        return oldData;
      });
    }); // cleanup listener on unmount

    return cleanupListener;
  }, [options.subscribe, cacheKey, contract, queryClient, eventName]);
  return reactQuery.useQuery(cacheKey, () => {
    invariant__default["default"](contract, "contract must be defined");

    if (eventName) {
      return contract.events.getEvents(eventName, options.queryFilter);
    }

    return contract.events.getAllEvents(options.queryFilter);
  }, {
    enabled: !!contract,
    // we do not need to re-fetch if we're subscribing
    refetchOnWindowFocus: !options.subscribe,
    refetchOnMount: true,
    refetchOnReconnect: true
  });
}
/**
 * Use this to get data from a contract read-function call.
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { data, isLoading, error } = useContractRead(contract, "functionName", ...args);
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @param args - The arguments to pass to the function (if any), with optional call arguments as the last parameter
 * @returns a response object that includes the data returned by the function call
 *
 * @beta
 */

function useContractRead(contract, functionName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.call(contractAddress, functionName, args), () => {
    invariant__default["default"](contract, "contract must be defined");
    invariant__default["default"](functionName, "function name must be provided");
    return contract.call(functionName, ...args);
  }, {
    enabled: !!contract && !!functionName
  });
}
/**
 * Use this to get a function to make a write call to your contract
 *
 * @example
 * ```javascript
 * const { contract } = useContract("{{contract_address}}");
 * const { mutate: myFunction, isLoading, error } = useContractWrite(contract, "myFunction");
 *
 * // the function can be called as follows:
 * // myFunction(["param 1", "param 2", ...])
 *```
 *
 * @param contract - the contract instance of the contract to call a function on
 * @param functionName - the name of the function to call
 * @returns a response object that includes the write function to call
 *
 * @beta
 */

function useContractWrite(contract, functionName) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async callParams => {
    invariant__default["default"](contract, "contract must be defined");
    invariant__default["default"](functionName, "function name must be provided");

    if (!(callParams !== null && callParams !== void 0 && callParams.length)) {
      return contract.call(functionName);
    }

    return contract.call(functionName, ...callParams);
  }, {
    onSettled: () => queryClient.invalidateQueries(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), activeChainId))
  });
}

/**
 * Hook for getting an instance of an `EditionDrop` contract. This conract is used to interface with ERC1155 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the Edition Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useEditionDrop } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const editionDrop = useEditionDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the edition drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(tokenId, quantity) {
 *     await editionDrop.claim(tokenId, quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const editionDrop = await sdk.useEditionDrop("0x1234...");
 * + const editionDrop = await sdk.useContract("0x1234...", "edition-drop").contract;
 * ```
 */

function useEditionDrop(contractAddress) {
  showDeprecationWarning(`useEditionDrop("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "edition-drop")`);
  return useContract(contractAddress, "edition-drop").contract;
}

/**
 * Hook for getting an instance of an `Edition` contract. This contract is used to interface with ERC1155 compliant NFTs.
 * @param contractAddress - the address of the Edition contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useEdition } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const edition = useEdition("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the edition contract in the rest of the component
 *
 *   // For example, this function will return all the NFTs on this contract
 *   async function getNFTs() {
 *     const nfts = await edition.getAll()
 *     return nfts
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const edition = await sdk.useEdition("0x1234...");
 * + const edition = await sdk.useContract("0x1234...", "edition").contract;
 * ```
 */

function useEdition(contractAddress) {
  showDeprecationWarning(`useEdition("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "edition")`);
  return useContract(contractAddress, "edition").contract;
}

/**
 * Hook for getting an instance of an `NFTDrop` contract. This contract is meant to interface with ERC721 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useNFTDrop } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const nftDrop = useNFTDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the nft drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(quantity) {
 *     await nftDrop.claim(quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const nftDrop = await sdk.useNFTDrop("0x1234...");
 * + const nftDrop = await sdk.useContract("0x1234...", "nft-drop").contract;
 * ```
 */

function useNFTDrop(contractAddress) {
  showDeprecationWarning(`useNFTDrop("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "nft-drop")`);
  return useContract(contractAddress, "nft-drop").contract;
}

/**
 * Hook for getting an instance of a `Marketplace` contract. This contract is used to support marketplace for purchase and sale of on-chain assets.
 * @param contractAddress - the address of the Marketplace contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useMarketplace } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const marketplace = useMarketplace("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the marketplace contract in the rest of the component
 *
 *   // For example, this function will return all the listings on the marketplace
 *   async function getListings() {
 *     const listings = await marketplace.getAll()
 *     return listings
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const marketplace = await sdk.useMarketplace("0x1234...");
 * + const marketplace = await sdk.useContract("0x1234...", "marketplace").contract;
 * ```
 */

function useMarketplace(contractAddress) {
  showDeprecationWarning(`useMarketplace("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "marketplace")`);
  return useContract(contractAddress, "marketplace").contract;
}

/**
 * Hook for getting an instance of an `NFTCollection` contract. This contract is meant to interface with ERC721 compliant NFTs.
 * @param contractAddress - the address of the NFT Collection contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useNFTCollection } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const nftCollection = useNFTCollection("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the nftCollection contract in the rest of the component
 *
 *   // For example, this function will return all the NFTs on this contract
 *   async function getNFTs() {
 *     const nfts = await nftCollection.getAll()
 *     return nfts
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const nftCollection = await sdk.useNFTCollection("0x1234...");
 * + const nftCollection = await sdk.useContract("0x1234...", "nft-collection").contract;
 * ```
 */

function useNFTCollection(contractAddress) {
  showDeprecationWarning(`useNFTCollection("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "nft-collection")`);
  return useContract(contractAddress, "nft-collection").contract;
}

/**
 * Hook for getting an instance of a `Pack` contract. This contract supports the creation of on-chain luck-based lootboxes.
 * @param contractAddress - the address of the Pack contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { usePack } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const pack = usePack("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the pack contract in the rest of the component
 *
 *   // For example, this function will get all the packs on this contract
 *   async function getPacks() {
 *     const packs = await pack.getAll()
 *     return packs
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const pack = await sdk.usePack("0x1234...");
 * + const pack = await sdk.useContract("0x1234...", "pack").contract;
 * ```
 */

function usePack(contractAddress) {
  showDeprecationWarning(`usePack("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "pack")`);
  return useContract(contractAddress, "pack").contract;
}

/**
 * Hook for getting an instance of a `Token` contract. This contract supports ERC20 compliant tokens.
 * @param contractAddress - the address of the Token contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useToken } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const token = useToken("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the token contract in the rest of the component
 *
 *   // For example, this function will get the connected wallets token balance
 *   async function balance() {
 *     const balance = await token.balance()
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
 * - const token = await sdk.useToken("0x1234...");
 * + const token = await sdk.useContract("0x1234...", "token").contract;
 * ```
 */

function useToken(contractAddress) {
  showDeprecationWarning(`useToken("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "token")`);
  return useContract(contractAddress, "token").contract;
}

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

function useTokenDrop(contractAddress) {
  showDeprecationWarning(`useTokenDrop("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "token-drop")`);
  return useContract(contractAddress, "token-drop").contract;
}

/**
 * Hook for getting an instance of an `Vote` contract. This contract enables fully featured voting-based decentralized governance systems.
 * @param contractAddress - the address of the Vote contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useVote } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const vote = useVote("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the vote contract in the rest of the component
 *
 *   // For example, this function will get all the proposals on this contract
 *   async function getProposals() {
 *     const proposals = await vote.getAll()
 *     return proposals
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const vote = await sdk.useVote("0x1234...");
 * + const vote = await sdk.useContract("0x1234...", "vote").contract;
 * ```
 */

function useVote(contractAddress) {
  showDeprecationWarning(`useVote("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "vote")`);
  return useContract(contractAddress, "vote").contract;
}

/**
 * Hook for getting an instance of a `Split` contract. This contract supports fund distribution to multiple parties.
 * @param contractAddress - the address of the Split contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useSplit } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const split = useSplit("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the split contract in the rest of the component
 *
 *   // For example, this function will retrun all the receipients of the split
 *   async function getRecipients() {
 *     const recipients = await split.getAllRecipients()
 *     return recipients
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const split = await sdk.useSplit("0x1234...");
 * + const split = await sdk.useContract("0x1234...", "split").contract;
 * ```
 */

function useSplit(contractAddress) {
  showDeprecationWarning(`useSplit("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "split")`);
  return useContract(contractAddress, "split").contract;
}

/**
 * Hook for getting an instance of an `Multiwrap` contract. This contract is an ERC721 in which you can wrap ERC721, ERC1155 and ERC20 tokens.
 * @param contractAddress - the address of the Multiwrap contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useMultiwrap } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const multiwrap = useMultiwrap("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the multiwrap contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet wrap tokens
 *   async function wrap(tokensToWrap, wrappedNFTMetadata) {
 *     await multiwrap.wrap(tokensToWrap, wrappedNFTMetadata)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const multiwrap = await sdk.useMultiwrap("0x1234...");
 * + const multiwrap = await sdk.useContract("0x1234...", "multiwrap").contract;
 * ```
 */

function useMultiwrap(contractAddress) {
  showDeprecationWarning(`useMultiwrap("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "multiwrap")`);
  return useContract(contractAddress, "multiwrap").contract;
}

/**
 * Hook for getting an instance of an `SignatureDrop` contract. This contract is meant to interface with ERC721 compliant NFTs that can be lazily minted.
 * @param contractAddress - the address of the NFT Drop contract, found in your thirdweb dashboard
 *
 * @example
 * ```javascript
 * import { useSignatureDrop } from '@thirdweb-dev/react'
 *
 * export default function Component() {
 *   const signatureDrop = useSignatureDrop("<YOUR-CONTRACT-ADDRESS>")
 *
 *   // Now you can use the Signature drop contract in the rest of the component
 *
 *   // For example, this function will let the connected wallet claim a new NFT
 *   async function claim(quantity) {
 *     await signatureDrop.claim(quantity)
 *   }
 *
 *   ...
 * }
 * ```
 * @public
 * @deprecated
 * This hook is deprecated and will be removed in a future major version. You should use {@link useContract} instead.
 * ```diff
 * - const signatureDrop = await sdk.useSignatureDrop("0x1234...");
 * + const signatureDrop = await sdk.useContract("0x1234...", "signature-drop").contract;
 * ```
 */

function useSignatureDrop(contractAddress) {
  showDeprecationWarning(`useSignatureDrop("${contractAddress || "0x..."}")`, `useContract("${contractAddress || "0x..."}", "signature-drop")`);
  return useContract(contractAddress, "signature-drop").contract;
}

/**
 * A wallet address.
 * @beta
 */

/**
 * A contract address.
 * @beta
 */

/**
 * The parameters to pass to the mint and transfer functions.
 *
 * @beta
 */

/**
 * The parameters to pass to the burn function.
 *
 * @beta
 */
// NFTS //

/**
 * The possible NFT contract types.
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * ```
 * @beta
 */

/**
 * The possible Token contract types.
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * ```
 * @beta
 */

/**
 * Possible NFT contract types.
 * @beta
 */

/**
 * The params to pass to `useTransferNFT`.
 * @beta
 */

/**
 * The params to pass to `useTransferBatchNFT`.
 * @beta
 */

/**
 * The params to pass to `useMintNFTSupply`.
 * @beta
 */

/**
 * The params for the {@link useMintNFT} hook mutation.
 *
 * @beta
 */

/**
 * The return type of the {@link useMintNFT} hook.
 *
 * @beta
 */

/**
 * The params for the {@link useBurnNFT} hook mutation.
 *
 * @beta
 */
// DROPS //

/**
 * The possible DROP contract types.
 * @beta
 */

/**
 * The possible revealable contract types.
 * @beta
 */

/**
 * The params for the {@link useDelayedRevealLazyMint} hook mutation.
 *
 * @beta
 */

/**
 * The params for the {@link useRevealLazyMint} hook mutation.
 *
 * @beta
 */

/**
 * The params for the {@link useClaimNFT} hook mutation.
 *
 * @beta
 */

/**
 * The return type of the {@link useClaimNFT} hook.
 *
 * @beta
 */
// MARKETPLACE //
// TOKEN DROP //
// Helpers
function getErcs(contract) {
  return {
    erc1155: getErc1155(contract),
    erc721: getErc721(contract),
    erc20: getErc20(contract)
  };
}
function getErc1155(contract) {
  if (!contract) {
    return undefined;
  }

  try {
    if ("erc1155" in contract) {
      return contract.erc1155;
    }
  } catch (error) {
    return undefined;
  }

  return undefined;
}
function getErc721(contract) {
  if (!contract) {
    return undefined;
  }

  try {
    if ("erc721" in contract) {
      return contract.erc721;
    }
  } catch (error) {
    return undefined;
  }

  return undefined;
}
function getErc20(contract) {
  if (!contract) {
    return undefined;
  }

  try {
    if ("erc20" in contract) {
      return contract.erc20;
    }
  } catch (error) {
    return undefined;
  }

  return undefined;
}

/** **********************/

/**     READ  HOOKS     **/

/** **********************/

/**
 * Use this to get an individual NFT token of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nft, isLoading, error } = useNFT(contract, <tokenId>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param tokenId - the tokenId to look up
 * @returns a response object that includes the metadata for the given tokenId
 * @beta
 * @twfeature ERC721 | ERC1155
 */

function useNFT(contract, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.get(contractAddress, tokenId), async () => {
    invariant__default["default"](contract, "No Contract instance provided");

    if (erc1155) {
      invariant__default["default"](erc1155.get, "Contract instance does not support get");
      return await erc1155.get(ethers.BigNumber.from(tokenId || 0));
    }

    if (erc721) {
      invariant__default["default"](erc721.get, "Contract instance does not support get");
      return await erc721.get(ethers.BigNumber.from(tokenId || 0));
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && tokenId !== undefined
  });
}
/**
 * Use this to get a list of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs
 * @twfeature ERC721Supply | ERC1155Enumerable
 * @beta
 */

function useNFTs(contract, queryParams) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.all(contractAddress, queryParams), async () => {
    invariant__default["default"](contract, "No Contract instance provided");

    if (erc721) {
      invariant__default["default"](erc721.getAll, "Contract instance does not support getAll");
      return await erc721.getAll(queryParams);
    }

    if (erc1155) {
      invariant__default["default"](erc1155.getAll, "Contract instance does not support getAll");
      return await erc1155.getAll(queryParams);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}
/**
 * Use this to get the total count of NFT tokens of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: count, isLoading, error } = useTotalCount(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that includes the total count of NFTs
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */

function useTotalCount(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.totalCount(contractAddress), async () => {
    invariant__default["default"](contract, "No Contract instance provided");

    if (erc1155) {
      invariant__default["default"](erc1155.totalCount, "Contract instance does not support totalCount");
      return await erc1155.totalCount();
    }

    if (erc721) {
      invariant__default["default"](erc721.totalCount, "Contract instance does not support totalCount");
      return await erc721.totalCount();
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}
/**
 * Use this to get a the total (minted) supply of your {@link NFTContract}.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalCirculatingSupply, isLoading, error } = useTotalCirculatingSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a response object that incudes the total minted supply
 * @beta
 * @twfeature ERC721Supply | ERC1155Enumerable
 */

function useTotalCirculatingSupply(contract, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.totalCirculatingSupply(contractAddress), async () => {
    invariant__default["default"](contract, "No Contract instance provided");

    if (erc1155) {
      invariant__default["default"](erc1155.totalCirculatingSupply, "Contract instance does not support totalCirculatingSupply");
      invariant__default["default"](tokenId, "No tokenId provided");
      return await erc1155.totalCirculatingSupply(tokenId);
    }

    if (erc721) {
      invariant__default["default"](erc721.totalCirculatingSupply, "Contract instance does not support totalCirculatingSupply");
      return await erc721.totalCirculatingSupply();
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && tokenId !== undefined
  });
}
/**
 * Use this to get a the owned NFTs for a specific {@link Erc721OrErc1155} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to get owned tokens for
 * @returns a response object that includes the list of owned tokens
 * @beta
 * @twfeature ERC721Enumerable | ERC1155Enumerable
 */

function useOwnedNFTs(contract, ownerWalletAddress) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.query.owned.all(contractAddress, ownerWalletAddress), async () => {
    invariant__default["default"](contract, "No Contract instance provided");
    invariant__default["default"](ownerWalletAddress, "No wallet address provided");

    if (erc721) {
      return await erc721.getOwned(ownerWalletAddress);
    }

    if (erc1155) {
      return await erc1155.getOwned(ownerWalletAddress);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && !!ownerWalletAddress
  });
}
/**
 * Use this to get a the total balance of a {@link NFTContract} and wallet address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: ownerBalance, isLoading, error } = useNFTBalance(contract, <OwnerWalletAddress>);
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @param ownerWalletAddress - the wallet adress to check the balance of
 * @returns a response object that includes the total balance of the owner
 * @twfeature ERC721 | ERC1155
 * @beta
 */

function useNFTBalance(contract, ownerWalletAddress, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.balanceOf(contractAddress, ownerWalletAddress, tokenId), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    invariant__default["default"](ownerWalletAddress, "No owner wallet address provided");

    if (erc1155) {
      invariant__default["default"](tokenId, "No tokenId provided");
      invariant__default["default"](erc1155.balanceOf, "Contract instance does not support balanceOf");
      return erc1155.balanceOf(ownerWalletAddress, tokenId);
    }

    if (erc721) {
      invariant__default["default"](erc721.balanceOf, "Contract instance does not support balanceOf");
      return erc721.balanceOf(ownerWalletAddress);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    enabled: !!erc721 || !!erc1155 && !!ownerWalletAddress
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to mint a new NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNft,
 *     isLoading,
 *     error,
 *   } = useMintNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to mint nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNft({ name: "My awesome NFT!", to: "0x..." })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to mint a new NFT token to the connected wallet
 * @beta
 * @twfeature ERC721Mintable | ERC1155Mintable
 */

function useMintNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    invariant__default["default"](contract, "contract is undefined");

    if (erc1155) {
      invariant__default["default"]("supply" in data, "supply not provided");
      const {
        to,
        metadata,
        supply
      } = data;
      return await erc1155.mintTo(to, {
        metadata,
        supply: ethers.BigNumber.from(supply || 1)
      });
    }

    if (erc721) {
      return await erc721.mintTo(data.to, data.metadata);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to mint a new NFT on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintNftSupply,
 *     isLoading,
 *     error,
 *   } = useMintNFTSupply(contract);
 *
 *   if (error) {
 *     console.error("failed to mint additional supply", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintNftSupply({ tokenId: 0, additionalSupply: 100, to: "0x..."})}
 *     >
 *       Mint Additional Supply!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to mint a more supply of a token id to the provided wallet
 * @beta
 * @twfeature ERC1155Mintable
 */

function useMintNFTSupply(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    invariant__default["default"](contract, "contract is undefined");
    invariant__default["default"]("tokenId" in data, "tokenId not provided");
    invariant__default["default"]("additionalSupply" in data, "additionalSupply not provided");
    const {
      to,
      tokenId,
      additionalSupply
    } = data;
    return await contract.mintAdditionalSupplyTo(to, tokenId, additionalSupply);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to transfer tokens on your {@link NFTContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferNFT,
 *     isLoading,
 *     error,
 *   } = useTransferNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferNFT({ to: "0x...", tokenId: 2 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to transfer NFTs
 * @beta
 * @twfeature ERC721 | ERC1155
 */

function useTransferNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(data => {
    invariant__default["default"]("to" in data, "to not provided");

    if (erc1155) {
      invariant__default["default"](erc1155.transfer, "contract does not support transfer");
      invariant__default["default"]("tokenId" in data, "tokenId not provided");
      invariant__default["default"]("amount" in data, "amount not provided"); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      return erc1155.transfer(data.to, data.tokenId, data.amount);
    }

    if (erc721) {
      return erc721.transfer(data.to, data.tokenId);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to transfer tokens on your {@link Erc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const editionDrop = useEditionDrop(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(editionDrop);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: airdropNFT,
 *     isLoading,
 *     error,
 *   } = useAirdropNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch NFTs", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => airdropNFT({
 *          tokenId: 2,
 *          addresses: [{ address: "0x...", quantity: 2 }, { address: "0x...", quantity: 4 } }]
 *       )}
 *     >
 *       Airdrop NFT
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link Erc1155}
 * @returns a mutation object that can be used to transfer batch NFTs
 * @twfeature ERC1155
 * @beta
 */

function useAirdropNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(_ref => {
    let {
      tokenId,
      addresses
    } = _ref;
    invariant__default["default"](contract === null || contract === void 0 ? void 0 : contract.airdrop, "contract does not support airdrop");
    return contract.airdrop(tokenId, addresses);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to burn an NFT on your {@link Erc721OrErc1155}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const nftDrop = useNFTDrop(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(nftDrop);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnNft,
 *     isLoading,
 *     error,
 *   } = useBurnNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to burn nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnNft({ tokenId: 0 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link NFTContract}
 * @returns a mutation object that can be used to burn an NFT token from the connected wallet
 * @twfeature ERC721Burnable | ERC1155Burnable
 * @beta
 */

function useBurnNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.tokenId, "No tokenId provided");
    invariant__default["default"](contract, "contract is undefined");

    if (erc1155) {
      invariant__default["default"]("amount" in data, "amount not provided");
      const {
        tokenId,
        amount
      } = data; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      return await erc1155.burn(tokenId, amount);
    }

    if (erc721) {
      const {
        tokenId
      } = data;
      return await erc721.burn(tokenId);
    }

    invariant__default["default"](false, "Unknown NFT type");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/

/**       READ HOOKS    **/

/** **********************/

/**
 * Use this to get a list of *unclaimed* NFT tokens of your ERC721 Drop contract.
 *
 * @example
 * ```javascript
 * const { data: unclaimedNfts, isLoading, error } = useUnclaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a contract that extends the Erc721 spec (nft drop, custom contract that follows the Erc721 & drop spec)
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */

function useUnclaimedNFTs(contract, queryParams) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.getAllUnclaimed(contractAddress, queryParams), () => {
    invariant__default["default"](contract, "No Contract instance provided"); // TODO make this work for custom contracts (needs ABI change)

    invariant__default["default"](contract.getAllUnclaimed, "Contract instance does not support getAllUnclaimed");
    return contract.getAllUnclaimed(queryParams);
  }, {
    enabled: !!contract
  });
}
/**
 * Use this to get a list of *claimed* (minted) NFT tokens of your ERC721 Drop contract.
 *
 * @remarks Equivalent to using {@link useNFTs}.
 *
 * @example
 * ```javascript
 * const { data: claimedNFTs, isLoading, error } = useClaimedNFTs(<YourERC721DropContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @param queryParams - query params to pass to the query for the sake of pagination
 * @returns a response object that includes an array of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */

function useClaimedNFTs(contract, queryParams) {
  return useNFTs(contract, queryParams);
}
/**
 *
 * @param contract - an instance of a {@link NFTDrop}
 * @returns a response object that includes the number of NFTs that are unclaimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */

function useUnclaimedNFTSupply(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.totalUnclaimedSupply(contractAddress), () => {
    invariant__default["default"](contract, "No Contract instance provided"); // TODO make this work for custom contracts (needs ABI change)

    invariant__default["default"]("totalUnclaimedSupply" in contract && contract.totalUnclaimedSupply, "Contract instance does not support fetching unclaimed supply");
    return contract.totalUnclaimedSupply();
  }, {
    enabled: !!contract
  });
}
/**

 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a response object that includes the number of NFTs that are claimed
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 */

function useClaimedNFTSupply(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.totalClaimedSupply(contractAddress), () => {
    invariant__default["default"](contract, "No Contract instance provided"); // TODO make this work for custom contracts (needs ABI change)

    invariant__default["default"]("totalClaimedSupply" in contract && contract.totalClaimedSupply, "Contract instance does not support fetching unclaimed supply");
    return contract.totalClaimedSupply();
  }, {
    enabled: !!contract
  });
}
/**
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a response object that gets the batches to still be revealed
 * @twfeature ERC721Revealable | ERC1155Revealable
 */

function useBatchesToReveal(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.contract.nft.drop.revealer.getBatchesToReveal(contractAddress), () => {
    if (erc721) {
      return erc721.revealer.getBatchesToReveal();
    }

    if (erc1155) {
      return erc1155.revealer.getBatchesToReveal();
    }

    invariant__default["default"](false, "Contract instance does not support getBatchesToReveal");
  }, {
    enabled: !!erc721 || !!erc1155
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to claim a NFT on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimNft,
 *     isLoading,
 *     error,
 *   } = useClaimNFT(contract);
 *
 *   if (error) {
 *     console.error("failed to claim nft", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimNft({ to: "0x...", quantity: 1 })}
 *     >
 *       Claim NFT!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to claim a NFT to the wallet specificed in the params
 * @twfeature ERC721Claimable | ERC1155Claimable
 * @beta
 */

function useClaimNFT(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');
    invariant__default["default"](contract, "contract is undefined");

    if (erc1155) {
      invariant__default["default"](!!data.tokenId, "tokenId not provided");
      return await erc1155.claimTo(data.to, data.tokenId, data.quantity, data.options);
    }

    if (erc721) {
      return await erc721.claimTo(data.to, data.quantity, data.options);
    }

    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to lazy mint a batch of NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link NFTContract} with the drop extension
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721LazyMintable | ERC1155LazyMintable
 * @beta
 */

function useLazyMint(contract, onProgress) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc721,
    erc1155
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](contract, "contract is undefined");
    let options;

    if (onProgress) {
      options = {
        onProgress
      };
    }

    if (erc721) {
      return erc721.lazyMint(data.metadatas, options);
    }

    if (erc1155) {
      return erc1155.lazyMint(data.metadatas, options);
    }

    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to lazy mint a batch of delayed reveal NFTs on your {@link DropContract}
 *
 * @param contract - an instance of a {@link DropContract}
 * @param onProgress - an optional callback that will be called with the progress of the upload
 * @returns a mutation object that can be used to lazy mint a batch of NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */

function useDelayedRevealLazyMint(contract, onProgress) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](contract, "contract is undefined");
    let options;

    if (onProgress) {
      options = {
        onProgress
      };
    }

    const {
      erc721,
      erc1155
    } = getErcs(contract);

    if (erc721) {
      return await erc721.revealer.createDelayedRevealBatch(data.placeholder, data.metadatas, data.password, options);
    }

    if (erc1155) {
      return await erc1155.revealer.createDelayedRevealBatch(data.placeholder, data.metadatas, data.password, options);
    }

    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to reveal a batch of delayed reveal NFTs on your {@link RevealableContract}
 *
 * @param contract - an instance of a {@link RevealableContract}
 * @returns a mutation object that can be used to reveal a batch of delayed reveal NFTs
 * @twfeature ERC721Revealable | ERC1155Revealable
 * @beta
 */

function useRevealLazyMint(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    invariant__default["default"](contract, "contract is undefined");
    const {
      erc721,
      erc1155
    } = getErcs(contract);

    if (erc721) {
      return await erc721.revealer.reveal(data.batchId, data.password);
    }

    if (erc1155) {
      return await erc1155.revealer.reveal(data.batchId, data.password);
    }

    invariant__default["default"](false, "contract is not an Erc721 or Erc1155");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/

/**     READ  HOOKS     **/

/** **********************/

/**
 * Use this to get a specific listing from the marketplace.
 *
 * @example
 * ```javascript
 * const { data: listing, isLoading, error } = useListing(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes an array of listings
 * @beta
 */

function useListing(contract, listingId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getListing(contractAddress, listingId), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.getListing(ethers.BigNumber.from(listingId || 0));
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}
/**
 * Use this to get a list all listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>, { start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */

function useListings(contract, filter) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getAllListings(contractAddress, filter), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.getAllListings(filter);
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}
/**
 * Use this to get a count of all listings on your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useListings(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @returns a response object that includes an array of listings
 * @beta
 */

function useListingsCount(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getTotalCount(contractAddress), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.getTotalCount();
  }, {
    enabled: !!contract
  });
}
/**
 * Use this to get a list active listings from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: listings, isLoading, error } = useActiveListings(<YourMarketplaceContractInstance>, { seller: "0x...", tokenContract: "0x...", tokenId: 1, start: 0, count: 100 });
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param filter - filter to pass to the query for the sake of pagination & filtering
 * @returns a response object that includes an array of listings
 * @beta
 */

function useActiveListings(contract, filter) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getActiveListings(contractAddress, filter), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.getActiveListings(filter);
  }, {
    enabled: !!contract,
    keepPreviousData: true
  });
}
/**
 * Use this to get a the winning bid for an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: winningBid, isLoading, error } = useWinningBid(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the {@link Offer} that is winning the auction
 * @beta
 */

function useWinningBid(contract, listingId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.auction.getWinningBid(contractAddress, listingId), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.auction.getWinningBid(ethers.BigNumber.from(listingId || 0));
  }, {
    enabled: !!contract && listingId !== undefined
  });
}
/**
 * Use this to get the winner of an auction listing from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useAuctionWinner(<YourMarketplaceContractInstance>, <listingId>);
 * ```
 *
 * @param contract - an instance of a marketplace contract
 * @param listingId - the listing id to check
 * @returns a response object that includes the address of the winner of the auction or undefined if there is no winner yet
 * @beta
 */

function useAuctionWinner(contract, listingId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.auction.getWinner(contractAddress, listingId), async () => {
    invariant__default["default"](contract, "No Contract instance provided");
    let winner;

    try {
      winner = await contract.auction.getWinner(ethers.BigNumber.from(listingId || 0));
    } catch (err) {
      var _message;

      if (!(err !== null && err !== void 0 && (_message = err.message) !== null && _message !== void 0 && _message.includes("Could not find auction"))) {
        throw err;
      }
    }

    return winner;
  }, {
    enabled: !!contract && listingId !== undefined
  });
}
/**
 * Use this to get the buffer in basis points between offers from your marketplace contract.
 *
 * @example
 * ```javascript
 * const { data: auctionWinner, isLoading, error } = useBidBuffer(<YourMarketplaceContractInstance>);
 * ```
 *
 * @param contract - an instance of a marketplace contract

 * @returns a response object that includes an array of listings
 * @beta
 */

function useBidBuffer(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.marketplace.getBidBufferBps(contractAddress), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    return contract.getBidBufferBps();
  }, {
    enabled: !!contract
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to create a new Direct Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createDirectListing,
 *     isLoading,
 *     error,
 *   } = useCreateDirectListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create direct listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createDirectListing(directListingData)}
 *     >
 *       Create Direct Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new direct listing
 * @beta
 */

function useCreateDirectListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    var _contract$direct;

    invariant__default["default"](walletAddress, "no wallet connected, cannot create listing");
    invariant__default["default"](contract === null || contract === void 0 ? void 0 : (_contract$direct = contract.direct) === null || _contract$direct === void 0 ? void 0 : _contract$direct.createListing, "contract does not support direct.createListing");
    return await contract.direct.createListing(data);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to create a new Auction Listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: createAuctionListing,
 *     isLoading,
 *     error,
 *   } = useCreateAuctionListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to create auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => createAuctionListing(auctionListingData)}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */

function useCreateAuctionListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    var _contract$direct2;

    invariant__default["default"](walletAddress, "no wallet connected, cannot create listing");
    invariant__default["default"](contract === null || contract === void 0 ? void 0 : (_contract$direct2 = contract.direct) === null || _contract$direct2 === void 0 ? void 0 : _contract$direct2.createListing, "contract does not support auction.createListing");
    return await contract.auction.createListing(data);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to cancel a listing on your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: cancelListing,
 *     isLoading,
 *     error,
 *   } = useCancelListing(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to cancel auction listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => cancelListing()}
 *     >
 *       Create Auction Listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to create a new auction listing
 * @beta
 */

function useCancelListing(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async data => {
    if (data.type === sdk.ListingType.Auction) {
      return await (contract === null || contract === void 0 ? void 0 : contract.auction.cancelListing(data.id));
    } else {
      return await (contract === null || contract === void 0 ? void 0 : contract.direct.cancelListing(data.id));
    }
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to place a bid on an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: makeBid,
 *     isLoading,
 *     error,
 *   } = useMakeBid(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to make a bid", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => makeBid({ listingId: 1, bid: 2 })}
 *     >
 *       Bid!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to make a bid on an auction listing
 * @beta
 */

function useMakeBid(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    var _contract$auction;

    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");
    invariant__default["default"](contract === null || contract === void 0 ? void 0 : (_contract$auction = contract.auction) === null || _contract$auction === void 0 ? void 0 : _contract$auction.makeBid, "contract does not support auction.makeBid");
    return await contract.auction.makeBid(data.listingId, data.bid);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to buy out an auction listing from your marketplace contract.
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: buyNow,
 *     isLoading,
 *     error,
 *   } = useBuyNow(">>YourMarketplaceContractInstance<<");
 *
 *   if (error) {
 *     console.error("failed to buyout listing", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => buyNow({listingId: 1, type: ListingType.Auction})}
 *     >
 *       Buy listing!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a Marketplace contract
 * @returns a mutation object that can be used to buy out an auction listing
 * @beta
 */

function useBuyNow(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const walletAddress = useAddress();
  return reactQuery.useMutation(async data => {
    var _contract$auction2;

    invariant__default["default"](walletAddress, "no wallet connected, cannot make bid");

    if (data.type === sdk.ListingType.Direct) {
      invariant__default["default"](contract === null || contract === void 0 ? void 0 : contract.direct.buyoutListing, "contract does not support direct.buyoutListing");
      return await contract.direct.buyoutListing(data.id, data.buyAmount, data.buyForWallet);
    }

    invariant__default["default"](contract === null || contract === void 0 ? void 0 : (_contract$auction2 = contract.auction) === null || _contract$auction2 === void 0 ? void 0 : _contract$auction2.buyoutListing, "contract does not support auction.buyoutListing");
    return await contract.auction.buyoutListing(data.id);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/** **********************/

/**     READ  HOOKS     **/

/** **********************/

/**
 * Use this to get a the total supply of your {@link Erc20} contract.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: totalSupply, isLoading, error } = useTokenSupply(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that incudes the total minted supply
 * @twfeature ERC20
 * @beta
 */

function useTokenSupply(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.contract.token.totalSupply(contractAddress), () => {
    invariant__default["default"](contract, "No Contract instance provided");
    const erc20 = getErc20(contract);

    if (erc20) {
      return erc20.totalSupply();
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!contract || !!contractAddress
  });
}
/**
 * Use this to get the balance of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: balance, isLoading, error } = useTokenBalance(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the balance of the address
 * @twfeature ERC20
 * @beta
 */

function useTokenBalance(contract, walletAddress) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const erc20 = getErc20(contract);
  return useQueryWithNetwork(cacheKeys.contract.token.balanceOf(contractAddress, walletAddress), async () => {
    invariant__default["default"](contract, "No Contract instance provided");
    invariant__default["default"](walletAddress, "No address provided");

    if (erc20) {
      return await erc20.balanceOf(walletAddress);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!walletAddress && !!contract
  });
}
/**
 * Use this to get the decimals of your {@link Erc20} contract for a given address.
 *
 * @example
 * ```javascript
 * const { contract } = useContract(<ContractAddress>);
 * const { data: decimals, isLoading, error } = useTokenDecimals(contract);
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a response object that includes the decimals of the ERC20 token
 * @twfeature ERC20
 * @beta
 */

function useTokenDecimals(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const erc20 = getErc20(contract);
  return useQueryWithNetwork(cacheKeys.contract.token.decimals(contractAddress), async () => {
    invariant__default["default"](contract, "No Contract instance provided");

    if (erc20) {
      return (await erc20.get()).decimals;
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    enabled: !!contract
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to mint new tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: mintTokens,
 *     isLoading,
 *     error,
 *   } = useMintToken(contract);
 *
 *   if (error) {
 *     console.error("failed to mint tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => mintTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Mint!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to mint new tokens to the connected wallet
 * @twfeature ERC20Mintable
 * @beta
 */

function useMintToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      to,
      amount
    } = data;
    invariant__default["default"](contract, "contract is undefined");

    if (erc20) {
      return erc20.mintTo(to, amount);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to claim tokens on your {@link Erc20}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: claimTokens,
 *     isLoading,
 *     error,
 *   } = useClaimToken(contract);
 *
 *   if (error) {
 *     console.error("failed to claim tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => claimTokens({ to: "0x...", amount: 100 })}
 *     >
 *       Claim Tokens!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to tokens to the wallet specificed in the params
 * @twfeature ERC20ClaimableWithConditions
 * @beta
 */

function useClaimToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](data.to, 'No "to" address provided');

    if (erc20) {
      invariant__default["default"](erc20 === null || erc20 === void 0 ? void 0 : erc20.claimTo, "contract does not support claimTo");
      return await erc20.claimTo(data.to, data.amount, data.checkERC20Allowance);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to transfer tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferTokens({ to: "0x...", amount: 1000 })}
 *     >
 *       Transfer
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer tokens
 * @twfeature ERC20
 * @beta
 */

function useTransferToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      to,
      amount
    } = data;

    if (erc20) {
      invariant__default["default"](erc20 === null || erc20 === void 0 ? void 0 : erc20.transfer, "contract does not support transfer");
      return erc20.transfer(to, amount);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to transfer batch tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: transferBatchTokens,
 *     isLoading,
 *     error,
 *   } = useTransferToken(contract);
 *
 *   if (error) {
 *     console.error("failed to transfer batch tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => transferBatchTokens([{ to: "0x...", amount: 1000 }, { to: "0x...", amount: 2000 }])}
 *     >
 *       Transfer Batch
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to transfer batch tokens
 * @twfeature ERC20
 * @beta
 */

function useTransferBatchToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    if (erc20) {
      invariant__default["default"](erc20 === null || erc20 === void 0 ? void 0 : erc20.transferBatch, "contract does not support transferBatch");
      const convertedData = data.map(token => ({
        toAddress: token.to,
        amount: token.amount
      }));
      return erc20.transferBatch(convertedData);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to burn tokens on your {@link Erc20} contract
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: burnTokens,
 *     isLoading,
 *     error,
 *   } = useBurnToken(contract);
 *
 *   if (error) {
 *     console.error("failed to burn tokens", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => burnTokens({ amount: 1000 })}
 *     >
 *       Burn!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link TokenContract}
 * @returns a mutation object that can be used to burn tokens from the connected wallet
 * @twfeature ERC20Burnable
 * @beta
 */

function useBurnToken(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const erc20 = getErc20(contract);
  return reactQuery.useMutation(data => {
    const {
      amount
    } = data;
    invariant__default["default"](contract, "contract is undefined");

    if (erc20) {
      invariant__default["default"](erc20 === null || erc20 === void 0 ? void 0 : erc20.burn, "contract does not support burn");
      return erc20.burn(amount);
    }

    invariant__default["default"](false, "Smart contract is not a valid erc20 contract");
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * The options to be passed as the second parameter to the {@link useClaimIneligibilityReasons}` hook.
 *
 * @beta
 */

/** **********************/

/**     READ  HOOKS     **/

/** **********************/

/**
 * Use this to get the active claim conditon for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useActiveClaimCondition(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the currently active claim condition
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */
function useActiveClaimCondition(contract, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getActive(contractAddress, tokenId), () => {
    if (erc1155) {
      invariant__default["default"](tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.getActive(tokenId);
    }

    if (erc721) {
      return erc721.claimConditions.getActive();
    }

    if (erc20) {
      return erc20.claimConditions.getActive();
    }

    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}
/**
 * Use this to get all claim conditons for ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 *
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC20ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC721ContractInstance>);
 * ```
 * @example
 * ```javascript
 * const { data: claimConditions, isLoading, error } = useClaimConditions(<YourERC1155ContractInstance>, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the list of claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */

function useClaimConditions(contract, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getAll(contractAddress, tokenId), () => {
    if (erc1155) {
      invariant__default["default"](tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.getAll(tokenId);
    }

    if (erc721) {
      return erc721.claimConditions.getAll();
    }

    if (erc20) {
      return erc20.claimConditions.getAll();
    }

    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    enabled: erc1155 ? tokenId !== undefined : !!erc721 || !!erc20
  });
}
/**
 * Use this to check for reasons that prevent claiming for either  ERC20, ERC721 or ERC1155 based contracts. They need to extend the `claimCondition` extension for this hook to work.
 * @example
 * ```javascript
 * const { data: activeClaimCondition, isLoading, error } = useClaimIneligibilityReasons(<YourERC20ContractInstance>, { walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC721ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> });
 * ```
 * @example
 * ```javascript
 * const { data: claimIneligibilityReasons, isLoading, error } = useClaimIneligibilityReasons(<YourERC1155ContractInstance>, { quantity: <quantity>, walletAddress: <walletAddress> }, <tokenId>);
 * ```
 *
 * @param contract - an instance of a contract that extends the  ERC20, ERC721 or ERC1155 spec and implements the `claimConditions` extension.
 * @param eligibilityParams - the parameters for the eligibility check, see: {@link ClaimIneligibilityParams}
 * @param tokenId - the id of the token to fetch the claim conditions for (if the contract is an ERC1155 contract)
 * @returns a response object with the resons for the claim ineligibility
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */

function useClaimIneligibilityReasons(contract, params, tokenId) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return useQueryWithNetwork(cacheKeys.extensions.claimConditions.getClaimIneligibilityReasons(contractAddress, params, tokenId), () => {
    if (erc1155) {
      invariant__default["default"](tokenId, "tokenId is required for ERC1155 claim ineligibility reasons");
      return erc1155.claimConditions.getClaimIneligibilityReasons(tokenId, params.quantity, params.walletAddress);
    }

    if (erc721) {
      return erc721.claimConditions.getClaimIneligibilityReasons(params.quantity, params.walletAddress);
    }

    if (erc20) {
      return erc20.claimConditions.getClaimIneligibilityReasons(params.quantity, params.walletAddress);
    }

    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    // Checks that happen here:
    // 1. if the contract is based on ERC1155 contract => tokenId cannot be `undefined`
    // 2. if the contract is NOT based on ERC1155 => we have to have either an ERC721 or ERC20 contract
    // 3. has a params object been passed?
    // 4. does params have an address in it?
    enabled: (erc1155 ? tokenId !== undefined : !!erc721 || !!erc20) && !!params && !!params.walletAddress
  });
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to set claim conditions on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: setClaimConditions,
 *     isLoading,
 *     error,
 *   } = useSetClaimConditions(contract);
 *
 *   if (error) {
 *     console.error("failed to set claim conditions", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => setClaimConditions({ phases: [{ price: 2, maxQuantity: 100 }] })}
 *     >
 *       Set Claim Conditions!
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to set claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */

function useSetClaimConditions(contract, tokenId) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return reactQuery.useMutation(async data => {
    invariant__default["default"](contract, "No Contract instance provided");
    const {
      phases,
      reset = false
    } = data;
    invariant__default["default"](phases, 'No "phases" provided');

    if (erc1155) {
      invariant__default["default"](tokenId, "tokenId is required for ERC1155 claim conditions");
      return erc1155.claimConditions.set(tokenId, phases, reset);
    }

    if (erc721) {
      return erc721.claimConditions.set(phases, reset);
    }

    if (erc20) {
      return erc20.claimConditions.set(phases, reset);
    }

    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    onSettled: () => {
      invalidateContractAndBalances(queryClient, contractAddress, activeChainId);
    }
  });
}
/**
 * Use this to reset claim conditions on your {@link DropContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const { contract } = useContract(<ContractAddress>);
 *   const {
 *     mutate: resetClaimConditions,
 *     isLoading,
 *     error,
 *   } = useResetClaimConditions(contract);
 *
 *   if (error) {
 *     console.error("failed to reset claim conditions", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={resetClaimConditions}
 *     >
 *       Reset Claim Conditions
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link DropContract}
 * @returns a mutation object that can be used to reset claim conditions
 * @twfeature ERC721ClaimableWithConditions | ERC1155ClaimableWithConditions | ERC20ClaimableWithConditions
 * @beta
 */

function useResetClaimConditions(contract, tokenId) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  const {
    erc1155,
    erc721,
    erc20
  } = getErcs(contract);
  return reactQuery.useMutation(async () => {
    const cleanConditions = conditions => {
      return conditions.map(c => ({ ...c,
        price: c.currencyMetadata.displayValue,
        maxQuantity: c.maxQuantity.toString(),
        quantityLimitPerTransaction: c.quantityLimitPerTransaction.toString()
      }));
    };

    if (erc1155) {
      invariant__default["default"](tokenId, "tokenId is required for ERC1155 claim conditions");
      const claimConditions = await erc1155.claimConditions.getAll(tokenId);
      return erc1155.claimConditions.set(tokenId, cleanConditions(claimConditions || []), true);
    }

    if (erc721) {
      const claimConditions = await erc721.claimConditions.getAll();
      return await erc721.claimConditions.set(cleanConditions(claimConditions || []), true);
    }

    if (erc20) {
      const claimConditions = await erc20.claimConditions.getAll();
      return await erc20.claimConditions.set(cleanConditions(claimConditions || []), true);
    }

    throw new Error("Contract must be ERC721, ERC1155 or ERC20");
  }, {
    onSettled: () => {
      invalidateContractAndBalances(queryClient, contractAddress, activeChainId);
    }
  });
}

/**
 *
 * @example
 * ```jsx
 * const { data: recipient, isLoading, error } = usePrimarySalesRecipient(SmartContract);
 * ```
 *
 * Use this to get the primary sales recipient of your {@link SmartContract}
 * @param contract - an instance of a {@link SmartContract}
 * @returns the wallet address of the primary sales recipient
 * @twfeature PrimarySale
 * @beta
 */

function usePrimarySaleRecipient(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.sales.getRecipient(contractAddress), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("sales" in contract && contract.sales, "Contract does not support primarySale");
    return contract.sales.getRecipient();
  }, {
    enabled: !!contract || !!contractAddress
  });
}
/**
 * Use this to update the primary sales recipient of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updatePrimarySalesRecipient,
 *     isLoading,
 *     error,
 *   } = useUpdatePrimarySaleRecipient(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update recipient", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updatePrimarySalesRecipient({ newRecipient: "0x123" })}
 *     >
 *       Update Recipient
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the primary sales recipient
 * @twfeature PrimarySale
 * @beta
 */

function useUpdatePrimarySaleRecipient(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(newRecipient => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("sales" in contract && contract.sales, "Contract does not support primarySale");
    return contract.sales.setRecipient(newRecipient);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
} // end prinary sales
// royalties

/**
 * Use this to get the royalty settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: settings, isLoading, error } = useRoyaltySettings(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns an object containing recipient address and the royalty basis points
 * @twfeature Royalty
 * @beta
 */

function useRoyaltySettings(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.royalties.getDefaultRoyaltyInfo(contractAddress), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("royalties" in contract && contract.royalties, "Contract does not support royalties");
    return contract.royalties.getDefaultRoyaltyInfo();
  }, {
    enabled: !!contract || !!contractAddress
  });
}
/**
 * Use this to update the royalty settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updateRoyaltySettings,
 *     isLoading,
 *     error,
 *   } = useUpdateRoyaltySettings(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update royalty settings", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updateRoyaltySettings({ updatePayload: { fee_recipient: "0x123", seller_fee_basis_points: 5_00 } })}
 *     >
 *       Update Royalty Settings
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the royalty settings
 * @twfeature Royalty
 * @beta
 */

function useUpdateRoyaltySettings(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("royalties" in contract && contract.royalties, "Contract does not support royalties");
    return contract.royalties.setDefaultRoyaltyInfo(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
} // end royalties
// platformFees

/**
 * Use this to get the platform fees settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: platformFees, isLoading, error } = usePlatformFees(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns an object containing the platform fee basis points and the fee recipient address
 * @twfeature PlatformFee
 * @beta
 */

function usePlatformFees(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.platformFees.get(contractAddress), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("platformFees" in contract && contract.platformFees, "Contract does not support platformFees");
    return contract.platformFees.get();
  }, {
    enabled: !!contract || !!contractAddress
  });
}
/**
 * Use this to update the platform fees settings of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updatePlatformFees,
 *     isLoading,
 *     error,
 *   } = useUpdatePlatformFees(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update platform fees", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updatePlatformFees({ updatePayload: { fee_recipient: "0x123", platform_fee_basis_points: 5_00 } })}
 *     >
 *       Update Platform fees
 *     </button>
 *   );
 * };
 * ```
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the platform fees settings
 * @twfeature PlatformFee
 * @beta
 */

function useUpdatePlatformFees(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("platformFees" in contract && contract.platformFees, "Contract does not support platformFees");
    return contract.platformFees.set(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
} // end platformFees
// metadata

/**
 * Use this to get the metadata of your {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: metadata, isLoading, error } = useMetadata(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a {@link CustomContractMetadata} object containing the metadata
 * @twfeature ContractMetadata
 * @beta
 */

function useMetadata(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.metadata.get(contractAddress), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("metadata" in contract && contract.metadata, "Contract does not support metadata");
    return contract.metadata.get();
  }, {
    enabled: !!contract || !!contractAddress
  });
}
/**
 * Use this to update the metadata of your {@link SmartContract}
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: updateMetadata,
 *     isLoading,
 *     error,
 *   } = useUpdateMetadata(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to update metadata", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => updateMetadata({ updatePayload: { name: "My Contract", description: "This is my contract" } })}
 *     >
 *       Update Metadata
 *     </button>
 *   );
 * };
 * ```
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to update the metadata
 * @twfeature ContractMetadata
 * @beta
 */

function useUpdateMetadata(contract) {
  const queryClient = reactQuery.useQueryClient();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const activeChainId = useSDKChainId();
  return reactQuery.useMutation(updatePayload => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"]("metadata" in contract && contract.metadata, "Contract does not support metadata");
    return contract.metadata.update(updatePayload);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
} // end metadata

/** **********************/

/**         UTILS       **/

/** **********************/

/**
 * @internal
 */

/** **********************/

/**     READ  HOOKS     **/

/** **********************/

/**
 * Use this to get the roles of a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: roles, isLoading, error } = useAllRoleMembers(SmartContract);
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a list of addresses for all supported roles on the contract.
 * @twfeature PermissionsEnumerable
 * @beta
 */
function useAllRoleMembers(contract) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.roles.getAll(contractAddress), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles"); // have to cast to any because of role bs, type is defined in the useQueryWithNetwork definition above

    return contract.roles.getAll();
  }, {
    enabled: !!contract && !!contractAddress
  });
}
/**
 * Use this to get the members of a role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: members, isLoading, error } = useRoleMembers(SmartContract, "admin");
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @param role - the role to get the members of, see {@link Role}
 * @returns a list of addresses that are members of the role
 * @twfeature PermissionsEnumerable
 * @beta
 */

function useRoleMembers(contract, role) {
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  return useQueryWithNetwork(cacheKeys.extensions.roles.get(contractAddress, role), () => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    return contract.roles.get(role);
  }, {
    enabled: !!contract && !!contractAddress && !!role
  });
}
/**
 * Use this to check if a {@link WalletAddress} is a member of a role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const { data: isMember, isLoading, error } = useIsAddressRole(SmartContract, "admin", "0x123");
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @param role - the role to check the member against, see {@link Role}
 * @param walletAddress - the address to check
 * @returns true if the address is a member of the role, or false if not
 * @twfeature Permissions
 * @beta
 */

function useIsAddressRole(contract, role, walletAddress) {
  // TODO this might be possible to do with `verify` fn instead?
  const contractHasRoles = !!(contract && contract.roles);
  const {
    data
  } = useRoleMembers(contractHasRoles ? contract : undefined, role); // if the contract does not have roles then everything is allowed === true

  if (contractHasRoles === false) {
    return true;
  } // switch logic (if address 0 is in the role list then anyone has permissions to it)


  if (data !== null && data !== void 0 && data.includes(ethers.constants.AddressZero)) {
    return true;
  } // actual role check logic


  return !!(walletAddress && data !== null && data !== void 0 && data.includes(walletAddress));
}
/** **********************/

/**     WRITE HOOKS     **/

/** **********************/

/**
 * Use this to OVERWRITE the list of addresses that are members of specific roles
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: overwriteRoles,
 *     isLoading,
 *     error,
 *   } = useSetAllRoleMembers(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to overwrite roles", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => overwriteRoles({  rolesWithAddresses: { minter: [] } })}
 *     >
 *       Overwrite Roles
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to overwrite all roles on the contract
 * @twfeature PermissionsEnumerable
 * @beta
 */

function useSetAllRoleMembers(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async rolesWithAddresses => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.setAll(rolesWithAddresses);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
} // const { mutate } = useSetAllRoleMembers(undefined as unknown as NFTCollection);

/**
 * Use this to grant a {@link WalletAddress} a specific role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: grantRole,
 *     isLoading,
 *     error,
 *   } = useGrantRole(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to grant role", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => grantRole({  role: "admin", address: "0x123" })}
 *     >
 *       Grant Role
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to grant a member of a role on the contract
 * @twfeature Permissions
 * @beta
 */

function useGrantRole(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async params => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.grant(params.role, params.address);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}
/**
 * Use this to revoke a {@link WalletAddress} a specific role on a {@link SmartContract}
 *
 * @example
 * ```jsx
 * const Component = () => {
 *   const {
 *     mutate: revokeRole,
 *     isLoading,
 *     error,
 *   } = useRevokeRole(SmartContract);
 *
 *   if (error) {
 *     console.error("failed to revoke role", error);
 *   }
 *
 *   return (
 *     <button
 *       disabled={isLoading}
 *       onClick={() => revokeRole({  role: "admin", address: "0x123" })}
 *     >
 *       Revoke Role
 *     </button>
 *   );
 * };
 * ```
 *
 * @param contract - an instance of a {@link SmartContract}
 * @returns a mutation object that can be used to revoke a role from a member on the contract
 * @twfeature Permissions
 * @beta
 */

function useRevokeRole(contract) {
  const activeChainId = useSDKChainId();
  const contractAddress = contract === null || contract === void 0 ? void 0 : contract.getAddress();
  const queryClient = reactQuery.useQueryClient();
  return reactQuery.useMutation(async params => {
    invariant__default["default"](contract, "No contract provided");
    invariant__default["default"](contract.roles, "Contract does not support roles");
    await contract.roles.revoke(params.role, params.address);
  }, {
    onSettled: () => invalidateContractAndBalances(queryClient, contractAddress, activeChainId)
  });
}

/**
 * Hook to securely login to a backend with the connected wallet. The backend
 * authentication URL must be configured on the ThirdwebProvider.
 *
 * @param config - Configuration for the login.
 * @returns - A function to invoke to login with the connected wallet.
 *
 * @beta
 */
function useLogin(config) {
  const sdk = useSDK();
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useThirdwebAuthConfig();
  React__default["default"].useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error && config !== null && config !== void 0 && config.onError) {
      // If there is an error, parse it and trigger the onError callback
      config.onError(decodeURI(error));
    }
  }, [config]);

  async function login(cfg) {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    const payload = await (sdk === null || sdk === void 0 ? void 0 : sdk.auth.login(authConfig.domain, cfg));
    const encodedPayload = encodeURIComponent(btoa(JSON.stringify(payload)));
    const encodedRedirectTo = encodeURIComponent((config === null || config === void 0 ? void 0 : config.redirectTo) || authConfig.loginRedirect || window.location.toString());
    queryClient.invalidateQueries(cacheKeys.auth.user()); // Redirect to the login URL with the encoded payload

    window.location.href = `${authConfig.authUrl}/login?payload=${encodedPayload}&redirect=${encodedRedirectTo}`;
  }

  return login;
}

/**
 * Hook to logout the connected wallet from the backend.
 * The backend logout URL must be configured on the ThirdwebProvider.
 *
 * @returns - A function to invoke to logout.
 *
 * @beta
 */

function useLogout() {
  const queryClient = reactQuery.useQueryClient();
  const authConfig = useThirdwebAuthConfig();

  function logout() {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    queryClient.invalidateQueries(cacheKeys.auth.user());
    window.location.href = `${authConfig.authUrl}/logout`;
  }

  return logout;
}

/**
 * Hook to get the currently logged in user.
 *
 * @returns - The currently logged in user or null if not logged in, as well as a loading state.
 *
 * @beta
 */
function useUser() {
  const authConfig = useThirdwebAuthConfig();
  const {
    data: user,
    isLoading
  } = reactQuery.useQuery(cacheKeys.auth.user(), async () => {
    invariant__default["default"](authConfig, "Please specify an authConfig in the ThirdwebProvider");
    const res = await fetch(`${authConfig.authUrl}/user`);
    return await res.json();
  }, {
    enabled: !!authConfig
  });
  return {
    user,
    isLoading
  };
}

/**
 *
 * @returns
 * @internal
 */

function useAuth(loginConfig) {
  const user = useUser();
  const login = useLogin(loginConfig);
  const logout = useLogout();
  return { ...user,
    login,
    logout
  };
}

/**
 * Hook used to upload any files or JSON data to decentralized storage systems like IPFS,
 * using the `storageInterface` configured on the `ThirdwebProvider`
 *
 * @param options - Configure the options for your upload
 * @returns Function used to upload files or JSON to decentralized storage systems
 *
 * @example
 * ```jsx
 * import { useStorageUpload } from "@thirdweb-dev/react";
 *
 * export default function Component() {
 *   const { mutateAsync: upload, isLoading } = useStorageUpload();
 *
 *   async function uploadData() {
 *     const filesToUpload = [...];
 *     const uris = await upload({ data: files });
 *     console.log(uris);
 *   }
 *
 *   return (
 *     <button onClick={uploadData}>
 *       Upload
 *     </button>
 *   )
 * }
 * ```
 */
function useStorageUpload(uploadOptions) {
  const sdk = useSDK();
  return reactQuery.useMutation(async _ref => {
    let {
      data,
      options
    } = _ref;
    invariant__default["default"](sdk, "sdk must be defined");
    return await sdk.storage.uploadBatch(data, options || uploadOptions);
  });
}

/**
 * Get the configured `ThirdwebStorage` instance
 * @returns The `storageInterface` configured on the `ThirdwebProvider`
 */

function useStorage() {
  const sdk = useSDK();
  return sdk === null || sdk === void 0 ? void 0 : sdk.storage;
}

/**
 *
 * @internal
 */
function useSigner() {
  return useThirdwebConnectedWalletContext().signer;
}

/**
 * @internal
 */

function useReadonlySDK(readonlyRpcUrl, sdkOptions, storageInterface) {
  return React.useMemo(() => {
    return new sdk.ThirdwebSDK(readonlyRpcUrl, { ...sdkOptions,
      readonlySettings: { ...(sdkOptions === null || sdkOptions === void 0 ? void 0 : sdkOptions.readonlySettings),
        rpcUrl: readonlyRpcUrl
      }
    }, storageInterface); // storageInterface should be constant!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readonlyRpcUrl, sdkOptions]);
}

/**
 * Hook for checking whether the connected wallet is on the correct network specified by the `desiredChainId` passed to the `<ThirdwebProvider />`.
 *
 * ```javascript
 * import { useNetworkMistmatch } from "@thirdweb-dev/react"
 * ```
 *
 * @returns `true` if the chainId of the connected wallet is different from the desired chainId passed into <ThirdwebProvider />
 *
 * @example
 * You can check if a users wallet is connected to the correct chain ID as follows:
 * ```javascript
 * import { useNetworkMismatch } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const isMismatched = useNetworkMismatch()
 *
 *   return <div>{isMismatched}</div>
 * }
 * ```
 *
 * From here, you can prompt users to switch their network using the `useNetwork` hook.
 *
 * @public
 */

function useNetworkMismatch() {
  const desiredChainId = useDesiredChainId();
  const walletChainId = useChainId();

  if (desiredChainId === -1) {
    // means no desiredChainId is set in the <ThirdwebProvider />, so we don't care about the network mismatch
    return false;
  }

  if (!walletChainId) {
    // means no wallet is connected yet, so we don't care about the network mismatch
    return false;
  } // check if the chainIds are different


  return desiredChainId !== walletChainId;
}

/**
 * @internal
 */

function useAccount() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useNetwork() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own network logic.`);
  return wagmi.useAccount();
}

/**
 * Hook for getting metadata about the network the current wallet is connected to and switching networks
 *
 * @example
 * ```javascript
 * import { useNetwork, ChainId } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *   const [, switchNetwork] = useNetwork();
 *
 *   return (
 *     <button onClick={() => switchNetwork(ChainId.Polygon)}>
 *        Switch Network
 *     </button>
 *   );
 * };
```
 *
 * It's important to note that some wallet apps do not support programmatic network switching and switchNetwork will be undefined.
 * For those situations, you can typically switch networks in the wallet app this hook will still work.
 *
 * @public
 */

function useNetwork() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useNetwork() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own network logic.`);
  return wagmi.useNetwork();
}

/**
 * for now just re-exported
 * @internal
 */

function useConnect() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useConnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own connection logic.`);
  return wagmi.useConnect();
}

/**
 * Hook for disconnecting the currently connected wallet
 *
 * ```javascript
 * import { useDisconnect } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * The following will enable users to disconnect their wallet from the page.
 * ```javascript
 * import { useDisconnect } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const disconnect = useDisconnect()
 *
 *   return (
 *     <button onClick={disconnect}>
 *       Disconnect
 *     </button>
 *   )
 * }
 * ```
 *
 * Once users disconnect their wallet, the `useAddress`, `useChainId`, `useAccount`, and `useNetwork` hooks will no longer return values until a user connects their wallet again.
 *
 * @public
 */

function useDisconnect(options) {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useDisconnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own connection logic.`);
  const optsWithDefaults = { ...{
      reconnectAfterGnosis: true
    },
    ...options
  };
  const [, connect] = useConnect();
  const [data, disconnect] = wagmi.useAccount();
  return async () => {
    var _data$data;

    const previousConnector = ((_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.connector) instanceof GnosisSafeConnector && data.data.connector.previousConnector || undefined; // if it's gnosis, just connect the previous connector

    if (optsWithDefaults.reconnectAfterGnosis && previousConnector) {
      try {
        return await connect(previousConnector);
      } catch (err) {
        console.error("failed to re-connect to previous connector", err); // if it fails for whatever reason just disconnect

        return disconnect();
      }
    }

    return disconnect();
  };
}

function detectEnv(userAgent) {
  return detectBrowser.detect(userAgent);
}
/**
 * @internal
 */


function isAndroid() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("android") : false;
}
/**
 * @internal
 */

function isIOS() {
  const os = detectOS();
  return os ? os.toLowerCase().includes("ios") || os.toLowerCase().includes("mac") && navigator.maxTouchPoints > 1 : false;
}
/**
 * @internal
 */

function detectOS() {
  const env = detectEnv();
  return env !== null && env !== void 0 && env.os ? env.os : undefined;
}
/**
 * @internal
 */


function isMobile() {
  const os = detectOS();
  return os ? isAndroid() || isIOS() : false;
}

/**
 * Hook for connecting to a Metamask wallet.
 *
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allow users to connect their metamask wallets as follows:
 * ```javascript
 * import { useMetamask } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithMetamask = useMetamask()
 *
 *   return (
 *     <button onClick={connectWithMetamask}>
 *       Connect Metamask
 *     </button>
 *   )
 * }
 * ```
 * Here, we use the `useMetamask` hook to handle metamask connection.
 * When a user clicks the button, we'll call the `connectWithMetamask` function, which will prompt users to connect their metamask wallet.
 *
 * @public
 */

function useMetamask() {
  var _window$ethereum;

  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useMetamask() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();
  const isMetaMaskInjected = typeof window !== "undefined" && ((_window$ethereum = window.ethereum) === null || _window$ethereum === void 0 ? void 0 : _window$ethereum.isMetaMask);
  const shouldUseWalletConnect = isMobile() && !isMetaMaskInjected; // injected connector

  const injectedConnector = connectors.data.connectors.find(c => c.id === "injected"); // walletConnect connector

  const walletConnectConnector = connectors.data.connectors.find(c => c.id === "walletConnect");
  const connector = (shouldUseWalletConnect ? walletConnectConnector : injectedConnector) || injectedConnector;
  invariant__default["default"](connector, "No connector found, please make sure you provide the InjectedConnector to your <ThirdwebProvider />");
  return async () => {
    // if we don't have an injected provider
    if (!isMetaMaskInjected) {
      // this is the fallback uri that should work no matter what
      const uri = `https://metamask.app.link/dapp/${window.location.toString()}`; // open whatever uri we end up with in a new tab

      window.open(uri, "_blank");
      return Promise.resolve({
        error: new Error("metamask not injected")
      });
    } // otherwise we have MM avaiable, so we can just use it


    return await connect(connector);
  };
}

if (!globalThis.Buffer) {
  globalThis.Buffer = require("buffer/").Buffer;
}
/**
 * Hook for connecting to a mobile wallet with Wallet Connect
 *
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allows user to connect their mobile wallets as follows:
 * ```javascript
 * import { useWalletConnect } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithWalletConnect = useWalletConnect()
 *
 *   return (
 *     <button onClick={connectWithWalletConnect}>
 *       Connect WalletConnect
 *     </button>
 *   )
 * }
 * ```
 *
 * When users click this button, a popup will appear on the screen prompting them to scan a QR code from their phone to connect their mobile wallets.
 * Once they scan the QR code from a wallet connect supported mobile wallet, their wallet will then be connected to the page as expected.
 *
 * @public
 */


function useWalletConnect() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useWalletConnect() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();

  if (connectors.loading) {
    return () => Promise.reject("WalletConnect connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find(c => c.id === "walletConnect");
  invariant__default["default"](connector, "WalletConnect connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return () => connect(connector);
}

if (!globalThis.Buffer) {
  globalThis.Buffer = require("buffer/").Buffer;
}
/**
 * Hook for connecting to a Coinbase wallet.
 *
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * We can allow users to connect with Coinbase Wallet as follows:
 * ```javascript
 * import { useCoinbaseWallet } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithCoinbaseWallet = useCoinbaseWallet()
 *
 *   return (
 *     <button onClick={connectWithCoinbaseWallet}>
 *       Connect Coinbase Wallet
 *     </button>
 *   )
 * }
 * ```
 *
 * Upon clicking this button, users will be prompted with a popup asking them scan a QR code with their Coinbase Wallet.
 * Once they scan the QR code, their wallet will then be connected to the page as expected.
 *
 * @public
 */


function useCoinbaseWallet() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useCoinbaseWallet() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();

  if (connectors.loading) {
    return () => Promise.reject("Coinbase connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find(c => c.id === "coinbasewallet");
  invariant__default["default"](connector, "Coinbase connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return () => connect(connector);
}
/**
 * Convienience hook for connecting to a wallet via WalletLink (coinbase wallet)
 * @returns a function that will prompt the user to connect their wallet via WalletLink (coinbase wallet)
 * @internal
 */

function useWalletLink() {
  return useCoinbaseWallet();
}

/**
 * Hook for connecting to a Gnosis Safe. This enables multisig wallets to connect to your application and sing transactions.
 *
 * ```javascript
 * import { useGnosis } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * ```javascript
 * import { useGnosis } from "@thirdweb-dev/react"
 *
 * const App = () => {
 *   const connectWithGnosis = useGnosis()
 *
 *   return (
 *     <button onClick={() => connectWithGnosis({ safeAddress: "0x...", safeChainId: 1 })}>
 *       Connect Gnosis Safe
 *     </button>
 *   )
 * }
 * ```
 *
 * @public
 */

function useGnosis() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useGnosis() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();

  if (connectors.loading) {
    return () => Promise.reject("Gnosis connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find(c => c.id === "gnosis");
  invariant__default["default"](connector, "Gnosis connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return async config => {
    const previousConnector = connectors.data.connector;
    const previousConnectorChain = await (previousConnector === null || previousConnector === void 0 ? void 0 : previousConnector.getChainId());
    invariant__default["default"](!!previousConnector, "Cannot connect to Gnosis Safe without first being connected to a personal wallet.");
    invariant__default["default"](previousConnectorChain === config.safeChainId, "Gnosis safe chain id must match personal wallet chain id.");
    invariant__default["default"](ethers.utils.isAddress(config.safeAddress), "Gnosis safe address must be a valid address.");
    connector.setConfiguration(previousConnector, config);
    return connect(connector);
  };
}

/**
 * Hook for connecting to an email wallet using magic link.
 * This enables users without their own wallets to connect to your application and sign transactions securely using their email.
 *
 * ```javascript
 * import { useMagic } from "@thirdweb-dev/react"
 * ```
 *
 *
 * @example
 * Before using this hook, you first need to set up the magic configuration in your `ThirdwebProvider`, including your magic API key.
 *
 * ```javascript
 * // Add the magic configuration object to your wallet connectors
 * const connectors = [
 *   "metamask",
 *   "walletConnect",
 *   "walletLink",
 *   {
 *     name: "magic",
 *     options: {
 *       apiKey: "your-magic-api-key",
 *     }
 *   }
 * ]
 *
 * // Add the above to the walletConnectors prop of your <ThirdwebProvider />
 * const Provider = ({ children }) => (
 *   return (
 *     <ThirdwebProvider
 *       walletConnectors={connectors}
 *       // Specify remaining parameters
 *       ...
 *     >
 *       {children}
 *     </ThirdwebProvider>
 *   )
 * }
 * ```
 *
 * In order to use the hook to connect users with magic link, you just need to provide the users email to the connect function.
 *
 * You can setup the hook with the following configuration:
 * ```javascript
 * import { useMagic } from "@thirdweb-dev/react"
 * import { useState } from "react"
 *
 * const LoginWithMagicLink = () => {
 *   const connectWithMagic = useMagic()
 *   const [email, setEmail] = useState()
 *
 *   return (
 *     <div>
 *       <input value={email} onChange={(e) => setEmail(e.target.value)} />
 *       <button onClick={() => connectWithMagic({ email })}>Login</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @public
 */

function useMagic() {
  const wagmiContext = wagmi.useContext();
  invariant__default["default"](wagmiContext, `useMagic() can only be used inside <ThirdwebProvider />. If you are using <ThirdwebSDKProvider /> you will have to use your own wallet-connection logic.`);
  const [connectors, connect] = useConnect();

  if (connectors.loading) {
    return () => Promise.reject("Magic connector not ready to be used, yet");
  }

  const connector = connectors.data.connectors.find(c => c.id === "magic");
  invariant__default["default"](connector, "Magic connector not found, please make sure it is provided to your <ThirdwebProvider />");
  return configuration => {
    connector.setConfiguration(configuration);
    return connect(connector);
  };
}

const DEFAULT_IPFS_GATEWAY = "https://gateway.ipfscdn.io/ipfs/";
const DEFAULT_IPFS_RESOLVER_OPTIONS = {
  gatewayUrl: DEFAULT_IPFS_GATEWAY
};

function resolveIpfsUri(uri) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_IPFS_RESOLVER_OPTIONS;

  if (!uri) {
    return undefined;
  }

  if (uri.startsWith("ipfs://")) {
    return uri.replace("ipfs://", options.gatewayUrl);
  }

  return uri;
}
async function resolveMimeType(url) {
  if (!url) {
    return undefined;
  }

  const mimeType = mime__default["default"].getType(url);

  if (mimeType) {
    return mimeType;
  }

  const res = await fetch(url, {
    method: "HEAD"
  });

  if (res.ok && res.headers.has("content-type")) {
    return res.headers.get("content-type") || undefined;
  } // we failed to resolve the mime type, return null


  return undefined;
}

let video;

function supportsVideoType(mimeType) {
  if (typeof window === "undefined" || !mimeType || !mimeType.startsWith("video/")) {
    return "";
  }

  if (!video) {
    video = document.createElement("video");
  }

  return video.canPlayType(mimeType);
}

function shouldRenderVideoTag(mimeType) {
  return !!supportsVideoType(mimeType);
}
let audio;

function supportsAudioType(mimeType) {
  if (typeof window === "undefined" || !mimeType || !mimeType.startsWith("audio/")) {
    return "";
  }

  if (!audio) {
    audio = document.createElement("audio");
  }

  return audio.canPlayType(mimeType);
}

function shouldRenderAudioTag(mimeType) {
  return !!supportsAudioType(mimeType);
}

function mergeRefs(refs) {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === "function") {
        ref(value); // eslint-disable-next-line eqeqeq
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

const CarbonDocumentUnknown = props => {
  return /*#__PURE__*/jsxRuntime.jsxs("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 32 32",
    ...props,
    children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
      cx: "9",
      cy: "28.5",
      r: "1.5",
      fill: "currentColor"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "M10 25H8v-4h2a2 2 0 0 0 0-4H8a2.002 2.002 0 0 0-2 2v.5H4V19a4.005 4.005 0 0 1 4-4h2a4 4 0 0 1 0 8Z"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "m27.7 9.3l-7-7A.908.908 0 0 0 20 2H10a2.006 2.006 0 0 0-2 2v8h2V4h8v6a2.006 2.006 0 0 0 2 2h6v16H14v2h12a2.006 2.006 0 0 0 2-2V10a.91.91 0 0 0-.3-.7ZM20 10V4.4l5.6 5.6Z"
    })]
  });
};
const CarbonDocumentAudio = props => {
  return /*#__PURE__*/jsxRuntime.jsxs("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 32 32",
    ...props,
    children: [/*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "M29 31a.999.999 0 0 1-.625-.22L23.65 27H20a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3.65l4.726-3.78A1 1 0 0 1 30 17v13a1 1 0 0 1-1 1Zm-8-6h3a1 1 0 0 1 .625.22L28 27.92v-8.84l-3.376 2.7A1 1 0 0 1 24 22h-3Z"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "M16 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6v3h2v-5a.91.91 0 0 0-.3-.7l-7-7A.909.909 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8Zm2-23.6l5.6 5.6H18Z"
    })]
  });
};
const CarbonPauseFilled = props => {
  return /*#__PURE__*/jsxRuntime.jsx("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 32 32",
    ...props,
    children: /*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "M12 6h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm10 0h-2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"
    })
  });
};
const CarbonPlayFilledAlt = props => {
  return /*#__PURE__*/jsxRuntime.jsx("svg", {
    width: "1em",
    height: "1em",
    viewBox: "0 0 32 32",
    ...props,
    children: /*#__PURE__*/jsxRuntime.jsx("path", {
      fill: "currentColor",
      d: "M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28Z"
    })
  });
};

/* eslint-disable @next/next/no-img-element */

const PlayButton = _ref => {
  let {
    onClick,
    isPlaying
  } = _ref;
  const [isHovering, setIsHovering] = React.useState(false);

  const onMouseEnter = () => setIsHovering(true);

  const onMouseLeave = () => setIsHovering(false);

  const onMouseDown = () => setIsHovering(false);

  const onMouseUp = () => setIsHovering(true);

  return /*#__PURE__*/jsxRuntime.jsx("button", {
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      transform: "translate(-25%, -25%)",
      maxWidth: "32px",
      width: "8%",
      minWidth: "24px",
      aspectRatio: "1",
      zIndex: 3,
      backgroundColor: "#fff",
      color: "rgb(138, 147, 155)",
      display: "grid",
      placeItems: "center",
      borderRadius: "50%",
      border: "1px solid rgb(229, 232, 235)",
      cursor: "pointer",
      ...(isHovering ? {
        color: "rgb(53, 56, 64)",
        boxShadow: "rgb(4 17 29 / 25%) 0px 0px 8px 0px"
      } : {})
    },
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    children: !isPlaying ? /*#__PURE__*/jsxRuntime.jsx(CarbonPlayFilledAlt, {
      style: {
        width: "66%",
        height: "66%"
      }
    }) : /*#__PURE__*/jsxRuntime.jsx(CarbonPauseFilled, {
      style: {
        width: "66%",
        height: "66%"
      }
    })
  });
};

const VideoPlayer = /*#__PURE__*/React__default["default"].forwardRef((_ref2, ref) => {
  let {
    src,
    alt,
    poster,
    requireInteraction,
    style,
    width,
    height,
    controls,
    ...restProps
  } = _ref2;
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(!requireInteraction);
  const [muted, setMuted] = React.useState(true);
  React.useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        try {
          videoRef.current.play();
        } catch (err) {
          console.error("error playing video", err);
        }
      } else {
        try {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        } catch (err) {
          console.error("error pausing video", err);
        }
      }
    }
  }, [playing]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    style: {
      position: "relative",
      ...style
    },
    ...restProps,
    children: [/*#__PURE__*/jsxRuntime.jsx("video", {
      ref: mergeRefs([videoRef, ref]),
      src: src ?? undefined,
      poster: poster ?? undefined,
      loop: true,
      playsInline: true,
      controlsList: "nodownload",
      muted: muted,
      preload: poster ? "metadata" : "auto",
      onCanPlay: () => {
        if (playing) {
          var _videoRef$current;

          (_videoRef$current = videoRef.current) === null || _videoRef$current === void 0 ? void 0 : _videoRef$current.play();
        }
      },
      width: width,
      height: height,
      controls: controls,
      style: {
        height: "100%",
        width: "100%",
        objectFit: "contain",
        zIndex: 1,
        transition: "opacity .5s",
        opacity: !poster ? 1 : playing ? 1 : 0
      }
    }), poster && /*#__PURE__*/jsxRuntime.jsx("img", {
      src: poster,
      style: {
        objectFit: "contain",
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2,
        transition: "opacity .5s",
        opacity: playing ? 0 : 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      alt: alt
    }), /*#__PURE__*/jsxRuntime.jsx(PlayButton, {
      onClick: () => {
        setPlaying(prev => !prev);
        setMuted(false);
      },
      isPlaying: playing
    })]
  });
});
VideoPlayer.displayName = "VideoPlayer";
const AudioPlayer = /*#__PURE__*/React__default["default"].forwardRef((_ref3, ref) => {
  let {
    src,
    alt,
    poster,
    style,
    height,
    width,
    ...restProps
  } = _ref3;
  const audioRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);
  React.useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [playing]);
  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    style: {
      position: "relative",
      ...style
    },
    ...restProps,
    children: [poster ? /*#__PURE__*/jsxRuntime.jsx("img", {
      height: height,
      width: width,
      src: poster,
      style: {
        height: "100%",
        width: "100%",
        pointerEvents: "none",
        objectFit: "contain"
      },
      alt: alt
    }) : /*#__PURE__*/jsxRuntime.jsx("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
        backgroundColor: "#fff",
        color: "rgb(138, 147, 155)"
      },
      children: /*#__PURE__*/jsxRuntime.jsx(CarbonDocumentAudio, {
        style: {
          height: "64px",
          width: "64px"
        }
      })
    }), /*#__PURE__*/jsxRuntime.jsx(PlayButton, {
      onClick: () => {
        setPlaying(prev => !prev);
        setMuted(false);
      },
      isPlaying: playing
    }), /*#__PURE__*/jsxRuntime.jsx("audio", {
      ref: mergeRefs([audioRef, ref]),
      src: src ?? undefined,
      loop: true,
      playsInline: true,
      muted: muted,
      preload: "none",
      controlsList: "nodownload",
      style: {
        position: "absolute",
        opacity: 0,
        pointerEvents: "none",
        zIndex: -1,
        visibility: "hidden"
      }
    })]
  });
});
AudioPlayer.displayName = "AudioPlayer";
const IframePlayer = /*#__PURE__*/React__default["default"].forwardRef((_ref4, ref) => {
  let {
    src,
    alt,
    poster,
    requireInteraction,
    style,
    ...restProps
  } = _ref4;
  const {
    observe,
    width: elWidth
  } = useDimensions__default["default"]();
  const [playing, setPlaying] = React.useState(!requireInteraction);

  if (elWidth < 300) {
    return /*#__PURE__*/jsxRuntime.jsx("div", {
      ref: observe,
      children: /*#__PURE__*/jsxRuntime.jsx(LinkPlayer, {
        style: style,
        src: src,
        alt: alt,
        ...restProps
      })
    });
  }

  return /*#__PURE__*/jsxRuntime.jsxs("div", {
    style: {
      position: "relative",
      ...style
    },
    ...restProps,
    ref: observe,
    children: [/*#__PURE__*/jsxRuntime.jsx("iframe", {
      src: playing ? src ?? undefined : undefined,
      ref: ref,
      style: {
        objectFit: "contain",
        zIndex: 1,
        height: "100%",
        width: "100%",
        transition: "opacity .5s",
        opacity: !poster ? 1 : playing ? 1 : 0
      },
      sandbox: "allow-scripts",
      allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    }), poster && /*#__PURE__*/jsxRuntime.jsx("img", {
      src: poster,
      style: {
        objectFit: "contain",
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 2,
        transition: "opacity .5s",
        opacity: playing ? 0 : 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      alt: alt
    }), /*#__PURE__*/jsxRuntime.jsx(PlayButton, {
      onClick: () => {
        setPlaying(prev => !prev);
      },
      isPlaying: playing
    })]
  });
});
IframePlayer.displayName = "IframePlayer";
const LinkPlayer = /*#__PURE__*/React__default["default"].forwardRef((_ref5, ref) => {
  let {
    src,
    alt,
    style,
    ...restProps
  } = _ref5;
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    style: {
      position: "relative",
      ...style
    },
    ...restProps,
    children: /*#__PURE__*/jsxRuntime.jsx("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#fff",
        color: "rgb(138, 147, 155)"
      },
      children: /*#__PURE__*/jsxRuntime.jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          flexWrap: "nowrap"
        },
        children: [/*#__PURE__*/jsxRuntime.jsx(CarbonDocumentUnknown, {
          style: {
            maxWidth: "128px",
            minWidth: "48px",
            width: "50%",
            aspectRatio: "1"
          }
        }), /*#__PURE__*/jsxRuntime.jsx("a", {
          rel: "noopener noreferrer",
          style: {
            textDecoration: "underline",
            color: "rgb(138, 147, 155)"
          },
          href: src ?? undefined,
          target: "_blank",
          ref: ref,
          children: alt || "File"
        })]
      })
    })
  });
});
LinkPlayer.displayName = "LinkPlayer";
/**
 * This component can be used to render any media type, including image, audio, video, and html files.
 * Its convenient for rendering NFT media files, as these can be a variety of different types.
 * The component falls back to a external link if the media type is not supported.
 *
 * Props: {@link MediaRendererProps}
 *
 * @example
 * We can take a video file hosted on IPFS and render it using this component as follows
 * ```jsx
 * const Component = () => {
 *   return <MediaRenderer
 *     src="ipfs://Qmb9ZV5yznE4C4YvyJe8DVFv1LSVkebdekY6HjLVaKmHZi"
 *     alt="A mp4 video"
 *   />
 * }
 * ```
 *
 * You can try switching out the `src` prop to different types of URLs and media types to explore the possibilities.
 */

const MediaRenderer = /*#__PURE__*/React__default["default"].forwardRef((_ref6, ref) => {
  let {
    src,
    poster,
    alt,
    requireInteraction = false,
    style,
    ...restProps
  } = _ref6;
  const mergedStyle = {
    objectFit: "contain",
    ...style
  };
  const videoOrImageSrc = useResolvedMediaType(src ?? undefined);
  const possiblePosterSrc = useResolvedMediaType(poster ?? undefined);

  if (!videoOrImageSrc.mimeType) {
    return /*#__PURE__*/jsxRuntime.jsx("img", {
      style: mergedStyle,
      ...restProps,
      ref: ref,
      alt: alt
    });
  } else if (videoOrImageSrc.mimeType === "text/html") {
    return /*#__PURE__*/jsxRuntime.jsx(IframePlayer, {
      style: mergedStyle,
      src: videoOrImageSrc.url,
      poster: possiblePosterSrc.url,
      requireInteraction: requireInteraction,
      ...restProps
    });
  } else if (shouldRenderVideoTag(videoOrImageSrc.mimeType)) {
    return /*#__PURE__*/jsxRuntime.jsx(VideoPlayer, {
      style: mergedStyle,
      src: videoOrImageSrc.url,
      poster: possiblePosterSrc.url,
      requireInteraction: requireInteraction,
      ...restProps
    });
  } else if (shouldRenderAudioTag(videoOrImageSrc.mimeType)) {
    return /*#__PURE__*/jsxRuntime.jsx(AudioPlayer, {
      style: mergedStyle,
      src: videoOrImageSrc.url,
      poster: possiblePosterSrc.url,
      requireInteraction: requireInteraction,
      ...restProps
    });
  } else if (videoOrImageSrc.mimeType.startsWith("image/")) {
    return /*#__PURE__*/jsxRuntime.jsx("img", {
      style: mergedStyle,
      src: videoOrImageSrc.url,
      alt: alt,
      ref: ref,
      ...restProps
    });
  }

  return /*#__PURE__*/jsxRuntime.jsx(LinkPlayer, {
    style: mergedStyle,
    src: videoOrImageSrc.url,
    alt: alt,
    ref: ref,
    ...restProps
  });
});
MediaRenderer.displayName = "MediaRenderer";

/**
 * @param uri - the uri to resolve (can be a url or a ipfs://\<cid\>)
 * @returns the fully resolved url + mime type of the media
 *
 * @example
 * Usage with fully formed url:
 * ```jsx
 * const Component = () => {
 *   const resolved = useResolvedMediaType("https://example.com/video.mp4");
 *   console.log("mime type", resolved.data.mimeType);
 *   console.log("url", resolved.data.url);
 *   return null;
 * }
 * ```
 *
 * Usage with ipfs cid:
 * ```jsx
 * const Component = () => {
 *   const resolved = useResolvedMediaType("ipfs://QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvsd");
 *   console.log("mime type", resolved.data.mimeType);
 *   console.log("url", resolved.data.url);
 *   return null;
 * }
 * ```
 */
function useResolvedMediaType(uri) {
  const resolvedUrl = React.useMemo(() => resolveIpfsUri(uri), [uri]);
  const resolvedMimType = reactQuery.useQuery(["mime-type", resolvedUrl], () => resolveMimeType(resolvedUrl), {
    enabled: !!resolvedUrl
  });
  return {
    url: resolvedUrl,
    mimeType: resolvedMimType.data
  };
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
const ThirdwebNftMedia = /*#__PURE__*/React__default["default"].forwardRef((_ref, ref) => {
  var _metadata$name;

  let {
    metadata,
    ...props
  } = _ref;
  return /*#__PURE__*/jsxRuntime.jsx(MediaRenderer, {
    src: metadata.animation_url || metadata.image,
    poster: metadata.image,
    alt: ((_metadata$name = metadata.name) === null || _metadata$name === void 0 ? void 0 : _metadata$name.toString()) || "",
    ref: ref,
    ...props
  });
});
ThirdwebNftMedia.displayName = "ThirdwebNftMedia";

function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */


function useForceUpdate() {
  const [, dispatch] = React.useState(Object.create(null));
  return React.useCallback(() => {
    dispatch(Object.create(null));
  }, []);
}

const useIsomorphicLayoutEffect = canUseDOM() ? React.useLayoutEffect : React.useEffect;
/**
 * Portal from `@reach/portal`
 *
 * @see Docs https://reach.tech/portal#portal
 */

const PortalImpl = _ref => {
  let {
    children,
    type = "reach-portal",
    containerRef
  } = _ref;
  const mountNode = React.useRef(null);
  const portalNode = React.useRef(null);
  const forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(() => {
    // This ref may be null when a hot-loader replaces components on the page
    if (!mountNode.current) {
      return;
    } // It's possible that the content of the portal has, itself, been portaled.
    // In that case, it's important to append to the correct document element.


    const ownerDocument = mountNode.current.ownerDocument;
    const body = (containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) || ownerDocument.body;
    portalNode.current = ownerDocument === null || ownerDocument === void 0 ? void 0 : ownerDocument.createElement(type);
    body.appendChild(portalNode.current);
    forceUpdate();
    return () => {
      if (portalNode.current && body) {
        body.removeChild(portalNode.current);
      }
    };
  }, [type, forceUpdate, containerRef]);
  return portalNode.current ? /*#__PURE__*/reactDom.createPortal(children, portalNode.current) : /*#__PURE__*/jsxRuntime.jsx("span", {
    ref: mountNode
  });
};

const Portal = _ref2 => {
  let {
    unstable_skipInitialRender,
    ...props
  } = _ref2;
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    if (unstable_skipInitialRender) {
      setHydrated(true);
    }
  }, [unstable_skipInitialRender]);

  if (unstable_skipInitialRender && !hydrated) {
    return null;
  }

  return /*#__PURE__*/jsxRuntime.jsx(PortalImpl, { ...props
  });
};
Portal.displayName = "Portal";

function shortenString(str, extraShort) {
  return `${str.substring(0, extraShort ? 4 : 6)}...${str.substring(str.length - (extraShort ? 3 : 4))}`;
}
function shortenAddress(address, extraShort) {
  try {
    const formattedAddress = ethers.utils.getAddress(address);
    return shortenString(formattedAddress, extraShort);
  } catch {
    return address;
  }
}
function shortenIfAddress(address, extraShort) {
  if (typeof address === "string" && address.length > 0) {
    return shortenAddress(address, extraShort);
  }

  return address || "";
}

// extracted from chakra-ui

/**
 * React hook to copy content to clipboard
 *
 */
function useClipboard(text) {
  let optionsOrTimeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [hasCopied, setHasCopied] = React.useState(false);
  const {
    timeout = 1500,
    ...copyOptions
  } = typeof optionsOrTimeout === "number" ? {
    timeout: optionsOrTimeout
  } : optionsOrTimeout;
  const onCopy = React.useCallback(() => {
    const didCopy = copy__default["default"](text, copyOptions);
    setHasCopied(didCopy);
  }, [text, copyOptions]);
  React.useEffect(() => {
    let timeoutId = null;

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeout, hasCopied]);
  return {
    value: text,
    onCopy,
    hasCopied
  };
}

// import { TwUiTheme } from "../../theme";
const Box = styled__default["default"].div``;

const spin = react.keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
const Spinner = styled__default["default"].div`
  display: inline-block;
  border-top: 2px solid currentcolor;
  border-right: 2px solid currentcolor;
  border-bottom-style: solid;
  border-left-style: solid;
  border-radius: 99999px;
  border-bottom-width: 2px;
  border-left-width: 2px;
  border-bottom-color: transparent;
  border-left-color: transparent;
  animation: 0.45s linear 0s infinite normal none running ${spin};
  width: 0.75em;
  height: 0.75em;
  flex-shrink: 0;
`;

const BaseButton = styled__default["default"].button`
  position: relative;
  border-radius: 0.5em;
  padding: 0.75em 1.25em;
  padding-right: ${props => props.hasRightElement ? "0.75em" : "1.25em"};
  padding-left: ${props => props.hasLeftElement ? "0.75em" : "1.25em"};
  font-size: 1em;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: space-evenly;
  color: ${props => computeTextColorBasedOnBackground(props.theme.colors.accent)};
  border: 2px solid
    ${props => computeHoverColor(props.theme.colors.accent)};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &:focus {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 1px;
  }
`;

function computeHoverColor(c) {
  const col = color__default["default"](c);

  if (col.hex() === "#000000") {
    return "#262627";
  }

  if (col.luminosity() < 0.2) {
    return col.lighten(0.1).hex();
  }

  return col.darken(0.1).hex();
}

function computeDisabledColor(c) {
  const col = color__default["default"](c);

  if (col.hex() === "#000000") {
    return "#262627";
  }

  if (col.luminosity() < 0.2) {
    return col.lighten(0.5).hex();
  }

  return col.darken(0.5).hex();
}

function computeTextColorBasedOnBackground(c) {
  const col = color__default["default"](c);

  if (col.isDark()) {
    return "#fff";
  }

  return "#000";
}

const SolidButton = styled__default["default"](BaseButton)`
  background: ${props => props.theme.colors.accent};
  &:hover {
    background: ${props => computeHoverColor(props.theme.colors.accent)};
    border-color: ${props => computeHoverColor(props.theme.colors.accent)};
  }
  &:disabled {
    background: ${props => computeDisabledColor(props.theme.colors.accent)};
    border-color: ${props => computeDisabledColor(props.theme.colors.accent)};
    color: ${props => computeTextColorBasedOnBackground(computeDisabledColor(props.theme.colors.accent))};
  }
`;
const OutlineButton = styled__default["default"](BaseButton)`
  background: transparent;
  &:hover {
    background: ${props => color__default["default"](props.theme.colors.background).alpha(0.5).hexa()};
  }
`;
const Button = _ref => {
  let {
    children,
    variant,
    rightElement,
    leftElement,
    isLoading,
    isDisabled,
    disabled,
    ...restProps
  } = _ref;
  const Btn = variant === "outline" ? OutlineButton : SolidButton;
  return /*#__PURE__*/jsxRuntime.jsxs(Btn, { ...restProps,
    disabled: isDisabled || disabled || isLoading,
    hasRightElement: !!rightElement,
    hasLeftElement: !!leftElement,
    children: [isLoading ? /*#__PURE__*/jsxRuntime.jsx(Spinner, {
      style: {
        position: "absolute",
        left: "calc(50% - 0.75em / 2)"
      }
    }) : null, /*#__PURE__*/jsxRuntime.jsxs("span", {
      style: {
        opacity: isLoading ? 0 : 1,
        display: "inherit",
        gap: "inherit",
        alignItems: "inherit",
        justifyContent: "inherit",
        width: "100%"
      },
      children: [leftElement, children, rightElement]
    })]
  });
};

const chainLogos = {
  ethereum: {
    svgProps: {
      viewBox: "0 0 28 28",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#25292E",
        fillRule: "evenodd",
        d: "M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z",
        clipRule: "evenodd"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "url(#a)",
        fillOpacity: ".3",
        fillRule: "evenodd",
        d: "M14 28a14 14 0 1 0 0-28 14 14 0 0 0 0 28Z",
        clipRule: "evenodd"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "url(#b)",
        d: "M8.19 14.77 14 18.21l5.8-3.44-5.8 8.19-5.81-8.19Z"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#fff",
        d: "m14 16.93-5.81-3.44L14 4.34l5.81 9.15L14 16.93Z"
      }), /*#__PURE__*/jsxRuntime.jsxs("defs", {
        children: [/*#__PURE__*/jsxRuntime.jsxs("linearGradient", {
          id: "a",
          x1: "0",
          x2: "14",
          y1: "0",
          y2: "28",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/jsxRuntime.jsx("stop", {
            stopColor: "#fff"
          }), /*#__PURE__*/jsxRuntime.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        }), /*#__PURE__*/jsxRuntime.jsxs("linearGradient", {
          id: "b",
          x1: "14",
          x2: "14",
          y1: "14.77",
          y2: "22.96",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/jsxRuntime.jsx("stop", {
            stopColor: "#fff"
          }), /*#__PURE__*/jsxRuntime.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: ".9"
          })]
        })]
      })]
    })
  },
  arbitrum: {
    svgProps: {
      viewBox: "0 0 28 28",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
        width: "26.6",
        height: "26.6",
        x: ".7",
        y: ".7",
        fill: "#2D374B",
        stroke: "#96BEDC",
        strokeWidth: "1.4",
        rx: "13.3"
      }), /*#__PURE__*/jsxRuntime.jsx("mask", {
        id: "a",
        width: "28",
        height: "28",
        x: "0",
        y: "0",
        maskUnits: "userSpaceOnUse",
        style: {
          maskType: "alpha"
        },
        children: /*#__PURE__*/jsxRuntime.jsx("rect", {
          width: "28",
          height: "28",
          fill: "#C4C4C4",
          rx: "14"
        })
      }), /*#__PURE__*/jsxRuntime.jsxs("g", {
        mask: "url(#a)",
        children: [/*#__PURE__*/jsxRuntime.jsx("path", {
          fill: "#28A0F0",
          d: "m14.0861 18.6041 6.5014 10.2239 4.0057-2.3213-7.86-12.3943-2.6471 4.4917Zm13.0744 3.4692-.003-1.8599-7.3064-11.407-2.3087 3.9173 7.091 11.4303 2.172-1.2586a.9628.9628 0 0 0 .3555-.7009l-.0004-.1212Z"
        }), /*#__PURE__*/jsxRuntime.jsx("rect", {
          width: "25.9",
          height: "25.9",
          x: "1.05",
          y: "1.05",
          fill: "url(#b)",
          fillOpacity: ".3",
          stroke: "#96BEDC",
          strokeWidth: "2.1",
          rx: "12.95"
        }), /*#__PURE__*/jsxRuntime.jsx("path", {
          fill: "#fff",
          d: "m.3634 28.2207-3.07-1.7674-.234-.8333L7.7461 9.0194c.7298-1.1913 2.3197-1.575 3.7957-1.5541l1.7323.0457L.3634 28.2207ZM19.1655 7.511l-4.5653.0166L2.24 27.9533l3.6103 2.0788.9818-1.6652L19.1655 7.511Z"
        })]
      }), /*#__PURE__*/jsxRuntime.jsx("defs", {
        children: /*#__PURE__*/jsxRuntime.jsxs("linearGradient", {
          id: "b",
          x1: "0",
          x2: "14",
          y1: "0",
          y2: "28",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/jsxRuntime.jsx("stop", {
            stopColor: "#fff"
          }), /*#__PURE__*/jsxRuntime.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        })
      })]
    })
  },
  avalanche: {
    svgProps: {
      viewBox: "0 0 28 28",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#fff",
        d: "M23 5H5v18h18V5Z"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#E84142",
        fillRule: "evenodd",
        d: "M14 28c-7.513.008-14-6.487-14-14C0 6.196 6.043-.008 14 0c7.95.008 14 6.196 14 14 0 7.505-6.495 13.992-14 14Zm-3.971-7.436H7.315c-.57 0-.851 0-1.023-.11a.69.69 0 0 1-.313-.54c-.01-.202.13-.45.412-.944l6.7-11.809c.285-.501.43-.752.612-.845.195-.1.429-.1.625 0 .182.093.326.344.611.845l1.377 2.404.007.013c.308.538.464.81.533 1.097a2.04 2.04 0 0 1 0 .954c-.07.289-.224.564-.536 1.11l-3.52 6.22-.009.017c-.31.542-.467.817-.684 1.024a2.048 2.048 0 0 1-.835.485c-.285.079-.604.079-1.243.079Zm6.852 0h3.888c.574 0 .862 0 1.034-.113a.687.687 0 0 0 .313-.543c.01-.196-.128-.434-.398-.9a8.198 8.198 0 0 1-.028-.048l-1.948-3.332-.022-.037c-.274-.463-.412-.697-.59-.787a.684.684 0 0 0-.621 0c-.179.093-.323.337-.608.828l-1.94 3.331-.007.012c-.284.49-.426.735-.416.936.014.22.127.423.313.543.168.11.456.11 1.03.11Z",
        clipRule: "evenodd"
      })]
    })
  },
  optimism: {
    svgProps: {
      viewBox: "0 0 28 28",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
        width: "28",
        height: "28",
        fill: "#FF3131",
        rx: "14"
      }), /*#__PURE__*/jsxRuntime.jsx("rect", {
        width: "28",
        height: "28",
        fill: "url(#a)",
        fillOpacity: ".3",
        rx: "14"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#fff",
        d: "M9.22 18.35c2.7 0 4.86-2.2 4.86-5.38 0-2.19-1.47-3.8-3.98-3.8-2.72 0-4.85 2.2-4.85 5.38 0 2.2 1.5 3.8 3.97 3.8Zm.83-7.35c1.06 0 1.74.81 1.74 2.1 0 1.9-1.11 3.42-2.51 3.42-1.06 0-1.74-.82-1.74-2.1 0-1.89 1.11-3.42 2.5-3.42Zm6.38-1.68-1.88 8.88h2.26l.55-2.6h1.47c2.43 0 4.01-1.38 4.01-3.6 0-1.61-1.17-2.68-3.1-2.68h-3.3Zm1.9 1.74h.94c.83 0 1.3.38 1.3 1.14 0 1-.68 1.7-1.74 1.7h-1.11l.6-2.84Z"
      }), /*#__PURE__*/jsxRuntime.jsx("defs", {
        children: /*#__PURE__*/jsxRuntime.jsxs("linearGradient", {
          id: "a",
          x1: "0",
          x2: "14",
          y1: "0",
          y2: "28",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/jsxRuntime.jsx("stop", {
            stopColor: "#fff"
          }), /*#__PURE__*/jsxRuntime.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        })
      })]
    })
  },
  polygon: {
    svgProps: {
      viewBox: "0 0 28 28",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
        width: "28",
        height: "28",
        fill: "#8247E5",
        rx: "14"
      }), /*#__PURE__*/jsxRuntime.jsx("rect", {
        width: "28",
        height: "28",
        fill: "url(#a)",
        fillOpacity: ".3",
        rx: "14"
      }), /*#__PURE__*/jsxRuntime.jsx("path", {
        fill: "#fff",
        d: "M18.28 10.92a1.06 1.06 0 0 0-1.06 0l-2.41 1.42-1.65.93-2.41 1.43c-.31.19-.72.19-1.06 0l-1.92-1.12a1.07 1.07 0 0 1-.53-.9v-2.2a1 1 0 0 1 .53-.9l1.9-1.08c.3-.18.7-.18 1.04 0l1.9 1.09c.3.18.52.52.52.9v1.42l1.64-.96V9.52a1 1 0 0 0-.52-.9l-3.5-2.04a1.06 1.06 0 0 0-1.06 0L6.13 8.63a1 1 0 0 0-.53.9v4.12a1 1 0 0 0 .53.9l3.56 2.04c.31.19.71.19 1.06 0l2.41-1.4 1.65-.95 2.41-1.4c.31-.19.72-.19 1.06 0l1.89 1.09c.3.18.53.52.53.9v2.2a1 1 0 0 1-.53.9l-1.9 1.11c-.3.19-.7.19-1.05 0l-1.89-1.08a1.07 1.07 0 0 1-.52-.9v-1.43l-1.65.96v1.43a1 1 0 0 0 .53.9l3.56 2.04c.31.19.72.19 1.06 0l3.56-2.04c.31-.19.53-.53.53-.9v-4.13a1 1 0 0 0-.53-.9l-3.6-2.07Z"
      }), /*#__PURE__*/jsxRuntime.jsx("defs", {
        children: /*#__PURE__*/jsxRuntime.jsxs("linearGradient", {
          id: "a",
          x1: "0",
          x2: "14",
          y1: "0",
          y2: "28",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/jsxRuntime.jsx("stop", {
            stopColor: "#fff"
          }), /*#__PURE__*/jsxRuntime.jsx("stop", {
            offset: "1",
            stopColor: "#fff",
            stopOpacity: "0"
          })]
        })
      })]
    })
  },
  fantom: {
    svgProps: {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsxs("defs", {
        children: [/*#__PURE__*/jsxRuntime.jsx("style", {
          children: ".cls-1{fill:#fff;fill-rule:evenodd}"
        }), /*#__PURE__*/jsxRuntime.jsx("mask", {
          id: "mask",
          width: 93.1,
          height: 20,
          x: 10,
          y: 6,
          maskUnits: "userSpaceOnUse",
          children: /*#__PURE__*/jsxRuntime.jsx("path", {
            id: "a",
            d: "M10 6h93.1v20H10Z",
            className: "cls-1"
          })
        })]
      }), /*#__PURE__*/jsxRuntime.jsx("g", {
        id: "Layer_2",
        "data-name": "Layer 2",
        children: /*#__PURE__*/jsxRuntime.jsxs("g", {
          id: "Layer_1-2",
          "data-name": "Layer 1",
          children: [/*#__PURE__*/jsxRuntime.jsx("circle", {
            cx: 16,
            cy: 16,
            r: 16,
            fill: "#13b5ec"
          }), /*#__PURE__*/jsxRuntime.jsx("path", {
            d: "m17.2 12.9 3.6-2.1V15Zm3.6 9L16 24.7l-4.8-2.8V17l4.8 2.8 4.8-2.8Zm-9.6-11.1 3.6 2.1-3.6 2.1Zm5.4 3.1 3.6 2.1-3.6 2.1Zm-1.2 4.2L11.8 16l3.6-2.1Zm4.8-8.3L16 12.2l-4.2-2.4L16 7.3ZM10 9.4v13.1l6 3.4 6-3.4V9.4L16 6Z",
            className: "cls-1"
          })]
        })
      })]
    })
  },
  binance: {
    svgProps: {
      viewBox: "0 0 32 32",
      xmlns: "http://www.w3.org/2000/svg"
    },
    paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.jsx("polygon", {
        fill: "#F3BA2F",
        points: "38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896 "
      }), /*#__PURE__*/jsxRuntime.jsx("rect", {
        x: "3.644",
        y: "53.188",
        transform: "matrix(0.7071 0.7071 -0.7071 0.7071 48.7933 8.8106)",
        fill: "#F3BA2F",
        width: "20.233",
        height: "20.234"
      }), /*#__PURE__*/jsxRuntime.jsx("polygon", {
        fill: "#F3BA2F",
        points: "38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.61123.863,87.716 23.843,87.696 "
      }), /*#__PURE__*/jsxRuntime.jsx("rect", {
        x: "101.64",
        y: "53.189",
        transform: "matrix(-0.7071 0.7071 -0.7071 -0.7071 235.5457 29.0503)",
        fill: "#F3BA2F",
        width: "20.234",
        height: "20.233"
      }), /*#__PURE__*/jsxRuntime.jsx("polygon", {
        fill: "#F3BA2F",
        points: "77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.28548.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305 "
      })]
    })
  }
};

const CoinbaseWalletIcon = {
  svgProps: {
    viewBox: "0 0 28 28",
    width: "28",
    height: "28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
      width: "28",
      height: "28",
      fill: "#2C5FF6"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M14 23.8C19.4124 23.8 23.8 19.4124 23.8 14C23.8 8.58761 19.4124 4.2 14 4.2C8.58761 4.2 4.2 8.58761 4.2 14C4.2 19.4124 8.58761 23.8 14 23.8ZM11.55 10.8C11.1358 10.8 10.8 11.1358 10.8 11.55V16.45C10.8 16.8642 11.1358 17.2 11.55 17.2H16.45C16.8642 17.2 17.2 16.8642 17.2 16.45V11.55C17.2 11.1358 16.8642 10.8 16.45 10.8H11.55Z",
      fill: "white"
    })]
  })
};

const MetamaskIcon = {
  svgProps: {
    viewBox: "0 0 28 28",
    width: "28",
    height: "28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
      width: "28",
      height: "28",
      fill: "white"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M24.0891 3.1199L15.3446 9.61456L16.9617 5.7828L24.0891 3.1199Z",
      fill: "#E2761B",
      stroke: "#E2761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M3.90207 3.1199L12.5763 9.67608L11.0383 5.7828L3.90207 3.1199Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M20.9429 18.1745L18.6139 21.7426L23.597 23.1136L25.0295 18.2536L20.9429 18.1745Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M2.97929 18.2536L4.40301 23.1136L9.38607 21.7426L7.05713 18.1745L2.97929 18.2536Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.10483 12.1456L7.71626 14.2461L12.6642 14.4658L12.4884 9.14877L9.10483 12.1456Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M18.8864 12.1456L15.4589 9.08725L15.3446 14.4658L20.2837 14.2461L18.8864 12.1456Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.38606 21.7426L12.3566 20.2925L9.79033 18.2888L9.38606 21.7426Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.6347 20.2925L18.6139 21.7426L18.2009 18.2888L15.6347 20.2925Z",
      fill: "#E4761B",
      stroke: "#E4761B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M18.6139 21.7426L15.6347 20.2925L15.8719 22.2348L15.8456 23.0521L18.6139 21.7426Z",
      fill: "#D7C1B3",
      stroke: "#D7C1B3",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.38606 21.7426L12.1544 23.0521L12.1368 22.2348L12.3566 20.2925L9.38606 21.7426Z",
      fill: "#D7C1B3",
      stroke: "#D7C1B3",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M12.1984 17.0056L9.72002 16.2762L11.4689 15.4765L12.1984 17.0056Z",
      fill: "#233447",
      stroke: "#233447",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.7928 17.0056L16.5223 15.4765L18.28 16.2762L15.7928 17.0056Z",
      fill: "#233447",
      stroke: "#233447",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.38606 21.7426L9.80791 18.1745L7.05712 18.2536L9.38606 21.7426Z",
      fill: "#CD6116",
      stroke: "#CD6116",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M18.1921 18.1745L18.6139 21.7426L20.9429 18.2536L18.1921 18.1745Z",
      fill: "#CD6116",
      stroke: "#CD6116",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M20.2837 14.2461L15.3446 14.4658L15.8016 17.0057L16.5311 15.4765L18.2888 16.2762L20.2837 14.2461Z",
      fill: "#CD6116",
      stroke: "#CD6116",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.72002 16.2762L11.4777 15.4765L12.1984 17.0057L12.6642 14.4658L7.71626 14.2461L9.72002 16.2762Z",
      fill: "#CD6116",
      stroke: "#CD6116",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M7.71626 14.2461L9.79033 18.2888L9.72002 16.2762L7.71626 14.2461Z",
      fill: "#E4751F",
      stroke: "#E4751F",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M18.2888 16.2762L18.2009 18.2888L20.2837 14.2461L18.2888 16.2762Z",
      fill: "#E4751F",
      stroke: "#E4751F",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M12.6642 14.4658L12.1984 17.0057L12.7784 20.0025L12.9102 16.0565L12.6642 14.4658Z",
      fill: "#E4751F",
      stroke: "#E4751F",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.3446 14.4658L15.1073 16.0477L15.2128 20.0025L15.8016 17.0057L15.3446 14.4658Z",
      fill: "#E4751F",
      stroke: "#E4751F",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.8016 17.0056L15.2128 20.0025L15.6347 20.2925L18.2009 18.2888L18.2888 16.2762L15.8016 17.0056Z",
      fill: "#F6851B",
      stroke: "#F6851B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.72002 16.2762L9.79033 18.2888L12.3566 20.2925L12.7784 20.0025L12.1984 17.0056L9.72002 16.2762Z",
      fill: "#F6851B",
      stroke: "#F6851B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.8456 23.0521L15.8719 22.2348L15.6522 22.0414H12.339L12.1368 22.2348L12.1544 23.0521L9.38606 21.7426L10.3528 22.5336L12.3126 23.8958H15.6786L17.6472 22.5336L18.6139 21.7426L15.8456 23.0521Z",
      fill: "#C0AD9E",
      stroke: "#C0AD9E",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.6347 20.2925L15.2128 20.0025H12.7784L12.3566 20.2925L12.1368 22.2348L12.339 22.0414H15.6522L15.8719 22.2348L15.6347 20.2925Z",
      fill: "#161616",
      stroke: "#161616",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M24.4583 10.0364L25.2053 6.45072L24.0891 3.1199L15.6347 9.39485L18.8864 12.1456L23.4827 13.4903L24.5022 12.3038L24.0628 11.9874L24.7658 11.3459L24.221 10.924L24.924 10.3879L24.4583 10.0364Z",
      fill: "#763D16",
      stroke: "#763D16",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M2.79472 6.45072L3.54174 10.0364L3.06717 10.3879L3.77024 10.924L3.23415 11.3459L3.93722 11.9874L3.4978 12.3038L4.50847 13.4903L9.10483 12.1456L12.3566 9.39485L3.90207 3.1199L2.79472 6.45072Z",
      fill: "#763D16",
      stroke: "#763D16",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M23.4827 13.4903L18.8864 12.1456L20.2837 14.2461L18.2009 18.2888L20.9429 18.2536H25.0295L23.4827 13.4903Z",
      fill: "#F6851B",
      stroke: "#F6851B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M9.10484 12.1456L4.50848 13.4903L2.97929 18.2536H7.05713L9.79033 18.2888L7.71626 14.2461L9.10484 12.1456Z",
      fill: "#F6851B",
      stroke: "#F6851B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M15.3446 14.4658L15.6347 9.39485L16.9705 5.7828H11.0383L12.3566 9.39485L12.6642 14.4658L12.7696 16.0653L12.7784 20.0025H15.2128L15.2304 16.0653L15.3446 14.4658Z",
      fill: "#F6851B",
      stroke: "#F6851B",
      strokeWidth: "0.0878845",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  })
};

const WalletConnectIcon = {
  svgProps: {
    viewBox: "0 0 28 28",
    width: "28",
    height: "28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  },
  paths: /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [/*#__PURE__*/jsxRuntime.jsx("rect", {
      width: "28",
      height: "28",
      fill: "#3B99FC"
    }), /*#__PURE__*/jsxRuntime.jsx("path", {
      d: "M8.38969 10.3739C11.4882 7.27538 16.5118 7.27538 19.6103 10.3739L19.9832 10.7468C20.1382 10.9017 20.1382 11.1529 19.9832 11.3078L18.7076 12.5835C18.6301 12.6609 18.5045 12.6609 18.4271 12.5835L17.9139 12.0703C15.7523 9.9087 12.2477 9.9087 10.0861 12.0703L9.53655 12.6198C9.45909 12.6973 9.3335 12.6973 9.25604 12.6198L7.98039 11.3442C7.82547 11.1893 7.82547 10.9381 7.98039 10.7832L8.38969 10.3739ZM22.2485 13.012L23.3838 14.1474C23.5387 14.3023 23.5387 14.5535 23.3838 14.7084L18.2645 19.8277C18.1096 19.9827 17.8584 19.9827 17.7035 19.8277C17.7035 19.8277 17.7035 19.8277 17.7035 19.8277L14.0702 16.1944C14.0314 16.1557 13.9686 16.1557 13.9299 16.1944C13.9299 16.1944 13.9299 16.1944 13.9299 16.1944L10.2966 19.8277C10.1417 19.9827 9.89053 19.9827 9.73561 19.8278C9.7356 19.8278 9.7356 19.8277 9.7356 19.8277L4.61619 14.7083C4.46127 14.5534 4.46127 14.3022 4.61619 14.1473L5.75152 13.012C5.90645 12.857 6.15763 12.857 6.31255 13.012L9.94595 16.6454C9.98468 16.6841 10.0475 16.6841 10.0862 16.6454C10.0862 16.6454 10.0862 16.6454 10.0862 16.6454L13.7194 13.012C13.8743 12.857 14.1255 12.857 14.2805 13.012C14.2805 13.012 14.2805 13.012 14.2805 13.012L17.9139 16.6454C17.9526 16.6841 18.0154 16.6841 18.0541 16.6454L21.6874 13.012C21.8424 12.8571 22.0936 12.8571 22.2485 13.012Z",
      fill: "white"
    })]
  })
};

const StyledSvg = styled__default["default"].svg`
  border-radius: 0.25em;
  flex-shrink: 0;
  ${props => props.boxSize ? `width: ${props.boxSize};
    height: ${props.boxSize};` : ""}
`;
const iconMap = {
  metamask: MetamaskIcon,
  walletConnect: WalletConnectIcon,
  coinbaseWallet: CoinbaseWalletIcon,
  ...chainLogos
};
const Icon = _ref => {
  let {
    name,
    ...props
  } = _ref;
  const icon = iconMap[name];
  return /*#__PURE__*/jsxRuntime.jsx(StyledSvg, { ...icon.svgProps,
    ...props,
    children: icon.paths
  });
};

const MenuItemBase = styled__default["default"].li`
  display: flex;
  padding: 0.75em 1em;
  align-items: center;
  gap: 0.5em;
  font-size: 1em;

  ${props => props.isSelectable ? `&:hover,
  &[data-focus] {
    cursor: pointer;
    background: ${color__default["default"](props.theme.colors.text).alpha(0.15).hexa()};
  }` : ``}

  > svg {
    flex-shrink: 0;
  }
`;
const MenuItem = _ref => {
  let {
    children,
    leftElement,
    rightElement,
    isSelectable = true,
    onClick,
    ...restProps
  } = _ref;
  return /*#__PURE__*/jsxRuntime.jsxs(MenuItemBase, { ...restProps,
    onClick: isSelectable ? onClick : undefined,
    isSelectable: isSelectable,
    children: [leftElement, children, rightElement]
  });
};

const Menu = styled__default["default"].ul`
  padding: 0;
  margin: 0;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  outline-color: ${props => props.theme.colors.accent};
  outline-style: solid;
  outline-offset: 0px;
  list-style: none;
  border-radius: 0.5em;
  overflow: hidden;
`;

const lightModeTheme = {
  colors: {
    accent: "#fff",
    background: "#fff",
    text: "#000"
  }
};
const darkModeTheme = {
  colors: {
    accent: "#000",
    background: "#000",
    text: "#fff"
  }
};
const fontFamily = `SFRounded, ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

const ThemeProvider = _ref => {
  let {
    colorMode,
    accentColor,
    children
  } = _ref;
  const theme = React.useMemo(() => {
    const t = colorMode === "light" ? lightModeTheme : darkModeTheme;
    return { ...t,
      colors: { ...t.colors,
        accent: accentColor || t.colors.accent
      }
    };
  }, [accentColor, colorMode]);
  return /*#__PURE__*/jsxRuntime.jsx(react.ThemeProvider, {
    theme: theme,
    children: /*#__PURE__*/jsxRuntime.jsx("span", {
      style: {
        fontFamily
      },
      children: children
    })
  });
};

const Select = styled__default["default"].select`
  margin: -0.25em 0;
  background: ${props => color__default["default"](props.theme.colors.background).alpha(0.85).hexa()};
  color: ${props => props.theme.colors.text};
  border: 1px solid
    ${props => color__default["default"](props.theme.colors.text).alpha(0.25).hexa()};
  border-radius: 0.25em;
  padding: 0.25em;
  width: 100%;
  flex-shrink: 1;
  font-size: 1em;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 2px solid ${props => props.theme.colors.accent};
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

const SupportedNetworkSelect = _ref => {
  let {
    disabledChainIds,
    ...selectProps
  } = _ref;
  const deprecatedNetworks = React.useMemo(() => {
    return sdk.SUPPORTED_CHAIN_IDS.map(supportedChain => {
      return getChainFromChainId(supportedChain);
    }).filter(n => !!n.deprecated);
  }, []);
  const testnets = React.useMemo(() => {
    return sdk.SUPPORTED_CHAIN_IDS.map(supportedChain => {
      return getChainFromChainId(supportedChain);
    }).filter(n => n.testnet && !n.deprecated);
  }, []);
  const mainnets = React.useMemo(() => {
    return sdk.SUPPORTED_CHAIN_IDS.map(supportedChain => {
      return getChainFromChainId(supportedChain);
    }).filter(n => !n.testnet && !n.deprecated);
  }, []);
  return /*#__PURE__*/jsxRuntime.jsxs(Select, { ...selectProps,
    children: [/*#__PURE__*/jsxRuntime.jsx("option", {
      disabled: true,
      value: -1,
      children: "Select Network"
    }), /*#__PURE__*/jsxRuntime.jsx("optgroup", {
      label: "Mainnets",
      children: mainnets.map(mn => {
        var _mn$nativeCurrency;

        return /*#__PURE__*/jsxRuntime.jsxs("option", {
          value: mn.id,
          disabled: disabledChainIds === null || disabledChainIds === void 0 ? void 0 : disabledChainIds.includes(mn.id),
          children: [mn.name, " (", (_mn$nativeCurrency = mn.nativeCurrency) === null || _mn$nativeCurrency === void 0 ? void 0 : _mn$nativeCurrency.symbol, ")"]
        }, mn.id);
      })
    }), /*#__PURE__*/jsxRuntime.jsx("optgroup", {
      label: "Testnets",
      children: testnets.map(tn => {
        var _tn$nativeCurrency;

        return /*#__PURE__*/jsxRuntime.jsxs("option", {
          value: tn.id,
          disabled: disabledChainIds === null || disabledChainIds === void 0 ? void 0 : disabledChainIds.includes(tn.id),
          children: [tn.name, " (", (_tn$nativeCurrency = tn.nativeCurrency) === null || _tn$nativeCurrency === void 0 ? void 0 : _tn$nativeCurrency.symbol, ")"]
        }, tn.id);
      })
    }), /*#__PURE__*/jsxRuntime.jsx("optgroup", {
      label: "Deprecated",
      children: deprecatedNetworks.map(tn => {
        var _tn$nativeCurrency2;

        return /*#__PURE__*/jsxRuntime.jsxs("option", {
          value: tn.id,
          disabled: disabledChainIds === null || disabledChainIds === void 0 ? void 0 : disabledChainIds.includes(tn.id),
          children: [tn.name, " (", (_tn$nativeCurrency2 = tn.nativeCurrency) === null || _tn$nativeCurrency2 === void 0 ? void 0 : _tn$nativeCurrency2.symbol, ")"]
        }, tn.id);
      })
    })]
  });
};

const SUPPORTED_CONNECTORS = ["injected", "walletConnect", "coinbasewallet"];

function getIconForConnector(connector) {
  if (connector.name.toLowerCase().includes("coinbase")) {
    return /*#__PURE__*/jsxRuntime.jsx(Icon, {
      boxSize: "1.5em",
      name: "coinbaseWallet"
    });
  }

  if (connector.name.toLocaleLowerCase().includes("metamask")) {
    return /*#__PURE__*/jsxRuntime.jsx(Icon, {
      boxSize: "1.5em",
      name: "metamask"
    });
  }

  const id = connector.id;

  switch (id) {
    case "injected":
      return /*#__PURE__*/jsxRuntime.jsx(Icon, {
        boxSize: "1.5em",
        name: "metamask"
      });

    case "walletConnect":
      return /*#__PURE__*/jsxRuntime.jsx(Icon, {
        boxSize: "1.5em",
        name: "walletConnect"
      });

    case "coinbasewallet":
      return /*#__PURE__*/jsxRuntime.jsx(Icon, {
        boxSize: "1.5em",
        name: "coinbaseWallet"
      });

    default:
      throw new Error("unsupported connector");
  }
}

let connecting = false;
let switchingNetwork = false;
let authing = false;
let switchingWallet = false;
const chainIdToCurrencyMap = {
  [sdk.ChainId.Mainnet]: "ethereum",
  [sdk.ChainId.Goerli]: "ethereum",
  [sdk.ChainId.Arbitrum]: "arbitrum",
  [sdk.ChainId.ArbitrumGoerli]: "arbitrum",
  [sdk.ChainId.Avalanche]: "avalanche",
  [sdk.ChainId.AvalancheFujiTestnet]: "avalanche",
  [sdk.ChainId.Fantom]: "fantom",
  [sdk.ChainId.FantomTestnet]: "fantom",
  [sdk.ChainId.Optimism]: "optimism",
  [sdk.ChainId.OptimismGoerli]: "optimism",
  [sdk.ChainId.Polygon]: "polygon",
  [sdk.ChainId.Mumbai]: "polygon",
  [sdk.ChainId.BinanceSmartChainMainnet]: "binance",
  [sdk.ChainId.BinanceSmartChainTestnet]: "binance"
};
/**
 * A component that allows the user to connect their wallet.
 *
 * The button has to be wrapped in a `ThirdwebProvider` in order to function.
 *
 * @example
 * ```javascript
 * import { ConnectWallet } from '@thirdweb-dev/react';
 *
 * const App = () => {
 *  return (
 *   <div>
 *     <ConnectWallet />
 *   </div>
 * )
 * }
 * ```
 *
 *
 * @beta
 */

const ConnectWallet = _ref => {
  var _balanceQuery$data, _balanceQuery$data2;

  let {
    auth,
    className,
    ...themeProps
  } = _ref;
  const id = React.useId();
  const walletAddress = useAddress();
  const [state, send] = react$1.useMachine(menu__namespace.machine({
    id,
    closeOnSelect: true,
    positioning: {
      sameWidth: true
    }
  }));
  const api = menu__namespace.connect(state, send, react$1.normalizeProps);
  const [{
    data: {
      connectors,
      connector
    }
  }, connect] = useConnect();
  const disconnect = useDisconnect({
    reconnectAfterGnosis: false
  });
  const supportedConnectors = connectors.filter(c => SUPPORTED_CONNECTORS.includes(c.id));
  const [network, switchNetwork] = useNetwork();
  const chainId = useChainId();
  const connectWithMetamask = useMetamask();
  const balanceQuery = useBalance();
  const {
    onCopy,
    hasCopied
  } = useClipboard(walletAddress || "");
  const authConfig = useThirdwebAuthConfig();
  const {
    user,
    isLoading,
    login,
    logout
  } = useAuth(auth === null || auth === void 0 ? void 0 : auth.loginConfig);
  const requiresSignIn = auth !== null && auth !== void 0 && auth.loginOptional ? false : !!(authConfig !== null && authConfig !== void 0 && authConfig.authUrl) && !!walletAddress && !(user !== null && user !== void 0 && user.address);
  return /*#__PURE__*/jsxRuntime.jsx(ThemeProvider, { ...themeProps,
    children: /*#__PURE__*/jsxRuntime.jsxs("div", {
      style: {
        position: "relative",
        width: "100%"
      },
      children: [/*#__PURE__*/jsxRuntime.jsx(Button, {
        className: className,
        style: {
          height: "50px",
          minWidth: "200px",
          width: "100%"
        },
        onClick: async e => {
          if (requiresSignIn) {
            e.preventDefault();
            e.stopPropagation();
            authing = true;

            try {
              await login(auth === null || auth === void 0 ? void 0 : auth.loginOptions);
            } catch (err) {
              console.error("failed to log in", err);
            }

            authing = false;
          }
        },
        ...(requiresSignIn ? {} : api.triggerProps),
        leftElement: requiresSignIn ? isLoading ? /*#__PURE__*/jsxRuntime.jsx(Spinner, {}) : /*#__PURE__*/jsxRuntime.jsx(FiLock.FiLock, {}) : walletAddress && chainId && chainId in chainIdToCurrencyMap ? /*#__PURE__*/jsxRuntime.jsx(Icon, {
          boxSize: "1.5em",
          name: chainIdToCurrencyMap[chainId]
        }) : undefined,
        rightElement: requiresSignIn ? undefined : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [connector && getIconForConnector(connector), /*#__PURE__*/jsxRuntime.jsx(FiChevronDown.FiChevronDown, {
            style: {
              transition: "transform 150ms ease",
              transform: `rotate(${api.isOpen ? "-180deg" : "0deg"})`
            }
          })]
        }),
        children: walletAddress ? requiresSignIn ? /*#__PURE__*/jsxRuntime.jsx("span", {
          style: {
            whiteSpace: "nowrap"
          },
          children: "Sign in"
        }) : /*#__PURE__*/jsxRuntime.jsxs("span", {
          style: {
            display: "flex",
            flexDirection: "column",
            fontWeight: 400,
            alignItems: "flex-start",
            fontSize: "0.8em"
          },
          children: [/*#__PURE__*/jsxRuntime.jsx("span", {
            style: {
              whiteSpace: "nowrap",
              fontWeight: 500
            },
            children: balanceQuery.isLoading ? "Loading..." : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [(_balanceQuery$data = balanceQuery.data) === null || _balanceQuery$data === void 0 ? void 0 : _balanceQuery$data.displayValue.slice(0, 5), " ", (_balanceQuery$data2 = balanceQuery.data) === null || _balanceQuery$data2 === void 0 ? void 0 : _balanceQuery$data2.symbol]
            })
          }), /*#__PURE__*/jsxRuntime.jsx("span", {
            style: {
              fontSize: "0.9em"
            },
            children: shortenIfAddress(walletAddress)
          })]
        }) : /*#__PURE__*/jsxRuntime.jsx("span", {
          style: {
            whiteSpace: "nowrap"
          },
          children: "Connect Wallet"
        })
      }), /*#__PURE__*/jsxRuntime.jsx(Portal, {
        children: /*#__PURE__*/jsxRuntime.jsx(Box, { ...api.positionerProps,
          style: {
            zIndex: 9999,
            fontFamily
          },
          children: /*#__PURE__*/jsxRuntime.jsx(Menu, { ...api.contentProps,
            children: !api.isOpen ? null : walletAddress ? /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [authConfig !== null && authConfig !== void 0 && authConfig.authUrl && !(user !== null && user !== void 0 && user.address) && !requiresSignIn ? /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "auth",
                  closeOnSelect: false
                }),
                leftElement: isLoading ? /*#__PURE__*/jsxRuntime.jsx(Spinner, {}) : /*#__PURE__*/jsxRuntime.jsx(FiLock.FiLock, {}),
                onClick: async () => {
                  if (isLoading || authing || user !== null && user !== void 0 && user.address) {
                    return;
                  }

                  authing = true;

                  try {
                    await login(auth === null || auth === void 0 ? void 0 : auth.loginOptions);
                  } catch (err) {
                    console.error("failed to log in", err);
                  }

                  authing = false;
                },
                children: "Sign in"
              }) : null, /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "copy",
                  closeOnSelect: false
                }),
                leftElement: hasCopied ? /*#__PURE__*/jsxRuntime.jsx(FiCheck.FiCheck, {
                  width: "1em",
                  height: "1em",
                  color: "#57ab5a"
                }) : /*#__PURE__*/jsxRuntime.jsx(FiCopy.FiCopy, {
                  width: "1em",
                  height: "1em"
                }),
                onClick: () => {
                  onCopy();
                },
                children: "Copy address"
              }), /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "switch-network",
                  closeOnSelect: false,
                  disabled: !switchNetwork
                }),
                isSelectable: false,
                leftElement: network.loading ? /*#__PURE__*/jsxRuntime.jsx(Spinner, {}) : network.error ? /*#__PURE__*/jsxRuntime.jsx(FiWifi.FiWifi, {
                  color: "#e5534b",
                  width: "1em",
                  height: "1em"
                }) : /*#__PURE__*/jsxRuntime.jsx(FiWifi.FiWifi, {
                  width: "1em",
                  height: "1em"
                }),
                children: /*#__PURE__*/jsxRuntime.jsx(SupportedNetworkSelect, {
                  value: chainId,
                  disabled: !switchNetwork,
                  onChange: async e => {
                    if (!switchingNetwork && switchNetwork) {
                      switchingNetwork = true;
                      const number = parseInt(e.target.value);

                      try {
                        await switchNetwork(number);
                      } catch (err) {
                        console.error("failed to switch network", err);
                      } finally {
                        switchingNetwork = false;
                      }
                    }
                  }
                })
              }), connector && connector.name === "MetaMask" && connector.id === "injected" ? /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "switch-wallet"
                }),
                leftElement: /*#__PURE__*/jsxRuntime.jsx(FiShuffle.FiShuffle, {
                  width: "1em",
                  height: "1em"
                }),
                onClick: async () => {
                  if (switchingWallet) {
                    return;
                  }

                  switchingWallet = true;

                  try {
                    await connector.getProvider().request({
                      method: "wallet_requestPermissions",
                      params: [{
                        eth_accounts: {}
                      }]
                    });
                    api.close();
                  } catch (err) {
                    console.error("failed to switch wallets", err);
                  }

                  switchingWallet = false;
                },
                children: "Switch Account"
              }) : null, /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "disconnect"
                }),
                leftElement: /*#__PURE__*/jsxRuntime.jsx(FiXCircle.FiXCircle, {
                  width: "1em",
                  height: "1em"
                }),
                onClick: () => {
                  disconnect();

                  if (authConfig !== null && authConfig !== void 0 && authConfig.authUrl) {
                    logout();
                  }

                  api.close();
                },
                children: "Disconnect"
              })]
            }) : /*#__PURE__*/jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [/*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                  id: "metamask"
                }),
                onClick: async () => {
                  if (!connecting) {
                    try {
                      connecting = true;
                      await connectWithMetamask();
                      api.close();
                    } finally {
                      connecting = false;
                    }
                  }
                },
                leftElement: /*#__PURE__*/jsxRuntime.jsx(Icon, {
                  boxSize: "1.5em",
                  name: "metamask"
                }),
                children: "MetaMask"
              }), supportedConnectors.filter(c => c.name !== "MetaMask").sort((a, b) => a.name.localeCompare(b.name)).map(c => {
                if (!c.ready) {
                  return null;
                }

                return /*#__PURE__*/jsxRuntime.jsx(MenuItem, { ...api.getItemProps({
                    id: c.id
                  }),
                  onClick: async () => {
                    if (!connecting) {
                      try {
                        connecting = true;
                        await connect(c);
                        api.close();
                      } finally {
                        connecting = false;
                      }
                    }
                  },
                  leftElement: getIconForConnector(c),
                  children: c.name
                }, c.id);
              })]
            })
          })
        })
      })]
    })
  });
};

/**
 * A component that allows the user to call an on-chain function on a contract.
 *
 * The button has to be wrapped in a `ThirdwebProvider` in order to function.
 *
 * @example
 * ```javascript
 * import { Web3Button } from "@thirdweb-dev/react";
 *
 * const App = () => {
 *  return (
 *   <div>
 *     <Web3Button contractAddress="0x..." action={(contract) => contract.erc721.transfer("0x...", 1)} />
 *   </div>
 * )
 * }
 * ```
 *
 *
 * @beta
 */
const Web3Button = _ref => {
  let {
    contractAddress,
    onSuccess,
    onError,
    onSubmit,
    isDisabled,
    contractAbi,
    children,
    action,
    className,
    ...themeProps
  } = _ref;
  const address = useAddress();
  const walletChainId = useChainId();
  const sdkChainId = useSDKChainId();
  const [, switchNetwork] = useNetwork();
  const queryClient = reactQuery.useQueryClient();
  const hasMismatch = useNetworkMismatch();
  const switchToChainId = React.useMemo(() => {
    if (sdkChainId && walletChainId && sdkChainId !== walletChainId) {
      return sdkChainId;
    }

    return null;
  }, [sdkChainId, walletChainId]);
  const {
    contract
  } = useContract(contractAddress, contractAbi || "custom");
  const mutation = reactQuery.useMutation(async () => {
    if (switchToChainId) {
      if (switchNetwork) {
        await switchNetwork(switchToChainId);
        return "__NETWORK_SWITCHED__";
      } else {
        throw new Error("need to switch chain but connected wallet does not support switching");
      }
    }

    invariant__default["default"](contract, "contract is not ready yet");

    if (onSubmit) {
      onSubmit();
    }

    return await action(contract);
  }, {
    onSuccess: res => {
      if (res === "__NETWORK_SWITCHED__") {
        return;
      }

      if (onSuccess) {
        onSuccess(res);
      }
    },
    onError: err => {
      if (onError) {
        onError(err);
      }
    },
    onSettled: () => queryClient.invalidateQueries(createCacheKeyWithNetwork(createContractCacheKey(contractAddress), sdkChainId))
  });

  if (!address) {
    return /*#__PURE__*/jsxRuntime.jsx(ConnectWallet, {
      className: className,
      ...themeProps
    });
  }

  const willSwitchNetwork = hasMismatch && !!switchNetwork;
  return /*#__PURE__*/jsxRuntime.jsx(ThemeProvider, { ...themeProps,
    children: /*#__PURE__*/jsxRuntime.jsx(Button, {
      className: className,
      style: {
        height: "50px",
        minWidth: "200px",
        width: "100%"
      },
      isLoading: mutation.isLoading || !contract,
      onClick: () => mutation.mutate(),
      isDisabled: willSwitchNetwork ? false : isDisabled,
      leftElement: willSwitchNetwork ? /*#__PURE__*/jsxRuntime.jsx(FiWifi.FiWifi, {
        width: "1em",
        height: "1em"
      }) : undefined,
      children: willSwitchNetwork ? "Switch Network" : children
    })
  });
};

exports.ConnectWallet = ConnectWallet;
exports.MediaRenderer = MediaRenderer;
exports.ThirdwebNftMedia = ThirdwebNftMedia;
exports.ThirdwebProvider = ThirdwebProvider;
exports.ThirdwebSDKProvider = ThirdwebSDKProvider;
exports.Web3Button = Web3Button;
exports.WrappedThirdwebSDKProvider = WrappedThirdwebSDKProvider;
exports.compilerMetadata = compilerMetadata;
exports.contractType = contractType;
exports.getErc1155 = getErc1155;
exports.getErc20 = getErc20;
exports.getErc721 = getErc721;
exports.getErcs = getErcs;
exports.useAccount = useAccount;
exports.useActiveClaimCondition = useActiveClaimCondition;
exports.useActiveListings = useActiveListings;
exports.useAddress = useAddress;
exports.useAirdropNFT = useAirdropNFT;
exports.useAllRoleMembers = useAllRoleMembers;
exports.useAuctionWinner = useAuctionWinner;
exports.useAuth = useAuth;
exports.useBalance = useBalance;
exports.useBatchesToReveal = useBatchesToReveal;
exports.useBidBuffer = useBidBuffer;
exports.useBurnNFT = useBurnNFT;
exports.useBurnToken = useBurnToken;
exports.useBuyNow = useBuyNow;
exports.useCancelListing = useCancelListing;
exports.useChainId = useChainId;
exports.useClaimConditions = useClaimConditions;
exports.useClaimIneligibilityReasons = useClaimIneligibilityReasons;
exports.useClaimNFT = useClaimNFT;
exports.useClaimToken = useClaimToken;
exports.useClaimedNFTSupply = useClaimedNFTSupply;
exports.useClaimedNFTs = useClaimedNFTs;
exports.useCoinbaseWallet = useCoinbaseWallet;
exports.useCompilerMetadata = useCompilerMetadata;
exports.useConnect = useConnect;
exports.useConnectedWallet = useConnectedWallet;
exports.useContract = useContract;
exports.useContractEvents = useContractEvents;
exports.useContractMetadata = useContractMetadata;
exports.useContractMetadataUpdate = useContractMetadataUpdate;
exports.useContractRead = useContractRead;
exports.useContractType = useContractType;
exports.useContractWrite = useContractWrite;
exports.useCreateAuctionListing = useCreateAuctionListing;
exports.useCreateDirectListing = useCreateDirectListing;
exports.useDelayedRevealLazyMint = useDelayedRevealLazyMint;
exports.useDesiredChainId = useDesiredChainId;
exports.useDisconnect = useDisconnect;
exports.useEdition = useEdition;
exports.useEditionDrop = useEditionDrop;
exports.useGnosis = useGnosis;
exports.useGrantRole = useGrantRole;
exports.useIsAddressRole = useIsAddressRole;
exports.useLazyMint = useLazyMint;
exports.useListing = useListing;
exports.useListings = useListings;
exports.useListingsCount = useListingsCount;
exports.useLogin = useLogin;
exports.useLogout = useLogout;
exports.useMagic = useMagic;
exports.useMakeBid = useMakeBid;
exports.useMarketplace = useMarketplace;
exports.useMetadata = useMetadata;
exports.useMetamask = useMetamask;
exports.useMintNFT = useMintNFT;
exports.useMintNFTSupply = useMintNFTSupply;
exports.useMintToken = useMintToken;
exports.useMultiwrap = useMultiwrap;
exports.useNFT = useNFT;
exports.useNFTBalance = useNFTBalance;
exports.useNFTCollection = useNFTCollection;
exports.useNFTDrop = useNFTDrop;
exports.useNFTs = useNFTs;
exports.useNetwork = useNetwork;
exports.useNetworkMismatch = useNetworkMismatch;
exports.useOwnedNFTs = useOwnedNFTs;
exports.usePack = usePack;
exports.usePlatformFees = usePlatformFees;
exports.usePrimarySaleRecipient = usePrimarySaleRecipient;
exports.useReadonlySDK = useReadonlySDK;
exports.useResetClaimConditions = useResetClaimConditions;
exports.useResolvedMediaType = useResolvedMediaType;
exports.useRevealLazyMint = useRevealLazyMint;
exports.useRevokeRole = useRevokeRole;
exports.useRoleMembers = useRoleMembers;
exports.useRoyaltySettings = useRoyaltySettings;
exports.useSDK = useSDK;
exports.useSDKChainId = useSDKChainId;
exports.useSetAllRoleMembers = useSetAllRoleMembers;
exports.useSetClaimConditions = useSetClaimConditions;
exports.useSignatureDrop = useSignatureDrop;
exports.useSigner = useSigner;
exports.useSplit = useSplit;
exports.useStorage = useStorage;
exports.useStorageUpload = useStorageUpload;
exports.useToken = useToken;
exports.useTokenBalance = useTokenBalance;
exports.useTokenDecimals = useTokenDecimals;
exports.useTokenDrop = useTokenDrop;
exports.useTokenSupply = useTokenSupply;
exports.useTotalCirculatingSupply = useTotalCirculatingSupply;
exports.useTotalCount = useTotalCount;
exports.useTransferBatchToken = useTransferBatchToken;
exports.useTransferNFT = useTransferNFT;
exports.useTransferToken = useTransferToken;
exports.useUnclaimedNFTSupply = useUnclaimedNFTSupply;
exports.useUnclaimedNFTs = useUnclaimedNFTs;
exports.useUpdateMetadata = useUpdateMetadata;
exports.useUpdatePlatformFees = useUpdatePlatformFees;
exports.useUpdatePrimarySaleRecipient = useUpdatePrimarySaleRecipient;
exports.useUpdateRoyaltySettings = useUpdateRoyaltySettings;
exports.useUser = useUser;
exports.useVote = useVote;
exports.useWalletConnect = useWalletConnect;
exports.useWalletLink = useWalletLink;
exports.useWinningBid = useWinningBid;