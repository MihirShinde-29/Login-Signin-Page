import { Box, Button, Typography } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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

export const Home = () => {
  const classes = useStyles()
  return (
    <Box height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box mb='50px'>
        <Typography variant='h1' color='secondary'>Website</Typography>
      </Box>
      <Typography variant='h2' color='primary'>Continue with...</Typography>
      <Box display='flex' justifyContent='space-around' width='30%' mt='50px'>
        <Link to='/login' className={classes.link}>
          <Button color='primary' size='large' variant='contained' disableElevation>Log in</Button>
        </Link>
        <Link to='/sign-up' className={classes.link}>
          <Button color='secondary' size='large' variant='contained' disableElevation>Sign in</Button>
        </Link>
      </Box>
    </Box>
  )
}
