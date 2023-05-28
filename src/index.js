import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, theme } from '@chakra-ui/react';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}> <App /></ChakraProvider>
   
  </StrictMode>
);

export const server = `https://api.coingecko.com/api/v3`;
