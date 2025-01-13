// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#f5faff',
      100: '#e0f0ff',
      200: '#b3e1ff',
      300: '#80c8ff',
      400: '#33aaff',
      500: '#0088ff',
      600: '#0077cc',
      700: '#0066aa',
      800: '#005588',
      900: '#004466',
    },
  },
  fonts: {
    heading: "'Georgia', serif",
    body: "'Roboto', sans-serif",
  },
});

export default customTheme;
