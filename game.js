const rockBtn = document.querySelector(".rockBtn");
const paperBtn = document.querySelector(".paperBtn");
const scissorsBtn = document.querySelector(".scissorsBtn");
const turnHeading = document.querySelector(".turnHeading");
const userScoreEl = document.querySelector(".userScoreEl");
const botScoreEl = document.querySelector(".botScoreEl");
const turnCommentEl = document.querySelector(".turnCommentEl");
const botPickEl = document.querySelector(".botPickEl");
const layout = document.querySelector(".layout");
const card = document.querySelector(".card");
const finalUserScore = document.querySelector("#finalUserScore");
const finalBotScore = document.querySelector("#finalBotScore");
const resultCard = document.querySelector(".resultCard");
const resultComment = document.querySelector(".resultComment");
const newGameBtn = document.querySelector("#newGameBtn");
const continueBtn = document.querySelector("#continueBtn");

let user_points = 0;
let bot_points = 0;
let turn = 1;
let max_points = 3;

const picks = ["rock", "paper", "scissors"];
const wins = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
};
const turn_comments = {
    0: {comment:"It's a Tie",color:"lightgrey"},
    1: {comment:"You Scored",color:"green"},
    2: {comment:"Computer Scored",color:"yellow"},
};
const result_comments = {
    0: {comment:"It's a Tie",color:"lightgrey"},
    1: {comment:"You Win!",color:"green"},
    2: {comment:"Computer Wins",color:"yellow"},
};

displayTurn();

function displayTurn() {
    userScoreEl.textContent = `Your Points : ${user_points}`;
    botScoreEl.textContent = `Computer Points : ${bot_points}`;
    turnHeading.textContent = `Turn : ${turn}`;
}
function updateTurn(scorer) {
    if (scorer === 1) user_points++;
    else if (scorer === 2) bot_points++;
    turnCommentEl.textContent = turn_comments[scorer]["comment"];
    turnCommentEl.style.color = turn_comments[scorer]["color"];
    turn++;
    displayTurn();
    if (user_points===max_points || bot_points===max_points) endGame();
}

function handlePick(user_pick) {
    const bot_pick = picks[Math.floor(Math.random() * picks.length)];
    botPickEl.textContent = `The Computer Chose : ${bot_pick}`;
    if (user_pick === bot_pick) updateTurn(0);
    else if (wins[user_pick] === bot_pick) updateTurn(1);
    else updateTurn(2);
    console.log(user_pick, bot_pick);
}

function startGame(){
    rockBtn.onclick = () => {
        handlePick("rock");
    };
    paperBtn.onclick = () => {
        handlePick("paper");
    };
    scissorsBtn.onclick = () => {
        handlePick("scissors");
    };
}

startGame()

function endGame() {
    stopGame()
    if (user_points > bot_points) displayCard(1);
    else if (user_points < bot_points) displayCard(2);
    else displayCard(3);
}

function displayCard(winner) {
    continueBtn.addEventListener("click",() => continueGame())
    newGameBtn.onclick = () => location.reload()
    resultCard.style.display = "flex";
    card.style.opacity = "50%";
    card.style.pointerEvents = "none";
    finalUserScore.textContent = `Your Points : ${user_points}`
    finalBotScore.textContent = `Computer Points : ${bot_points}`
    resultComment.textContent = result_comments[winner]["comment"];
    resultComment.style.color = result_comments[winner]["color"];
}

function continueGame(){
    resultCard.style.display = "none";
    card.style.opacity = "100%";
    card.style.pointerEvents = "all";
    max_points = max_points*10
    startGame()
}
function stopGame(){
    rockBtn.onclick = null
    paperBtn.onclick = null
    scissorsBtn.onclick = null
}


