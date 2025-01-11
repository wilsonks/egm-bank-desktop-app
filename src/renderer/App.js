import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { AspectRatio, ChakraProvider } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import LoginScreen from './pages/LoginScreen';
import ContentScreen from './pages/ContentScreen';

function App() {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  return (
    <ChakraProvider cssVarsRoot="#root">
      <HashRouter>
        <AspectRatio background={'orange.200'} ratio={16 / 9}>
          {uid == '' ? <LoginScreen /> : <ContentScreen />}
        </AspectRatio>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
