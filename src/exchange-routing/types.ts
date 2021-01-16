export type Record = [price: string, orderSize: string];

export interface OrderBook {
  bids: Record[];
  asks: Record[];
}

export interface ExchangeData {
  orderBook: OrderBook;
  exchange: string;
}
