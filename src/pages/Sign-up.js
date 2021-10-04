import React, {  useState, useRef, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { 
    Box, 
    Typography, 
    TextField,
    Button, 
    Checkbox, 
    FormControlLabel,
    Divider, 
    useMediaQuery, 
    useTheme,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EmailIcon from '@mui/icons-material/Email';
import { Loading } from '../components/Loading';
import {Link} from 'react-router-dom'

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

export const SignUp = () => {
    const classes = useStyles()

    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));

    const regexEmail = /^((([a-zA-Z0-9\.]+)@([a-z]+)\.(([a-z]{2,5}\.[a-z]{2,3})|([a-z]{2,5})))|(\d{10}))/g
    const regexPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/g

    const fname = useRef('null');
    const lname = useRef('null');
    const pass = useRef('null');
    const confirmPass = useRef();
    const email = useRef('null');
    const checked = useRef(false);
    const [values, setValues] = useState({
        fname: true,
        lname: true,
        email: true,
        pass: true,
        confirmPass: true,
        checked: true,
        count: 0,
        title: 1
    });
    const[load, setLoad] = useState(false)

    useEffect(() => {
        setLoad(fname.current !== 'null' && lname.current !== 'null' && regexPass.test(pass.current) && pass.current !== 'null' && regexEmail.test(email.current) && confirmPass.current === pass.current && checked.current)
    }, [values])

    const check = () => {
        setValues({
            fname: fname.current !== 'null',
            lname: lname.current !== 'null',
            pass: regexPass.test(pass.current) && pass.current !== 'null', 
            email: regexEmail.test(email.current),
            confirmPass: confirmPass.current === pass.current || pass.current === 'null',
            checked: checked.current,
            count: values.count+1,
            title: 1
        })
    }

    return (
        <Box textAlign='left'>
            <Box display='flex' flexDirection={md ? 'row' : 'column'} justifyContent='space-between' alignItems='center'>
                <Typography variant={sm ? 'h3' : 'h4'}>Create Account</Typography>
                <Typography variant={sm ? 'subtitle1' : 'subtitle2'}>Already have an account? <Link className={classes.link} to='/login'>Log in</Link></Typography>
            </Box>
            <Box width="100%" mb='5px' mt='30px'>
                <form noValidate autoComplete="off">
                    <Box display='flex'>
                        <Box mr='10px' width='100%'>
                            <TextField
                                id="outlined-number"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                helperText={!values.fname ? 'Enter your First Name' : ' '}
                                fullWidth
                                size='small'
                                autoFocus
                                error={!values.fname}
                                onChange={e => {fname.current = e.target.value}}
                            />
                        </Box>
                        <Box ml='10px' width='100%'>
                            <TextField
                                id="outlined-number"
                                label="Last Name"
                                type="text"
                                variant="outlined"
                                helperText={!values.lname ? 'Enter your Last Name' : ' '}
                                fullWidth
                                size='small'
                                error={!values.lname}
                                onChange={e => {lname.current = e.target.value}}
                            />
                        </Box>
                    </Box>
                    <Box mt='10px'>
                        <TextField
                            id="outlined-number"
                            label="Enter Email"
                            type="text"
                            variant="outlined"
                            helperText={!values.email ? email.current === 'null' ? 'Enter email address' : 'Enter valid email address' : ' '}
                            fullWidth
                            size='small'
                            error={!values.email}
                            onChange={e => {email.current = e.target.value}}
                        />
                    </Box>
                    <Box mt='10px'>
                        <TextField
                            error={!values.pass}
                            id="outlined-number"
                            label="Enter Password"
                            type="password"
                            variant="outlined"
                            helperText='Use 8 or more characters with a mix of letters, numbers & symbols'
                            fullWidth
                            size='small'
                            onChange={e => {pass.current = e.target.value}}
                        />
                    </Box>
                    <Box mt='10px'>
                        <TextField
                            error={!values.confirmPass}
                            id="outlined-number"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            helperText={!values.confirmPass ? 'Enter Same Password' : ' '}
                            fullWidth
                            size='small'
                            onChange={e => {confirmPass.current = e.target.value}}
                        />
                    </Box>
                    <Box mb='10px'>
                        <FormControlLabel
                            control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                                name="checkedI"
                                onChange={e => checked.current = e.target.checked}
                            />
                            }
                            label="By checking this, I agree all the terms and laws of agreement."
                        />
                        {!values.checked && <Typography variant="subtitle2" color='secondary'>Please check the above checkbox to continue</Typography>}
                    </Box>
                    <Box mb='25px'>
                        <Button onClick={() => check()} size='large' variant='contained' className={classes.button} color='primary'>
                            Sign in
                        </Button>
                    </Box>
                </form>
                <Box my='20px'>
                    <Divider variant="middle" />
                </Box>
                <Box textAlign='center' mb='30px'>
                    <Box mb='20px'>
                        <Typography variant='h6'>or Sign up with...</Typography>
                    </Box>
                    <Button color="secondary" size='large' variant='contained' startIcon={<EmailIcon size='small' />} className={classes.button}>Google</Button>
                </Box>
            </Box>
            <Loading load={load} values={values} />
        </Box>
    )
}
