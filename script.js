/**var lastPaintTime = 0;
const snakeSpeed = 3;
let inputDirection = {x: 0, y: 10} //this changes the movement of snake up down left right we cannot do manully everytime it needs to be done automatically so we will insert keyboard press button here 
let lastInputDirection = inputDirection;
let  food ={x:15 , y:15}
const expentionAmount  = 1;
const snakeBody = [
    {x:8, y:8},              //INDEX 0   //decrement  coordinates moving towards left and if we increment then move towards right 
    {x:9, y:8},              //INDEX 1
    {x:10, y:8}, 
    {x:11, y:8}, 
    {x:12, y:8},
                
];

const gameBoard = document.querySelector(".game-board");
function paint(currentTime ){
    var timeSeconds = (currentTime - lastPaintTime)/ 1000;
    requestAnimationFrame(paint);
    if (timeSeconds < 1 /snakeSpeed) return ;
    lastPaintTime = currentTime;

    update();
    draw();
    
}
window.requestAnimationFrame(paint); // we could  use default function set interval but sometimes there is a problem of hang in set interval request animation is more powerful than that so we use this one !!!



function draw(){
    drawSnake();
    drawFood();
     
}
function update(){
    gameBoard.innerHTML = ""; //when we do x++ or x-- to clear the gameboards again and again so that it doesnot form a chain at back of snake 
    snakeMove();
    snakeEatFood();

}


function drawSnake(){
    snakeBody.forEach((segment, index) =>{
        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
       // snakeElement.innerHTML =index;
        snakeElement.style.transform = "rotate(0deg)";        
        if (index ==0){
            snakeElement.classList.add("head");
        
        if (inputDirection.x == 1){
            snakeElement.style.transform = "rotate(-90deg)"; 
        } 
        else if(inputDirection.x == -1){
            snakeElement.style.transform = "rotate(90deg)";

        } 
        else if(inputDirection.y == -1){
            snakeElement.style.transform = "rotate(180deg)";

        }
        else  if(inputDirection.y == 1){
            snakeElement.style.transform = "rotate(180deg)";

        } 
    }
    else{
            snakeElement.classList.add("snake");
        }
        gameBoard.appendChild(snakeElement);
    });
}
             
    function drawFood (){
        var foodElement = document.createElement("div");
        foodElement.style.gridColumnStart = food.x;
        foodElement.style.gridRowStart = food.y;
        foodElement.classList.add("food");
        gameBoard.appendChild(foodElement);

    }              
           
        
    

function snakeMove(){
    inputDirection = getInputDirection();
    for(i= snakeBody.length - 2; i>=0; i--){
        snakeBody[i+1] = {...snakeBody[i]}

    }
    snakeBody[0].x += inputDirection.x;                      // x++ moves towards right and x-- moves towards left 

    snakeBody[0].y += inputDirection.y;                        // y++ moves towards  down  and y-- moves towards up 
   
} 
function getInputDirection(){
    window.addEventListener("keydown", e =>{

        switch(e.key){
            case'ArrowUp': 
            if(lastInputDirection.y ==1) break;
            inputDirection={x:0, y :-1}
            break;
            case'ArrowDown':
            if(lastInputDirection.y == -1) break;
             inputDirection={x:0, y :1}
            break;
            case'ArrowLeft': 
            if(lastInputDirection.x ==1) break;
            inputDirection={x:-1, y :0}
            break;
            case'ArrowRight':
            if(lastInputDirection.x == -1) break; 
            inputDirection={x:1, y :0}
            break;
            default: inputDirection ={x:0 , y: 0}
        }
        
    })
    lastInputDirection = inputDirection;
    return inputDirection;
}

function snakeEatFood(){
    if (isEat()){
        console.log("eated");
        food = getFoodRandomPosition();
        expendSnake();
    }


}
    
function isEat(){
  return  (snakeBody[0].x === food.x && snakeBody[0].y === food.y);
}

function getFoodRandomPosition(){
    let a,b, myCondition = true ;
    while(myCondition){

    }
//return{ x:Math.ceil(Math.random()*16),
       // y:Math.ceil(Math.random()*16)};
}

function expendSnake(){
    for(i=0; i<expentionAmount;i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }

}**/
var lastPaintTime = 0;
let SNAKE_SPEED = 2;
let inputDirection = { x : 0, y : 0}
let lastInputDirection = inputDirection;


const EXPENTION_AMOUNT = 1;
var score = 0;
const snakeBody = [
    {x : 8, y : 8},
    
    
    

];
let food = getFoodrandomPosition();
const gameBoard = document.querySelector(".game-board");
const scoreBox = document.getElementById("score");
function paint(currentTime){
   var TimeSeconds = (currentTime - lastPaintTime) / 1000;
   requestAnimationFrame(paint);
   if( TimeSeconds < 1 / SNAKE_SPEED) return;
   lastPaintTime = currentTime;
    
    update();
    draw();

}

window.requestAnimationFrame(paint);



function draw(){
    drawSnake();
    drawFood();
}

function update(){
    
    gameBoard.innerHTML = "";
    snakeMove();
    snakeEatFood();
}


function drawSnake(){
    snakeBody.forEach((segment, index)=>{
        var snakeElement = document.createElement("div");
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.style.gridRowStart = segment.y;
        // snakeElement.innerHTML = index;
        snakeElement.style.transform = "rotate(0deg)";
        if(index == 0){
            snakeElement.classList.add("head");

            if(inputDirection.x == 1){
                snakeElement.style.transform = "rotate(-90deg)";
            }else if(inputDirection.x == -1){
                snakeElement.style.transform = "rotate(90deg)";
            }
            else if(inputDirection.y == -1){
                snakeElement.style.transform = "rotate(180deg)";
            }
            else if(inputDirection.y == 1){
                snakeElement.style.transform = "rotate(0deg)";
            }
        }else{
            snakeElement.classList.add("snake");
        }
        gameBoard.appendChild(snakeElement);

    });
}

function drawFood(){
    var foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function snakeMove(){
    inputDirection = getInputDirection();

    for(i = snakeBody.length - 2; i >= 0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
    checkGameOver();
}


function getInputDirection(){
    window.addEventListener("keydown", e=>{
        
        switch(e.key){
            case 'ArrowUp' : 
            if(lastInputDirection.y == 1) break;
            inputDirection = {x : 0, y : -1}
            break;
            case 'ArrowDown' : 
            if(lastInputDirection.y == -1) break;
            inputDirection = {x : 0, y : 1}
            break;
            case 'ArrowLeft' : 
            if(lastInputDirection.x == 1) break;
            inputDirection = {x : -1, y : 0}
            break;
            case 'ArrowRight' : 
            if(lastInputDirection.x == -1) break;
            inputDirection = {x : 1, y : 0}
            break;
            default : inputDirection = { x : 0, y : 0}
        }
       
    })
    lastInputDirection = inputDirection;
    return inputDirection;
}


function snakeEatFood(){

    if(isEat()){
        score += 10;
        scoreBox.innerHTML = score;
        console.log("eated")
        food = getFoodrandomPosition();
        SNAKE_SPEED++;
        expendSnake();
    }
    
}

function isEat(){
     return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
        
    
}

function getFoodrandomPosition(){

    let a,b, myCondition = true;
    while(myCondition){
        a = Math.ceil(Math.random()*16);
        b = Math.ceil(Math.random()*16);

        myCondition = snakeBody.some(segment=>{
             return segment.x === a && segment.y === b;
        })
    }
    return {x : a, y : b};
}

function expendSnake(){
    for(i=0; i<EXPENTION_AMOUNT; i++){
        snakeBody.push(snakeBody[snakeBody.length-1]);
    }
}

function checkGameOver(){
    if(snakeOutOfGrid() || snakeIntersection()){
        location.reload();
        alert("Game Over : You Loose");
    }
}

function snakeOutOfGrid(){
    return snakeBody[0].x < 0 || snakeBody[0].x > 16 || snakeBody[0].y < 0 || snakeBody[0].y > 16;
}

function snakeIntersection(){
    for(i=1; i<snakeBody.length; i++){
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y){
            return true;
        }
    }

    
}