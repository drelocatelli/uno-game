const app = document.getElementById("app");

class Game {
  colors = ["#ED1A22", "#FDDE03", "#06A553", "#0B93D3"];
  cards = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "⥄",
    "+2",
    "+4",
    "❖",
    "⍉"
  ];

  inGameCards = [];

  generateCard(quantity = 1) {
    for (let q = 1; q <= quantity; q++) {
      const randomNumber = Math.floor(
        Math.random() * (this.cards.length - 1 - 0 + 1) + 0
      );
      const cardSymbol = this.cards[randomNumber];
      // limit cards
      if (this.limitCards(cardSymbol)) {
        continue;
      } else {
        // create card object in DOM
        this.addCardInDOM(cardSymbol);
      }
    }
  }

  addCardInDOM(symbol) {
    const randomNumber = Math.floor(
      Math.random() * (this.colors.length - 1 - 0 + 1) + 0
    );
    const cardColor =
      symbol == "❖" || symbol == "+4" ? "#000" : this.colors[randomNumber];

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("draggable", "true");

    const content = document.createElement("div");
    content.classList.add("content");
    content.style.backgroundColor = cardColor;
    card.appendChild(content);

    const symbolDiv = document.createElement("div");
    symbolDiv.classList.add("simbol");
    symbolDiv.classList.add("simbol-top");
    symbolDiv.innerText = symbol;
    content.appendChild(symbolDiv);

    const middle = document.createElement("div");
    middle.classList.add("middle");
    content.appendChild(middle);

    const middleNumber = document.createElement("div");
    middleNumber.classList.add("middle-number");
    middleNumber.innerText = symbol;
    middleNumber.style.color = cardColor;
    content.appendChild(middleNumber);

    const simbolBottom = document.createElement("div");
    simbolBottom.classList.add("simbol");
    simbolBottom.classList.add("simbol-bottom");
    simbolBottom.innerText = symbol;
    content.appendChild(simbolBottom);

    if (symbol == "❖" || symbol == "+4") {
      middleNumber.style.textShadow = "none";
    }

    app.appendChild(card);
    this.inGameCards.push(symbol);
  }

  limitCards(lastSymbol) {
    const findQuantity = this.cardsByQuatity(lastSymbol);
    console.log("in game cards:", this.inGameCards);
    console.log("last quantity:", findQuantity);

    if (lastSymbol == "⥄" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "+2" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "⍉" && findQuantity == 8) {
      return true;
    }

    if (lastSymbol == "❖" && findQuantity == 4) {
      return true;
    }

    if (lastSymbol == "+4" && findQuantity == 4) {
      return true;
    }

    // default numeric cards
    if (findQuantity == 76) {
      return true;
    }

    return false;
  }

  cardsByQuatity(symbol) {
    console.log("symbol", symbol);
    const find = this.inGameCards.filter((card) => card == symbol);
    return find.length;
  }
}

const game = new Game();

const form = document.querySelector("form");

function preventSubmit(e) {
  e.preventDefault();
}

form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  console.log(formData.get("cardsQuantity"));
  game.generateCard(formData.get("cardsQuantity"));
};

const separatorBtn = document.querySelector('button[name="addSeparator"]');
separatorBtn.onclick = function () {
  app.appendChild(document.createElement("hr"));
};
