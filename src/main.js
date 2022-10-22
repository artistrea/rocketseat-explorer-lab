import IMask from "imask"
import "./css/index.css"

const ccBgColor1 = document.querySelector(".cc-bg > svg > g g:nth-child(1) path")
const ccBgColor2 = document.querySelector(".cc-bg > svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(cardType) {
  const typeColors = {
    "mastercard": ["#C69347", "#DF6F29"],
    "visa": ["#436D99", "#2D57F2"],
    "default": ["#2F2F2F", "#2F2F2F"]
  }

  const colors = typeColors[cardType] || typeColors["default"]
  
  ccBgColor1.setAttribute("fill", colors[0])
  ccBgColor2.setAttribute("fill", colors[1])

  ccLogo.setAttribute("src", `/cc-${cardType || "default"}.svg`)
}

globalThis.setCardType = setCardType
