"use strict";

let flippedCards = [];
let player1Points = 0;
let player2Points = 0;
let player1Flips = 0;
let player2Flips = 0;

class Card {
    constructor(imageLetter){
        this.imageLetter = imageLetter;
        this.flipped = false;
        this.removed = false;
    }
}

function createBoard() {
    let cards = mixedCards();//Lager og blander kortene
    let board = document.getElementById("cardboard");
     // Resetter poeng og antall flips
    player1Points = 0;
    player2Points = 0;
    player1Flips = 0;
    player2Flips = 0;
    showPlayerValues();
    document.getElementById("winner").style.display = "none"; // Skjuler vinner-melding
    board.innerHTML = "";  // Fjerner gamle kort hvis spillet restartes

    cards.forEach(card => {
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("outer");

        let frontDiv = document.createElement("div");
        frontDiv.classList.add("card", "front");
        let img = document.createElement("img");
        img.src = `images/${card.imageLetter}.png`; // Setter riktig bilde
        frontDiv.appendChild(img);

        let backDiv = document.createElement("div");
        backDiv.classList.add("card", "back");

        outerDiv.appendChild(frontDiv);
        outerDiv.appendChild(backDiv);

        outerDiv.addEventListener("click", flipp);
        board.appendChild(outerDiv);
        
    });
}

const imageLetters = ["A", "B", "C", "D", "E","F","G","H"];
function mixedCards(){
    let cards = [];
    for (let i = 0; i < imageLetters.length; i++){
        cards.push(new Card(imageLetters[i]));
        cards.push(new Card(imageLetters[i]));
    }
    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);
    console.log(cards);
    return cards;
}
    function flipp(event){
        let clickedCard = event.target.parentElement;
        if (!clickedCard.classList.contains("flipped") && flippedCards.length < 2) {
            clickedCard.classList.add("flipped");
            flippedCards.push(clickedCard);
    
            if (flippedCards.length === 2) {
                let card1 = flippedCards[0].querySelector(".front img").src;
                let card2 = flippedCards[1].querySelector(".front img").src;
    
                if (card1 === card2) {
                    setTimeout(() => {
                        flippedCards[0].classList.add("removed");
                        flippedCards[1].classList.add("removed");
                        flippedCards = [];
                        if (player1.classList.contains("current-player")){
                            currentPlayer.innerText = "Player 2";
                            player1Flips++;
                            player1Points++;
                        } 
                        else {
                            currentPlayer.innerText = "Player 1";
                            player2Flips++;
                            player2Points++;;
                        }
                        showPlayerValues()
                        checkGameOver();
                        }, 500);
                }
                else {
                    setTimeout(() => {
                        flippedCards[0].classList.remove("flipped");
                        flippedCards[1].classList.remove("flipped");
                        flippedCards = [];
                        //endrer spiller og poeng
                        if (player1.classList.contains("current-player")){
                            currentPlayer.innerText = "Player 2";
                            player1Flips++;
                            player1.classList.remove("current-player");
                            player2.classList.add("current-player");
                        } 
                        else {
                            currentPlayer.innerText = "Player 1";
                            player2Flips++;
                            player2.classList.remove("current-player");
                            player1.classList.add("current-player");
                        }
                        showPlayerValues();
                    }, 1000);
                }
            }
        }
    }
    function showPlayerValues(){
        player1.querySelector('.flips').innerText = player1Flips;
        player1.querySelector('.score').innerText = player1Points;
        player2.querySelector('.flips').innerText = player2Flips;
        player2.querySelector('.score').innerText = player2Points;
    }
    function checkGameOver() {
        let remainingCards = document.querySelectorAll(".outer:not(.removed)");
        if (remainingCards.length === 0) {
            document.getElementById("winner").style.display = "block"; // Vis vinner-melding
            if (player1Points > player2Points) {
                document.getElementById("winnerSpan").innerText = "Player 1";
            }
            else if (player1Points === player2Points) {
                document.getElementById("winnerSpan").innerText = "none.. It's a tie!";
            }
            else {
            document.getElementById("winnerSpan").innerText = "Player 2";
            }
        }
    }
    document.querySelectorAll(".card.back").forEach(card => {
        card.addEventListener("click", flipp);
    });
    let currentPlayer=document.getElementById("currentPlayer");
    let player1=document.getElementById("player1");
    let player2=document.getElementById("player2");
    document.getElementById("startbutton").addEventListener("click", createBoard);
    document.addEventListener('DOMContentLoaded', createBoard);
    