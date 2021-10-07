import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
  Grid, 
  Box, 
  Typography,
  useMediaQuery, 
  useTheme  
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Login } from "./pages/Login";
import { SignUp } from "./pages/Sign-up";
import { Home } from "./pages/Home";
import './App.css';

const useStyles = makeStyles(() => ({
  box: {
    backgroundColor: 'rgb(240, 240, 240, 0.85)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    background: 'inherit',
    overflow: 'hidden',
  }
}))

function App() {
  const classes = useStyles()
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/login' exact>
          <Box height={md ? '100vh' : '100%'}>
            <Grid container direction='column' alignItems='center' spacing={0} height='100%'>
              <Grid item>
                <Box my={sm ? '40px' : '20px'}>
                  <Typography variant={sm ? 'h2' : 'h4'} color='secondary'>Website</Typography>
                </Box>
              </Grid>
              <Grid item height='60%'>
                <Box textAlign='center' borderRadius={2} pt={sm ? '40px' : '25px'} pb='10px' px={sm ? '50px' : '20px'} className={classes.box} width={md ? '50vw' : '80vw'} height={md ? '90%' : ''}>
                  <Login />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Route>
        <Route path='/sign-up' exact>
          <Box height={md ? '100vh' : '100%'}>
            <Grid container direction='column' alignItems='center' spacing={0} height='100%'>
              <Grid item>
                <Box my={sm ? '40px' : '20px'}>
                  <Typography variant={sm ? 'h2' : 'h4'} color='secondary'>Website</Typography>
                </Box>
              </Grid>
              <Grid item height='60%'>
                <Box textAlign='center' borderRadius={2} pt={sm ? '40px' : '25px'} pb='10px' px={sm ? '50px' : '20px'} className={classes.box} width={md ? '50vw' : '80vw'} height={md ? '90%' : ''}>
                  <SignUp />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
