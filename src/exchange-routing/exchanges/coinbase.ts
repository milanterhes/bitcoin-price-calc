import fetch from "node-fetch";
import { ExchangeData, OrderBook } from "../types";

//docs: https://docs.prime.coinbase.com/#get-product-order-book
const url =
  "https://api-public.sandbox.prime.coinbase.com/products/BTC-USD/book?level=3";

export default async (): Promise<ExchangeData | null> => {
  let data: OrderBook;
  try {
    data = await (await fetch(url)).json();
  } catch (e) {
    console.log("Cannot get Coinbase Order Book");
    return null;
  }

  if (!data.asks || !data.bids) {
    console.log("Cannot get Coinbase Order Book");
    return null;
  }

  return {
    orderBook: data,
    exchange: "coinbase",
  };
};
