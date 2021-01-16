import { Record } from "./types";

const twoDecimals = (num: number) => parseFloat(num.toFixed(2));

export default function calculateCost(
  orders: Record[],
  requestedAmount: number,
  cost: number = 0,
  orderIdx: number = 0
): number {
  if (requestedAmount === 0) return twoDecimals(cost);
  if (orderIdx > orders.length - 1)
    throw new Error("Cannot calculate cost based on the received order book");

  const order = orders[orderIdx];
  const price = parseFloat(order[0]);
  const orderSize = parseFloat(order[1]);

  if (requestedAmount < orderSize) {
    return twoDecimals(cost + requestedAmount * price);
  }
  return calculateCost(
    orders,
    requestedAmount - orderSize,
    cost + orderSize * price,
    orderIdx + 1
  );
}
