import React from 'react'
import useContact from './useContact'
import { ContactContainer } from './Contact.styled'
import {
  MaterialReactTable
} from 'material-react-table';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Contact = () => {
  const {
    demoRequestTable,
    contactUsTable
  } = useContact()

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ContactContainer>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Demo Request" {...a11yProps(0)} />
            <Tab label="Contact Us" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MaterialReactTable table={demoRequestTable} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MaterialReactTable table={contactUsTable} />
        </CustomTabPanel>
      </Box>

    </ContactContainer>
  )
}

export default Contact