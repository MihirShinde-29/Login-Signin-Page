import { Box, Button, Typography } from "@mui/material"

export const Home = () => {
  return (
    <Box height='100vh' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      <Box mb='50px'>
        <Typography variant='h1' color='secondary'>Website</Typography>
      </Box>
      <Typography variant='h2' color='primary'>Continue with...</Typography>
      <Box display='flex' justifyContent='space-around' width='30%' mt='50px'>
        <Button href='/login' color='primary' size='large' variant='contained' disableElevation>Log in</Button>
        <Button href='/sign-up' color='secondary' size='large' variant='contained' disableElevation>Sign in</Button>
      </Box>
    </Box>
  )
}
