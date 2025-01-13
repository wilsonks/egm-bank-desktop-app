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
import HeadingName from '../HeadingName';

export function CustomHeading() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  //In this case, handleLogoutBtnClick is memoized using useCallback,
  //ensuring that its reference remains stable across renders unless
  //the dispatch function changes (which it typically does not).
  const handleLogoutBtnClick = useCallback(
    () => dispatch(actions.user.UserLoggedOut(uid)),
    [dispatch, uid]
  );

  return (
    <AspectRatio maxH={'60px'} background={'brand.900'} ratio={16 / 9}>
      <HStack
        style={{ alignItems: 'stretch' }}
        spacing={'0'}
        minW={'100%'}
        background={'brand.100'}
        // divider={<StackDivider borderColor="brand.100" />}
      >
        <Box background={'brand.900'} minW={'8%'}></Box>
        <Box background={'brand.900'} minW={'45%'}>
          <HeadingName />
        </Box>
        <Box background={'brand.900'} minW={'32%'}></Box>
        <Box background={'brand.900'} minW={'15%'}>
          {uid == '' ? null : (
            <Button
              size="md"
              colorScheme="yellow"
              mt={'10px'}
              ml={'4rem'}
              onClick={handleLogoutBtnClick}
            >
              Logout
            </Button>
          )}
        </Box>
      </HStack>
    </AspectRatio>
  );
}

export default CustomHeading;
