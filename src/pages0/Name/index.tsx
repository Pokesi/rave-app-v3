import React from 'react';
import styled, { css } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { Typography, Input, CancelCircleSVG } from '@ensdomains/thorin';
import { Stack, Tooltip, Skeleton } from '@mui/material';
import NavBar from '../../components/NavBar';
import '../../global.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { create as uri } from '../../utils/uri';
import { create as contract } from '../../utils/contract';
import { create as external } from '../../utils/external';
import { Rave } from '@rave-names/rave';
import { truncateAddress } from '../../utils/addressManip';
import { Records } from './Records';
import { Grid } from 'theme-ui';
import Swal from 'sweetalert2';

const addressKeys = {
  btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=022',
  eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022',
  avax: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=022',
  bch: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=022',
  ftm: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=022',
  ltc: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=022',
  luna: 'https://cryptologos.cc/logos/terra-luna-luna-logo.svg?v=022',
  dot: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=022',
  xrp: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=022',
  bnb: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=022',
  atom: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=022',
}

interface Context {
  wallet: any;
  setWallet: any;
}

const prov = new ethers.providers.JsonRpcProvider("https://rpc.ftm.tools");

export const walletContext = React.createContext({
  wallet: prov,
  setWallet: undefined
} as Context);

const Wrapper = styled.div`
    margin-left: 2vh;
    margin-right: 2vh;
    border-radius: 17px;
    margin-top: 1vh;
    background-color: rgba(0,0,0,0.2);
    padding-bottom: 2vh;
    min-height: calc(100vh - 6vh - 10vh)
`;

const DetailsWrapper = styled.div`
    margin-left: 1vh;
    margin-right: 2vh;
    border-radius: 17px;
    margin-top: 1vh;
    background-color: rgba(0,0,0,0.2);
    padding-bottom: 2vh;
    min-width: calc(100vw - 4vh - 2vh - 2vh - 20vw - 4vh - 2vh);
    height: calc(100%);
`;

const Header = styled.h1`
  padding-left: 4vh;
  ${props => `
    ${props.sub && `padding-top: 2vh;`}
  `}
`;

const ActionButton = styled.button`
    border-radius: 17px;
    height: calc(9.75vh);
    margin-top: 1.25vh;
    border: none;
    background-image: linear-gradient(330deg, #03045E, #0096C7);
    width: 20vw;
    cursor: pointer;
    margin-left: 2vh;
`;

const ActionButtonAgain = styled.button`
    border-radius: 12px;
    height: calc(4.75vh);
    border: none;
    ${props => `${
      props.side ?
        `width: calc(100vw - 12vh);
         height: 9.5vh;
         margin-bottom: 20vh;` : 'width: 7.5vw; '}
    ${props.tab ?
      `background-color: rgba(0,0,0,0.3);
      margin-top: 2vh;
      height: 4.75vh;`: 'background-image: linear-gradient(330deg, #03045E, #0096C7);'}
    `}
    margin-left: 2vh;
    cursor: pointer;
    padding-top: -2vh;
`;

const MoreWrapper = styled.div`
  background-color: rgba(0,0,0,0.2);
  ${props => `
    width: ${props.width};
    height: ${props.height};
  `}
  margin-left: 2vw;
  border-radius: 17px;
  margin-bottom: 2vh;
`;

const MoreWrapperSideBar = styled.div`
  background-color: rgba(0,0,0,0.2);
  ${props => `
    width: ${props.width};
    height: ${props.height};
  `}
  margin-top: 2vh;
  margin-left: 2vh;
  border-radius: 17px;
`;

function cutArray(array, cutTo) {
    if (array.length <= cutTo) {
        return array;
    } else {
        let newArray = [];
        for (let i=0;i < cutTo;i++) {
            // @ts-ignore
            newArray.push(array[i]);
        }
        return newArray;
    }
}

function App() {
  const [ searchInput, setSInput ] = React.useState('');
  const history = useNavigate();
  let { name } = useParams();
  // wallet really means signer or provider
  const [ wallet, setWallet ] = React.useState(prov);
  const [ src, sss ] = React.useState('https://rave.domains/RaveBase.png');
  const [ owned, so ] = React.useState(false);
  const [
    data,
    setData
  ] = React.useState({
    avatar: "https://rave.domains/RaveBase.png",
    addresses: {}
  });
  const [ owner, setOwner ] = React.useState<any>();
  const [ isOwner, setIO ] = React.useState(false);
  const [ tab, setTab ] = React.useState<number>(0);
  const [ tokenId, setT ] = React.useState<number>(-1);
  // loading is true if not loading
  const [ loading, setLoading ] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(false);
    const get = async () => {
      sss('');
      so(false);
      setOwner('');
      setIO(false);
      setTab(0);
      setT(-1);
      sss(JSON.parse(atob((await (uri(wallet)).generate(`${name}.ftm`)).split(';base64,')[1]))['image']);
      const none = (JSON.parse(atob((await (uri(wallet)).generate(`None Set`)).split(';base64,')[1]))['image']);
      so((await ((new Rave()).isOwned(`${name}.ftm`)))[0]);
      setOwner((await ((contract(wallet)).getOwner(`${name}.ftm`))))
      // @ts-ignore
      try { setIO((await wallet.getAddress()) === owner); } catch (e) { console.warn('no signer'); }
      const a = (await ((contract(wallet)).getAvatar(`${name}.ftm`)));
      const ad = (await ((contract(wallet)).getAddresses(`${name}.ftm`)));
      setData({
        avatar:  (a.length > 0) ? (a) : none,
        addresses: JSON.parse((ad.length > 0) ? (ad) : "{}"),
      });
      try { const ownednames = (await (contract(wallet)).getNames(owner));
      console.log(ownednames);
      const indexOfName = ownednames.indexOf(`${name}.ftm`);
      console.log(indexOfName);
      const tokenId = (await (contract(wallet)).tokenOfOwnerByIndex(owner, indexOfName));
      console.log(tokenId);
      setT(tokenId); } catch (e) { console.warn('failed to fetch tokenId', e) }
      console.log('done')
    }
    get().then(() => {
      setLoading(true);
    });
  }, [wallet, name]);

  document.title = `${name}.ftm | Rave Names - The cheapest web3 usernames`;

  if (tab === 1) {
    return (
      <walletContext.Provider value={{
        wallet: wallet,
        setWallet: setWallet
      }}>
        <Stack style={{
          minHeight: '100vh'
        }}>
          <NavBar mobile/>
          <Wrapper id={`rave--name-${name}`}>
            {(loading) ? <Stack direction="column">
              <Stack>
                <img src={src} style={{
                  margin: '2vh 2vh',
                  borderRadius: '17px',
                  width: 'calc(100% - 4vh)'
                }}/>
                <div>
                  <ActionButton
                    onClick={(!owned) ? (() => {
                      (contract(wallet)).registerName(name, { value: ethers.utils.parseEther('5') })
                    }) : (() => {
                      //
                    })}
                    style={{
                      width: 'calc(100% - 4vh)'
                    }}
                  >
                    <p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: `${owned ? '16px' : '22px'}` }}>{owned ? `${name}.ftm is owned` : `Register ${`${name}.ftm`}`}</p>
                  </ActionButton>
                </div>
                <MoreWrapperSideBar width="calc(100% - 6vh)" height="10vh" style={{
                  paddingLeft: '2vh',
                }}>
                  {owned ? <><a href={`https://ftmscan.com/address/${owner || "0x0"}`} style={{ textDecoration: 'none' }}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '18px' }}>Owned by {owner ? truncateAddress(owner) : 'N/A'}</p></a></> : <p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '18px', listStyleType: 'none' }}>{name} is not owned</p>}

                </MoreWrapperSideBar>
              </Stack>
              <Stack direction="column">
                <Stack direction="row" style={{ justifyContent: 'center', width: 'calc(100% - 4vh)' }}>
                  <ActionButtonAgain tab onClick={() => setTab(0)} style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px' }}>Details</p></ActionButtonAgain>
                  <Tooltip title="Set records"><ActionButtonAgain tab onClick={() => setTab(1)} style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px'}}>Records</p></ActionButtonAgain></Tooltip>
                  <Tooltip title={(tokenId === -1) ? "Token ID not fetched" : "Sell on PaintSwap"} style={{ width: '3px'}}><a href={`https://paintswap.finance/marketplace/assets/0x14ffd1fa75491595c6fd22de8218738525892101/${tokenId}`} style={{ textDecoration: 'none' }}><ActionButtonAgain tab  style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px'}}>Sell</p></ActionButtonAgain></a></Tooltip>
                </Stack>
                <DetailsWrapper>
                  <Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display' }}>{name}.ftm's Records</Header>
                  <Stack direction="column">
                    <MoreWrapper width="calc(100vw - 10vh)" height="calc(70vw + 20vh)">
                      <Records name={name as string} isOwner={isOwner} contract={external(wallet)} />
                    </MoreWrapper>
                  </Stack>
                </DetailsWrapper>
              </Stack>
            </Stack> : <Stack direction="row"><Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', width: '50%' }}>{name}.ftm Loading...</Header><Skeleton animation='wave' variant="rounded" width='100%' height='100%' /></Stack>}
          </Wrapper>
        </Stack>
      </walletContext.Provider>
    )
  }

  return (
    <walletContext.Provider value={{
      wallet: wallet,
      setWallet: setWallet
    }}>
      <Stack style={{
        minHeight: '100vh'
      }}>
        <NavBar mobile/>
        <Wrapper id={`rave--name-${name}`}>
          {(loading) ? <Stack direction="column">
            <Stack>
              <img src={src} style={{
                margin: '2vh 2vh',
                borderRadius: '17px',
                width: 'calc(100% - 4vh)'
              }}/>
              <div>
                <ActionButton
                  onClick={(!owned) ? (() => {
                    (contract(wallet)).registerName(name, { value: ethers.utils.parseEther('5') })
                  }) : (() => {
                    //
                  })}
                  style={{
                    width: 'calc(100% - 4vh)'
                  }}
                >
                  <p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: `${owned ? '16px' : '22px'}` }}>{owned ? `${name}.ftm is owned` : `Register ${`${name}.ftm`}`}</p>
                </ActionButton>
              </div>
              <MoreWrapperSideBar width="calc(100% - 6vh)" height="10vh" style={{
                paddingLeft: '2vh',
              }}>
                {owned ? <a href={`https://ftmscan.com/address/${owner || "0x0"}`} style={{ textDecoration: 'none' }}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '18px' }}>Owned by {owner ? truncateAddress(owner) : 'N/A'}</p></a> : <p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '18px', listStyleType: 'none' }}>{name} is not owned</p>}
              </MoreWrapperSideBar>
            </Stack>
            <Stack direction="column">
              <Stack direction="row" style={{ justifyContent: 'center', width: 'calc(100% - 4vh)' }}>
                <ActionButtonAgain tab onClick={() => setTab(0)} style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px' }}>Details</p></ActionButtonAgain>
                <Tooltip title="Set records"><ActionButtonAgain tab onClick={() => setTab(1)} style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px'}}>Records</p></ActionButtonAgain></Tooltip>
                <Tooltip title={(tokenId === -1) ? "Token ID not fetched" : "Sell on PaintSwap"} style={{ width: '3px'}}><a href={`https://paintswap.finance/marketplace/assets/0x14ffd1fa75491595c6fd22de8218738525892101/${tokenId}`} style={{ textDecoration: 'none' }}><ActionButtonAgain tab  style={{ width: 'calc(33vw - 4vh)'}}><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '11px'}}>Sell</p></ActionButtonAgain></a></Tooltip>
              </Stack>
              <DetailsWrapper>
                <Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display' }}>{name}.ftm details</Header>
                <Stack direction="column">
                  <MoreWrapper width="calc(100vw - 10vh)" height="calc(70vw + 10vh)">
                    <Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display' }} sub>
                      Avatar <ActionButtonAgain onClick={() => {
                        Swal.fire({
                          title: `Set an avatar for ${name}.ftm`,
                          html: `You must enter a link, containing your avatar. <br><br>This link should be in .png or .jpg form.<br><br>Learn more at our <a href='https://docs.rave.domains/'>docs</a>.`,
                          icon: 'info',
                          input: 'text',
                          inputAttributes: {
                            autoCapitalize: 'off'
                          },
                          showDenyButton: true,
                          showConfirmButton: true,
                          confirmButtonText: 'Set!',
                          denyButtonText: 'No thanks...'
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            (contract(wallet)).setAvatar(`${name}.ftm`, result.value).catch((e) => {
                              console.error(e);
                            });
                          }
                        });
                      }} style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '17px', width: '20vw' }}>Set</ActionButtonAgain>
                    </Header>
                    <img src={data.avatar} style={{
                      margin: '0 2vh',
                      borderRadius: '17px',
                      width: '50vw'
                    }}/>
                  </MoreWrapper>
                  <MoreWrapper width="calc(100vw - 10vh)" height="calc(140vw + 10vh)">
                    <Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display' }} sub>
                      Addresses <ActionButtonAgain onClick={() => {
                        Swal.fire({
                          title: 'Set wallet addresses for different chains.',
                          confirmButtonText: 'Set!',
                          denyButtonText: 'No Thanks...',
                          showDenyButton: true,
                          showConfirmButton: true,
                          html:
                            '<p>Input your wallet addresses for different blockchains here, and have them stored on-chain! You can leave some fields blank. <br />' +
                            '<input id="btc" placeholder="Bitcoin" class="swal2-input">' +
                            '<input id="eth" placeholder="Ethereum" class="swal2-input">' +
                            '<input id="bch" placeholder="Bitcoin Cash" class="swal2-input">' +
                            '<input id="ltc" placeholder="Litecoin" class="swal2-input">' +
                            '<input id="xrp" placeholder="Ripple" class="swal2-input">' +
                            '<input id="avax" placeholder="Avalanche C-Chain" class="swal2-input">' +
                            '<input id="bnb" placeholder="BNB on BSC" class="swal2-input">' +
                            '<input id="luna" placeholder="Terra LUNA" class="swal2-input">' +
                            '<input id="near" placeholder="Near" class="swal2-input">' +
                            '<input id="atom" placeholder="Cosmos" class="swal2-input">',
                          preConfirm: function () {
                            return new Promise(function (resolve) {
                              resolve({
                                btc: $('#btc').val(),
                                eth: $('#eth').val(),
                                bch: $('#bch').val(),
                                ltc: $('#ltc').val(),
                                xrp: $('#xrp').val(),
                                avax: $('#avax').val(),
                                bnb: $('#bnb').val(),
                                luna: $('#luna').val(),
                                near: $('#near').val(),
                                atom: $('#atom').val(),
                              })
                            })
                          },
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            (contract(wallet)).setAddresses(`${name}.ftm`, JSON.stringify(result.value)).catch((e) => {
                              console.error(e);
                            });
                          }
                        })
                      }} style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: '17px', width: '20vw'}}>Set</ActionButtonAgain>
                    </Header>
                    <Grid gap={2} style={{
                      alignItems: "center",
                      alignSelf: "center",
                      textAlign: "center",
                      marginLeft: '2vh' }}>
                      {Object.entries(data.addresses).map( function (item, key) {
                        return <>{(item[1] !== "") && <Tooltip title={`Click to copy`}><button style={{
                          border: 'none',
                          background: 'rgba(0,0,0,0.2)',
                          color: '#FFF',
                          cursor: 'pointer',
                          borderRadius: '15px',
                          fontFamily: 'Nunito Sans',
                          padding: '2vh 0.5vh',
                          width: '95%',
                          fontSize: '16px'}}
                          onClick={() => {
                            /* @ts-ignore */
                            navigator.clipboard.writeText(item[1])
                          }}>
                          <Stack spacing={2} direction='row'>
                            {/* @ts-ignore */}
                            <img src={addressKeys[item[0]]} alt={`${item[0]}`} style={{
                              height: '27px',
                              width: '27px',
                              paddingLeft: '2vh',
                            }}/>
                            {/* @ts-ignore */}
                            <p>{truncateAddress(item[1])}</p>
                          </Stack>
                        </button></Tooltip>}</>
                      })}
                    </Grid>
                  </MoreWrapper>
                </Stack>
                {isOwner && <ActionButtonAgain onClick={() => {Swal.fire({
                  title: `Transfer ${name}.ftm`,
                  html: `This will transfer ALL ownership of the name ${name}.ftm. Be careful with this.<br><br>Learn more at our <a href='https://docs.rave.domains'>docs</a>.`,
                  icon: 'info',
                  input: 'text',
                  inputAttributes: {
                    autoCapitalize: 'off'
                  },
                  showDenyButton: true,
                  showConfirmButton: true,
                  confirmButtonText: 'Set!',
                  denyButtonText: 'No thanks...'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    contract(wallet).safeTransferFrom(owner, result.value, name).catch((e) => {
                      console.error(e);
                    });
                  }
                });}} side><p style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', fontSize: `22px` }}>Transfer</p></ActionButtonAgain>}
              </DetailsWrapper>
            </Stack>
          </Stack> : <Stack direction="row"><Header style={{ color: '#0FFFF0', fontFamily: 'Red Hat Display', width: '100%', fontSize: '23px' }}>{name}.ftm Loading...</Header><Skeleton animation='wave' variant="rounded" width='100%' height='100%' /></Stack>}
        </Wrapper>
      </Stack>
    </walletContext.Provider>
  )
}

export default App;
