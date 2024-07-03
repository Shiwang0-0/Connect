import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Avatar, IconButton, Input, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const steps = ['username', 'avatar', 'password', 'bio'];
    const allowedExtensions = ['jpeg', 'jpg', 'png'];
    const [activeStep, setActiveStep] = useState(0);
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [bio,setBio]=useState("");
    const[selectedImage,setSelectedImage]=useState(null);
    const [fileError,setFileError]=useState(null);
    const [usernameError,setUsernameError]=useState(null);
    const [passwordError,setPasswordError]=useState(null);
    const [bioError,setBioError]=useState(null);

    const navigate=useNavigate();

    const navigateToSignUp=()=>{
        navigate("/login")
    }

    const handleNext = () => {
        if(activeStep === 0 && userName.length < 4) {
            setUsernameError('Username must be at least 4 characters');
        } 
        else if(activeStep === 2 && bio.length < 10) {
            setBioError('Bio must be at least 10 characters');
        } 
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleUsername = (e) => {
        setUserName(e.target.value)
        setUsernameError(null);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value)
        setPasswordError(null);
    };
    const handleBio = (e) => {
        setBio(e.target.value)
        setBioError(null);
    };


    const setImageHandler=(e)=>{
        const file=e.target.files[0];
        if(!file)
            return;
        const fileName=file.name;
        const fileExtension=fileName.split('.').pop().toLowerCase();
        if(allowedExtensions.includes(fileExtension)){
            const reader=new FileReader();
            reader.onload=(e)=>{
                setSelectedImage(e.target.result);
            } 
            reader.readAsDataURL(file);
            setFileError(null);
        }
        else{
            setFileError('Please upload a file with a .jpg, .png, or .jpeg extension');
            setSelectedImage(null);
        }
    }

    const submitHandler=()=>{
        if(activeStep === 3 && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)) {
            setPasswordError('Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character');
            return;
        }
        const formData = new FormData();
        formData.append("avatar", selectedImage);
        formData.append("username", userName);
        formData.append("password", password);
        formData.append("bio", bio);
        navigate("/home")
    }

    return (
        <>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr:"2rem",mt:"1rem" }}>
            <Button onClick={navigateToSignUp}>
                <Typography>Login</Typography>
            </Button>
        </Box>
        <Box sx={{ width: '50%', margin:"auto", position:"absolute", top:"20%", left:"25%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
                <>
                    <Box sx={{mt:"4rem"}}>
                        {activeStep==0 && 
                        <>
                        <Typography textAlign="center" sx={{mb:"1.5rem"}}>What You would like to be called as ?</Typography>
                        <Stack justifyContent="center" alignItems="center" width="30%" mx="auto">
                            <TextField id="standard-basic" label="Username" variant="standard" onChange={handleUsername} />
                        </Stack>
                        {usernameError && <Typography textAlign="center" style={{ margin: "2px", color: "red" }}>{usernameError}</Typography>}
                        </>
                        }
                        {activeStep==1 && 
                        <>
                            <Typography textAlign="center" sx={{mb:"2rem"}}>Set an Avatar <br/> Maybe an anime wallpaper or a cute kitty ?</Typography>
                            <Stack position={"relative"} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <Avatar src={selectedImage} sx={{ width: "10rem", height: "10rem", mt: "7px", objectFit: "contained" }}
                                ></Avatar>
                                <input type="file" name="avatar" onChange={setImageHandler} style={{ display: 'none' }} accept="image/*" id="avatar-input" />
                                {fileError && <Typography style={{ margin: "-5px", color: "red" }}>{fileError}</Typography>}
                                <label htmlFor='avatar-input'>
                                <IconButton sx={{ position: "absolute", bottom: "0", ml:"1.4rem" }} component="span">
                                    <CameraAltIcon sx={{ height:"2rem", width:"2rem" }} />
                                </IconButton>
                                </label>
                            </Stack>
                            

                        </>
                        }
                        {activeStep==2 && 
                        <>
                        <Typography textAlign="center" sx={{mb:"1.5rem"}}>Add Something about yourself</Typography>
                        <Stack justifyContent="center" alignItems="center" width="30%" mx="auto">
                            <Input aria-label="Demo input" multiline placeholder="Bio..." onChange={handleBio} />
                        </Stack>
                        {bioError && <Typography textAlign="center" style={{ margin: "2px", color: "red" }}>{bioError}</Typography>}
                        </>
                        }
                        {activeStep==3 && 
                        <>
                        <Typography textAlign="center" sx={{mb:"1.5rem"}}>Set Your Password </Typography>
                        <Stack justifyContent="center" alignItems="center" width="30%" mx="auto">
                            <TextField id="standard-basic" label="Password" type="password" variant="standard" onChange={handlePassword} />
                        </Stack>
                        {passwordError && <Typography textAlign="center" style={{ margin: "2px", color: "red" }}>{passwordError}</Typography>}
                        </>
                        }
                        
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, mt:"8rem" }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                            {
                            activeStep === steps.length - 1 ? 
                            (<Button onClick={submitHandler} >
                                Finish
                            </Button>) 
                            : 
                            (<Button onClick={handleNext} >
                                Next
                            </Button>)
                            }
                    </Box>
                </>
        </Box>
        </>
    );
}

export default SignUp
