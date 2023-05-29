import { Container,Box, RadioGroup, HStack, Radio, VStack,Text, Image, Stat, StatLabel, StatNumber, StatArrow, StatHelpText  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import {server} from'..';
import { useParams } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const CoinsDetails = () => {
  const [coin, setCoin] = useState([]);
  const [myloader, setloader] = useState(true);
  const [error, setError] = useState(false);  
  const [currency, setCurrency] = useState("inr");


  const currencySymbol =
  currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const param = useParams()

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/${param.id}`
        );

        console.log(data)
        setCoin(data);
        setloader(false);
      } catch (err) {
        // setloader(true);
      }
    };



    fetchCoins();
  }, [param.id]);


  
  if (error) {
    return <ErrorComponent />;
  }




  return (
    <Container maxW={'container.xl'}>

  
      {myloader ? (<Loader /> ) : (<>
      
      
      <Box w={'full'} borderWidth={1}>

        <h1>Noumaan</h1>



      </Box>
      

      
         
      <RadioGroup p={8} value={currency} onChange={setCurrency}>
            <HStack spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">Eur</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>


        {/* Chart Buttons  */}


        <VStack spacing={4} p={16} alignItems={'flex-start'} >

          <Text  fontSize={'small'} opacity={0.7} alignSelf={'center'}>Last Updated { Date(coin.market_data.last_updated).split('G')[0]}</Text>

          <Image w={16} h={16} src= {coin.image.large} objectFit={'contain'}/>

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
            <StatHelpText><StatArrow type={coin.market_data.market_cap_change_24h > 0 ? 'increase':'decrease'}/>{coin.market_data.market_cap_change_percentage_24h} %</StatHelpText>
          </Stat>
        


        </VStack>


      </> )}


   


    </Container>
  )
}

export default CoinsDetails