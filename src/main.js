import "./css/index.css";
import "./masks.js";
import { cardNumberRegex, cardTypeColors } from "./storage/cards";
import {
  cardNumberInput,
  cardHolderInput,
  expirationDateInput,
  securityCodeInput,
} from "./masks.js";

const ccBgColor1 = document.querySelector(
  ".cc-bg > svg > g g:nth-child(1) path"
);
const ccBgColor2 = document.querySelector(
  ".cc-bg > svg > g g:nth-child(2) path"
);
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(number) {
  const cardTypes = Object.keys(cardNumberRegex);

  const cardType =
    cardTypes.find((cardType) => {
      const regex = cardNumberRegex[cardType];
      return number.replace(/ /g, "").match(regex);
    }) || "default";

  const colors = cardTypeColors[cardType];

  ccBgColor1.setAttribute("fill", colors[0]);
  ccBgColor2.setAttribute("fill", colors[1]);

  ccLogo.setAttribute("src", `/cc-${cardType}.svg`);
}

function setCardNumber(cardNumber) {
  const ccNumber = document.querySelector(".cc-number");
  ccNumber.textContent = cardNumber || "1234 5678 9012 3456";
}

function setCardHolder(cardHolder) {
  const ccHolder = document.querySelector(".cc-holder .value");
  ccHolder.textContent = cardHolder || "FULANO DA SILVA";
}

function setCardExpiration(cardExpiration) {
  const ccExpiration = document.querySelector(".cc-expiration .value");
  ccExpiration.textContent = cardExpiration || "12/32";
}

function setSecurityCode(securityCode) {
  const ccSecurityCode = document.querySelector(".cc-security .value");
  ccSecurityCode.textContent = securityCode || "123";
}

cardNumberInput.onblur = (e) => {
  const number = e.target.value;
  setCardType(number);
  setCardNumber(number);
};

cardHolderInput.onblur = (e) => {
  const name = e.target.value;
  setCardHolder(name);
};

expirationDateInput.onblur = (e) => {
  const date = e.target.value;
  setCardExpiration(date);
};

securityCodeInput.onblur = (e) => {
  const code = e.target.value;
  setSecurityCode(code);
};
