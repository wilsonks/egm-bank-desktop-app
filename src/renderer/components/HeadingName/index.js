import React, { useState, useEffect, useCallback } from 'react';
import {
  AspectRatio,
  HStack,
  Box,
  Heading,
  StackDivider,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';

export function HeadingName() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);

  switch (role) {
    case 'attendant':
      return (
        <Heading as={'h2'} size="lg" mt={'1'} noOfLines={1} color={'yellow.50'}>
          Card Top Up
        </Heading>
      );
    default:
      return (
        <Heading as={'h2'} size="lg" mt={'1'} noOfLines={1} color={'yellow.50'}>
          SAS Management App
        </Heading>
      );
  }
}

export default HeadingName;
