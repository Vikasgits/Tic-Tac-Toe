const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn= document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

];

/*initializes the game*/
function initGame(){
    currentPlayer='X';
    gameInfo.innerText= `Current Player - ${currentPlayer} `;
    gameGrid=["","","","","","","","",""];//making boxes empty logically not on UI

    //to empty boxes on UI
    boxes.forEach((box , index) => {
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //removing the background green colour
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
   

}

initGame();
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText= `Current Player - ${currentPlayer} `;

}

function checkGameOver() {
    let answer="";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) 
        && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if(gameGrid[position[0]==="X"]){
                answer="X";
            }
            else{
                answer="O";
            }
            //Disable pointer Events
            boxes.forEach((box) => {
                box.style.pointerEvents="none";
            })

            //Making the background green
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //When there is no winner
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText="Game Tie";
        newGameBtn.classList.add("active"); 
    }



}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerHTML=currentPlayer;/*reflects the change on UI*/
        gameGrid[index]=currentPlayer;/*keeps track of same thing as above but logically*/
       //swap karo turn ko
        swapTurn();
        gameInfo.textContent = `Current Player - ${currentPlayer}`;
        checkGameOver();



    }
    
}

boxes.forEach(( box,index ) => {
    box.addEventListener("click", () =>{
       handleClick(index);
    });
});


//when clicked on new game it resets all to start with help of event
//listeners and initGame function

newGameBtn.addEventListener("click",initGame);








