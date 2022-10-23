// card: {name, number, holder, expirationDate, securityCode}
class Card {
  cardNumberRegex = {
    visa: /^4\d{15}$/,
    mastercard: /^(5[1-5]\d{2}|22[2-9]\d|2[3-7]\d{2})\d{12}$/,
  };

  cardTypeColors = {
    mastercard: ["#C69347", "#DF6F29"],
    visa: ["#436D99", "#2D57F2"],
    default: ["#2F2F2F", "#2F2F2F"],
  };

  create = (card) => {};
  remove = ({ cardName, cardNumber }) => {};
}

const card = new Card();

export { card };
