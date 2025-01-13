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
import AttendantScreen from '../AttendantScreen';

function ContentScreen() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);

  switch (role) {
    case 'attendant':
      return <AttendantScreen />;
    default:
      return <AttendantScreen />;
  }
}

export default ContentScreen;
