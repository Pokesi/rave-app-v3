import React from 'react';
import styled, { css } from 'styled-components';
import Typewriter from 'typewriter-effect';
import { Typography, Input, CancelCircleSVG } from '@ensdomains/thorin';
import { Stack } from '@mui/material';
import { SearchComponent } from '../../components/SearchBar';
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
    font-size: 72px;
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
    font-size: 64px;
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
    margin-top: 0px;
    font-size: 32px;
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

  return (
<div className="App">
  <Wrapper>
    <Stack>
      <Wrapper inner>
        <GradientTitle>
          {'Welcome to '}
          <GradientBG>
            <Typewriter
              onInit={(typewriter: any | null) => {
                typewriter
                .typeString(' the cheapest registration fees in crypto')
                .pauseFor(2000)
                .deleteChars(40)
                .typeString('no renewal fees')
                .pauseFor(2000)
                .deleteChars(15)
                .typeString('Rave Names')
                .pauseFor(2000) // this isnt rly needed but just for less editing if we ever need more here
                .start()
              }}
            />
          </GradientBG>
        </GradientTitle>
      </Wrapper>
      <SubtitleWrapper>
        The first web3 username system on Fantom
      </SubtitleWrapper>
    </Stack>
    <SearchComponent input={input} setInput={setInput} history={history} />
    <Avatar />
    <Desc />
    {/*<Gallery />*/}
    <Integrations />
    <br />
  </Wrapper>
</div>
  );
}

export default App;
