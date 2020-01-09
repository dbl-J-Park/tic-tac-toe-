//validation 
var cellAddressArr = ['11','12','13','21','22','23','31','32','33']
var player1 = []
var player2 = []

var clickBox = function (player){
    if ( cellAddressArr.length >0){
       player.push(cellAddressArr.splice(randomSelectionInleftCell(),1).join())
    }
    return winnerEval(player)
}

var randomSelectionInleftCell= function(){
    var randNum = Math.floor(Math.random()*cellAddressArr.length)
    return randNum
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
                if(player[i][1] == '1'){
                    distinctVal++
                }else {distinctVal--}
                if (diagonalEvalValue == 2 && distinctVal == 0) return wining
                //validation (21,22,23) >> winner(row2EvalValue == 2)
            }else if(player[i][1] == '2' && player[i][0] =='2'){
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

