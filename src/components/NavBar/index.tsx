import React from 'react';
import styled, { css } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { Typography, Input, CancelCircleSVG } from '@ensdomains/thorin';
import { Stack } from '@mui/material';
import { normaliseName } from '../../components/SearchBar';
import '../../global.css';
import './navbar.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { walletContext } from '../../pages/Name';
import { walletContext as wcm } from '../../pages0/Name';
import { ethers } from 'ethers';
import { truncateAddress } from '../../utils/addressManip';

const SearchInputWrapperN = styled.input`
    z-index: 1;
    box-shadow: 2px;
    border-radius: 20px;
    border-width: 0px;
    border-color: #282c34;
    width: 100%;
    ${props =>
      `${props.mobile ? `width: 90vw;` : `max-width: 70%;`}`
    }
    margin-top: 2vh;
    background-color: rgba(0,0,0,0.2);
    background-opacity: 10%;
    /* ----- */
    height: 10vh;
    padding: 12px 20px;
    padding-block-start: 20px;
    padding-block-end: 20px;
    padding-right: 26%;
    padding-left: 5vh;
    font-size: 21px;
    margin: 8px 0;
    margin-right: 4px;
    margin-left: 10px;
    box-sizing: border-box;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    outline: none;
    color: #0FFFF0;
    &:focus {
      border: 3px solid rgb(20, 20, 20);
    }
    & input::placeholder {
      color: #282c34;
      font-weight: 600;
    }`;

const Search = ({
  input,
  setInput,
  history,
  mobile = false
}:{
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  history: any,
  mobile?: boolean,
}) => {
  return <SearchInputWrapperN
      value={input}
      onChange={(e: any) => setInput(normaliseName(e.target.value))}
      placeholder={'Find your .ftm name...'}
      id={'rave--searchbar-nav'}
      onKeyDown={(e) => {
        console.log(e);
        if (e.keyCode === 13)
          history(`../name/${input}`)
      }}
      mobile
    />
}

const Wrapper = styled.div`
    padding-left: 2vh;
`;

const LinkButton = styled.button`
    border-radius: 17px;
    height: calc(9.75vh);
    margin-top: 1.25vh;
    border: none;
    background-color: rgba(0,0,0,0.2);
    background-opacity: 10%;
    ${props => `width: ${props.mobile ? '90vw' : '7.5vw'};`}
    cursor: pointer;
    margin-left: 2vw;
`;

const ConnectButton = styled.button`
    border-radius: 17px;
    height: calc(9.75vh);
    border: none;
    background-image: linear-gradient(330deg, #03045E, #0096C7);
    ${props => `width: ${props.mobile ? '90vw' : '20vw'};
    ${props.mobile ? '' : 'margin-top: 1.25vh;'}`}
    cursor: pointer;
    margin-left: 2vw;
    margin-right: 2vh;
`;

function App({
  homePage = false,
  mobile = false
}:{
  homePage?: boolean,
  mobile?: boolean,
}) {
  const [ searchInput, setSInput ] = React.useState('');
  const [ address, setAddress ] = React.useState('');
  const history = useNavigate();
  let { name } = useParams();
  const { wallet, setWallet } = React.useContext(mobile ? wcm : walletContext);

  const connectWallet = async () => {
    // @ts-ignore
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0xFA",
          rpcUrls: ["https://rpc.ftm.tools"],
          chainName: "Fantom Opera",
          nativeCurrency: {
            name: "FTM",
            symbol: "FTM",
            decimals: 18,
          },
          blockExplorerUrls: ["https://ftmscan.com/"],
        },
      ],
    });

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum, 250);
    let signer = provider.getSigner();
    setWallet(signer);
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    setAddress(account);
  };

  if (mobile) {
    return (
      <Wrapper className={homePage ? 'Nav' : ''}>
        <Stack direction="column">
          <Link to="/"><LinkButton mobile><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '18px' }}>Home</p></LinkButton></Link>
          <Search input={searchInput} setInput={setSInput} history={history} mobile/>
          <ConnectButton mobile onClick={() => {if (address) { setWallet(new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools')); setAddress('') } else { connectWallet() }}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: address ? '16px' : '18px' }}>{address ? truncateAddress(address) : "Connect Wallet"}</p></ConnectButton>
        </Stack>
      </Wrapper>
    )
  }

  return (
    <Wrapper className={homePage ? 'Nav' : ''}>
      <Stack direction="row">
        <Link to="/"><img src="https://rave.domains/RaveBase.png" style={{height: '9.5vh', marginTop: '1.25vh'}}/></Link>
        <Link to="/"><LinkButton><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '20px' }}>Home</p></LinkButton></Link>
        <Search input={searchInput} setInput={setSInput} history={history} />
        <ConnectButton onClick={() => {if (address) { setWallet(new ethers.providers.JsonRpcProvider('https://rpc.ftm.tools')); setAddress('') } else { connectWallet() }}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: address ? '16px' : '20px' }}>{address ? truncateAddress(address) : "Connect Wallet"}</p></ConnectButton>
      </Stack>
    </Wrapper>
  )
}

export default App;
