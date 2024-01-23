import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider, ThemeProvider, createTheme } from '@mui/material';
import { BpeCommon } from '../../bpeTypes/common';
import './sideBar.css';
import { AnimatePresence, motion } from 'framer-motion';
import { uuid } from '../../utils/uuid';
import AddTaskIcon from '@mui/icons-material/AddTask';
import '../../index.css';
import { Height } from '@mui/icons-material';


// 定义类型接口
interface SidebarProps {
    listType: string;
    items: Array<BpeCommon.navigationItems>;
    selected: string;
    onItemSelected: (item: BpeCommon.navigationItems) => void; // 点击项目时的回调函数
    onNewItem: (item: BpeCommon.navigationItems) => void; // 点击新建项目时的回调函数
}

const Sidebar: React.FC<SidebarProps> = ({ listType, items, selected, onItemSelected, onNewItem }) => {
    const newTaskHandler = () => {
        console.log('New task button clicked');
        // onItemSelected('NewTask');
        const tempId = uuid();
        onNewItem({ chatid: tempId, name: '新建立任务' });
        onItemSelected({ chatid: tempId, name: '新建立任务' });
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                // flexShrink: 0,
                [`& .MuiDrawer-paper`]: { position: 'relative', height: '100%',
                border: 'none', bgcolor: 'var(--primary-300)! important', color: 'var(--text-100)' },
            }}
        >
            <List sx={{ position: 'relative' }}>
                {listType == 'Task' ? 
                <><ListItem button key='NewTask' onClick={newTaskHandler} sx={{
                    display : 'flex',
                    flexDirection: 'row',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'var(--primary-200)', // 修改悬停时的背景色
                      color: 'var(--bg-100)',
                    },
                  }} >
                    <ListItemText primary='新的任务' sx={{mr:1}} primaryTypographyProps={{fontWeight:'600'}}/>
                    <AddTaskIcon sx={{ml:'auto'}}/>
                </ListItem>

                {/* 分隔符 */}
                <Divider sx={{ bgcolor: 'var(--text-200)' ,Height:'2px'}} /></>

                    : <div />}
            </List>
            <AnimatePresence>
                {items.map((item) => (
                    <React.Fragment key={item.chatid}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ListItem
                                button
                                selected={item.chatid === selected}
                                onClick={() => onItemSelected(item)}
                                className='side-nav-item text-sm'
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-200)', // 修改悬停时的背景色
                                        color: 'var(--text-200)',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'var(--primary-200)', // 修改悬停时的背景色
                                        color: 'var(--text-2    00)',
                                    },
                                  }} 
                            >
                                <ListItemText className='side-nav-item-text' primary={item.name} />
                            </ListItem>
                        </motion.div>
                    </React.Fragment>
                ))}

            </AnimatePresence>
        </Drawer>
    )
}

export default Sidebar;