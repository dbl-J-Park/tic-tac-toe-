

//**** the below will be the frame address and player array containers of the game ****/
// var cellAddressArr = ['11','12','13','21','22','23','31','32','33']
// var player1 = []
// var player2 = []

var cellAddressArr = ['11','12','13','21','22','23','31','32','33']
var player1Score = 0
var player2Score = 0
var drawRate = 0
var player1 = []
var player2 = []
var modeFlag = 0  //0_Inavtive game , 1_singlemode(player & computer), 2_doublemode(player1 & player2)


//DOM address variable
var btn11 = document.querySelector('#b11')
var btn12 = document.querySelector('#b12')
var btn13 = document.querySelector('#b13')
var btn21 = document.querySelector('#b21')
var btn22 = document.querySelector('#b22')
var btn23 = document.querySelector('#b23')
var btn31 = document.querySelector('#b31')
var btn32 = document.querySelector('#b32')
var btn33 = document.querySelector('#b33')
var players = document.querySelector('.player')
var element = document.querySelectorAll('.element')
var player1Total = document.querySelector('#player1Score')
var player2Total = document.querySelector('#player2Score')
var drawTotal = document.querySelector('#drawScore')
var singleMode = document.querySelector('#single')
var doubleMode = document.querySelector('#double')
var winningMsg = document.querySelector('#winning')



var resetBoard = function(){
    cellAddressArr = ['11','12','13','21','22','23','31','32','33']
    player1 = []
    player2 = []
    element.forEach(function(item){
        item.style.backgroundColor = 'aqua';
    })
    players.style.backgroundColor = 'gray'
    players.textContent = 'player1'
}

//When playmode is changed, the total score should be reset using resetTotalGame function
var resetTotalGame = function(){
    player1Score = 0
    player2Score = 0
    drawRate = 0
    player1Total.textContent = player1Score
    player2Total.textContent = player2Score
    drawTotal.textContent = drawRate
    players.style.backgroundColor = 'gray'
    players.textContent = 'player1'

}


var celebrateWinner = function(player){
    winningMsg.style.zIndex ='2'
    if(player == 1){
        winningMsg.textContent = "Player1 is the winner"
        winningMsg.style.backgroundImage = "radial-gradient(gray, black, green)"
        //gray
    }else if(player == 2){
        //red
    winningMsg.textContent = "Player2 is the winner"
    winningMsg.style.backgroundImage = "radial-gradient(red, black, green)"
    }else if(player == 3){
        //yellow
        winningMsg.textContent = "DRAW"
        winningMsg.style.backgroundImage = "radial-gradient(yellow, black, green)"
    }

}

var defaultPlaymode = function(){
    modeFlag = 1
    singleMode.style.borderStyle = "inset"
    singleMode.style.backgroundColor = "green"
    doubleMode.style.borderStyle = "outset"
    doubleMode.style.backgroundColor = "bisque"
    resetTotalGame()
}


singleMode.addEventListener('click', defaultPlaymode)

doubleMode.addEventListener('click', function(){ 
    modeFlag = 2
    singleMode.style.borderStyle = "outset"
    singleMode.style.backgroundColor = "bisque"
    doubleMode.style.borderStyle = "inset"
    doubleMode.style.backgroundColor = "green"
    resetTotalGame()

})

var singleModeFunct = function (){

    var randNum = Math.floor(Math.random()*cellAddressArr.length)

    var locationData = cellAddressArr[randNum]
    for(var index = 0; index<cellAddressArr.length; index++){
        if(cellAddressArr[index]==locationData){
            cellAddressArr.splice(index,1)
        }
    }
    players.style.backgroundColor = 'gray'
    var cellbox = '#b'.concat(locationData)
    document.querySelector(cellbox).style.backgroundColor ='red'
    players.textContent = 'player1'
    player2.push(locationData)
    
}



var winnerEval = function(player) {
    var diagonalEvalValue = 0
    var row1EvalValue = 0
    var row2EvalValue = 0
    var row3EvalValue = 0
    var col1EvalValue = 0
    var col2EvalValue = 0
    var col3EvalValue = 0
    var distinctVal = 0
    var wining = true
    if(player.length>2 && player.includes('22')){
        for(var i = 0; i < player.length;i++){
            //validation (31,22,13) and (33,22,11) >> winner(diagonalEvalValue == 2 && distinctVal ==0)
            if(player[i][0]!=='2' && player[i][1]!=='2'){
                diagonalEvalValue++
                distinctVal += Number(player[i][0])*10 + Number(player[i][1])     /*********** */
                if (diagonalEvalValue == 2 && distinctVal == 44 || diagonalEvalValue == 3) return wining    /********** */
                //validation (21,22,23) >> winner(row2EvalValue == 2)
            }else if(player[i][1] !== '2' && player[i][0] =='2'){
                row2EvalValue++
                //validation (12,22,32) >> winner(col2EvalValue ==2)
                if (row2EvalValue == 2) return wining
            }else if(player[i][0] !== '2' && player[i][1]== '2'){
                col2EvalValue++
                if (col2EvalValue == 2) return wining
            }
            
        }  
    }else{
        for(var i = 0; i < player.length;i++){
            if(player[i][0] !== '2' && player[i][0] == '1'){
                row1EvalValue++
                if (row1EvalValue == 3) return wining
            }
            if(player[i][0] !== '2' && player[i][0] == '3'){
                row3EvalValue++
                if (row3EvalValue == 3) return wining
            }
            if(player[i][1] !== '2' && player[i][1] == '1'){
                col1EvalValue++
                if (col1EvalValue == 3) return wining
            }
             if(player[i][1] !== '2' && player[i][1] == '3'){
                col3EvalValue++
                if (col3EvalValue == 3) return wining
            }
        }

    }
 
}


//single game 2nd playbug - 1st player's unchanging selected box 


//main game function
var clickItems = function(item){
    item.addEventListener('click',function(event){
        
            var target = event.target
            var location = target.id.split('')
            location.shift()
            var locationData = location.join('')
            var flagOfBox = false
            if(modeFlag == 0) defaultPlaymode()
            winningMsg.style.zIndex ='0'; 
            // Process for preventing Multiple selection
            for(var index = 0; index<cellAddressArr.length; index++){
                if(cellAddressArr[index]==locationData){
                    cellAddressArr.splice(index,1)
                    flagOfBox = true

                }else if (cellAddressArr.includes(locationData)){
                    flagOfBox =false
                }
            }
            //Confirming available box
            if(flagOfBox){
                
                if(players.textContent == 'player1') {
                    players.style.backgroundColor = 'red'
                    target.style.backgroundColor = 'gray'
                    players.textContent = 'player2'
                    player1.push(locationData)
                
                }else if(players.textContent == 'player2') {
                    players.style.backgroundColor = 'gray'
                    target.style.backgroundColor ='red'
                    players.textContent = 'player1'
                    player2.push(locationData)
                }  
                //Check time delay
                if(modeFlag == 1 && cellAddressArr.length > 0) {
                    singleModeFunct()
                } 
                    
                if(winnerEval(player1)) {
                    // console.log("player1 is winner")
                    // players.textContent = "Player1 is winner" **************
                    player1Score++
                    players.style.backgroundColor = 'gray'
                    resetBoard()
                    celebrateWinner(1)
                    player1Total.textContent = player1Score
                    // setTimeout(function(){players.style.backgroundColor = 'gray'},5000)
                    // setTimeout(resetBoard(),5000)
                }else if (winnerEval(player2)){
                    // console.log("player2 is winner")
                    // players.textContent = "Player2 is winner" **************
                    player2Score++
                    players.style.backgroundColor = 'red'
                    resetBoard()
                    celebrateWinner(2)
                    player2Total.textContent = player2Score
                    // setTimeout(function(){players.style.backgroundColor = 'red'},5000)
                    // setTimeout(resetBoard(),5000)

                }else if (cellAddressArr.length == 0){
                    // console.log("draw")
                    // players.textContent = "Draw" *******************
                    players.style.backgroundColor = 'yellow'
                    drawRate++
                    resetBoard()
                    celebrateWinner(3)
                    drawTotal.textContent = drawRate
                    // setTimeout(resetBoard(),5000)
                    //Please assign a new game function
                }

            }else console.log('You cannot select this cell. Please select other box ')


        
    })
}



element.forEach(clickItems)





