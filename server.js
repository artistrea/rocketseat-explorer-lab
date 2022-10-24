// Only to be used after the app has been built

import express from "express";
import { CardController } from "./src/api/CardController.js";

const app = express();
const PORT = 3000;

app.use(express.static("dist"));

app.use(express.json());

const cardController = new CardController();

app.post("/api/card/create", (req, res) => {
  try {
    cardController.create(req.body);
    console.log(200);
    res.status(200).send({ message: "card created", data: req.body });
  } catch (e) {
    console.log(400);
    console.log(e);
    res.status(400).send(e);
  }
});

app.get("/api/card/index", (_req, res) => {
  res.status(200).send(JSON.stringify(cardController.index()));
});

app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}!`));
