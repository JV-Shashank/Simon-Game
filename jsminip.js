let gameseq = [];
let userseq = [];

let btns = ["blue" , "orange" , "green" , "red" ];

let started = false;
let level = 0;
let maxlevel = 0;

let h2 = document.querySelector("h2");


function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    } , 250 );
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    } , 250 );
}


function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    // Generate Random color
    let randidx = Math.floor(Math.random() * 3);
    // From the string
    let randomcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randomcolor}`);
    gameseq.push(randomcolor);
    console.log(gameseq);
    // console.log(randidx);
    // console.log(randomcolor);
    // console.log(randbtn);
    gameflash(randbtn);
}


document.addEventListener("keypress" , function() {
    if(started == false) {
        console.log("Game is Started");
        started = true;
        levelup();
    }
})


// Function to compare the user color with the system color

function checkans(idx) {
    // console.log("Curr Level :" , level);
    if(userseq[idx] === gameseq[idx] ){
        if(userseq.length == gameseq.length){
            setTimeout(levelup , 1000 );
        }
    } else{
        if(level - 1 > maxlevel){
            maxlevel = level - 1;
        }
        h2.innerHTML = `Game Over! Your Score was <b> ${level  - 1} </b> <br> Max Score is ${maxlevel} Press any key to START`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        } , 150 );
        reset();
    }
}


function btnPress() {
    // console.log(this);
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}


let allb = document.querySelectorAll(".btn");
for(b of allb){
    b.addEventListener("click" , btnPress);
}



// THIS TO RESET THE GAME
function reset() {
    started = false;
    userseq = [];
    gameseq = [];
    level = 0;
}