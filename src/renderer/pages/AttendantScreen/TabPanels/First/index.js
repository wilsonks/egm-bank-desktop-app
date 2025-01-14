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
  Grid,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import attendantSlice from '../../../../store/slices/attendant';
import PlayerCard from './PlayerCard';
import CardForm from './CardForm';

function AttendantFirst() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { players } = useSelector((state) => state);
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
        <Grid templateColumns="repeat(10, 1fr)" gap={'2'}>
          <GridItem
            colSpan={7}
            h={'500px'}
            border={'1px'}
            borderColor={'gray.100'}
          >
            <SimpleGrid
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              overflowY="scroll"
              maxH="500px"
            >
              {players.map((player) => (
                <PlayerCard key={player.uid} player={player} />
              ))}
            </SimpleGrid>
          </GridItem>
          <GridItem
            colStart={8}
            colEnd={11}
            h={'700px'}
            bg="whiteAlpha.900"
            p={'10px'}
          >
            <CardForm />
          </GridItem>
        </Grid>
      );
    default:
      return null;
  }
}

export default AttendantFirst;
