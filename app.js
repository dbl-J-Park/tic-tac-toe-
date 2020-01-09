

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



var resetBoard = function(){
    cellAddressArr = ['11','12','13','21','22','23','31','32','33']
    var player1 = []
    var player2 = []
    var element = document.querySelectorAll('.element') // reset the color

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
                distinctVal += Number(player[i][0])*10 + Number(player[i][1])
                if (diagonalEvalValue == 2 && distinctVal == 44) return wining
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
            //validation (11,12,13)
            if(player[i][0] !== '2' && player[i][0] == '1'){
                row1EvalValue++
                if (row1EvalValue == 3) return wining
            //validation (31,32,33)
            }else if(player[i][0] !== '2' && player[i][0] == '3'){
                row3EvalValue++
                if (row3EvalValue == 3) return wining
            //validation (11,21,31)
            }else if(player[i][1] !== '2' && player[i][1] == '1'){
                col1EvalValue++
                if (col1EvalValue == 3) return wining
            //validation (13,23,33)
            }else if(player[i][1] !== '2' && player[i][1] == '3'){
                col3EvalValue++
                if (col3EvalValue == 3) return wining
            }
        }

    }
 
}



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




var clickItems = function(item){
    item.addEventListener('click',function(event){
        var target = event.target
        var location = target.id.split('')
        location.shift()
        var locationData = location.join('')
        var flagOfBox = false

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
           
            }else{
                players.style.backgroundColor = 'gray'
                target.style.backgroundColor ='red'
                players.textContent = 'player1'
                player2.push(locationData)
            }  
            console.log(cellAddressArr)    
            console.log('player1')
            console.log(player1)
            console.log('player2') 
            console.log(player2)
            // if(winnerEval(player1)) console.log('player1 win')
            // if(winnerEval(player2)) console.log('player2 win')
            if(winnerEval(player1)) {
                console.log("player1 is winner")
                //Please assign a new game function
                players.textContent = "Player1 is winner"
                players.style.backgroundColor = 'gray'
                player1Score++
                resetBoard()
            }else if (winnerEval(player2)){
                console.log("player2 is winner")
                //Please assign a new game function
                players.textContent = "Player2 is winner"
                players.style.backgroundColor = 'red'
                player2Score++
                resetBoard()
            }else if (cellAddressArr.length == 0){
                console.log("draw")
                players.textContent = "Draw"
                players.style.backgroundColor = 'yellow'
                drawRate++
                resetBoard()

                //Please assign a new game function
            }

        }else console.log('You cannot select this cell. Please select other box ')
    })
}



element.forEach(clickItems)





