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
  const chainNum = 4
  return {
    backend: {
      url: backendURL ?? "http://thisabled-backend:3000"
    },
    addresses: {
      storefrontAddress: '',
      nftAddress: ''
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Rinkeby Testnet",
      rpcUrls: ["https://rinkeby.infura.io/v3/"],
      blockExplorerUrls: ["https://rinkeby.etherscan.io/"],
      nativeCurrency: {
        name: "Rinkeby Ether",
        symbol: "ETH",
        decimals: 18
      }
    }
  }
}

function getProdConfig() {
  const chainNum = 1
  return {
    backend: {
      url: backendURL ?? "http://thisabled-backend:3000"
    },
    addresses: {
      storefrontAddress: '',
      nftAddress: ''
    },
    contractParams: {
      chainId: `0x${chainNum.toString(16)}`,
      chainName: "Ethereum Mainnet",
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      blockExplorerUrls: ["https://etherscan.io/"],
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
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