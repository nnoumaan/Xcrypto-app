import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <HStack p={4} shadow={'base'} bgColor={'blackAlpha.900'} justifyContent={['center','normal']}>
      <Button variant={'outline'} color={'whiteAlpha.900'}>
        <Link to={"/"}>Home</Link>
      </Button>

      <Button variant={'outline'} color={'whiteAlpha.900'} >
        
        <Link to={"/coins"}>Coins</Link>
      </Button>

      <Button variant={'outline'} color={'whiteAlpha.900'} >
      
        <Link to={"/exchange"}>Exchange</Link>
      </Button>
    </HStack>
  );
};

export default Header;
