import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Box,
  Drawer,
  Tab,
  Tabs,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PdfUpload from './views/uploadPdF/uploadPDF';
import './App.css';
import './index.css';
import Sidebar from './widget/sideBar/sideBar';
import { BpeCommon } from './bpeTypes/common';
import ChatView from './views/chatView/chatView';
import { BpeServices } from './bpeService/bpeService';

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

  const testItems: BpeCommon.navigationItemsList = {
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
  const testRecords: BpeCommon.recordList = {
    '1': [
      {
        content: '- 你好，我是你的助手，我可以帮你完成一些任务',
        role: 'gpt',
      },


    ],
  }

  useEffect(() => {
    setNavItems(testItems);
  }, []);

  // 状态变量来追踪当前选中的导航项
  const [navItems, setNavItems] = useState<BpeCommon.navigationItemsList>({ listType: "task", items: [] }); //用于追踪会话列表
  const [selectedNav, setSelectedNav] = useState<BpeCommon.navigationItems>({ chatid: "", name: "newTask" }); // 用于追踪当前选中的导航项
  const [uploading, setUploading] = useState(false); // 用于追踪当前是否正在上传文件
  const handleItemSelected = (navitem: BpeCommon.navigationItems) => {
    setSelectedNav(navitem);
  };

  // 处理新建导航项
  const handleNewItem = (newItem: BpeCommon.navigationItems) => {
    setNavItems(prevNavItems => ({
      ...prevNavItems, // 拷贝原有状态
      items: [newItem, ...prevNavItems.items] // 只更新items数组
    }));
  };

  // 处理上传文件
  const handleUploadFile = async (file: File) => {
    setUploading(true); // 开始上传
    const id = selectedNav.chatid
    const question = file.name
    BpeServices.uploadDocument(file,id,question).then((response) => {
      console.log(response);
      // 假设后端处理完成后，设置 uploading 为 false
      
    //修改导航栏列表
    setNavItems(prevNavItems => ({
      ...prevNavItems, // 拷贝原有状态
      items: prevNavItems.items.map(item => {
        if (item.chatid === id) {
          return { ...item, name: file.name };
        }
        return item;
      })
    }));
    //修改选中的导航项
    setSelectedNav(prevNavItems => ({
      ...prevNavItems, // 拷贝原有状态
      name: file.name
    }));
      setUploading(false);
    });
  }

  // 根据选中的导航项渲染不同的组件
  const renderComponent = () => {
    switch (selectedNav.name) {
      case '新建立任务':
        return <PdfUpload onUpload={handleUploadFile} uploading={uploading} />
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
            <AppBar sx={{ padding: '0 24px', height: '100%', position: 'relative', boxShadow: 'none', backgroundColor: 'black' }}>
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
            <Container maxWidth="md" sx={{ height: '100%', width: '100%', p: 3, paddingBottom: '50px' }}>
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


