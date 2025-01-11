import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  VStack,
  Heading,
} from '@chakra-ui/react';

const UserProfile = ({ name, bio }) => (
  <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
    <Heading size={{ base: 'md', md: 'lg' }}>{name}</Heading>
    <Text fontSize={{ base: 'sm', md: 'md' }}>{bio}</Text>
  </Box>
);

const CardsContainer = () => {
  const users = [
    { name: 'John Doe', bio: 'Software Engineer' },
    { name: 'Jane Smith', bio: 'Graphic Designer' },
    { name: 'Alice Johnson', bio: 'Product Manager' },
    { name: 'Bob Brown', bio: 'Data Scientist' },
    { name: 'John Doe', bio: 'Software Engineer' },
    { name: 'Jane Smith', bio: 'Graphic Designer' },
    { name: 'Alice Johnson', bio: 'Product Manager' },
    { name: 'Bob Brown', bio: 'Data Scientist' },
    { name: 'John Doe', bio: 'Software Engineer' },
    { name: 'Jane Smith', bio: 'Graphic Designer' },
    { name: 'Alice Johnson', bio: 'Product Manager' },
    { name: 'Bob Brown', bio: 'Data Scientist' },
    // Add more user profiles as needed
  ];

  return (
    <Flex direction="column" height="100vh" width="100vw">
      <Box as="header" bg="teal.500" color="white" p="4">
        <Text fontSize="xl" fontWeight="bold">
          User Profiles 
        </Text>
      </Box>
      <Box as="main" flex="1" overflowY="auto" p="4">
        <VStack spacing={4}>
          {users.map((user, index) => (
            <UserProfile key={index} name={user.name} bio={user.bio} />
          ))}
        </VStack>
      </Box>
      <Box as="footer" bg="teal.500" color="white" p="4">
        <Text>Footer Content</Text>
      </Box>
    </Flex>
  );
};

export default CardsContainer;
