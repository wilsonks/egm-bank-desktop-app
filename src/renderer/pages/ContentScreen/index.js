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
import CustomHeading from '../../components/CustomHeading';

function ContentScreen() {
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
        <Tab size="sm">NFC Cards</Tab>
        <Tab size="sm">Topups</Tab>
        <Tab size="sm">Slots</Tab>
        <Tab size="sm">Logs</Tab>
      </TabList>
      <TabPanels p="2rem" height="100%">
        <TabPanel>1</TabPanel>
        <TabPanel>2</TabPanel>
        <TabPanel>3</TabPanel>
        <TabPanel>4</TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default ContentScreen;
