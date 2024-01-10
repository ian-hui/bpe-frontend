import { Container, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, Input, Button, Box, Divider, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BpeCommon } from "../../bpeTypes/common";
import "./chatView.css";
import ChatItem from "./chatItem";
import SendIcon from '@mui/icons-material/Send'; // 确保已经安装了 @mui/icons-material


interface ChatViewProps {
    records: Array<BpeCommon.recordItem>;
}


export default function ChatView(props: ChatViewProps) {
    const [messages, setMessages] = useState<Array<BpeCommon.recordItem>>([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    // 切换任务时，更新消息列表
    useEffect(() => {
        setMessages(props.records);
    }, [props.records]);

    // 处理输入框的变化
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        // 发送消息到后端处理
        setLoading(true); // 开始加载
        // 添加一个用户消息
        const newUserMessage: BpeCommon.recordItem = {
            content: inputValue,
            role: 'user',
        };

        const newGptMessage: BpeCommon.recordItem = {
            content: '',
            role: 'gpt',
        };
        setMessages(prevMessages => [...prevMessages, newUserMessage, newGptMessage]);
        setInputValue(''); // 清空输入框
        // TODO: 发送请求到后端
        // 假设后端处理完成后，设置 loading 为 false
        // setLoading(false);
    };
    return (
        <Box className="chat-view">
            <Box className='chat-view-content'>
                {messages.map((item, index) => (
                    <Box className="chat-item">
                        {index == messages.length - 1 && loading ?
                            <ChatItem content={item.content} role={item.role} loading={true} />
                            : <ChatItem content={item.content} role={item.role} />}
                    </Box>
                ))}
            </Box>
            {/* <Divider sx={{padding:'10px'}}/> */}
            <Box className='chat-view-input' >
                <TextField
                    multiline
                    placeholder="输入您的消息...(shift+enter换行)"
                    variant="standard"
                    fullWidth
                    value={inputValue}
                    onChange={handleInputChange}
                    minRows={1}
                    maxRows={4} // 最多增长到4行高
                    // 可以添加 onChange 事件处理器来处理输入
                    sx={{
                        flexGrow: 1,
                        mr: 1, // 留出一些空间给按钮
                        '& .MuiInput-underline:before': {
                            borderBottom: 'none', // 移除底部边框线
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none', // 移除悬停时的底部边框线
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: 'none', // 移除输入后的底部边框线
                        },
                    }}
                />
                <Button variant='contained'
                    color='primary'
                    sx={{ height: '24px', width: '24px', minWidth: '24px' }}
                    onClick={handleSendMessage}
                    disabled={loading}
                ><SendIcon />
                </Button>
            </Box>
        </Box>
    );
}

