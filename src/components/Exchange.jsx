import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import { Container, HStack, VStack, Image, Heading,Text} from "@chakra-ui/react";

const Exchange = () => {
  const [mydata, setmydata] = useState([]);
  const [loader, setloader] = useState(true);

  const [error,setError] = useState(false)
  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setmydata(data);
        setloader(false);
      } catch (err) {
        setError(true)
        setloader(true);
      }
    };

    fetchExchange();
  }, []);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack mt={"8"} wrap={"wrap"}>
            {mydata.map((i) => {
              return (
                <ExchangeCard
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, url, image, rank }) => {
  return (
    <a href={url} target="blank">
      <VStack
        w={"52"}
        shadow={"xl"}
        h={60}
        p={"8"}
        borderRadius={"xl"}
        m={"4"}
        transition={"all 0.3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
            backgroundColor:'#D6C675'
          },
        }}

        justifyContent={'center'}
        alignItems={'center'}
        
      >
        <Image src={image} w="10" h="10" objectFit={"cover"} />
        <Heading size={"md"} noOfLines={"1"}>
          {rank}
        </Heading>
        <Text fontSize={25} textAlign={'center'} noOfLines={2}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchange;
