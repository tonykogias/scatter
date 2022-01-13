import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Description } from '../../globalStyles';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
import scatterAbi from '../../abis/scatterAbi.json';
import erc20abi from '../../abis/erc20abi.json';
import {
  ConfirmTitle,
  DetailsContainer,
  ExpandBar
} from './TransactionDetails.elements';

import web3 from 'web3';


function TransactionDetails({isEth, addresses, tokenAddress}) {

	const contractAddress = "0xFf2Cb5180f174A0B18edAa4c68f8D8A345824643";
	const Web3 = new web3(window.web3.currentProvider);
	const { account } = useWeb3React();
	const scatter = new Web3.eth.Contract(scatterAbi, contractAddress);
	const token = new Web3.eth.Contract(erc20abi, tokenAddress);
	const [isApproved, setIsApproved] = React.useState(false);
	
	const total = () => {
		return addresses.reduce(function(e, t) {
           		return e.add(t.value)
            }, ethers.constants.Zero)
	}

	const handleScatter = async () => {

		const add = addresses.map((d) => { return d.address; });
		const val = addresses.map((d) => { return d.value.toString(); });

		await scatter.methods.scatterEther(add, val).send({from: account, value: total().toString()}).then(function(r) {
			console.log("res:", r);
			toast.success('Transaction completed!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored"
      });
		}).catch(function(er){
			console.log("er: ", er);
			toast.error('Transaction failed.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored"
      });
		})
	}

	const handleApprove = async () => {
		await token.methods.approve(contractAddress, total().toString()).send({from: account}).then(function(r) {
			console.log("r: ", r);
			setIsApproved(true);
		}).catch(function(er){
			console.log("er:", er);
			setIsApproved(false);
		});
	}

	const handleTokenScatter = async () => {

		const add = addresses.map((d) => { return d.address; });
		const val = addresses.map((d) => { return d.value.toString(); });

		console.log("tok:", tokenAddress);

		await scatter.methods.scatterToken(tokenAddress, add, val).send({from: account}).then(function(r) {
			console.log("res:", r);
			setIsApproved(false);
			toast.success('Transaction completed!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored"
      });
		}).catch(function(er){
			console.log("er: ", er);
			toast.error('Transaction failed.', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored"
      });
		})
	}

	return(
		<>
			<ToastContainer />
			<ConfirmTitle>Confirm</ConfirmTitle>
			<Description style={{"float":"left"}}>address</Description>
			<Description style={{"float":"right"}}>amount</Description>
			<br /><br />
			
			<ul style={{"listStyleType" : "none"}}>
				{addresses.map(function(d, idx) {
					return(
						<li key={idx}>
							<DetailsContainer>
								<Description>{d.address}</Description>
								<ExpandBar />
								<Description>{web3.utils.fromWei(d.value.toString(), 'ether')}</Description>
							</DetailsContainer>
						</li>
					)
				})}
			</ul>

			{ isEth ?
				<Button 
					variant="outlined"
					size="large"
					onClick={handleScatter}
					sx={{
						"marginTop":"40px"
					}}
				>
					scatter
				</Button>
				:
				<>
					<ConfirmTitle>Allowance</ConfirmTitle>
					<Description>Allow Scatter smart contract to transfer tokens on your behalf.</Description>
					<Button 
						variant="outlined"
						size="large"
						onClick={handleApprove}
						sx={{
							"marginTop":"40px"
						}}
					>
						approve
					</Button>
					<br />
					{ isApproved ?
						<Button 
							variant="outlined"
							size="large"
							onClick={handleTokenScatter}
							sx={{
								"marginTop":"40px"
							}}
						>
							scatter token
						</Button>
						:
						<></>
					}
				</>
			}
			
		</>
	)
}

export default TransactionDetails;