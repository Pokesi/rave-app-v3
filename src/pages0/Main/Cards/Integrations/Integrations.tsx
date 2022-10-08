import React, { Component } from 'react';
import '../App.css';
import {
  Heading,
  Text,
  Card,
  Image,
} from "theme-ui";
import ftm from '../../../../images/fantom.svg'

class Integrations extends Component {
  render() {
    return (
    <div style={{paddingLeft: 'calc(50% - 75vh)'}}>
      <Card sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center",
        padding: "28px 24px",
        borderRadius: "20px",
        backgroundColor: "var(--special-w)",
        width: "80vw",
        marginLeft: "10vw",
      }} mt="42px">
        <Heading as="h2" style={{
          fontFamily: 'Red Hat Display',
          fontSize: '28px',
          color: '#0FFFF0'
        }}>
          Where to <Text className={'hi-gradient'}>use Rave</Text>
        </Heading>
        <Text style={{
          fontFamily: 'Red Hat Display',
          fontSize: '20px',
          color: '#0FFFF0'
        }}>
          <strong>Where can Rave be used?</strong>
          <br />
        </Text>
        <a href="https://pwawallet.fantom.network" target="_blank" rel="noreferrer">
          <Image style={{
            width: '80vh',
            padding: '20px'
          }} src={ftm} />
        </a>
      </Card>
    </div>
    );
  }
}

export default Integrations;
