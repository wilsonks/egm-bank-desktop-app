import React, { useState, useEffect } from 'react';
const R = require('ramda');

import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  Card,
  CardHeader,
  Heading,
  CardBody,
  VStack,
  SimpleGrid,
  Box,
  HStack,
  Center,
  CardFooter,
  Spacer,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import attendantSlice from '../../../../../store/slices/attendant';

function CardForm(props) {
  const dispatch = useDispatch();
  const {
    uid,
    lastName,
    firstName,
    nickname,
    id,
    wallet,
    pin,
    isPlaying,
    createdAt,
    updatedAt,
  } = useSelector((state) => state.card);
  const { role } = useSelector((state) => state.user);
  const { uri = {} } = useSelector((state) => state.config);

  switch (role) {
    case 'attendant':
      return (
        <VStack alignItems={'stretch'}>
          <Card>
            <CardHeader bgColor={'gray.100'}>
              <Heading size="lg"> Card Details</Heading>
            </CardHeader>
            <CardBody>
              <StatGroup>
                <Stat style={{ minWidth: '70%' }}>
                  <StatNumber>Name:{nickname}</StatNumber>
                  <StatNumber>First:{firstName}</StatNumber>
                  <StatNumber>Last:{lastName}</StatNumber>
                  <StatNumber> PIN:{pin}</StatNumber>
                  <StatHelpText>Created:{createdAt}</StatHelpText>
                  <StatHelpText>Updated:{updatedAt}</StatHelpText>
                  <StatNumber> Session:{isPlaying ? 'Yes' : 'No'}</StatNumber>
                  <StatNumber> Wallet:{wallet}</StatNumber>
                </Stat>
                <Stat>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                  <StatHelpText>-</StatHelpText>
                  <StatHelpText>-</StatHelpText>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                  <StatNumber>
                    <Button size="sm" colorScheme="blackAlpha">
                      Change
                    </Button>
                  </StatNumber>
                </Stat>
              </StatGroup>
            </CardBody>
          </Card>
          <Card>
            <CardHeader bgColor={'blackAlpha.100'} pt={'5px'} pb={'5px'}>
              <Stat>
                <StatNumber>₹{wallet}</StatNumber>
              </Stat>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={4} spacingX="10px" spacingY="5px">
                <Box bg="red.100" height="40px"></Box>
                <Box bg="yellow.100" height="40px"></Box>
                <Box bg="blue.100" height="40px"></Box>
                <Box bg="cyan.100" height="40px"></Box>
                <Box bg="purple.100" height="40px"></Box>
                <Box bg="orange.100" height="40px"></Box>
                <Box bg="green.100" height="40px"></Box>
                <Box bg="blackAlpha.100" height="40px"></Box>
              </SimpleGrid>
            </CardBody>
            <CardFooter>
              <Button size="md" colorScheme="blackAlpha" mr={'5px'}>
                Clear
              </Button>
              <Button size="md" colorScheme="blackAlpha">
                Recharge
              </Button>
            </CardFooter>
          </Card>
        </VStack>
      );
    default:
      return null;
  }
}

export default CardForm;
