
import { Card, CardContent, Typography, CardActions, Button, Avatar, CardHeader } from '@mui/material';
import shadows from '@mui/material/styles/shadows';
import ReactMarkdown from 'react-markdown'
import CircularProgress from '@mui/material/CircularProgress';

interface chatItemProps {
    content: string;
    role: string;
    loading?: boolean;
}

export default function ChatItem(props: chatItemProps) {
    return (
        // 如果是用户消息，则显示用户头像。如果是机器人消息，则显示机器人头像
        (props.role === 'gpt') ? (
            <Card sx={{ minWidth: 275, borderRadius: '24px', boxShadow: ' none' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'pink', height: '24px', width: '24px' }} aria-label="recipe">
                        </Avatar>
                    }
                    title={<Typography className='name-style'>{props.role}</Typography>}
                />
                {/* 如果是最后一条消息，且正在加载，则显示 loading */}
                <CardContent>
                    {props.loading ?
                        <CircularProgress size={20}/> : <ReactMarkdown>{props.content}</ReactMarkdown>
                    }
                </CardContent>
            </Card>) :
            (<Card sx={{ minWidth: 275, borderRadius: '24px', boxShadow: ' none' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'green', height: '24px', width: '24px' }} aria-label="recipe">
                        </Avatar>
                    }
                    title={<Typography className='name-style'>{props.role}</Typography>}
                />
                <CardContent>
                    <Typography variant='body1' >
                        {props.content}
                    </Typography>
                </CardContent>
            </Card>)
    );
}

