import React, { useState, useEffect } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeading from '../../components/CustomHeading';
import AttendantFirst from './TabPanels/First';

function AttendantScreen() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  const colors = useColorModeValue(
    ['red.50', 'teal.50', 'blue.50'],
    ['red.900', 'teal.900', 'blue.900']
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];

  return (
    <Tabs
      style={{ alignItems: 'stretch' }}
      onChange={(index) => setTabIndex(index)}
      bg={bg}
      isFitted
      variant="enclosed-colored"
      size="md"
      flexDirection="column"
      justifyContent="flex-start"
    >
      <TabList size="lg" alignItems="flex-start">
        <Tab size="sm">Active Cards</Tab>
        <Tab size="sm">Blacklisted Cards</Tab>
        <Tab size="sm">Transaction History</Tab>
        <Tab size="sm">Shift Settlement</Tab>
        <Tab size="sm">Developer Logs</Tab>
      </TabList>
      <TabPanels p="2rem" height="100%">
        <TabPanel>
          <AttendantFirst />
        </TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>3</TabPanel>
        <TabPanel>4</TabPanel>
        <TabPanel>5</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default AttendantScreen;
