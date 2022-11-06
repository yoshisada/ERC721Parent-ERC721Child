const backendURL = process.env['NEXT_PUBLIC_BACKEND_URL']
const appEnv = process.env['NEXT_PUBLIC_APP_ENV']

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
      url: backendURL ?? "http://thisabled-backend:3000"
    },
    addresses: {
      parent: '0x1892b2bE1BA9d91360777E46748a39Fd5Bd4822C',
      child1: '0x124ca2A83819819bEc250A7bED9D3b847FB2936B',
      child2: '0x051d1A22E58b62104aD112Da585EcFafD5c48D14',
      storefrontAddress: '0xc24c5028663850bfDdae07e246C731D5c4Ae857A'
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
      parent: '',
      child1: '',
      child2: '',
      storefrontAddress: ''
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Polygon Mainnet",
      rpcUrls: ["https://polygon-rpc.com/"],
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