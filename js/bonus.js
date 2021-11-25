'use strict'



function scoreList() {
    var min = parseInt(gDisplay.slice(0, 2))
    var sec = parseInt(gDisplay.slice(3))
    var newScore = (min * 60) + sec;
    if (gLevel.SIZE === 4) var level = 'Beginner';
    else if (gLevel.SIZE === 8) level = 'Medium';
    else level = 'Expert';
    var result = { name: gName, score: newScore, level: level };
    var savedScores = localStorage.getItem('highscore') || '[]'; // get the score, or the initial value if empty
    console.log(savedScores)
    var highscores = [...JSON.parse(savedScores), result]; // add the result
    highscores.sort((a, b) => b.score - a.score); // sort descending
    highscores.slice(0, 10) // take highest 5
    highscores.sort(function (a, b) {
        return ('' + a.score).localeCompare(b.attr);
    })
    console.log(highscores)
    console.log(result)
    // var highscores = result;

    localStorage.setItem('highscore', JSON.stringify(highscores)) // store the scores
    // console.log(localStorage.highscore)
}

function renderScores() {
    var savedScores = localStorage.getItem('highscore') || '[]';
    var highscores = [...JSON.parse(savedScores)];
    var beginners = [];
    var mediums = [];
    var experts = [];
    for (var i = 0; i < highscores.length; i++) {
        // console.log(highscores[i].level)

        if (highscores[i].level === 'Beginner') beginners.push(highscores[i]);
        else if (highscores[i].level === 'Medium') mediums.push(highscores[i]);
        else experts.push(highscores[i]);
    }
    var strHTML = `<tr><td class="beginner">Beginner</td><td class="beginner">score</td>
    <td class="medium">Medium</td><td class="medium">score</td>
    <td class="expert">Expert</td><td class="expert">score</td></tr>`;
    // console.log(beginners)
    for (var i = 0; i < 5; i++) {
        strHTML += '<tr>'
        strHTML += `<td class="scoreName">${i + 1}. ${beginners[i].name}</td>`
        strHTML += `<td class="scoreName">${beginners[i].score}</td>`
        strHTML += `<td class="scoreName">${i + 1}. ${mediums[i].name}</td>`
        strHTML += `<td class="scoreName">${mediums[i].score}</td>`
        strHTML += `<td class="scoreName">${i + 1}. ${experts[i].name}</td>`
        strHTML += `<td class="scoreName">${experts[i].score}</td>`
        
        strHTML += '</tr>'
    }
    var elScoreList = document.querySelector('.scoreList');
    elScoreList.innerHTML = strHTML
}

function resetScoreTable() {
    var highscores = []
    for (var j = 0; j < 5; j++) {
        highscores[j] = { name: '', score: 9999, level: 'Beginner' };
    }
    for (var j = 5; j < 10; j++) {
        highscores[j] = { name: '', score: 9999, level: 'Medium' };
    }
    for (var j = 10; j < 15; j++) {
        highscores[j] = { name: '', score: 9999, level: 'Expert' };
    }
    console.log(highscores)
    localStorage.setItem('highscore', JSON.stringify(highscores))
}
