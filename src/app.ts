import express from "express";
import { exchangeRouting } from "./routes";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world! Use /exchange-routing?amount=[bitcoin amount]");
});

app.use("/exchange-routing", exchangeRouting);

app.listen(port, () => {
  console.log("listening on port:", port);
});

process.on("SIGINT", () => {
  console.log("Exiting server!");
  process.exit();
});
