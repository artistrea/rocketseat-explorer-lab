import IMask from "imask";
import { cardNumberRegex } from "./storage/cards";

const securityCodeInput = document.querySelector("#security-code");
const expirationDateInput = document.querySelector("#expiration-date");
const cardHolderInput = document.querySelector("#card-holder");
const cardNumberInput = document.querySelector("#card-number");

const securityCodePattern = { mask: "0000" };
IMask(securityCodeInput, securityCodePattern);

const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      autofix: "pad",
    },
    YY: {
      mask: IMask.MaskedRange,
      from: new Date().getFullYear() % 100,
      to: (new Date().getFullYear() % 100) + 10,
    },
  },
};
IMask(expirationDateInput, expirationDatePattern);

const cardHolderPattern = { mask: /^[a-zA-Z ]+$/ };
IMask(cardHolderInput, cardHolderPattern);

const cardNumberMasks = Object.keys(cardNumberRegex)
  .map((cardType) => ({
    mask: "0000 0000 0000 0000",
    regex: cardNumberRegex[cardType],
    cardType,
  }))
  .concat({ mask: "0000 0000 0000 0000", cardType: "default" });

const cardNumberPattern = {
  mask: cardNumberMasks,
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");

    const found = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    );

    return found;
  },
};
IMask(cardNumberInput, cardNumberPattern);

export {
  cardNumberInput,
  cardHolderInput,
  expirationDateInput,
  securityCodeInput,
};
