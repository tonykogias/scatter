import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function Tabs({setIsEth, isEth, setAddresses}) {

	const handleClickEth = () => {
    	setIsEth(true);
    	setAddresses("");
  	};

	const handleClickToken = () => {
		setIsEth(false);
		setAddresses("");
	};

	return(
		<Stack
	        direction="row"
	        justifyContent="center"
	        alignItems="center"
	        spacing={5}
	        sx={{
	          paddingTop: 5,
	          paddingBottom: 2,
	        }}
	     >
	        <Chip 
	          label="ETHER" 
	          onClick={handleClickEth}
	          variant={isEth ? "outlined" : ""}
	          sx={{
	            width: 120,
	            height: 40,
	            background: '#1d2026'
	          }} 
	         />
	        <Chip 
	          label="TOKEN"  
	          onClick={handleClickToken}
	          variant={!isEth ? "outlined" : ""}
	          sx={{
	            width: 120,
	            height: 40,
	            background: '#1d2026'
	          }} 
	        />
	    </Stack>
	)
}

export default Tabs;