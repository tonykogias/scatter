import React from 'react';
import Tabs from '../Tabs/Tabs';
import TransactionInput from '../TransactionInput/TransactionInput';
import TransactionDetails from '../TransactionDetails/TransactionDetails';
import { useWeb3React } from '@web3-react/core';
import { Text, Description } from '../../globalStyles';
import {
  Page,
  Title
} from './AppContainer.elements';

function AppContainer() {  

  const { active } = useWeb3React();
  const [isEth, setIsEth] = React.useState(true);
  const [addresses, setAddresses] = React.useState([]);

  return (
    <Page>
      <Title>Scatter</Title>
      <Description>Distribute ether or tokens to multiple addresses on Optimistic Ethereum or Optimistic Kovan network.</Description>
      { active ?
          <div>
            <Tabs setIsEth={setIsEth} isEth={isEth} setAddresses={setAddresses}/>
            <TransactionInput isEth={isEth} setAddresses={setAddresses} addresses={addresses} />
            { addresses.length > 0 ?
              <div>
                <TransactionDetails addresses={addresses} />
              </div>
            :
              <div></div>
            }
          </div>
        :
          <Text>Please connect with Metamask.</Text>
      }
    </Page>
  );
}

export default AppContainer;
