import { Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgressProps, Box, LinearProgress, Typography, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";


interface progressProps {
    progress_open: boolean;
    setProgressOpen: (open: boolean) => void;
}

export default function Progress(props: progressProps) {
    const handleClose = () => {
        props.setProgressOpen(false);
    };
    const [progress, setProgress] = React.useState(0);



    useEffect(() => {
        setProgress(global.progress_global);
        if (global.progress_global >= 100) {
            handleClose();
        }
    }, [global.progress_global]);

    return (
        <Dialog
            open={props.progress_open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle 
                id="alert-dialog-title" 
                sx={{
                    padding: "16px 24px"
                }}>{"可能需要等待3到5分钟，请耐心等候"}</DialogTitle>
            <DialogContent 
                sx={{
                display:"flex",
                justifyContent:"center"
                }}>

                <CircularProgress/>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    关闭
                </Button>
            </DialogActions>
        </Dialog>
    );
}



function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}