import styled from "@emotion/styled";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Box, Alert } from "@mui/material";
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { TransitionProps } from '@mui/material/transitions';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { BpeServices } from "../../bpeService/bpeService";
import { SettingsPowerOutlined } from "@mui/icons-material";



interface kuProps {
  ku_open: boolean;
  setKuOpen: (open: boolean) => void;
}

const t = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function KnowledgeUploader(props: kuProps) {
  useEffect(() => {
    BpeServices.getCollectionList().then((data) => {
      //判断data类型
      if (typeof data === "string"){
        setOptions([...options, data])
      }else if (Array.isArray(data)){
        setOptions([...options, ...data])
      }else{
        return
      }
      
    })
  }, [])

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
  const [options, setOptions] = useState<string[]>(['新增自定义']);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; 
    if (file) {
      if (select_value == ""){
        return (
          <Alert severity="error">
            请选择知识库
          </Alert>
          )
      }
      BpeServices.uploadKnowledge(file,select_value).then((data) => {
        (
          <Alert severity="success">
            成功：{data}
          </Alert>
        )
      }).catch((err) => {
        (
          <Alert severity="error">
            失败：{err.message}
          </Alert>
        )
      })
    }
  };
  const [select_value, setSelectValue] = React.useState("");
  const handleSelect = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value);
  };

  const [new_option, setNewOption] = React.useState("");
  const handleCustomInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewOption(event.target.value);
  };

  const handleAddCustomOption = () => {
    setOptions([...options, new_option]);
    setSelectValue(new_option);
    setNewOption("");
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
            {/* 知识库选择栏 */}
            <Select
              value={select_value}
              label="option"
              onChange={handleSelect}
              fullWidth
              sx={{
                marginBottom: "20px",
              }}
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item} >{item}</MenuItem>
              ))}
            </Select>

            {select_value === '新增自定义' && (
              <Box sx={{
                paddingTop: "20px",
                paddingBottom: "20px",
                width: "100%",
                height: "57px"
              }}>
                <TextField
                  label="new option"
                  value={new_option}
                  onChange={handleCustomInputChange}
                  sx={{
                    height: "100%",
                    width: "70%"
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddCustomOption}
                  sx={{
                    height: "100%",
                    width: "30%",
                    backgroundColor: 'var(--primary-100)',
                  }}>添加新类别</Button>
              </Box>
            )}


            <Button
              component="label"
              variant="contained"
              startIcon={<AttachFileIcon />}
              size="large"
              sx={{
                fontWeight: 'bold',
                backgroundColor: 'var(--primary-200)',
                color: 'var(--text-100)',
                width: '500px',
                '&:hover': {
                  backgroundColor: 'var(--primary-100)', // 修改悬停时的背景色
                },
              }}
            >
              请上传材料
              <VisuallyHiddenInput type='file' onChange={handleFileChange} accept='.docx , .pdf, .txt' />
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