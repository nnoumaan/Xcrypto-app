import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (<VStack h={"96vh"} justifyContent={'center'}>

    <Box transform={'scale(8)'}>
      <Spinner size={'lg'}></Spinner>
    </Box>





  </VStack>
  )
}

export default Loader