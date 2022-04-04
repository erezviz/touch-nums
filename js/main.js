'use strict'


var gGameDifficulty = 16
var gNums = createNums()
var gIsStart = false
var gGameTimer = 0
var gTimerIntervalID



// TODO -+-+-+-+-+-+-+-+-+-   INITIALIZE   -+-+-+-+-+-+-+-+-+-+-+-
function init() {
    var elTimer = document.querySelector('div')
    elTimer.style.visibility = 'hidden'
    elTimer.style.innerText = ''
    renderBoard()
    gNums = createNums()




}



// TODO  ------------------  START GAME ------------------
function startGame() {

    gTimerIntervalID = setInterval(timer, 10)


    // if (!gGameStart) {
    //     console.log('This func if works');


    // }

}

// TODO -------------   RENDER BOARD  ------------------
function renderBoard() {
    var gameSize = Math.sqrt(gGameDifficulty)
    var strHTML = ''

    // console.log(gameSize);
    for (var i = 0; i < gameSize; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < gameSize; j++) {
            var cell = drawNum(gNums)

            strHTML += `<td data-set="${cell}" onclick="cellClicked(this)" class="cell" >${cell}</td>`

        }
        strHTML += '</tr>'
    }

    var elBoard = document.querySelector('table')
    elBoard.innerHTML = strHTML
}

// ? -------------   CREATE NUMS ------------------
function createNums() {
    var nums = []

    for (var i = 1; i <= gGameDifficulty; i++) {
        nums.push(i)
    }
    return nums
}


//TODO --------------  CELL CLICKED ----------------
function cellClicked(elNum) {
    console.log(gIsStart);

    console.log(gNums[0]);
    if (+elNum.dataset.set === gNums[0]) {
        gIsStart = true

        if (+elNum.dataset.set === 1) startGame()



        elNum.style.backgroundColor = 'green'
        gNums.shift()
        if (+elNum.dataset.set === gGameDifficulty) {
            clearInterval(gTimerIntervalID)
            var elRestart = document.querySelector('.restart')
            elRestart.style.visibility = 'visible'



        }





    }

}


//TODO ---------- PICK DIFFICULTY  ----------------------
function pickDifficulty(num) {
    var elCell = document.querySelector('table')
    if (num !== gGameDifficulty) {
        if (num === 36) elCell.style.fontSize = '7px'
        if (num === 25) elCell.style.fontSize = '15px'
        if (num === 16) elCell.style.fontSize = '25px'
        if (!gIsStart) {

            gGameDifficulty = num
            gNums = createNums()
            init()
        }
    }



}

//?  ------------------ TIMER  -----------------------
function timer() {


    var elTimer = document.querySelector('div')
    elTimer.style.visibility = 'visible'

    gGameTimer += 0.01

    elTimer.innerText = `${gGameTimer.toFixed(3)}`

}
//TODO ------------ RESTART  ------------------
function restart(elBtn) {
    gIsStart = false
    gGameTimer = 0
    gNums = createNums()
    init()
    var elRestart = document.querySelector('.restart')
    elRestart.style.visibility = 'hidden'
}


//!  ------   DRAW NUM  ------------

//!   NOTE: THIS FUNCTION REQUIRES GET RANDOM INT FUNCTION AS WELL
function drawNum(nums) {

    var idx = getRandomInt(0, nums.length)
    var num = nums[idx]
    nums.splice(idx, 1)
        // THE SAME
        // var num = nums.splice(idx, 1)[0]
    return num
        // function draws a number randomely from an array of numbers, 
        // then splices it out, so as not to use it again. 
}


//!  ------   GET RANDOM INT   ------------
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
    //The maximum is exclusive and the minimum is inclusive
}
// var res = createNums()
// console.log(res);




//! ------------  GET FORMATTED TIME  ------------
function getFormattedTime(time) {
    var newDate = new Date(time)
    var year = newDate.getFullYear()
    var month = newDate.getMonth() + 1
    var date = newDate.getDate()
    var hours = newDate.getHours()
    var minutes = newDate.getMinutes()

    var monthToDisplay = (month < 10) ? '0' + month : month
    var dateToDisplay = (date < 10) ? '0' + date : date
    var hoursToDisplay = (hours < 10) ? '0' + hours : hours
    var minutesToDisplay = (minutes < 10) ? '0' + minutes : minutes

    return 'At ' + year + '-' + monthToDisplay + '-' + dateToDisplay + '  Time: ' + hoursToDisplay + ':' + minutesToDisplay

}