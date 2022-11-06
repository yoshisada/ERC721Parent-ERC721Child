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
      parent: '0x4eB871943Af8F302536b78D7Ed3167f13bB931FA',
      child1: '0x0b846F3c5505236d5Cc8a4fD15ee5cF174db2987',
      child2: '0x03D08D67a32659816e4F8c4c7813251789bf256FZ',
      storefrontAddress: '0xa57079afC7a1E9A38c6368d9789bE007Da9101b6'
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Mumbai Testnet",
      rpcUrls: [process.env.MUMBAI_RPC],
      blockExplorerUrls: ["https://polygonscan.com/"],
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