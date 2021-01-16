import fetch from "node-fetch";
import { ExchangeData, OrderBook } from "../types";

//docs: https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#order-book
const url = "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5000";

export default async (): Promise<ExchangeData | null> => {
  let data: OrderBook;
  try {
    data = await (await fetch(url)).json();
  } catch (e) {
    console.log("Cannot get Binance Order Book");
    return null;
  }

  return {
    orderBook: data,
    exchange: "binance",
  };
};
