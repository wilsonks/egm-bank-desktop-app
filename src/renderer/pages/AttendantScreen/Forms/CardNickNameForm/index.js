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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../../../store';

function CardNickNameForm(props) {
  const dispatch = useDispatch();
  const { uid, nickname, nickNameFormOn } = useSelector((state) => state.card);
  const { uri = {} } = useSelector((state) => state.config);

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      console.log('Modal closed');
      dispatch(actions.card.cardNickNameFormOff());
    },
  });

  const nickNameRef = React.useRef(null);

  useEffect(() => {
    nickNameFormOn ? onOpen() : onClose();
  }, [nickNameFormOn]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onClose();

    console.log(`Input Value via Ref: ${nickNameRef.current.value}`); // Access the current value of the input
    const { scheme, host, port, path } = uri.ChangeNickName;

    // Sending POST request
    fetch(`${scheme}://${host}:${port}${path}`, {
      method: 'POST',
      body: JSON.stringify({
        uid: uid,
        nickname: nickNameRef.current.value,
        transBy: '',
        transType: '',
        transField: '',
        oldValue: nickname,
        newValue: nickNameRef.current.value,
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

  return (
    <>
      <Modal initialFocusRef={nickNameRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Change Nick Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nick name</FormLabel>
                <Input ref={nickNameRef} placeholder={nickname} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Spacer />
              <Button type="submit" colorScheme="blue" mr={3}>
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CardNickNameForm;
