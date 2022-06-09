// TBA
let firstCard =  Math.floor(Math.random() * 9) + 2
let secondCard = 8 // Math.floor(Math.random() * 9) + 2
let sum = firstCard + secondCard + 4
let hasBlackJack = false
let isAlive = true

let message = ""

if (sum <= 20) {
    message = "Draw a card?"
} else if (sum === 21) {
    message = "You got Blackjack!"
    hasBlackJack = true
} else {
    message = "You are out."
    isAlive = false
}

console.log(hasBlackJack)
console.log(isAlive)
console.log(message)