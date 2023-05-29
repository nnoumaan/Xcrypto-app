import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import Loader from "./Loader";
import CoinCard from "./CoinCard";

import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";

const Coins = () => {
  const changePage = (page) => {
    setPage(page);
    setloader(true);
  };

  const bts = new Array(132).fill(1);

  const [coins, setCoins] = useState([]);
  const [loader, setloader] = useState(true);
  // const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        setCoins(data);
        setloader(false);
      } catch (err) {
        // setloader(true);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (loader) {
  }

  return (
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <RadioGroup p={8} value={currency} onChange={setCurrency}>
            <HStack spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">Eur</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>

          <HStack mt={"8"} wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((i) => {
              return (
                <CoinCard
                  id={i.id}
                  key={i.id}
                  name={i.name}
                  image={i.image}
                  symbol={i.symbol}
                  currencySymbol={currencySymbol}
                  price={i.current_price}
                />
              );
            })}
          </HStack>
          <HStack w={"full"} overflow={"auto"} p={"8"}>
            {bts.map((item, index) => (
              <Button

                key={index}
                bgColor={"black"}
                color={"white "}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
