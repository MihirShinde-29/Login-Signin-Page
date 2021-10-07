import React, {  useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { 
    Box, 
    Typography, 
    TextField,
    Grid, 
    Button, 
    Checkbox, 
    FormControlLabel,
    Divider, 
    useMediaQuery, 
    useTheme 
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Loading } from '../components/Loading';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    button: {
        width: '100%',
        margin: '10px 0'
    },
    link: {
        textDecoration: 'none !important',
        cursor: 'pointer'
    }
}))

export const Login = () => {
    const classes = useStyles()

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    
    const regexId = /^((([a-zA-Z0-9\.]+)@([a-z]+)\.(([a-z]{2,5}\.[a-z]{2,3})|([a-z]{2,5})))|(\d{10}))/g
    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/g

    const [values, setValues] = useState({
        id: '',
        pass: '',
        title: 0,
        count: 0
    });
    
    const [valid, setValid] = useState({
        id: true,
        pass: true,
    });

    const [load, setLoad] = useState(false)

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
    const handleCheck = () => {
        setLoad(regexPass.test(values.pass) && regexId.test(values.id));
        setValid({
            pass: regexPass.test(values.pass), 
            id: regexId.test(values.id),
        })
        setValues({
            count: values.count + 1,
        })
    }

    useEffect(() => {
        if (values.count !== 0) {
            setValid({
                pass: regexPass.test(values.pass), 
                id: regexId.test(values.id),
            })
        }
    }, [values.pass, values.id])
    
    return (
        <div>
            <Box>
                <Typography variant={sm ? 'h3' : 'h5'}>Welcome Back!</Typography>
            </Box>
            <Box mb='30px'>
                <Typography variant={sm ? 'h5' : 'subtitle2'}>Log In to Your Account</Typography>
            </Box>
            <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box textAlign='left' mb='5px' pr={md ? '20px' : ''}>
                        <form noValidate autoComplete="off">
                            <Box>
                                <TextField
                                    id="outlined-number"
                                    label="Email or Phone Number"
                                    type="text"
                                    variant="outlined"
                                    name='id'
                                    helperText={!valid.id ? (values.id === '' ? 'Enter Email or Phone number' : 'Email or Phone Number is not registered') : ' '}
                                    fullWidth
                                    size='small'
                                    autoFocus
                                    error={!valid.id}
                                    onChange={e => handleChange(e)}
                                />
                            </Box>
                            <Box mt='10px'>
                                <TextField
                                    error={!valid.pass}
                                    id="outlined-number"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    name='pass'
                                    helperText={!valid.pass ? (values.pass === '' ? 'Enter Password' : 'Wrong password') : ' '}
                                    fullWidth
                                    size='small'
                                    onChange={e => handleChange(e)}
                                />
                            </Box>
                            <Box mt='10px' display='flex' justifyContent='space-between' alignItems='center'>
                                <Box>
                                    <FormControlLabel
                                        control={
                                        <Checkbox
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                                            name="checkedI"
                                        />
                                        }
                                        label="Remember Me"
                                    />
                                </Box>
                                <Box>
                                    <Link className={classes.link} variant='subtitle2' to='#'>Forgot password?</Link>
                                </Box>
                            </Box>
                            <Box mt='4px'>
                                <Button onClick={e => handleCheck()} size='large' variant='contained' className={classes.button} color='primary'>
                                    Log in
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    {!md && (
                        <Box my='20px'>
                            <Divider variant="middle" />
                        </Box>
                    )}
                    <Box py='10px' pl={md ? '20px' : ''} style={md ? {borderLeft: "grey solid 1px"} : {}}>
                        <Box mb='5px'>
                            <Typography variant='h6'>or Login with...</Typography>
                        </Box>
                        <Box my='15px'>
                            <Button color="secondary" size='large' variant='contained' startIcon={<EmailIcon size='small' />} className={classes.button}>Google</Button>
                        </Box>
                        <Box my='15px'>
                            <Button color="primary" size='large' variant='contained' startIcon={<FacebookIcon size='small' />} className={classes.button}>FaceBook</Button>
                        </Box>
                        <Box my='15px'>
                            <Button color="secondary" size='large' variant='contained' startIcon={<GitHubIcon size='small' />} className={classes.button}>GitHub</Button>
                        </Box>
                        <Box my='15px'>
                            <Button color="primary" size='large' variant='contained' startIcon={<LinkedInIcon size='small' />} className={classes.button}>Linkedin</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box mt='25px'>
                        <Typography variant='subtitle1'>Don't have an account? <Link className={classes.link} to='/sign-up'>Sign up</Link></Typography>
                    </Box>
                </Grid>
            </Grid>
            {load && <Loading load={load} setLoad={setLoad} values={values} />}
        </div>
    )
}
