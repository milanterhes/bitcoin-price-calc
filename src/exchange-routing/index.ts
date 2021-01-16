import { Request, Response } from "express";
import { binance, coinbase } from "./exchanges";
import calculateCost from "./calculateCost";

interface ExchangeRoutingResponse {
  btcAmount: number;
  usdAmount: number;
  exchange: string;
}

interface QueryParams {
  amount: number;
}

const get = async (req: Request<any, any, any, QueryParams>, res: Response) => {
  const data = await Promise.all([binance(), coinbase()]);

  const cheapest = data.reduce(
    (currentCheapest: ExchangeRoutingResponse | false, ex) => {
      if (!ex) return currentCheapest;
      let cost: number;
      try {
        cost = calculateCost(ex.orderBook.asks, req.query.amount);
      } catch (error) {
        console.log(error);
        return false;
      }

      const response = {
        btcAmount: req.query.amount,
        usdAmount: cost,
        exchange: ex.exchange,
      };

      if (currentCheapest === null || currentCheapest === false) {
        return response;
      }

      if (cost < currentCheapest.usdAmount) {
        return response;
      }

      return currentCheapest;
    },
    null
  );

  if (cheapest === null) {
    return res
      .status(404)
      .send({ message: "Error: Cannot reach any exchanges!" });
  }

  if (cheapest === false) {
    return res
      .status(404)
      .send({ message: "Error: Not enough supply on any of the exchanges!" });
  }

  return res.send(cheapest);
};

export default {
  get,
};
