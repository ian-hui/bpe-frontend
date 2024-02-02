import styled from "@emotion/styled";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import React from "react";
import { useState, useRef } from "react";
import { TransitionProps } from '@mui/material/transitions';
import AttachFileIcon from '@mui/icons-material/AttachFile';



interface kuProps {
    ku_open : boolean;
    setKuOpen : (open: boolean) => void;
}

const t = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function KnowledgeUploader(props: kuProps){
    

    //定义一个组件，用于隐藏input，这个input是用来上传文件的
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const handleClose = () => {
        props.setKuOpen(false);
      };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        //uploadKnowledge(file);
    }
};

      return (
    <React.Fragment>
      <Dialog
        open={props.ku_open}
        TransitionComponent={t}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle fontWeight={600}>{"上传知识库文档📄"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Button
                component="label"
                variant="contained"
                startIcon={<AttachFileIcon />}
                size="large"
                sx={{ fontWeight: 'bold' , 
                backgroundColor: 'var(--primary-200)', 
                color: 'var(--text-100)', 
                width: '500px',
                '&:hover': {
                    backgroundColor: 'var(--primary-100)', // 修改悬停时的背景色
                  },
                }}
            >
                请上传材料
                <VisuallyHiddenInput type='file' accept='.docx , .pdf, .txt' />
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>关闭</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

}