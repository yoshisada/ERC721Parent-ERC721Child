import { storefrontABI } from './abis/storefront.abi'
import { useBackendAPI } from './backend-interface'
import { useMetaMask } from 'metamask-react'
import { config } from './config'
import { useState } from 'react'
import { ethers } from 'ethers'

export const useMetaMaskInterface = () => {
    const { ethereum, status: metaMaskStatus, account: metaMaskAccount, chainId, connect, switchChain, addChain } = useMetaMask()
    const { fetchParentNFT, fetchNFTOwners } = useBackendAPI();

    const [metaMaskFocus, setMetaMaskFocus] = useState(false)
    const [metaMaskError, setMetaMaskError] = useState('')
    const [pendingId, setPendingId] = useState('')
    const [txSuccessful, setTxSuccessful] = useState(false)
    const [resyncData, setResyncData] = useState(false)


    const parseError = (err: any) => {
        console.log(err?.code)
        return err?.code === 'INSUFFICIENT_FUNDS' || err?.code === -32000
    }

    const getParentToken = async (address : any) => {
        const data = await fetchParentNFT();
        const parentMinteds = data.parentMinteds;
        const target = parentMinteds.filter((parent:any)=> parent.owner === address);
        if (target.length) {
            return target[0].childId;
        } else {
            return '';
        }
    }

    const checkChain = async () => {
        const cid = config.contractParams.chainId
        if(chainId != cid){
        try{
            await switchChain(cid)
        }
        catch(error){
            if((error as any).code === 4902){
                await addChain(config.contractParams)
            }
            else{
                console.error("An error occurred while attempting to switch MetaMask networks")
            }
        }
        }
    }

    const connectMetaMask = async () => {
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

    // Create into mint parent, mint child1, mint child2
    // mintChild1, mintChild2 parameter: parent id

    const mintParent = async () => {
        if (metaMaskStatus === "connected") {
            setMetaMaskFocus(true);
            await checkChain();
            const metaMaskSigner = await getMetaMaskSigner();
            const storefrontContract = new ethers.Contract(config.addresses.storefrontAddress, storefrontABI, metaMaskSigner)
            
            try {
                const mintTx = await storefrontContract.mintParent()
                setMetaMaskFocus(false);
                setPendingId(mintTx.hash);
                await mintTx.wait();
                setTxSuccessful(true);
                setMetaMaskError('');
                setResyncData(true);

            } catch (err) {
                if (parseError(err)) {
                    setMetaMaskError("Insufficient Funds")
                } else {
                    setMetaMaskError("Unexpected error occurred while minting. Please try again.")
                }
                setMetaMaskFocus(false);
            }

        } else {
            setMetaMaskError("Please connect your wallet to mint.");
        }
    }

    const mintChild1 = async () => {
        if (metaMaskStatus === "connected") {
            setMetaMaskFocus(true);
            await checkChain();
            const metaMaskSigner = await getMetaMaskSigner();
            const storefrontContract = new ethers.Contract(config.addresses.storefrontAddress, storefrontABI, metaMaskSigner)
            const parentTokenId = await getParentToken(metaMaskAccount);

            if (parentTokenId === -1) {
                setMetaMaskError('Given address does not have a Parent token.');
                setMetaMaskFocus(false);
                return
            }

            try {
                const mintTx = await storefrontContract.mintChild1(parentTokenId)
                setMetaMaskFocus(false);
                setPendingId(mintTx.hash);
                await mintTx.wait();
                setTxSuccessful(true);
                setMetaMaskError('');
                setResyncData(true);

            } catch (err) {
                if (parseError(err)) {
                    setMetaMaskError("Insufficient Funds")
                } else {
                    setMetaMaskError("Unexpected error occurred while minting. Please try again.")
                }
                setMetaMaskFocus(false);
            }

        } else {
            setMetaMaskError("Please connect your wallet to mint.");
        }
    }

    const mintChild2 = async () => {
        if (metaMaskStatus === "connected") {
            setMetaMaskFocus(true);
            await checkChain();
            const metaMaskSigner = await getMetaMaskSigner();
            const storefrontContract = new ethers.Contract(config.addresses.storefrontAddress, storefrontABI, metaMaskSigner)
            const parentTokenId = await getParentToken(metaMaskAccount);

            if (parentTokenId === -1) {
                setMetaMaskError('Given address does not have a Parent token.');
                setMetaMaskFocus(false);
                return
            }
            
            try {
                const mintTx = await storefrontContract.mintChild2(parentTokenId)
                setMetaMaskFocus(false);
                setPendingId(mintTx.hash);
                await mintTx.wait();
                setTxSuccessful(true);
                setMetaMaskError('');
                setResyncData(true);

            } catch (err) {
                if (parseError(err)) {
                    setMetaMaskError("Insufficient Funds")
                } else {
                    setMetaMaskError("Unexpected error occurred while minting. Please try again.")
                }
                setMetaMaskFocus(false);
            }

        } else {
            setMetaMaskError("Please connect your wallet to mint.");
        }
    }

    return {
        ethers,
        metaMaskStatus,
        metaMaskAccount,
        metaMaskFocus,
        metaMaskError,
        pendingId,
        txSuccessful,
        resyncData,
        setResyncData,
        checkChain,
        connectMetaMask,
        getParentToken,
        mintParent,
        mintChild1,
        mintChild2

    }

}