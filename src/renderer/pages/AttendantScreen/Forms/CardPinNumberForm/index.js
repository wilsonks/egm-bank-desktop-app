import React, { useState, useEffect, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import { actions } from '../../../../store';

const validationSchema = yup.object().shape({
  pin: yup
    .string()
    .min(4, 'Invalid Pin Number')
    .max(4, 'Invalid Pin Number')
    .required('Pin Number is required'),
});

function CardPinNumberForm(props) {
  const dispatch = useDispatch();
  const { uid, pin, pinNumberFormOn } = useSelector((state) => state.card);
  const { uri = {} } = useSelector((state) => state.config);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      pin: '',
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      console.log('Modal closed');
      dispatch(actions.card.cardPinNumberChangeFormOff());
    },
  });

  const pinRef = React.useRef(null);

  useEffect(() => {
    pinNumberFormOn ? onOpen() : onClose();
  }, [pinNumberFormOn]);

  // Handle form submission
  const onSubmit = (data) => {
    onClose();

    const { scheme, host, port, path } = uri.ChangePinNumber;

    // Sending POST request
    fetch(`${scheme}://${host}:${port}${path}`, {
      method: 'POST',
      body: JSON.stringify({
        uid: uid,
        pin: data.pin,
        transBy: 'attendant',
        transType: 'Profile',
        transField: 'pin',
        oldValue: '',
        newValue: '',
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
      <Modal initialFocusRef={pinRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Change Pin Number</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.pin} mt={4} mb={4}>
                <FormLabel htmlFor="pin">PIN</FormLabel>
                <Controller
                  name="pin"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="pin"
                      type="pin"
                      placeholder="New PIN"
                      ref={pinRef}
                      {...field}
                    />
                  )}
                />
                <FormErrorMessage>{errors.pin?.message}</FormErrorMessage>
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

export default CardPinNumberForm;
