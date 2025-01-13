import React, { useState, useEffect } from 'react';
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
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

function AttendantFirst() {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.user);
  const { players } = useSelector((state) => state);

  switch (role) {
    case 'attendant':
      return (
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          overflowY="scroll"
          maxH="600px"
        >
          {players.map((player) => (
            <Card key={player.uid}>
              <CardHeader>
                <Heading size="md">{player.nickname}</Heading>
              </CardHeader>
              <CardBody>
                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {600} spins &bull; {53} wins
                    </Box>
                  </Box>

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {player.isPlaying}
                  </Box>

                  <Box>
                    {player.wallet}
                    <Box as="span" color="gray.600" fontSize="sm"></Box>
                  </Box>
                </Box>
              </CardBody>
              <CardFooter>
                <Button size="md" colorScheme="yellow">
                  +TopUp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      );
    default:
      return null;
  }
}

export default AttendantFirst;
