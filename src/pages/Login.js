import React, {  useState, useRef, useEffect } from 'react'
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
    const regexPass = /^([a-zA-Z0-9\._\-@]{8,})/g

    const id = useRef('null');
    const pass = useRef('null');
    const [values, setValues] = useState({
        id: true,
        pass: true,
        count: 0,
        title: 0
    });

    const[load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(regexPass.test(pass.current) && regexId.test(id.current))
    }, [values])

    const check = () => {
        setValues({ 
            pass: regexPass.test(pass.current), 
            id: regexId.test(id.current),
            count:values.count+1,
            title: 0
        })
    }
    return (
        <div>
            <Box>
                <Typography variant={sm ? 'h4' : 'h5'}>Welcome Back!</Typography>
            </Box>
            <Box mb='30px'>
                <Typography variant={sm ? 'h6' : 'subtitle2'}>Log In to Your Account</Typography>
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
                                    helperText={!values.id ? (id.current === 'null' ? 'Enter Email or Phone number' : 'Email or Phone Number is not registered') : ' '}
                                    fullWidth
                                    size='small'
                                    autoFocus
                                    error={!values.id}
                                    onChange={e => {id.current = e.target.value}}
                                />
                            </Box>
                            <Box mt='10px'>
                                <TextField
                                    error={!values.pass}
                                    id="outlined-number"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    helperText={!values.pass ? (pass.current === 'null' ? 'Enter Password' : 'Wrong password') : ' '}
                                    fullWidth
                                    size='small'
                                    onChange={e => {pass.current = e.target.value}}
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
                                <Button onClick={() => check()} size='large' variant='contained' className={classes.button} color='primary'>
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
                    <Box my='30px'>
                        <Typography variant='subtitle1'>Don't have an account? <Link className={classes.link} to='/sign-up'>Sign up</Link></Typography>
                    </Box>
                </Grid>
            </Grid>
            <Loading load={load} values={values} />
        </div>
    )
}
