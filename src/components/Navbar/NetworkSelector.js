import React, { useRef } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function NetworkSelector() {

	const [network, setNetwork] = React.useState("ddddd");
  const chainId = useRef("");
  const chainName = useRef("");
  const rpcUrl = useRef("");

	const handleChange = async (event) => {
	    setNetwork(event.target.value);
      switch(event.target.value) {
        case "OE":
          chainId.current = "0xA";
          chainName.current = "Optimistic Ethereum";
          rpcUrl.current = "https://mainnet.optimism.io";
          break;
        case "OK":
          chainId.current = "0x45";
          chainName.current = "Optimistic Ethereum (Kovan)";
          rpcUrl.current = "https://kovan.optimism.io/";
          break;
      }
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId.current }],
        });
      } catch (error) {
        if (error.code === 4902) {
          console.log("rpc: ", rpcUrl.current)
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: chainName.current,
                  chainId: chainId.current,
                  rpcUrl: rpcUrl.current,
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
	};

	return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel shrink id="select-network">Network</InputLabel>
        <Select
          labelId="select-network"
          id="select-network"
          value={network}
          onChange={handleChange}
        >
		      <MenuItem value="OE">Optimistic Ethereum</MenuItem>
		      <MenuItem value="OK">Optimistic Kovan</MenuItem>
        </Select>
    </FormControl>
  	);
}

export default NetworkSelector;
