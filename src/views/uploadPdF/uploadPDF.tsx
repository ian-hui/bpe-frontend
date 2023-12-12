import React, { useRef, useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: grey[900],
//         },
//     },
//     components: {
//         // 调整按钮的样式
//         MuiButton: {
//             styleOverrides: {
//                 root: {
//                     fontSize: '1rem', // 增加字体大小
//                     padding: '12px 24px', // 增加内边距
//                 },
//             },
//         },
//         // 调整Typography的样式
//         MuiTypography: {
//             styleOverrides: {
//                 h5: {
//                     fontSize: '2rem', // 标题字体大小
//                 },
//             },
//         },
//     },
// });

// 无状态组件
const PdfUpload: React.FC = () => {
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
          console.log('Selected file:', file);
          // TODO: 处理文件上传逻辑
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
                        请上传材料
                        <VisuallyHiddenInput type='file' onChange={handleFileChange}/>
                    </Button>
            </Container>
        // </ThemeProvider>
    );
}

export default PdfUpload;
