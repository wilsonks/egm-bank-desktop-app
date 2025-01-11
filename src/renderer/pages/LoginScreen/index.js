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

import LoginPage from '../login';

function LoginScreen() {
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
      size="lg"
    >
      <VStack spacing={4} align="stretch" justify="flex-start">
        <TabList alignItems="flex-start">
          <Tab>Attendant</Tab>
          <Tab>Manager</Tab>
          <Tab>Admin</Tab>
          <Tab>Developer</Tab>
        </TabList>
        <TabPanels p="2rem">
          <TabPanel>
            <LoginPage />
          </TabPanel>
          <TabPanel>
            <LoginPage heading="Manager Login" />
          </TabPanel>
          <TabPanel>
            <LoginPage heading="Admin Login" />
          </TabPanel>
          <TabPanel>
            <LoginPage heading="Developer Login" />
          </TabPanel>
        </TabPanels>
      </VStack>
    </Tabs>
  );
}

export default LoginScreen;
