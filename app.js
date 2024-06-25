let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let h1 = document.querySelector("h1");
let body = document.querySelector("body");
let turnO = true;
let cont = document.querySelector(".container");
let hidebtn = document.querySelector(".btn");
cont.classList.remove("hide");
resetBtn.classList.remove("hide");
hidebtn.classList.remove("hide");
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

let count = 0;
boxes.forEach((box) =>{
    box.addEventListener('click',()=>{
        if(turnO){
            box.innerText = '0';
            turnO = false;
            box.classList.add("turn0");
            box.classList.remove("turnX");
        } else{
            box.innerText = 'X';
            turnO = true;
            box.classList.add("turnX");
            box.classList.remove("turn0");
        }
        box.disabled = true;
        count++;
        console.log(count);
        if(count === 9){
            draw();
        }

        checkWinner();
    })
});

const draw = ()=>{
    msg.innerText = "Draw, try another game!";
    msgContainer.classList.remove("hide");
    cont.classList.add("hide");
    hidebtn.classList.add("hide");
    msg.style.color = "white";
    body.classList.add("draw");
    body.classList.remove("bg0");
    body.classList.remove("bgX");
    body.classList.remove("bg");
    disableBoxes();
}

const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    cont.classList.remove("hide");
    hidebtn.classList.remove("hide");
    h1.style.color = "white";
    body.classList.add("bg");
    body.classList.remove("bg0");
    body.classList.remove("bgX");
    body.classList.remove("draw");
    count=0;
}

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    if(winner === '0'){
        body.classList.add("bg0");
        body.classList.remove("bgX");
        body.classList.remove("draw");
        body.classList.remove("bg");
        msg.style.color = "black";
        h1.style.color = "black";
    } else if(winner === 'X'){
        body.classList.add("bgX");
        body.classList.remove("bg0");
        body.classList.remove("draw");
        body.classList.remove("bg");
        msg.style.color = "white";
        h1.style.color = "white";
    }    
    msgContainer.classList.remove("hide");
    cont.classList.add("hide");
    hidebtn.classList.add("hide");
    disableBoxes();
};

const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
            }
        }
    }
}

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);