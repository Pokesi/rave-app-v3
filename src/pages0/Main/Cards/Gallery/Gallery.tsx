import React, { Component } from 'react';
import '../App.css';
import {
  Heading,
  Text,
  Card,
  Image
} from "theme-ui";
import logo from '../../../../images/nfs.svg'

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
        width: "150vh",
      }} mt="42px">
        <Heading as="h2" style={{
          fontFamily: 'Red Hat Display',
          fontSize: '42px',
          color: '#0FFFF0'
        }}>
          Put your <Text className={'hi-gradient'}>NFTs</Text> on the grandstand.
        </Heading>
        <Text style={{
          fontFamily: 'Red Hat Display',
          fontSize: '30px',
          color: '#0FFFF0'
        }}>
          <strong>Get your very own podium, for your NFTs</strong>
          <br />
          Every Rave Name comes with an NFT gallery, <Text className={'hi-gradient reverse'}>accessible by anyone</Text>
        </Text>
        <Image style={{
          width: '125vh',
          padding: '20px'
        }} src={logo} />
      </Card>
    </div>
    );
  }
}

export default Gallery;
