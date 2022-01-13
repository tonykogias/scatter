import React from 'react';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { injected } from '../connectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NetworkSelector from './NetworkSelector';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import {
  Nav,
  NavbarContainer,
  ConnectButton
} from './Navbar.elements';


function Navbar() {

  const { active, account, activate, error } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      if(error instanceof UnsupportedChainIdError){
        toast.error('Network not supported.', {
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
      if(!window.ethereum){
        toast.error('Metamask is not installed.', {
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Nav>
        <ToastContainer />
        <NavbarContainer>
          { active ?
            <Stack 
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={1}
            >
              <Chip label={account} avatar={<Avatar src="https://tinyurl.com/ph9wrcuh" />} />
              <NetworkSelector />
            </Stack>
            :
            <ConnectButton onClick={connect}>Connect</ConnectButton>
          }
        </NavbarContainer>
      </Nav>
    </>
  );
}

export default Navbar;
