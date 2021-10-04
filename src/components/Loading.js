import React, {  useState, useEffect } from 'react'
import { Backdrop, CircularProgress, Box, Typography } from '@mui/material';

export const Loading = ({ load, values }) => {
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    setLoading(load)
    console.log(values)
  }, [load, values.count])

  return (
    <div>
      {
        loading &&
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={load}
            onClick={() => setLoading(false)}
        >
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <CircularProgress color="inherit" />
                <Typography variant="h5">{values.title ? 'Creating' : 'Logging In'} Your Account...</Typography>
            </Box>
        </Backdrop>
      }
    </div>
  )
}
