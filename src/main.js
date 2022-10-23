import IMask from "imask";
import "./css/index.css";

const ccBgColor1 = document.querySelector(
  ".cc-bg > svg > g g:nth-child(1) path"
);
const ccBgColor2 = document.querySelector(
  ".cc-bg > svg > g g:nth-child(2) path"
);
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(cardType) {
  const typeColors = {
    mastercard: ["#C69347", "#DF6F29"],
    visa: ["#436D99", "#2D57F2"],
    default: ["#2F2F2F", "#2F2F2F"],
  };

  const colors = typeColors[cardType] || typeColors["default"];

  ccBgColor1.setAttribute("fill", colors[0]);
  ccBgColor2.setAttribute("fill", colors[1]);

  ccLogo.setAttribute("src", `/cc-${cardType || "default"}.svg`);
}

function setCardNumber(cardNumber) {
  const ccNumber = document.querySelector(".cc-number");
  ccNumber.textContent = cardNumber;
}

function setCardHolder(cardHolder) {
  const ccHolder = document.querySelector(".cc-holder .value");
  ccHolder.textContent = cardHolder;
}

function setCardExpiration(cardExpiration) {
  const ccExpiration = document.querySelector(".cc-expiration .value");
  ccExpiration.textContent = cardExpiration;
}

function setSecurityCode(securityCode) {
  const ccSecurityCode = document.querySelector(".cc-security .value");
  ccSecurityCode.textContent = securityCode;
}

const securityCodeInput = document.querySelector("#security-code");
const securityCodePattern = { mask: "0000" };
const securityCodeMasked = IMask(securityCodeInput, securityCodePattern);

const expirationDateInput = document.querySelector("#expiration-date");
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
const expirationDateMasked = IMask(expirationDateInput, expirationDatePattern);

const cardHolderInput = document.querySelector("#card-holder");
const cardHolderPattern = { mask: /^[a-zA-Z ]+$/ };
const cardHolderMasked = IMask(cardHolderInput, cardHolderPattern);

const cardNumberRegex = {
  visa: /^4\d{15}$/,
  mastercard: /^(5[1-5]\d{2}|22[2-9]\d|2[3-7]\d{2})\d{12}$/,
};

const cardNumberMasks = Object.keys(cardNumberRegex)
  .map((cardType) => ({
    mask: "0000 0000 0000 0000",
    regex: cardNumberRegex[cardType],
    cardType,
  }))
  .concat({ mask: "0000 0000 0000 0000", cardType: "default" });

const cardNumberInput = document.querySelector("#card-number");
const cardNumberPattern = {
  mask: cardNumberMasks,
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");

    const found = dynamicMasked.compiledMasks.find(({ regex }) =>
      number.match(regex)
    );

    setCardType(found.cardType);

    return found;
  },
};
const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern);

cardNumberMasked.el.input.onblur = (e) => {
  const number = e.target.value;
  setCardNumber(number);
};

cardHolderMasked.el.input.onblur = (e) => {
  const name = e.target.value;
  setCardHolder(name);
};

expirationDateMasked.el.input.onblur = (e) => {
  const date = e.target.value;
  setCardExpiration(date);
};

securityCodeMasked.el.input.onblur = (e) => {
  const code = e.target.value;
  setSecurityCode(code);
};
