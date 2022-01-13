import React from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { Text } from '../../globalStyles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import erc20abi from '../../abis/erc20abi.json';
import { ethers } from "ethers";
import { ToastContainer, toast } from 'react-toastify';
import {
 
} from './TransactionInput.elements';

function TransactionInput({isEth, setAddresses, addresses, tokenAddress, setTokenAddress}) {  

  const { account } = useWeb3React();
  const [balance, setBalance] = React.useState(0);
  const token = React.useRef({});
  // const [tokenAddress, setTokenAddress] = React.useState("");
  const [tokenBalance, setTokenBalance] = React.useState(0);
  const [tokenDecimals, setTokenDecimals] = React.useState(0);
  const [tokenName, setTokenName] = React.useState("");
  const [tokenSymbol, setTokenSymbol] = React.useState("");
  const [addressesAndAmounts, setAddressesAndAmounts] = React.useState("");

  const web3 = new Web3(window.web3.currentProvider);

  const getBalance = async () => {
    const b = await web3.eth.getBalance(account);
    setBalance(web3.utils.fromWei(b));
  }

  const handleChangeTokenAddress = (event) => {
    setTokenAddress(event.target.value);
  }

  const decimals = () => {
    return isEth ? 18 : tokenDecimals;
  }

  const handleChangeRecipAndAmounts = (event) => {
    setAddressesAndAmounts(event.target.value);
    event.preventDefault();
    parseInput();

  }

  const parseInput = () => {
    const pattern = new RegExp(/(0x[0-9a-fA-F]{40}).+?([0-9\.]+)/, 'g');
    
    let result;
    let data = [];

    while ((result = pattern.exec(addressesAndAmounts)) !== null) {
      
      try {
        data = [...data, {address: ethers.utils.getAddress(result[1]), value: ethers.utils.parseUnits(result[2], decimals())}]
      }catch(e){
        toast.error('Wrong address checksum.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored"
        });
      }
    }

    setAddresses([...data]);
  }

  const handleLoadToken = async () => {

    if(!tokenAddress) {
      toast.error('Enter token address.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored"
      });
      setTokenName("");
      return;
    }

    try{
      const addr = ethers.utils.getAddress(tokenAddress)
      setTokenAddress(addr);
    }catch(error){
      console.log("error on getAddress: ", error);
      toast.error('Invalid address.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored"
      });
      setTokenName("");
      setAddresses("");
      return;
    }
    
    try{
      const erc20 = new web3.eth.Contract(erc20abi, tokenAddress);
      console.log(erc20);
      token.current = erc20;
      const balance = await token.current.methods.balanceOf(account).call();
      setTokenBalance(web3.utils.fromWei(balance.toString()));
      setTokenName(await token.current.methods.name().call());
      setTokenSymbol(await token.current.methods.symbol().call());
      setTokenDecimals(await token.current.methods.decimals().call());
    }catch(error){
      console.log("Token not erc20 compatible.", error);
      toast.error('Unsupported token.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored"
      });
      setTokenName("");
      setAddresses("");
      return;
    }
  }

  React.useEffect(() => {
    getBalance();
  });

  return (
    <>
      <ToastContainer />
      { isEth ?
          <div>
            <Text>Your Balance: {balance} </Text>
            <Text>Enter an address and amount on each line. Format: address amount</Text>
            <TextField
              hiddenLabel
              fullWidth
              id="eth-input"
              multiline
              rows={4}
              placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a 2.71819"
              variant="filled"
              onChange={handleChangeRecipAndAmounts}
            />
          </div>
        :
          <div>
            <Text>Token address</Text>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <TextField
                fullWidth
                hiddenLabel
                id="token-address"
                placeholder="0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359"
                variant="filled"
                size="small"
                value={tokenAddress}
                onChange={handleChangeTokenAddress}
              />
              <Button 
                variant="outlined"
                size="large"
                onClick={handleLoadToken}
              >
              load
              </Button>
            </Stack>
            { tokenName ?
              <div>
                <Text>You have {tokenBalance} {tokenSymbol} ({tokenName})</Text>
                <Text>Enter an address and amount on each line. Format: address amount</Text>
                <TextField
                  hiddenLabel
                  fullWidth
                  id="token-input"
                  multiline
                  rows={4}
                  placeholder="0x314ab97b76e39d63c78d5c86c2daf8eaa306b182 3.141592&#10;0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a 2.71819"
                  variant="filled"
                  onChange={handleChangeRecipAndAmounts}
                />
              </div>
              :
              <></>
            }
          </div>
      }
      
    </>
  );
}

export default TransactionInput;
