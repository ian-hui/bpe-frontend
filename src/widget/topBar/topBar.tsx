import { AppBar, Tabs, Tab, Box } from "@mui/material";
import "./topBar.css"


interface topBarProps {
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function TopBar(props: topBarProps){
    return (
        <Box sx={{ display: 'flex' }} className='doc-header'>
            <AppBar sx={{ padding: '0 24px', height: '100%', position: 'relative', boxShadow: 'none', backgroundColor: 'var(--primary-300)' }}>
              <Tabs
                value={props.value}
                onChange={props.handleChange}
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
                <Tab label="使用文档📄" />
              </Tabs>
            </AppBar>
          </Box>
    )
}