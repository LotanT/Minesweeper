'use strict'
const MINE = '💣';
const MARK = '🚩';
const EMPTY = '';
const LIVE = '💚';
// const HINT = '💡';


var gRandom = [];
var gBoard;
var gScores = [];
var gIsHint = false;
var gIsFirstClick = true;
var gIsWon = false;
var gTimerInterval;
var gIsTimerOn;
var gDisplay;
var gName = 'anonymous';
var gLives = 3;
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    console.log('hello');
    gBoard = buildBoard();
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
    renderScores();
    // resetScoreTable();
    showBoardOnConsole(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    for (i = 0; i < gLevel.MINES; i++) {
        var emptyCell = getCellNotMine(board);
        board[emptyCell.i][emptyCell.j].isMine = true;
    }
    return board;
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var negsCount = countNegs(i, j, board);
            board[i][j].minesAroundCount = negsCount;
        }
    }
}

function checkGameOver() {
    gGame.isOn = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isShown && currCell.isMine) {
                if (gIsFirstClick) {
                    firstClick(i, j);
                    return;
                }
                gLives--;
                if (gLives > 0) {
                    rivive(i, j);
                    return
                }
                gGame.isOn = false;
                gameOver(false, i, j);
                return;
            }
            if (currCell.isMarked && !currCell.isMine) {
                gGame.isOn = true;
            }
            if (!currCell.isShown && !currCell.isMarked) {
                gGame.isOn = true;
            }
        }
    }
    gIsFirstClick = false;
    if (!gGame.isOn) gameOver(true);
}

function gameOver(isWon, i, j) {
    setTimeout(function () {
        clearInterval(gTimerInterval)
    }, 200)
    var elResBtn = document.querySelector(`.resBtn`);
    if (isWon){
    elResBtn.innerText = '😎';
    scoreList();
}
    else {
        var elCell = document.querySelector(`.cell-${i}-${j}`);
        elCell.classList.add("bom");
        revealAllMines()
        var elLives = document.querySelector('.lives');
        elLives.innerText = getStrChain(gLives, LIVE);
        elResBtn.innerText = '🤯';
    }
}

function restartGame() {
    var elResBtn = document.querySelector(`.resBtn`);
    elResBtn.innerText = '🙂';
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = '00:00'
    gGame.isOn = true;
    clearInterval(gTimerInterval);
    localStorage.setItem("name", gName);
    localStorage.setItem("time", gDisplay)
    gTimerInterval = 0;
    gIsFirstClick = true;
    gLives = 3;
    resetDisplay();
    initGame();
}


function resetDisplay() {
    for (var i = 1; i <= 3; i++) {
        var elImg = document.getElementById(`img${i}`);
        elImg.style.display = 'block';
        elImg.src = "pic/11.png"
        document.getElementById(`hint${i}`).disabled = false;
    }
    var elLives = document.querySelector('.lives');
    elLives.innerText = getStrChain(gLives, LIVE);
}

function revealAllMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isMine) {
                currCell.isShown = true;
                var elCell = document.querySelector(`.cell-${i}-${j}`);
                elCell.innerText = MINE;
                elCell.classList.add("isShow");
            }
        }
    }
}



function beginner() {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    restartGame()
}
function medium() {
    gLevel.SIZE = 8;
    gLevel.MINES = 12;
    restartGame()
}
function expert() {
    gLevel.SIZE = 12;
    gLevel.MINES = 30;
    restartGame()
}

