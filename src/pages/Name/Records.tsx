import React, { Component, useState } from 'react';
import { Grid } from 'theme-ui';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

import { Rave } from '@rave-names/rave';

import { shorten } from '../../utils/addressManip';

import Swal from 'sweetalert2';
import $ from 'jquery';

const CustomRecordAdd = ({
  contract,
  name,
}) => {
 return <><button style={{
     border: 'none',
     background: 'rgba(0,0,0,0.2)',
     color: '#FFF',
     cursor: 'pointer',
     borderRadius: '15px',
     padding: '2vh 4vh',
     fontFamily: 'Nunito Sans',
     width: 'calc(50vw + 80px)',
     fontSize: '21px'}}
     onClick={() => {Swal.fire({
       title: `Set a custom text record`,
       html:
         '<p>All characters are allowed.</p><br />' +
         '<input id="key" placeholder="Key" class="swal2-input">' +
         '<input id="value" placeholder="Value" class="swal2-input">',
       icon: 'info',
       showDenyButton: true,
       showConfirmButton: true,
       confirmButtonText: 'Set!',
       denyButtonText: 'No thanks...',
       preConfirm: function () {
        return new Promise(function (resolve: any) {
           resolve({
             key: $('#key').val(),
             value: $('#value').val(),
           })
         })
       },
     }).then(async (result: any) => {
       if (result.isConfirmed) {
         contract.functions.setText(name.toUpperCase(), result.value.key, result.value.value).catch((e) => { /* null */ });
       }
     });}}
     >Set A Custom Record</button></>
}

const textRecords = [
   "com.twitter",
   "com.github",
   "com.discord",
   "com.reddit",
   "email",
 ]

export const InputWithTag = ({
   txt,
   name,
   owner,
   contract,
 }) => {
   const [record, setRecord] = useState('');
   const [input, setInput] = useState('');
   contract.functions.getText(name, txt).then(res => {
     setRecord(res);
   });
  return <Stack direction="row" spacing={4}  style={{
         height: '10vh',
       }}>
         <p style={{
           width: '10vw',
           color: '#FFF',
           fontFamily: 'Red Hat Display',
           fontSize: '21px'
         }}>{txt}</p>
         {owner ? <input type="text" onChange={(e: any) => {
           setInput(e.target.value)
         }} value={input} placeholder={record} style={{
           width: '30vw',
           borderRadius: '15px',
           border: 'none',
           color: '#FFF',
           background: 'rgba(0,0,0,0.2)',
           paddingLeft: '20px',
           fontSize: '21px',
         }}/> : (<p style={{
           width: 'calc(44vw - 18px)',
           borderRadius: '15px',
           border: 'none',
           color: '#FFF',
           background: 'rgba(0,0,0,0.2)',
           paddingTop: '20px',
           fontSize: '21px',
         }}>{(record.length > 0) ? shorten(record) : "Not set"}</p>)}
         {owner && <button style={{
           border: 'none',
           width: '20vh',
           background: 'rgba(0,0,0,0.2)',
           color: '#FFF',
           cursor: 'pointer',
           borderRadius: '15px',
           padding: '2vh 4vh',
           fontFamily: 'Nunito Sans',
           fontSize: '21px'}}
           onClick={() => {contract.functions.setText(name.toUpperCase(), txt, input)}}
           >Set</button>}
       </Stack>
 }

 export const Records = ({
   contract,
   name,
   isOwner
 }:{
   contract: any,
   name: string,
   isOwner: boolean
 }) => {
   return (
     <Grid gap={2} style={{
       alignItems: "center",
       alignSelf: "center",
       textAlign: "center",
       margin: "2vh 12vh"}}>
       <InputWithTag name={name} txt={textRecords[0]} contract={contract} owner={isOwner} />
       <InputWithTag name={name} txt={textRecords[1]} contract={contract} owner={isOwner} />
       <InputWithTag name={name} txt={textRecords[2]} contract={contract} owner={isOwner} />
       <InputWithTag name={name} txt={textRecords[3]} contract={contract} owner={isOwner} />
       <CustomRecordAdd name={name} contract={contract} />
     </Grid>
   )
 }
