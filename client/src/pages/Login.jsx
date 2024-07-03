import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateError } from '../helpers/validateError';

const Login = () => {

    const navigate=useNavigate();

    const initialValuesLogin = { username: "",password: "" };
    const [formValues, setFormValues] = useState(initialValuesLogin);
    const [formErrors, setFormErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' })); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors=validateError(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length !== 0) {
          return;
        }
        const result={
            username: formValues.username,
            password: formValues.password
        }
        navigate("/home")
    }

    const togglePage=()=>{
        navigate("/signup");
    }

  return (
    <Container max-width="xs" component={"main"} sx={{margin:"auto",display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <Paper elevation={7} sx={{height:"500px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", padding:4, borderRadius:"1rem", width:"40%", mt:""}}>
        <Typography variant="h4" color="initial">
          Login
        </Typography>
        <form style={{display:"flex",flexDirection:"column",alignItems:"center", width:"80%", margin:"30px 0 0 0"}} onSubmit={handleSubmit}>
          <TextField 
            margin='normal'
            required
            fullWidth
            name="username"
            label="Username"  
            variant='outlined'
            value={formValues.username}
            onChange={handleChange}
          />
          {formErrors.username && <Typography style={{margin:"-5px",color:"red"}}>{formErrors.username}</Typography>}
          <TextField
            margin='normal'
            required
            fullWidth
            name="password"
            type="password"
            label="Password"  
            value={formValues.password}
            onChange={handleChange}
          />
          {formErrors.password && <Typography style={{margin:"-5px",color:"red"}}>{formErrors.password}</Typography>}
          <Box sx={{display:"flex",borderRadius:"1rem",alignItems:"center" ,justifyContent:"center", mt:"12px"}}>
            <Button variant='contained' type="submit" >
            Login
            </Button>
          </Box>
          <Typography sx={{mt:"60px",display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center"}}>Don't have an account?</Typography>
          
          <Box sx={{display:"flex",borderRadius:"1rem",alignItems:"center" ,justifyContent:"center", mt:"8px"}}>
            <Button type="button" onClick={togglePage} >
            Register
            </Button>
          </Box>
          
        </form>
        </Paper>
    </Container>
  )
}

export default Login
