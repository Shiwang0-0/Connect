import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {

  const navigate=useNavigate()

  const navigateToSignup=()=>{
    navigate("/signup")
  }
  const navigateToLogin=()=>{
    navigate("/login")
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 0 }}>
        <Button  sx={{mr:"4px"}} onClick={navigateToSignup}>
          <Typography>Sign Up</Typography>
        </Button>
        <Button onClick={navigateToLogin}>
          <Typography>Login</Typography>
        </Button>
      </Box>
    </>
  )
}

export default LandingPage
