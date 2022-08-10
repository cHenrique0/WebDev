const FORM = document.getElementById("rating-form");
const RATING_CARD = document.getElementById("rating-card");
const THANKS_CARD = document.getElementById("thanks-card");
const RATING_BTN = document.getElementById("rating-buttons");
const RATING_TEXT = document.getElementById("rating-choice");
let RATING = "";

for (let i = 0; i < RATING_BTN.childElementCount; i++) {
  RATING_BTN.children[i].onclick = function (e) {
    RATING = RATING_BTN.children[i].value;
  };
}

FORM.onsubmit = function (e) {
  e.preventDefault();

  RATING_CARD.style.display = "none";
  THANKS_CARD.style.display = "flex";

  RATING_TEXT.innerHTML = `You selected ${RATING} out of 5`;
};
