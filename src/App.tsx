import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Drawer,
  Tab,
  Tabs,
  Hidden,
} from '@mui/material';
import { createTheme, CSSObject, styled, Theme, ThemeProvider, useTheme } from '@mui/material/styles';
import PdfUpload from './views/uploadPdF/uploadPDF';
import './App.css';
import './index.css';
import Sidebar from './widget/sideBar/sideBar';
import { BpeCommon } from './bpeTypes/common';
import ChatView from './views/chatView/chatView';
import CreateIcon from '@mui/icons-material/Create';
import { Chat } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#fff',
    },
  },
});




const App: React.FC = () => {

  const testItems:BpeCommon.navigationItemsList = {
    listType: 'Task',
    items: [
      {
        chatid: '1',
        name: '公司1',
      },
      {
        chatid: '2',
        name: '公司2',
      },
      {
        chatid: '3',
        name: '公司3',
      },
    ],
  }
  const testRecords:BpeCommon.recordList = {
    '1':[
      {
        content: '- 公司1',
        role: 'user',
      },
      {
        content: '- 公司2',
        role: 'gpt',
      },
      {
        content: '公司3',
        role: 'user',
      },
      {
        content: '公司4',
        role: 'gpt',
      },
      {
        content: '公司5',
        role: 'user',
      },
      {
        content: '公司6',
        role: 'gpt',
      },
      {
        content: '公司7',
        role: 'user',
      },
      {
        content: '公司8',
        role: 'gpt',
      },
      {
        content: '公司9',
        role: 'user',
      },
      {
        content: '公司10',
        role: 'gpt',
      },
      {
        content: '公司11',
        role: 'user',
      },
      {
        content: '公司12',
        role: 'gpt',
      },
      {
        content: '公司13',
        role: 'user',
      },
      {
        content: '公司14',
        role: 'gpt',
      },
      {
        content: '公司15',
        role: 'user',
      },
      {
        content: '公司16',
        role: 'gpt',
      },
      {
        content: '公司17',
        role: 'user',
      },
      {
        content: '公司18',
        role: 'gpt',
      },
      {
        content: '公司19',
        role: 'user',
      },
      {
        content: '公司20',
        role: 'gpt',
      },
      {
        content: '公司21',
        role: 'user',
      },
      {
        content: '公司22',
        role: 'gpt',
      },
      {
        content: '公司23',
        role: 'user',
      },
      {
        content: '公司24',
        role: 'gpt',
      },
      {
        content: '公司25',
        role: 'user',
      },
      {
        content: '公司26',
        role: 'gpt',
      },
      {
        content: '公司27',
        role: 'user',
      },
      {
        content: '公司28',
        role: 'gpt',
      },
      {
        content: '公司29',
        role: 'user',
      },
      {
        content: '公司30',
        role: 'gpt',
      },
      {
        content: '公司31',
        role: 'user',
      },
      {
        content: '公司32',
        role: 'gpt',
      },

    ],
  }

  useEffect(() => {
    setNavItems(testItems);
  }, []);

    // 状态变量来追踪当前选中的导航项
    const [navItems, setNavItems] = useState<BpeCommon.navigationItemsList>({listType:"task",items:[]}); // 用于追踪当前选中的导航项
    const [selectedNav, setSelectedNav] = useState<BpeCommon.navigationItems>({chatid:"",name:"newTask"}); // 用于追踪当前选中的导航项
    const handleItemSelected = (navitem:BpeCommon.navigationItems) => {
      setSelectedNav(navitem);
    };
    const handleNewItem = (newItem: BpeCommon.navigationItems) => {
      console.log(navItems)
      setNavItems(prevNavItems => ({
        ...prevNavItems, // 拷贝原有状态
        items: [newItem, ...prevNavItems.items] // 只更新items数组
      }));
    };

    // 根据选中的导航项渲染不同的组件
    const renderComponent = () => {
      switch (selectedNav.name) {
        case '新建立任务':
          return <PdfUpload />; 
        default:
          return <ChatView records={testRecords['1']} />;
      }
    };

    // 状态变量来追踪当前选中的 Tab
  const [value, setValue] = useState(0); // 用于追踪当前选中的 Tab，value 为选中的 Tab 的索引
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  return (
    <ThemeProvider theme={theme}>
      <Box className='app-wrapper'>
        <Box className='app-navigation'>
          <Drawer
            variant="permanent"
            sx={{
              width: '100%',
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { position: 'relative', height: '100%', border: 'none' },
            }}
          >
            {/* 增加一个logo */}
            <Box className='app-navigation-logo'>
              <a href='#'>
                <div style={{
                  width: '24px', // 增加图标大小
                  height: '24px', // 增加图标大小
                  borderRadius: '50%',
                  backgroundImage: "url('/images/buss-logo.png')",
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  margin: 'auto'
                }}></div>
              </a>
            </Box>
          </Drawer>
        </Box>
        <Box className='page-wrapper'>
          {/* 顶部导航栏 */}
          <Box sx={{ display: 'flex' }} className='doc-header'>
            <AppBar  sx={{ padding: '0 24px', height: '100%', position: 'relative', boxShadow: 'none', backgroundColor: 'black'}}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                aria-label="navigation tabs"
                sx={{
                  '.MuiTab-root': {
                    color: 'var(--text-secondary)',
                  },
                  '.Mui-selected': {
                    fontWeight: 'bolder ',
                    color: 'white'
                  },
                  '.MuiTabs-indicator': {
                    backgroundColor: 'var(--text-secondary)', // 可以设置您喜欢的颜色
                  }
                }}
              >
                <Tab label="开始" />
                <Tab label="使用文档📄" /> 
              </Tabs>
            </AppBar>
          </Box>
          {/* // 页面主体 */}
          <Box sx={{ display: 'flex' }} className='page-body' overflow={'auto'}>
            {/* // 左侧导航栏 */}
            <Box className='docs-navi'>
                <Sidebar listType={navItems.listType} items={navItems.items} selected={selectedNav.chatid} onItemSelected={handleItemSelected} onNewItem={handleNewItem} />
            </Box>
            <Container maxWidth="md" sx={{height:'100%',width:'100%', p:3,paddingBottom:'50px'}}>
                {/* <PdfUpload /> */}
                {renderComponent()}
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;


