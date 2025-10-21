let highScore = localStorage.getItem("highScore") || 0;

let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
h3.innerHTML = `High Score: ${highScore}`;
startBtn = document.querySelector(".start-button");
startBtn.addEventListener("click", function () {
  if (started == false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let rndmIdx = Math.floor(Math.random() * 4);
  let rndmColor = btns[rndmIdx];
  let rndmBtn = document.querySelector(`.${rndmColor}`);
  gameSeq.push(rndmColor);
  console.log("Game Sequence: ", gameSeq);
  gameFlash(rndmBtn);
}
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    let currentScore = level - 1;

    if (currentScore > highScore) {
      highScore = currentScore;
      localStorage.setItem("highScore", highScore);
      h3.innerHTML = `New High Score ${highScore}`;
    }
    
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> Try your memory again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}
function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let gameBtns = document.querySelectorAll(".simon-btn");
for (btn of gameBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
