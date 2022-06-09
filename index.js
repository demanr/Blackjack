let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let bet = 5

let player = {
    name: "Player",
    chips: 50
}

let messageEl = document.getElementById("msg-el")
let message = ""
let sumEl = document.getElementById("sum-el")
let cardsEl= document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let betEl = document.getElementById("bet-el")
playerEl.textContent = player.name + ": $" + player.chips
betEl.textContent = "Current bet: " + bet

function resetVars() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    
}

function startGame() {
    resetVars()
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    // updates variables
    cards.push(firstCard,secondCard)
    sum = firstCard + secondCard
    isAlive = true
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Draw a card?"
    } else if (sum === 21) {
        message = "You got Blackjack!"
        player.chips += bet
        hasBlackJack = true
        isAlive = false
    } else {
        message = "You are out."
        player.chips -= bet
        isAlive = false
    }
    messageEl.textContent = message
    playerEl.textContent = player.name + ": $" + player.chips
}

function getRandomCard() {
    let num = Math.floor(Math.random() * 13) + 1 
    if (num === 1 ){
        return 11
    } else if (num > 10) {
        return 10
    } else return num
}
// if game ongoing adds card to hand
function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
    
}

function hold() {
    // only possible if ingame
    
    if (isAlive) {
        opponentSum = getRandomCard() + getRandomCard()
        while (opponentSum < 15) {
            opponentSum += getRandomCard()
        }
        if (opponentSum < sum || opponentSum > 21) {
            messageEl.textContent = "You won!  The opponents sum was: " + opponentSum
            player.chips += bet
            
        } else if (opponentSum === sum) {
            messageEl.textContent = "You tied! Both sums were " + opponentSum
        } else {
            messageEl.textContent = "You lost! The opponents sum was: " + opponentSum
            player.chips -= bet
        }
        isAlive = false
    }
}

function betChange(increment) {
    console.log("EEE")
    // can only edit bet while not in game
    if (!isAlive) {
        if ( bet + increment <= 0) {
            messageEl.textContent = "Bet must be greater than zero!"
            return
        }
        bet += increment
        betEl.textContent = "Current bet: " + bet
    } else messageEl.textContent = "Change bet when round is over!"
    
}