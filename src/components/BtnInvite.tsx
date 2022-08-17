import React, { useRef } from 'react'
import './styles.css'
import Button from '@mui/material/Button'

interface Props{
  loadForm:(e: React.SyntheticEvent) => void;
}

const BtnInvite = ({loadForm}: Props) => {
  return (
    <Button className='button-invite'
      variant="outlined" size="large"
      style={{minWidth: '15vw', minHeight: '7vh'}}
      onClick = {(e) => {
        loadForm(e)
      }}
    >Request an invite</Button>
  )
}

export default BtnInvite
