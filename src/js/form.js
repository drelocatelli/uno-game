const form = document.querySelector("form");

function preventSubmit(e) {
  e.preventDefault();
}

form.onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  console.log(formData.get("cardsQuantity"));
  const quantity = formData.get("cardsQuantity");
  console.log(quantity)
  if(quantity == '') {
    game.generateCard(1);
  } else {
    game.generateCard(quantity);
  }
};

const separatorBtn = document.querySelector('button[name="addSeparator"]');
separatorBtn.onclick = function () {
  app.prepend(document.createElement("hr"));
};

function reload() {
    window.location.reload();
}