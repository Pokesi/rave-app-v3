import React from 'react';
import styled, { css } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { Typography, Input, CancelCircleSVG } from '@ensdomains/thorin';
import { Stack } from '@mui/material';
import { SearchComponentMobile as SearchComponent } from '../../components/SearchBar';
import '../../global.css';
// @ts-ignore
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import {
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Avatar,
  Description as Desc,
  Gallery,
  Integrations
} from './Cards';

const GradientBG = styled.p`
    color: #caf0f8;
    background-image: linear-gradient(90deg, #03045e, #0096c7);
    padding: 0 8px;
    border-radius: 8.8px;
    margin-top: 0vh;
  `;

const Description = styled.p`
    line-height: 12px;
    color: rgb(35, 97, 120);
  `;

const GradientTitle = styled.h1`
    text-align: center;
    font-weight: 800;
    background-image: none;
    background-repeat: no-repeat;
    background-size: 110%;
    -webkit-background-clip: text;
    background-clip: text;
    color: white;
    margin: 0px;
    font-size: 32px;
  `;

const SubtitleWrapper = styled.div`
    text-align: center;
    font-weight: 400;
    background-image: none;
    background-repeat: no-repeat;
    background-size: 110%;
    -webkit-background-clip: text;
    background-clip: text;
    color: white;
    font-size: 20px;
    margin-left: -10px;
  `;

const Wrapper = styled.div`
    align-self: center;
    text-align: center;
    align-items: center;
    font-family: 'Red Hat Display', sans-serif;
    ${(props: any) =>
      props.inner ? (`
         max-width: 85%;
         padding-top: 3vh;
         margin-left: -10px;
      `) : (`
         min-width: 100%;
         padding-top: 7vh;
      `)
    }
`

const ResetButton = styled.div`
    display: block;
    transition: all 0.15s ease-in-out;
    cursor: pointer;
    color: #282c34;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    &:hover {
      color: #282c35;
      transform: translateY(-1px);
    }
  `;

function App() {
  const [ input, setInput ] = React.useState<string>('');
  const history = useNavigate();

  document.title = `Rave Names - The cheapest web3 usernames`

  return (
<div className="">
  <Wrapper>
    <Stack>
      <Wrapper inner>
        <GradientTitle id="rave--title">
          {'Welcome to '}
          <GradientBG>
            {'Rave Names'}
          </GradientBG>
        </GradientTitle>
      </Wrapper>
      <SubtitleWrapper>
        The first web3 username system on Fantom
      </SubtitleWrapper>
    </Stack>
    <SearchComponent input={input} setInput={setInput} history={history} />
    <Desc />
    <Avatar />
    {/*<Gallery />*/}
    <Integrations />
    <a href="#rave--title"><button style={{
      border: 'none',
      background: '#272727',
      color: '#FFF',
      cursor: 'pointer',
      borderRadius: '15px',
      padding: '2vh 4vh',
      marginTop: '2vh',
      marginBottom: '2vh',
      fontFamily: 'Nunito Sans',
      fontSize: '21px'
    }}><b>Find a name!</b></button></a>
    <br />
  </Wrapper>
</div>
  );
}

export default App;
