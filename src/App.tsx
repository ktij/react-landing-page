import React, { useState } from 'react'
import './App.css'
import BtnInvite from './components/BtnInvite'
import LoadingOverlay from 'react-loading-overlay'

import FormDetails from './components/FormDetails'
import FormSubmitted from './components/FormSubmitted'


function App() {
  

  const [textFields, setTextFields] = useState<object>({name:'', email:'', confEMail:''})

  const [textErrors, setTextErrors] = useState<object>({name:false, email:false, confEmail:false})
  const [textHelpers, setTextHelpers] = useState<object>({name:"", email:"", confEmail:""})

  const [display, setDisplay] = useState({successOpen:false, formOpen:false, isLoading:false, errorOpen:false})

  
  
  const loadForm = (e: React.SyntheticEvent) => {
    setDisplay(preState => ({...preState, formOpen:true}))
  }

  const closeForm = () => {
    setDisplay(preState => ({...preState, formOpen:false}))
    setTextFields({name:'', email:'', confEMail:''})
    setTextErrors({name:false, email:false, confEmail:false})
    setTextHelpers({name:"", email:"", confEmail:""})
  }

  const closeSuccess = () => {
    setDisplay(preState => ({...preState, successOpen:false}))
  }

  return (
    <LoadingOverlay
        class='Overlay'
        active={display.isLoading}
        spinner
        text='Loading...'
    >
      <div className="App" style={{height:'100vh', display:'flex',  justifyContent:'center', flexDirection:'column', alignItems:'center',}}>
      {/* <div className="App" >   */}
        <header className="App-header">
          BROCCOLI & CO.
        </header>
        <p className="App-subheading">A better way to enjoy every day.</p>
        <p className="App-body">Be the first to know when we launch.</p>
        <BtnInvite loadForm={loadForm}/>
        <FormDetails textFields={textFields} setTextFields={setTextFields} textErrors={textErrors} setTextErrors={setTextErrors} textHelpers={textHelpers} setTextHelpers={setTextHelpers} display={display} setDisplay={setDisplay} closeForm={closeForm} />
        <FormSubmitted display={display} closeSuccess={closeSuccess} />
        <footer className="App-footer">
          Made with ❤ in Melbourne <br></br>
          © 2008 Broccoli & co. All rights reserved.
        </footer>
      </div>
    </LoadingOverlay>
    
  )
}

export default App;
