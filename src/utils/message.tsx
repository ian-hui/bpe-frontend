import { useState } from 'react';
// material-ui
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface ErrorMsgProps {
    content: string;
    duration: number;
}

export default function ErrorMsg(props: ErrorMsgProps) {
    const [open, setOpen] = useState(true);
  
    const handleClose = (event: any, reason: any) => {
      setOpen(false);
    };
  
    return (
      <Snackbar 
      open={open}
      autoHideDuration={props.duration} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
      onClose={handleClose}
      sx={{zIndex:"100000"}}>
      
        <Alert severity="error" variant="standard" >
          {props.content}
        </Alert>
      </Snackbar>
    );
  }


