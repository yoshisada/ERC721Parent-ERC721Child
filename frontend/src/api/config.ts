const backendURL = process.env['NEXT_PUBLIC_BACKEND_URL']
const appEnv = 'prod'
//process.env['NEXT_PUBLIC_APP_ENV']

function getDevConfig() {
  const config = getStagConfig()
  return {
    ...config,
    backend: {
      url: backendURL ?? "http://localhost:3000"
    }
  }
}

function getStagConfig() {
  const chainNum = 80001
  return {
    backend: {
      url: backendURL ?? ""
    },
    addresses: {
      parent: '0x226649bdD376d895323ca4F6672FaA89aB43DD24',
      child1: '0x5667F7CD2E87c028c99e5069b35709d02BdE543b',
      child2: '0x5667F7CD2E87c028c99e5069b35709d02BdE543b',
      storefrontAddress: '0x3f080909dB05218F42BfAceC139DfE3875a19de6'
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Mumbai Testnet",
      rpcUrls: [process.env.MUMBAI_RPC],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      nativeCurrency: {
        name: "Mumbai Matic",
        symbol: "MATIC",
        decimals: 18
      }
    }
  }
}

function getProdConfig() {
  const chainNum = 137
  return {
    backend: {
      url: backendURL ?? "http://thisabled-backend:3000"
    },
    addresses: {
      parent: '0x226649bdD376d895323ca4F6672FaA89aB43DD24',
      child1: '0x5667F7CD2E87c028c99e5069b35709d02BdE543b',
      child2: '0x5667F7CD2E87c028c99e5069b35709d02BdE543b',
      storefrontAddress: '0x3f080909dB05218F42BfAceC139DfE3875a19de6'
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Polygon Mainnet",
      rpcUrls: ["https://polygon-mainnet.g.alchemy.com/v2/Kj8vOvGNglxgj8ZbQgUs9iSP5hL-HEO-"],
      blockExplorerUrls: ["https://polygonscan.com/"],
      nativeCurrency: {
        name: "Matic Token",
        symbol: "MATIC",
        decimals: 18
      }
    }
  }
}

export const config = 
  appEnv === 'prod'
    ? getProdConfig()
    : appEnv === 'stag' 
      ? getStagConfig()
      : getDevConfig()