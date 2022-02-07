var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage1 = "dice" + randomNumber1 + ".png";
var randomImageSource1 = "images/" + randomDiceImage1;
var randomDiceImage2 = "dice" + randomNumber2 + ".png";
var randomImageSource2 = "images/" + randomDiceImage2;
document.querySelector(".img1").setAttribute("src", randomImageSource1);
document.querySelector(".img2").setAttribute("src", randomImageSource2);

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "Player 1 wins!";
} else if (randomNumber2 > randomNumber1) {
    document.querySelector("h1").textContent = "Player 2 wins!";
} else {
    document.querySelector("h1").textContent = "Draw!";
}