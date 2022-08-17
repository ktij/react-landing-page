import React, { useState, useEffect } from 'react'
import './styles.css'
import Button from '@mui/material/Button'
import Modal from 'react-modal'

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


interface Props{
  display: {successOpen: boolean; formOpen: boolean; isLoading: boolean; errorOpen: boolean};
  closeSuccess: any;
}

const successStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const formSubmitted = ({display, closeSuccess}: Props) => {
  return (
    <Modal
      isOpen = {display.successOpen}
      onRequestClose = {() => { closeSuccess() }}
      style = {successStyles} >
        <div style={{display:'flex',  justifyContent:'center', flexDirection:'column', alignItems:'center', }}>
          <label>Your email has been registered!</label>
          <br></br>
          <Button variant='contained' onClick={closeSuccess} >
            Close
          </Button>
        </div>
    </Modal>
  )
}

export default formSubmitted

// const FormsuccessOpen = ({successOpen} : Props) => {
//   return (
//     <Modal
//       isOpen = {successOpen}
//       // onRequestClose = {() => {
//       //   resetErrorStates()
//       //   closeForm()
//       // }}
//       style = {modalStyles}
//       contentLabel = 'Example Modal'>
//     {/* //     <div style={{display:'flex',  justifyContent:'center', flexDirection:'column', alignItems:'center', }}>
//     //       <label>Request an invite</label>
//     //       <TextField id="txtName" label="Full name" variant="outlined" value={name} onChange={(e) => {setName(e.target.value)}} error={nameError} helperText={nameHelper} />
//     //       <TextField id="txtEmail" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailHelper} />
//     //       <TextField id="txtConfEmail" label="Confirm email" variant="outlined" value={confEmail} onChange={(e) => setConfEmail(e.target.value)} error={confEmailError} helperText={confEmailHelper} />
//     //       <Button variant='contained' onClick={handleSend} hidden={successOpen}>
//     //         Send
//     //       </Button>  
//     //     </div> */}
        
//       </Modal>
//   )
// }