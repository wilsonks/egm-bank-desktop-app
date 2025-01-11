import React, { useState, useEffect } from 'react';
import { Heading, Stack } from '@chakra-ui/react';

export function CustomHeading() {
  return (
    <Stack spacing={0}>
      <Heading
        as="h1"
        size="2xl"
        fontWeight="bold"
        color="white.500"
        isTruncated
        bg="gray.500"
      >
        Attendant (Name)
      </Heading>
    </Stack>
  );
}

export default CustomHeading;
