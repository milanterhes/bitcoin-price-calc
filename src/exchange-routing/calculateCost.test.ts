import calculateCost from "./calculateCost";
import { Record } from "./types";

describe("calculateCost", () => {
  test("calculates cost correctly with integers", () => {
    const testOrders: Record[] = [
      ["5", "1"],
      ["4", "2"],
      ["3", "3"],
      ["2", "4"],
      ["1", "5"],
    ];

    expect(calculateCost(testOrders, 6)).toEqual(22);
    expect(calculateCost(testOrders, 1)).toEqual(5);
    expect(calculateCost(testOrders, 0)).toEqual(0);
  });

  test("calculates cost correctly with floats", () => {
    const testOrders: Record[] = [
      ["24188.96000000", "0.30869000"],
      ["24185.99000000", "0.00454700"],
      ["24185.79000000", "0.02535500"],
      ["24185.52000000", "0.02066800"],
    ];

    expect(calculateCost(testOrders, 0.1)).toEqual(
      parseFloat((2418.896).toFixed(2))
    );
    expect(calculateCost(testOrders, 0.31)).toEqual(
      parseFloat((7498.5737093).toFixed(2))
    );
    expect(calculateCost(testOrders, 0.32)).toEqual(
      parseFloat((7740.43229777).toFixed(2))
    );
  });

  test("throws an error if not enough orders", () => {
    const testOrders: Record[] = [];

    expect(() => calculateCost(testOrders, 0.1)).toThrow(
      "Cannot calculate cost based on the received order book"
    );
  });
});
