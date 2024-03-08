import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { styled } from '@mui/material/styles';
import Progress from '../../widget/progress/progress';

interface PdfUploadProps {
    onUpload: (file: File) => void;
    uploading: boolean;
}

export default function PdfUpload(props: PdfUploadProps) {
    useEffect(() => {
        if(props.uploading){
            setProgressOpen(true);
        }else{
            setProgressOpen(false);
        }
    }, [props.uploading])
    const [progress_open, setProgressOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const inputRef = useRef(null);
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
    // 上传文件的回调函数
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.onUpload(file);
        }
    };

    return (
        // <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '10vh', padding: '32px' }}>
            <Box style={{ marginBottom: '32px' }}>
                {/* 大logo */}
                <div style={{
                    width: '150px', // 增加图标大小
                    height: '150px', // 增加图标大小
                    borderRadius: '50%',
                    backgroundImage: "url('/images/buss-logo.png')",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    margin: 'auto'
                }}></div>
            </Box>
            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '32px' }}>
                商业项目评估器
            </Typography>

            <Button
                component="label"
                variant="outlined"
                color='primary'
                startIcon={<AttachFileIcon />}
                size="large"
                sx={{ fontWeight: 'bold' }}
            >
                请上传材料（以公司名字作为文件标题）
                <VisuallyHiddenInput type='file' onChange={handleFileChange} accept='.docx , .pdf, .txt' />
            </Button>
            <Progress progress_open={props.uploading&&progress_open} setProgressOpen={setProgressOpen}/>
        </Container>
        // </ThemeProvider>
    );
}

