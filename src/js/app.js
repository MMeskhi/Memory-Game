// Cards before game starts.
const table = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

for (let i = 0; i < table.length; i++) {
  for (let j = 0; j < table[i].length; j++) {
    const div = document.createElement("div");
    div.innerText = table[i][j];
    div.style.top = i * 100 + "px";
    div.style.left = j * 100 + "px";
    div.dataset.i = i;
    div.dataset.j = j;
    document.getElementById("table-a").appendChild(div);
    if (window.matchMedia("(max-width: 525px)").matches) {
      div.style.top = i * 50 + "px";
      div.style.left = j * 50 + "px";
    }
  }
}

// Function for game start,
// Page refresh for starting again,
// When the game is over.
const btn = document.querySelector(".btn1");
const btnAgain = document.querySelector(".btn2");

function start() {
  document.getElementById("table-a").style.display = "none";
  document.getElementById("table-b").style.display = "unset";
  btn.style.display = "none";
}

function stop() {
  document.getElementById("timer").style.display = "none";
  preventClick = true;
  clickedCard = null;
}

function startOver() {
  window.location.reload();
}

btn.addEventListener("click", start);
btn.addEventListener("click", timerStart);

btnAgain.addEventListener("click", startOver);

// Selecting colors and distributing them.
let clickedCard = null;
let preventClick = false;
let combosFound = 0;

const colors = [
  "pink",
  "yellow",
  "red",
  "blue",
  "teal",
  "orange",
  "green",
  "lightblue",
  "brown",
  "violet",
  "purple",
  "gold",
  "black",
  "darkblue",
  "darkred",
  "lightgreen",
  "hotpink",
  "coral",
];

// Connecting cards and colors.
const cards = [...document.querySelectorAll(".card")];

for (let color of colors) {
  const cardAIndex = parseInt(Math.random() * cards.length);
  const cardA = cards[cardAIndex];
  cards.splice(cardAIndex, 1);
  cardA.className += `${color}`;
  cardA.setAttribute("data-color", color);

  const cardBIndex = parseInt(Math.random() * cards.length);
  const cardB = cards[cardBIndex];
  cards.splice(cardBIndex, 1);
  cardB.className += `${color}`;
  cardB.setAttribute("data-color", color);
}

// Card selecting and ifs when all the cards ar matched.
function cardClicked(e) {
  const target = e.currentTarget;

  if (
    preventClick ||
    target === clickedCard ||
    target.className.includes("done")
  ) {
    return;
  }

  target.className = target.className.replace("color-hidden", "").trim();
  target.className += " done";

  if (!clickedCard) {
    clickedCard = target;
  } else if (clickedCard) {
    if (
      clickedCard.getAttribute("data-color") !==
      target.getAttribute("data-color")
    ) {
      preventClick = true;
      setTimeout(() => {
        clickedCard.className =
          clickedCard.className.replace("done", "").trim() + " color-hidden";
        target.className =
          target.className.replace("done", "").trim() + " color-hidden";
        clickedCard = null;
        preventClick = false;
      }, 500);
    } else {
      combosFound++;
      clickedCard = null;
      if (combosFound === 18) {
        document.getElementById("alert").innerHTML = "<h1>YOU WIN!</h1>";
        stop();
        btnAgain.style.display = "flex";
      }
    }
  }
}

// Timer and ifs when the timer runs out.
function timer() {
  let timeLeft = Number(document.getElementById("timer").innerText);
  timeLeft--;
  document.getElementById("timer").innerText = timeLeft;

  if (timeLeft === 0) {
    clearInterval(timerStart);
    document.getElementById("alert").innerHTML = "<h1>Game Over</h1>";
    stop();
    btnAgain.style.display = "flex";
  }
}

function timerStart() {
  setInterval(timer, 1200);
}
