import React, {  useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { 
    Box, 
    Typography, 
    TextField,
    Button, 
    Checkbox, 
    FormControlLabel,
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
    const regexPass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/g
    const regexName = /^([a-zA-Z]{2,})/g

    const [values, setValues] = useState({
        name: '',
        email: '',
        pass: '',
        confirmPass: '',
        checked: false,
        count: 0,
        title: 1
    });

    const [valid, setValid] = useState({
        name: true,
        email: true,
        pass: true,
        confirmPass: true,
        checked: true
    });

    const[load, setLoad] = useState(false)

    const handleChange = e => {
        if(e.target.name === 'checked') {
            setValues({
                ...values,
                [e.target.name]: (e.target.value === 'on') ? true : false
            })
        }
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = () => {
        setLoad(
            regexPass.test(values.pass) && regexEmail.test(values.email) && regexName.test(values.name) && values.checked && (values.pass === values.confirmPass)
        );
        setValid({
            name: regexName.test(values.name) && (values.name !== ''),
            email: regexEmail.test(values.email),
            pass: regexPass.test(values.pass),
            confirmPass: (values.pass === values.confirmPass && values.confirmPass !== ''),
            checked: values.checked
        })
        setValues({
            count: values.count + 1,
        })
        console.log(regexPass.test(values.pass) && regexEmail.test(values.email) && regexName.test(values.name) && values.checked && (values.pass === values.confirmPass));
    }

    useEffect(() => {
        if (values.count !== 0) {
            setValid({
                name: regexName.test(values.name),
                email: regexEmail.test(values.email),
                pass: regexPass.test(values.pass),
                confirmPass: (values.pass === values.confirmPass && values.confirmPass !== ''),
                checked: values.checked
            })
            console.log(valid);
        }
    }, [values.name, values.email, values.pass, values.confirmPass, values.checked])

    return (
        <Box textAlign='left' mt='-5px'>
            <Box display='flex' flexDirection={md ? 'row' : 'column'} justifyContent='space-between' alignItems='center'>
                <div>
                    <Typography variant={sm ? 'h3' : 'h5'}>Create Account</Typography>
                    <Typography variant={sm ? 'subtitle1' : 'subtitle2'}>Already have an account? <Link className={classes.link} to='/login'>Log in</Link></Typography>
                </div>
                <Box width='30%'>
                    <Button color="secondary" size='large' variant='contained' endIcon={<EmailIcon size='small' />} className={classes.button}>Sign in with Google</Button>
                </Box>
            </Box>
            <Box width='100%' mt='12px'>
                <form noValidate autoComplete="off">
                    <Box width='100%'>
                        <TextField
                            id="outlined-number"
                            label="Enter Name"
                            type="text"
                            variant="outlined"
                            helperText={!valid.name ? 'Enter your Name' : ' '}
                            fullWidth
                            size='small'
                            name='name'
                            error={!valid.name}
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='7px'>
                        <TextField
                            id="outlined-number"
                            label="Enter Email"
                            type="text"
                            variant="outlined"
                            helperText={!valid.email ? values.email === '' ? 'Enter email address' : "Email address don't exist" : ' '}
                            fullWidth
                            size='small'
                            name='email'
                            error={!valid.email}
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='7px'>
                        <TextField
                            error={!valid.pass}
                            id="outlined-number"
                            label="Enter Password"
                            type="password"
                            variant="outlined"
                            helperText='Use 8 to 16 characters with a mix of letters, numbers & symbols'
                            fullWidth
                            size='small'
                            name='pass'
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mt='7px'>
                        <TextField
                            error={!valid.confirmPass}
                            id="outlined-number"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            helperText={!valid.confirmPass ? 'Enter Same Password' : ' '}
                            fullWidth
                            size='small'
                            name='confirmPass'
                            onChange={e => handleChange(e)}
                        />
                    </Box>
                    <Box mb='7px' mt="-5px">
                        <FormControlLabel
                            control={
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon color='primary' fontSize="small" />}
                                name="checked"
                                onChange={e => handleChange(e)}
                            />
                            }
                            label="I agree to the Laws and Agreement*"
                        />
                        {!valid.checked ? <Typography variant="caption" color='red' mt='-10px'>Please check the above checkbox to continue</Typography> : <Typography variant="caption" color='black' mt='-10px'>Check the box to continue</Typography>}
                    </Box>
                    <Box mb='25px'>
                        <Button onClick={() => handleCheck()} size='large' variant='contained' className={classes.button} color='primary'>
                            Sign in
                        </Button>
                    </Box>
                </form>
            </Box>
            <Loading load={load} setLoad={setLoad} values={values} />
        </Box>
    )
}
