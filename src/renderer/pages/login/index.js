import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Flex,
  PinInput,
  FormErrorMessage,
  Stack,
  HStack,
} from '@chakra-ui/react';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { cardSet } from '../../store/slices/card';

const validationSchema = yup.object().shape({
  account: yup
    .string()
    .min(8, 'Invalid Account Number')
    .required('Account Number is required'),
  pin: yup
    .string()
    .min(4, 'Invalid Pin Number')
    .required('Pin Number is required'),
});

function LoginPage({ heading = 'Attendant Login' }) {
  const dispatch = useDispatch();
  const { account, pin } = useSelector((state) => state.card);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      account: '',
      pin: '',
    },
  });

  // Set default values when component mounts
  useEffect(() => {
    setValue('account', account);
    setValue('pin', pin);
  }, [account, pin, setValue]);

  const onSubmit = (data) => {
    console.log('Submitted Data:', data);
    // Dispatch action to update Redux store if needed
    dispatch(cardSet(data));
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="md"
      boxShadow="lg"
      width={{ base: '90%', sm: '400px' }}
    >
      <Heading mb={6} textAlign="center">
        {heading}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.account}>
          <FormLabel htmlFor="account">Account Number</FormLabel>
          <Controller
            name="account"
            control={control}
            render={({ field }) => (
              <Input id="account" placeholder="Enter your account" {...field} />
            )}
          />
          <FormErrorMessage>{errors.account?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.pin} mt={4} mb={4}>
          <FormLabel htmlFor="pin">Password</FormLabel>
          <Controller
            name="pin"
            control={control}
            render={({ field }) => (
              <Input
                id="pin"
                type="pin"
                placeholder="Enter your pin"
                {...field}
              />
            )}
          />
          <FormErrorMessage>{errors.pin?.message}</FormErrorMessage>
        </FormControl>
        <HStack>
          <Button colorScheme="yellow" type="submit" width="50%">
            Login
          </Button>
        </HStack>
      </form>
    </Box>
  );
}

export default LoginPage;
