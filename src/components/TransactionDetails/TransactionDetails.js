import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { Text, Description } from '../../globalStyles';
import Button from '@mui/material/Button';
import { ethers } from "ethers";
import scatterAbi from '../../abis/scatterAbi.json';
import {
  ConfirmTitle,
  DetailsContainer,
  ExpandBar
} from './TransactionDetails.elements';

import web3 from 'web3';


function TransactionDetails({addresses}) {

	const contractAddress = "0x82F02debB6b7066592a56A0FA55C016fdd69176F";
	const Web3 = new web3(window.web3.currentProvider);
	

	const handleScatter = async () => {

		const add = addresses.map((d) => { return d.address; });
		const val = addresses.map((d) => { return d.value.toString(); });

		const scatter = new Web3.eth.Contract(scatterAbi, contractAddress);
		console.log("add: ", add);
		console.log("val: ", val);
		console.log("scatter: ", scatter.methods);
		await scatter.methods.scatterEther(add, val).send({from: '0xd71500AD407dCcEe1C0d1a0Cd34E2707835Bea8D'}).then(function(r) {
			console.log("r: ", r);
		}).catch(function(er){
			console.log("er: ", er);
		})
	}

	return(
		<>
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
								<Description>{ethers.utils.formatEther(d.value.toString())}</Description>
							</DetailsContainer>
						</li>
					)
				})}
			</ul>

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
		</>
	)
}

export default TransactionDetails;