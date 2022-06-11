import './Tools.css';
import SimpleInterestCalc from './SimpleInterestCalc'
<<<<<<< HEAD
=======
import FutureValueCalc from './FutureValueCalc'
>>>>>>> 0ffc995 (Simple Interest and FV calc update 1-21-22)
import { withStyles } from '@mui/material/styles';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Tools() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex'}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Simple Interest" {...a11yProps(0)}/>
<<<<<<< HEAD
        <Tab label="Average vs. Actual ROR" {...a11yProps(1)} />
        <Tab label="Black Box Planning" {...a11yProps(2)} />
=======
        <Tab label="Future Value" {...a11yProps(1)}/>
        <Tab label="Average vs. Actual ROR" {...a11yProps(2)} />
        <Tab label="Black Box Planning" {...a11yProps(3)} />
>>>>>>> 0ffc995 (Simple Interest and FV calc update 1-21-22)
      </Tabs>
      <TabPanel value={value} index={0}>
        <SimpleInterestCalc />
      </TabPanel>
      <TabPanel value={value} index={1}>
<<<<<<< HEAD
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
=======
        <FutureValueCalc />
      </TabPanel>
      <TabPanel value={value} index={2}>
      </TabPanel>
      <TabPanel value={value} index={3}>
      </TabPanel>
>>>>>>> 0ffc995 (Simple Interest and FV calc update 1-21-22)
    </Box>
  );
} // Tools
