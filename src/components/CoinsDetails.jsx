import {
  Container,
  Box,
  RadioGroup,
  HStack,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  StatHelpText,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { server } from "..";
import { useParams } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinsDetails = () => {
  const [coin, setCoin] = useState([]);
  const [myloader, setloader] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState('24h');
  const [chartarr, setChartArr] = useState([]);

  const btns = ["24h", "7d", "30d", "60d", "200d", "1y", "max"];

  const stathandler = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setloader(true)
        break;

      case "60d":
        setDays("60d");
        setloader(true)
        break;
      case "7d":
        setDays("7d");
        setloader(true)
        break;
      case "30d":
        setDays("30d");
        setloader(true)
        break;

      case "200d":
        setDays("200d");
        setloader(true)
        break;

      case "1y":
        setDays("365d");
        setloader(true)
        break;
      case "max":
        setDays("max");
        setloader(true)
        break;

      default:
        setDays("24h");
        break;
    }
  };

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const param = useParams();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);

        const { data: chartdata } = await axios.get(
          `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArr(chartdata.prices);

        setloader(false);
      } catch (err) {
        // setloader(true);
      }
    };

    fetchCoins();
  }, [param.id, currency, days]);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <Container maxW={"container.xl"}>
      {myloader ? (
        <Loader />
      ) : (
        <>
          <Box w={"full"} borderWidth={1}>
            <Chart arr={chartarr} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={4} wrap={"wrap"}>
            {btns.map((i) => {
              return <Button key={i} onClick={() => stathandler(i)}>{i}</Button>;
            })}
          </HStack>

          {/* Chart Buttons  */}

          <RadioGroup p={8} value={currency} onChange={setCurrency}>
            <HStack spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">Eur</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={4} p={16} alignItems={"flex-start"}>
            <Text fontSize={"small"} opacity={0.7} alignSelf={"center"}>
              Last Updated {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image w={16} h={16} src={coin.image.large} objectFit={"contain"} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.market_cap_change_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.market_cap_change_percentage_24h} %
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={30}
              bgColor={"blackAlpha.900"}
              color={"white"}
              borderRadius={"md"}
            >
              #{coin.market_cap_rank}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p={4}>
              <Item
                title={"Max Supply"}
                value={
                  coin.market_data.max_supply
                    ? coin.market_data.max_supply
                    : "NA"
                }
              ></Item>
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              ></Item>
              <Item
                title={"Market Cap"}
                value={coin.market_data.market_cap[currency]}
              ></Item>
              <Item
                title={"All Time High"}
                value={coin.market_data.ath[currency]}
              ></Item>
              <Item
                title={"All Time Low"}
                value={coin.market_data.atl[currency]}
              ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack w={"full"} my={4} justifyContent={"space-between"}>
    {" "}
    <Text fontFamily={"Bebas Neue"}>{title}</Text>
    <Text fontFamily={"Bebas Neue"}>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24Hr Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);
export default CoinsDetails;
