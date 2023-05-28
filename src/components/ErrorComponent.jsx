import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

const ErrorComponent = () => {
  
  return (
    <Alert status='error' position={'fixed'} bottom={5} left={"-50%"} transform={'translateX(-50%)'}
    
    w={'container.lg'}
    >

      <AlertIcon/>
      {'Error While Fetching coins'}

    </Alert>
  )
}

export default ErrorComponent