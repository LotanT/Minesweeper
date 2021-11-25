'use strict'

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return
    if (gIsHint) {
        if (!gBoard[i][j].isShown) hint(i, j);
        return;
    }
    var currCell = gBoard[i][j];
    currCell.isShown = true;
    currCell.isMarked = false;
    if (currCell.isMine) var cellValue = MINE;
    else cellValue = currCell.minesAroundCount;
    if (!cellValue) {
        cellValue = EMPTY;
        expandShown(gBoard, i, j)
    }
    elCell.innerText = cellValue;
    elCell.classList.add("isShow");
    checkGameOver()
    if (!gTimerInterval) timer();
}

function cellMarked(elCell, i, j) {
    if (!gGame.isOn) return;
    var updateValue = '';
    var currCell = gBoard[i][j];
    if (currCell.isShown) return;
    if (!currCell.isMarked) updateValue = MARK;
    currCell.isMarked = !currCell.isMarked;
    elCell.innerText = updateValue;
    checkGameOver();
    if (!gTimerInterval) timer();
}

function expandShown(mat, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > mat[i].length - 1) continue;
            if (i === cellI && j === cellJ) continue;
            if (!gBoard[i][j].isShown) {
                var elCurrCell = document.querySelector(`.cell-${i}-${j}`);
                cellClicked(elCurrCell, i, j);
            }
        }
    }
}

function rivive(i, j) {
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    elCell.classList.add("bom");
    var currCell = gBoard[i][j];
    elCell.classList.add("isShow");
    currCell.isShown = false;
    setTimeout(function () {
        if(!gGame.isOn) return;
        elCell.classList.remove("isShow");
        elCell.classList.remove("bom");
        elCell.innerText = EMPTY;
    }, 1000)
    gGame.isOn = true;
    var elLives = document.querySelector('.lives');
    elLives.innerText = getStrChain(gLives, LIVE);
}


var gElImg;
function hint(i, j, elbtn, imgId) {
    if (!gIsHint) {
        gIsHint = true;
        elbtn.disabled = true;
        elbtn.classList.add("use")
        gElImg = document.getElementById(imgId);
        gElImg.src = "pic/22.png"
        return
    }
    showHide(true, i, j);
    setTimeout(showHide, 1000, false, i, j);
    gIsHint = false;
}

function showHide(show, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j > gBoard[i].length - 1) continue;
            var elCell = document.querySelector(`.cell-${i}-${j}`);
            var cell = gBoard[i][j];
            if (cell.isShown) continue
            if (show) {
                if (cell.isMine) var cellValue = MINE;
                else cellValue = cell.minesAroundCount;
                if (!cellValue) cellValue = EMPTY;
                elCell.innerText = cellValue;
                elCell.classList.add("isShow");
            }
            else {
                elCell.innerText = (cell.isMarked) ? MARK : EMPTY;
                elCell.classList.remove("isShow");
                gElImg.style.display = 'none';
            }
        }

    }
}

function firstClick(i, j) {
    restartGame()
    var elCell = document.querySelector(`.cell-${i}-${j}`);
    cellClicked(elCell, i, j)
}

function getPlayerName(){
    gName = prompt('Your Name:');
    var elName = document.querySelector('.myName');
    elName.innerText = gName;
}
