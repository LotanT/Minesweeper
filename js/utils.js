'use strict'
function countNegs(cellI, cellJ, mat) {
    var negsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            if (mat[i][j].isMine) negsCount++;
        }
    }
    return negsCount;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (!cell.isShown) show = '';
            else if (cell.isMine) var show = MINE;
            else show = cell.minesAroundCount;
            var className = `cell cell-${i}-${j}`;
            strHTML += `<td class="${className}" 
            onclick="cellClicked(this,${i},${j})"
            oncontextmenu="cellMarked(this,${i},${j});return false;">
            ${show}</td>`
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML
}

function showBoardOnConsole(board) {
    var show = [];
    for (var i = 0; i < board.length; i++) {
        show[i] = []
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine) show[i][j] = '#'
            else show[i][j] = board[i][j].minesAroundCount;
        }
    }
    console.table(show);
}

function getCellNotMine(board) {
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                emptyCells.push({ i, j })
            }
        }
    }
    var rndIdx = getRandomInt(0, emptyCells.length)
    return emptyCells[rndIdx];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getStrChain(amount, symbol) {
    var str = '';
    for (var i = 0; i < amount; i++) {
        str += symbol;
    }
    return str;
}

function timer() {
    gIsTimerOn = true;
    var start = Date.now();
    gTimerInterval = setInterval(function () {
        var delta = Date.now() - start; // milliseconds elapsed since start
        var delta = (Math.floor(delta / 1000)); // in seconds
        var minutes = parseInt(delta / 60, 10);
        var seconds = parseInt(delta % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        gDisplay = minutes + ":" + seconds;
        var elTimer = document.querySelector(`.timer`);
        elTimer.innerText = gDisplay;
        // alternatively just show wall clock time:
        // console.log(new Date().toUTCString());
    }, 1000); // update about every second
}