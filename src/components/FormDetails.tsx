import React, { useState, useEffect } from 'react'
import './styles.css'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Modal from 'react-modal'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props{
  textFields: any;
  setTextFields: React.Dispatch<React.SetStateAction<object>>;
  textErrors: any;
  setTextErrors: React.Dispatch<React.SetStateAction<object>>;
  textHelpers: any;
  setTextHelpers: React.Dispatch<React.SetStateAction<object>>;
  display: {successOpen: boolean; formOpen: boolean; isLoading: boolean; errorOpen: boolean};
  setDisplay: React.Dispatch<React.SetStateAction<{successOpen: boolean; formOpen: boolean; isLoading: boolean; errorOpen: boolean}>>;
  closeForm: any;
}

const formStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const FormDetails = ({textFields, setTextFields, textErrors, setTextErrors, textHelpers, setTextHelpers, display, setDisplay, closeForm}: Props) => {
  

  const emailRegex = RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9-]+[.][a-zA-Z]+$')

  const onTextFieldChange = () => {
    if (textFields.name.length >= 3) {
      setTextErrors(prevState => ({...prevState, name:false}))
      setTextHelpers(prevState => ({...prevState, name:false}))
    }
    if (emailRegex.test(textFields.email)) {
      setTextErrors(prevState => ({...prevState, email:false}))
      setTextHelpers(prevState => ({...prevState, email:false}))
    }
    if (textFields.email == textFields.confEmail) {
      setTextErrors(prevState => ({...prevState, confEmail:false}))
      setTextHelpers(prevState => ({...prevState, confEmail:false}))
    }
  }

  useEffect(() => {
    onTextFieldChange();
  }, [textFields])


  const [serverErrorMessage, setServerErrorMessage] = useState('Something went wrong, please try again')


  const handleSend = (e: React.SyntheticEvent) => {
    // handle submission
    if (textFields.name.length >= 3 && emailRegex.test(textFields.email) && textFields.email==textFields.confEmail) {
      
      setDisplay(preState => ({...preState, isLoading:true}))

      const url = 'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth/'

      const requestOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json, text/plain, */*',
        },
        body: JSON.stringify({'name': textFields.name, 'email': textFields.email})
      }

      fetch(url, requestOptions).then((response) => {
        setDisplay(preState => ({...preState, isLoading:false}))
        if (response.status!=200) { // FOR SOME FKN REASON STATUSTEXT IS EMPTY
          response.json().then((obj) => setServerErrorMessage(obj.errorMessage))
          setDisplay(preState => ({...preState, errorOpen:true}))
          setServerErrorMessage(response.statusText)
        } else {
          console.log(response.statusText)
          closeForm()
          setDisplay(preState => ({...preState, successOpen:true}))
        }
      })

    } else {
      if (textFields.name.length < 3) {
        setTextErrors(prevState => ({...prevState, name:true}))
        if (textFields.name=='') {
          setTextHelpers(prevState => ({...prevState, name:'Name cannot be blank'}))
        } else setTextHelpers(prevState => ({...prevState, name:'Name must be at least three letters'}))
      }
      if (emailRegex.test(textFields.email) == false) {
        setTextErrors(prevState => ({...prevState, email:true}))
        setTextHelpers(prevState => ({...prevState, email:'Please enter a valid email address'}))
      }
      if (textFields.email!=textFields.confEmail) {
        setTextErrors(prevState => ({...prevState, confEmail:true}))
        setTextHelpers(prevState => ({...prevState, confEmail:'Email addresses do not match'}))
      }
    }
  }

  const closeError = () => {
    setDisplay(preState => ({...preState, errorOpen:false}))
  }

  return (
    <Modal
      isOpen = {display.formOpen}
      onRequestClose = {() => { closeForm() }}
      style = {formStyles} >
        <div style={{display:'flex',  justifyContent:'center', flexDirection:'column', alignItems:'center', }}>
          <label>Request an invite</label>
          <br />
          <TextField id="txtName" label="Full name" variant="outlined" value={textFields.name} error={textErrors.name} helperText={textHelpers.name}
            onChange={(e) => {
              setTextFields(prevState => ({...prevState, name:e.target.value}))
            }} />
          <br />
          <TextField id="txtEmail" label="Email" variant="outlined" value={textFields.email} error={textErrors.email} helperText={textHelpers.email} 
            onChange={(e) => {
              setTextFields(prevState => ({...prevState, email:e.target.value}))
            }}  />
          <br />
          <TextField id="txtConfEmail" label="Confirm email" variant="outlined" value={textFields.confEmail} error={textErrors.confEmail} helperText={textHelpers.confEmail}
            onChange={(e) => {
              setTextFields(prevState => ({...prevState, confEmail:e.target.value}))
            }}  />
          <br />
          <Button variant='contained' onClick={handleSend} >
            Send
          </Button>
          <Dialog
            open={display.errorOpen}
            onClose={closeError}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Error"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description" >
                {serverErrorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeError}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        
    </Modal>
  )
}

export default FormDetails



// const OVERLAY_STYLES = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   backgroundColor: 'rgba(0,0,0,0.2)',
//   zIndex: 1000
// } as React.CSSProperties;

// const MODAL_STYLES = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   marginRight: '-50%',
//   transform: 'translate(-50%, -50%)',
//   backgroundColor: 'white',
//   zIndex: 1000
// } as React.CSSProperties;