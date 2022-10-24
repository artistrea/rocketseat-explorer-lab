import fs from "fs";
import path from "path";

const CARD_STORAGE_PATH = "src/api/storage/cards.json";

class CardController {
  constructor() {
    this.cards = JSON.parse(fs.readFileSync(CARD_STORAGE_PATH));
  }

  index() {
    return this.cards;
  }

  create(card) {
    this.validate(card);
    this.cards.push(card);
    fs.writeFileSync(CARD_STORAGE_PATH, JSON.stringify(this.cards));
  }

  remove(cardNumber) {
    this.cards = this.cards.filter((c) => c.number !== cardNumber);
    fs.writeFileSync(CARD_STORAGE_PATH, JSON.stringify(this.cards));
  }

  validate(card) {
    if (this.cards.some((c) => card.number === c.number)) {
      throw { message: "Card already exists" };
    }
  }
}

export { CardController };
