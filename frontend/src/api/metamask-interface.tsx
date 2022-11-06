import { useMetaMask } from 'metamask-react'
import { config } from './config'
import { useState } from 'react'
import { ethers } from 'ethers'

export const useMetaMaskInterface = () => {
    const { ethereum, status: metaMaskStatus, account: metaMaskAccount, chainId, connect, switchChain, addChain } = useMetaMask()

    const [metaMaskFocus, setMetaMaskFocus] = useState(false)
    const [metaMaskError, setMetaMaskError] = useState('')

    const checkChain = async () => {
        const cid = config.contractParams.chainId
        if(chainId != cid){
        try{
            await switchChain(cid)
        }
        catch(error){
            //Chain ID has not been added to MetaMask
            if((error as any).code === 4902){
                await addChain(config.contractParams)
            }
            else{
                console.error("An error occurred while attempting to switch MetaMask networks")
            }
        }
        }
    }

    const connectMetaMask= async () => {
        if (metaMaskStatus === "notConnected") {
            setMetaMaskFocus(true);
            try {
                await connect();
                await checkChain();

            } catch (err) {
                setMetaMaskError('Error while trying to connect.')
            }
            setMetaMaskFocus(false);
        } else if (metaMaskStatus === "unavailable") {
            window.confirm("MetaMask is not installed.");
            return
        }
	}

    const getMetaMaskSigner = async () => {
        if (metaMaskStatus == "connected") {
            const metaMaskProvider = new ethers.providers.Web3Provider(window.ethereum)
            await metaMaskProvider.send("eth_requestAccounts", [])
            return metaMaskProvider.getSigner()
        } else {
            throw Error("MetaMask not connected.")
        }
    }

    return {
        ethers,
        metaMaskStatus,
        metaMaskAccount,
        metaMaskFocus,
        metaMaskError,
        checkChain,
        connectMetaMask,
    }

}