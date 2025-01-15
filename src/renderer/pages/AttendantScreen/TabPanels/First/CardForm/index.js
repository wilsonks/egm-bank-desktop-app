import React, { useState, useEffect, useCallback } from 'react';
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
import { actions } from '../../../../../store';

function CardForm(props) {
  const [amount, setAmount] = useState(0);
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
  const { players } = useSelector((state) => state);

  useEffect(() => {
    if (R.isNotNil(uid))
      if (players?.findIndex((card) => card.uid == uid) != -1) {
        const findIndex = players?.findIndex((card) => card.uid == uid);
        const player = players[findIndex];
        dispatch(actions.card.cardSet({ ...player }));
      }
  }, [players]);

  //In this case, handleSelectBtnClick is memoized using useCallback,
  //ensuring that its reference remains stable across renders unless
  //the dispatch function changes (which it typically does not).
  const handleChangeNickNameBtnClick = useCallback(
    () => dispatch(actions.card.cardNickNameFormOn()),
    [dispatch, uid]
  );
  const handleChangePinNumberBtnClick = useCallback(
    () => dispatch(actions.card.cardPinNumberChangeFormOn()),
    [dispatch, uid]
  );
  const handleCloseBtnClick = useCallback(
    () => dispatch(actions.card.cardReset()),
    [dispatch]
  );

  const handlePlayerSessionCloseBtnClick = () => {
    const { scheme, host, port, path } = uri.PlayerSessionClose;

    // Sending POST request
    fetch(`${scheme}://${host}:${port}${path}`, {
      method: 'POST',
      body: JSON.stringify({
        uid: uid,
        isPlaying: false,
        transBy: 'attendant',
        transType: 'Wallet',
        transField: 'isPlaying',
        newValue: 'true',
        newValue: 'false',
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`json data: ${data}`);
        dispatch(
          actions.players.PlayersRefresh({
            playersUri: uri.playersUri,
          })
        );
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleBuyInBalanceBtnClick = () => {
    const { scheme, host, port, path } = uri.BuyInBalance;

    if (amount > 0) {
      // Sending POST request
      fetch(`${scheme}://${host}:${port}${path}`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          wallet: wallet + amount,
          transBy: 'attendant',
          transType: 'Wallet',
          transField: 'wallet',
          depositAmount: 0,
          withdrawAmount: amount,
          prevCredit: wallet,
          newCredit: wallet + amount,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`json data: ${data}`);
          dispatch(
            actions.players.PlayersRefresh({
              playersUri: uri.playersUri,
            })
          );
          setAmount(0);
        })
        .catch((error) => console.error('Error:', error));
    }
  };
  const handleBuyOutBalanceBtnClick = () => {
    const { scheme, host, port, path } = uri.BuyOutBalance;

    if (amount > 0 && wallet >= amount) {
      // Sending POST request
      fetch(`${scheme}://${host}:${port}${path}`, {
        method: 'POST',
        body: JSON.stringify({
          uid: uid,
          wallet: wallet - amount,
          transBy: 'attendant',
          transType: 'Wallet',
          transField: 'wallet',
          depositAmount: amount,
          withdrawAmount: 0,
          prevCredit: wallet,
          newCredit: wallet - amount,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(`json data: ${data}`);
          dispatch(
            actions.players.PlayersRefresh({
              playersUri: uri.playersUri,
            })
          );
          setAmount(0);
        })
        .catch((error) => console.error('Error:', error));
    }
  };
  const handleTotalBuyOutBalanceBtnClick = () => {
    const { scheme, host, port, path } = uri.BuyOutBalance;

    // Sending POST request
    fetch(`${scheme}://${host}:${port}${path}`, {
      method: 'POST',
      body: JSON.stringify({
        uid: uid,
        wallet: 0,
        transBy: 'attendant',
        transType: 'Wallet',
        transField: 'wallet',
        depositAmount: 0,
        withdrawAmount: wallet,
        prevCredit: wallet,
        newCredit: 0,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`json data: ${data}`);
        dispatch(
          actions.players.PlayersRefresh({
            playersUri: uri.playersUri,
          })
        );
        setAmount(0);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <VStack alignItems={'stretch'}>
      <Card>
        <CardHeader bgColor={'blackAlpha.100'} pt={'5px'} pb={'5px'}>
          <Stat>
            <StatNumber>Card Balance:₹{wallet}</StatNumber>
          </Stat>
        </CardHeader>
        {/* <CardHeader bgColor={'blackAlpha.200'} pt={'5px'} pb={'5px'}>
              <StatGroup>
                <Stat minW={'70%'}>
                  <StatNumber>₹{wallet}</StatNumber>
                </Stat>
                <Stat>
                  {wallet > 0 ? (
                    <Button size="md" colorScheme="blackAlpha" mr={'5px'}>
                      CashOut
                    </Button>
                  ) : null}
                </Stat>
              </StatGroup>
            </CardHeader> */}
        <CardHeader bgColor={'blackAlpha.300'} pt={'5px'} pb={'5px'}>
          <Stat>
            <StatNumber>₹{amount}</StatNumber>
          </Stat>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={4} spacingX="10px" spacingY="5px">
            <Box
              as="button"
              bg="green.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 50)}
            >
              <Center pt={'5px'}>+50</Center>
            </Box>
            <Box
              as="button"
              bg="yellow.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 100)}
            >
              <Center pt={'5px'}>+100</Center>
            </Box>
            <Box
              as="button"
              bg="blue.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 500)}
            >
              <Center pt={'5px'}>+500</Center>
            </Box>
            <Box
              as="button"
              bg="cyan.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 2000)}
            >
              <Center pt={'5px'}>+2K</Center>
            </Box>
            <Box
              as="button"
              bg="purple.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 10000)}
            >
              <Center pt={'5px'}>+10K</Center>
            </Box>
            <Box
              as="button"
              bg="orange.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 50000)}
            >
              <Center pt={'5px'}>+50K</Center>
            </Box>
            <Box
              as="button"
              bg="red.100"
              height="40px"
              onClick={() => setAmount((prev) => prev + 500000)}
            >
              <Center pt={'5px'}>+5L</Center>
            </Box>
            <Box
              as="button"
              bg="cyan.400"
              height="40px"
              onClick={() => setAmount((prev) => prev + 2000000)}
            >
              <Center pt={'5px'}>+20L</Center>
            </Box>
            <Box as="button" height="40px"></Box>
            <Box as="button" height="40px"></Box>
            <Box
              as="button"
              bg="blackAlpha.100"
              height="40px"
              onClick={() => setAmount(wallet)}
            >
              <Center pt={'5px'}>BALANCE</Center>
            </Box>
            <Box
              as="button"
              bg="blackAlpha.100"
              height="40px"
              onClick={() => setAmount(0)}
            >
              <Center pt={'5px'}>RESET</Center>
            </Box>
          </SimpleGrid>
        </CardBody>
        <CardFooter>
          <Button
            onClick={handleBuyOutBalanceBtnClick}
            size="md"
            colorScheme="red"
          >
            Buy-Out
          </Button>
          <Spacer />
          <Button
            onClick={handleBuyInBalanceBtnClick}
            size="md"
            colorScheme="red"
          >
            Buy-In
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader bgColor={'gray.100'} pt={'5px'} pb={'5px'}>
          <Stat>
            <StatNumber>Player Profile</StatNumber>
          </Stat>
        </CardHeader>
        <CardBody>
          <StatGroup>
            <Stat style={{ minWidth: '70%' }}>
              <StatNumber>Name:{nickname}</StatNumber>
              {/* <StatNumber>First:{firstName}</StatNumber> */}
              {/* <StatNumber>Last:{lastName}</StatNumber> */}
              <StatNumber> PIN:{pin}</StatNumber>
              <StatHelpText>Created:{createdAt}</StatHelpText>
              <StatHelpText>Updated:{updatedAt}</StatHelpText>
              <StatNumber>Session:{isPlaying ? 'Open' : '-'}</StatNumber>
            </Stat>
            <Stat>
              <StatNumber>
                <Button
                  onClick={handleChangeNickNameBtnClick}
                  size="sm"
                  colorScheme="red"
                >
                  Change
                </Button>
              </StatNumber>
              <StatNumber>
                <Button
                  onClick={handleChangePinNumberBtnClick}
                  size="sm"
                  colorScheme="red"
                >
                  Change
                </Button>
              </StatNumber>
              {/* <StatNumber>
                <Button size="sm" colorScheme="blackAlpha">
                  Change
                </Button>
              </StatNumber>
              <StatNumber>
                <Button size="sm" colorScheme="blackAlpha">
                  Change
                </Button>
              </StatNumber> */}
              <StatHelpText>-</StatHelpText>
              <StatHelpText>-</StatHelpText>
              <StatNumber>
                {isPlaying ? (
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={handlePlayerSessionCloseBtnClick}
                  >
                    Close
                  </Button>
                ) : null}
              </StatNumber>
            </Stat>
          </StatGroup>
        </CardBody>
      </Card>
      <Spacer />
      <Button onClick={handleCloseBtnClick} colorScheme="gray">
        CLOSE
      </Button>
    </VStack>
  );
}

export default CardForm;
