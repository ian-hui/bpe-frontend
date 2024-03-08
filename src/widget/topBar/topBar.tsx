import { AppBar, Tabs, Tab, Box } from "@mui/material";
import "./topBar.css"
import { useState } from "react";
import KnowledgeUploader from "../knowledgeUploader/ knowledgeUploader";
import { BpeCommon } from "../../bpeTypes/common";

interface topBarProps extends BpeCommon.WithErrorHandlingProps{
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function TopBar(props: topBarProps){
    const [kw_open, setKwOpen] = useState(false);
    
    const handleKwUpload = (event: React.SyntheticEvent, newValue: number) => {
      if (newValue === 1) { // 假设索引2是“上传知识库文档”标签
        setKwOpen(true);
      } else {
        props.handleChange(event, newValue);
      }
    }

    return (
        <Box sx={{ display: 'flex' }} className='doc-header'>
            <AppBar sx={{ padding: '0 24px', 
            height: '100%', 
            position: 'relative', 
            boxShadow: 'none', 
            backgroundColor: 'var(--primary-300)' }}>
              
              <Tabs
                value={props.value}
                onChange={handleKwUpload}
                aria-label="navigation tabs"
                sx={{
                  color: 'var(--text-100)',
                  '.MuiTab-root': {
                    color: 'var(--text-100)',
                  },
                  '.Mui-selected': {
                    fontWeight: 'bolder ',
                    color: 'var(--accent-200)'
                  },
                  '.MuiTabs-indicator': {
                    backgroundColor: 'var(--primary-100)', // 可以设置您喜欢的颜色，这是指示条的颜色
                  }
                }}
              >
                <Tab label="开始"/>
                <Tab label="上传知识库文档📄" />
              </Tabs>
            <KnowledgeUploader ku_open={kw_open} setKuOpen={setKwOpen} handleError={props.handleError}/>
            </AppBar>
          </Box>
    )
}