let btns = document.querySelectorAll("button");
let h2 = document.querySelector("h2");
let reset = document.querySelector(".reset");
let player = document.querySelector(".player");
let bot = true;
let n = 0;
let tap = new Audio("/storage/emulated/0/Download/computer-mouse-click-352734.mp3");
let winner = new Audio("/storage/emulated/0/Download/brass-fanfare-with-timpani-and-winchimes-reverberated-146260.mp3");
let winPattern = [
                   [0, 1, 2], 
                   [3, 4, 5],
                   [6, 7, 8],
                   [0, 3, 6],
                   [1, 4, 7],
                   [2, 5, 8],
                   [0, 4, 8],
                   [2, 4, 6]]; 
                   
let turn = "X";
h2.innerText = `${turn} Turn`;
for(btn of btns){
    btn.addEventListener("click", chooseTurn);
}
player.addEventListener("click", ()=>{
    bot = !(bot);
    if(bot == false){
        player.innerText = "2 players"
    } else{
        player.innerText = "1 player";
    }
    resetAll();
});

function checkWinner(){
    
    for(win of winPattern){
        let position1 = btns[win[0]].innerText;
        let position2 = btns[win[1]].innerText;
        let position3 = btns[win[2]].innerText;
        
        if( (position1 != "" && position2 != "" && position3 != "") &&
            (position1 == position2 && position2 == position3) ){
                reset.innerText = "New game";
                h2.innerText = `${position2} is winner 🥳 `;
                
                winner.currentTime = 0;
                winner.play();
                for(btn of btns){
                    btn.disabled = true;
                }
                return true;
            }
        
    }
    return false;
}
function chooseTurn(){
    let btn = this;
    btn.innerText = turn;
    if(turn == "X"){
        btn.style.color = "red";
        n++;
        turn = "O";
        if(bot && !(checkWinner()) && n<9){
            
            let box = Math.floor(Math.random() * 9);
            while(btns[box].innerText != "" && n<9 ){
                box = Math.floor(Math.random() * 9);
            }
            btns[box].innerText = turn;
            btns[box].style.color = "blue";
            btns[box].disabled = true;
            turn = "X";
            n++;
        }
    } else{
        btn.style.color = "blue";
        turn = "X";
        n++;
    }
    h2.innerText = `${turn} Turn`;
    btn.disabled = true;
    tap.currentTime = 0;
    tap.play();
   if(!(checkWinner()) && n==9){
        h2.innerText = "It's a Draw";
    }
}
/*reset logic begins*/
function resetAll(){
    turn = "X";
    h2.innerText = `${turn} Turn`;
    reset.innerText = "reset";
    for(btn of btns){
        btn.innerText = "";
        btn.disabled = false;
    }
    n = 0;
}

reset.addEventListener("click", ()=>{
    
     resetAll();
    
});

/*let btns = document.querySelectorAll("button");
let turn = 'X';
let bot = true;
let winPattern = [
                   [0, 1, 2], 
                   [3, 4, 5],
                   [6, 7, 8],
                   [0, 3, 6],
                   [1, 4, 7],
                   [2, 5, 8],
                   [0, 4, 8],
                   [2, 4, 6]];
function play(btn){
    btn.innerText = turn;
    if(turn == 'X'){
    btn.style.color = "red";
    turn = 'O';
    } else{
        btn.style.color = "blue";
        turn = 'X';
    }
}
function botTurn(){
    let found = false;
    for(win of winPattern){
        for(i of win){
           if(btns[i].innerText=== "") {
            btns[i].innerText = turn;
               btns[i].style.color = "blue";
               found = true;
               break;
           }
        }
        if(found){
                break;
            }
    }
    
        turn = 'X';
}
function chooseTurn(){
    let btn = this;
    if(turn == 'X'){
        play(btn);
        if (bot){
          botTurn();
       }
    } else{
        play(btn);
    }
}
for(btn of btns){
    btn.addEventListener("click", chooseTurn);
}*/