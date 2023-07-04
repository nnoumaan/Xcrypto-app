import { Avatar, Box, Stack,Text,VStack} from '@chakra-ui/react'
import React from 'react'
import myimage from '../assets/myImages.jpg'
const Footer = () => {
  return (
   <Box w={'full'} minH={'48'} bgColor={'blackAlpha.900'} color={'whiteAlpha.700'} px={'16'} py={['16','8']}>


<Stack direction={['column' ,'row']} h={'full'} alignItems={'center'} >


<VStack w={'full'} alignItems={['center','flex-start']}>
<Text fontWeight={'bold'}> About Us</Text>
<Text letterSpacing={'widest'} fontSize={'sm'} textAlign={['center','left']}>We Are The best Crypto trading app in india, we Provide  our guidance at a very cheap price   </Text>
</VStack>

<VStack> <Avatar boxSize={'28'} mt={['4','0']} src={myimage} objectFit={'fill'}/>

<Text>Noumaan Ansari</Text>
<Text>Founder X-Crypto App</Text>



</VStack>
</Stack>


   </Box>
  

  
   )
}

export default Footer
