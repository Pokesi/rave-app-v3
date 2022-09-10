import React, { Component } from 'react';
import '../App.css';
import {
  Heading,
  Text,
  Card,
  Image
} from "theme-ui";
import logo from '../../../../images/comparison.svg'

class Desc extends Component {
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
          The <Text className={'hi-gradient reverse'}>cheapest reservation fees</Text> in all of crypto
        </Heading>
        <Text style={{
          fontFamily: 'Red Hat Display',
          fontSize: '30px',
          color: '#0FFFF0'
        }}>
          Why pay $50, when you can pay just <Text className={'hi-gradient'}>5 FTM</Text> ?
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

export default Desc;
