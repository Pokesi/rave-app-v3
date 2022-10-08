import React, { Component } from 'react';
import '../App.css';
import {
  Heading,
  Text,
  Card,
  Image
} from "theme-ui";
import logo from '../../../../images/avatar.svg'

class Gallery extends Component {
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
        <Heading as="h1" style={{
          fontFamily: 'Red Hat Display',
          fontSize: '28px',
          color: '#0FFFF0'
        }}>
          Upgrade your <Text className={'hi-gradient'}>on-chain identity</Text>
        </Heading>
        <Text style={{
          fontFamily: 'Red Hat Display',
          fontSize: '20px',
          color: '#0FFFF0'
        }}>
          <strong>Set a <Text className={'hi-gradient reverse'}>custom avatar</Text>, to use anywhere</strong>
          <br />
          <Text style={{ fontSize: '18px' }}>Store image metadata in the Rave contract!</Text>
        </Text>
        <Image style={{
          width: '40vh',
          padding: '20px'
        }} src={logo} />
      </Card>
    </div>
    );
  }
}

export default Gallery;
