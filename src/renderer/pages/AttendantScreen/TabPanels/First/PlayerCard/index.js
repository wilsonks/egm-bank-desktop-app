import React, { useState, useEffect } from 'react';
const R = require('ramda');

import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import attendantSlice from '../../../../../store/slices/attendant';

function PlayerCard({ player }) {
  const {
    uid,
    nickname,
    firstName,
    lastName,
    wallet,
    isPlaying,
    createdAt = '',
    updatedAt = '',
  } = player;

  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { uri = {} } = useSelector((state) => state.config);

  useEffect(() => {
    if (R.isNotNil(uri) && R.isNotNil(uri.playersUri)) {
      dispatch(
        attendantSlice.actions.AttendantLoginSuccess({
          playersUri: uri.playersUri,
        })
      );
    }
  }, [uri]);

  switch (role) {
    case 'attendant':
      return (
        <Card>
          <CardHeader
            padding={'2'}
            bgColor={isPlaying ? 'red.100' : 'gray.100'}
          >
            <Stat>
              <StatNumber>{nickname}</StatNumber>
              <StatLabel>{'XXXX' + uid.slice(4)}</StatLabel>
              <StatHelpText>
                {createdAt.slice(0, -12).slice(2)}-to-{' '}
                {updatedAt.slice(0, -12).slice(2)}
              </StatHelpText>
              <StatHelpText></StatHelpText>
            </Stat>
          </CardHeader>
          <CardBody>
            <Box p="1">
              <Stat>
                <StatLabel>Card Balance</StatLabel>
                <StatNumber>₹{wallet}</StatNumber>
              </Stat>
            </Box>
          </CardBody>
          <CardFooter>
            <Button size="sm" colorScheme="blackAlpha">
              Touch
            </Button>
          </CardFooter>
        </Card>
      );
    default:
      return null;
  }
}

export default PlayerCard;
