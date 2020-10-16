const texts = document.getElementById("texts");
const instruct = document.getElementById("instruction");
const input = document.getElementById("textinput");
const enter = document.getElementById("enterBtn");
const failure = document.getElementById("failure");
const success = document.getElementById("success");
const field = document.querySelector(".game");
const button = document.querySelector("#by10");
const button2 = document.querySelector("#buttons");
const transparent = document.querySelector(".box");
const bar = document.getElementById("hideprogress");


let gamePlay = false;
let guesses = 0;
enter.onclick = function() {
    var x = document.getElementById("showhide");
    enter.style.display = "none";
    input.style.display = "none";
    transparent.style.width = "60%";
    transparent.style.margin = "500px , 300px";

    if (x.style.display != "none") {
        x.style.display = "block";

    }

    var textEntered = "";
    textEntered = input.value;
    texts.innerHTML = "Well " + textEntered + " ," + "<br>" + "read the istructions below." + "<br>" + "whenever you get ready hit on start" + "<br>" + " " + "<br>" +
        "wish you luck.";
    instruct.style.display = "block"

}
button.addEventListener("click", function() {
    if (!gamePlay) {
        gamePlay = true;
        field.innerHTML = "";
        guesses = 0;
        maker(4);
        button.innerHTML = "Guess"
        bar.style.display = "block";
        var textEntered = "";
        textEntered = input.value;
        texts.innerHTML = "OK " + textEntered + " ," + "<br>" + "remember you have only" + "<br>" + "10 attempts to find out" + "<br>" + "my secret number";

    } else {

        const numbers = document.querySelectorAll(".boxNumber");
        guesses++;
        let winCondition = 0;
        moveBy10(10);
        for (let i = 0; i < numbers.length; i++) {

            if (numbers[i].value == numbers[i].correct) {
                numbers[i].style.backgroundColor = "#28A745";
                numbers[i].style.color = "#F8F9FA";
                winCondition++;
            } else {
                let color = (numbers[i].value < numbers[i].correct) ? "#17A2B8" : "#FFC107";
                numbers[i].style.backgroundColor = color;
                numbers[i].style.color = "#343A40";

            }
            if (winCondition == numbers.length) {

                gameEnd();


            }

        }

    }
});

function gameEnd() {
    success.style.display = "block";
    success.innerHTML = "Wooooaaah " + " ! You found the correct number in " + guesses + " attempts";
    texts.innerHTML = "Oooh, no!" + "<br>" + "You beat me!" + "<br>" + "It was your lucky day!";
    button.innerHTML = "Restart";
    button.addEventListener("click", function() {
        refreshPage();
    });

    function refreshPage() {
        window.location.reload();
    }



}

function maker(num) {
    for (let x = 0; x < num; x++) {
        let el = document.createElement("input");
        el.setAttribute("type", "number");
        el.max = 9;
        el.min = 0;
        el.size = 1;
        el.style.width = "50px";
        el.classList.add("boxNumber");
        el.correct = Math.floor(Math.random() * 10);
        el.value = 0;
        el.order = x;
        field.appendChild(el);
    }

}

var counter = 0;

function moveBy10(x) {
    var width = 10;
    var bar = document.getElementById("bar");
    counter++;
    if (counter * x < 101) {
        bar.style.width = counter * x + "%";
    }
    if (counter * x == 100) {

        failure.style.display = "block";
        texts.innerHTML = "Hahaha... " + "</br>" + "I told you..." + "</br>" + "See you next time!";
        reloading();
    }
    if (counter * x == 40) {
        bar.style.backgroundColor = "#FFC107";
    }
    if (counter * x == 80) {
        bar.style.backgroundColor = "#DC3545";
    }

    function reloading() {
        setTimeout(function() {
            window.location.reload(1);
        }, 6000);
    }
}