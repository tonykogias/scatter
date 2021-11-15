import Navbar from './components/Navbar/Navbar';
import AppContainer from './components/AppContainer/AppContainer';
import GlobalStyle from './globalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Web3ReactProvider getLibrary={getLibrary}>
          <Navbar />
          <AppContainer />
        </Web3ReactProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

