import { card, cardTypes } from "./Card";

const myCardsModalOpenButtons = document.querySelectorAll(
  ".my-cards-modal-toggle-button"
);
const myCardsModal = document.querySelector("#my-cards-modal");

const toggleMyCardsModal = () => {
  console.log("toggleMyCardsModal");
  if (myCardsModal.attributes["open"]) {
    myCardsModal.removeAttribute("open");
  } else {
    myCardsModal.setAttribute("open", "true");
  }
};

myCardsModalOpenButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    toggleMyCardsModal();
  })
);

const myCardsModalOpenButton = document.querySelector(
  "#my-cards-modal-open-button"
);

const myCardsModalContent = document.querySelector(".my-cards-modal__content");
const origCC = document.querySelector(".cc");

myCardsModalOpenButton.addEventListener("click", async () => {
  const cards = await fetch("/api/card/index").then((res) => res.json());

  myCardsModalContent.innerHTML = "";

  cards.forEach((cc) => {
    const cardElement = origCC.cloneNode(true);

    const ccBgColor1 = cardElement.querySelector(
      ".cc-bg > svg > g g:nth-child(1) path"
    );
    const ccBgColor2 = cardElement.querySelector(
      ".cc-bg > svg > g g:nth-child(2) path"
    );
    const ccLogo = cardElement.querySelector(".cc-logo span:nth-child(2) img");

    const cardType =
      cardTypes.find((cardType) => {
        const regex = card.cardNumberRegex[cardType];
        return cc.number.replace(/ /g, "").match(regex);
      }) || "default";

    const colors = card.cardTypeColors[cardType];

    ccBgColor1.setAttribute("fill", colors[0]);
    ccBgColor2.setAttribute("fill", colors[1]);

    ccLogo.setAttribute("src", `/cc-${cardType}.svg`);

    cardElement.querySelector(".cc-number").textContent = cc.number;
    cardElement.querySelector(".cc-holder .value").textContent = cc.holder;
    cardElement.querySelector(".cc-expiration .value").textContent =
      cc.expiration;
    cardElement.querySelector(".cc-security .value").textContent =
      cc.securityCode;

    myCardsModalContent.appendChild(cardElement);
  });
});
