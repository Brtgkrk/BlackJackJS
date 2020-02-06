let inGame = false, gameEnd = false;
let statistics = { wins: 0, lost: 0, deals: 0 }

class Player {
    constructor(name) {
        this.name = name;
        this.sum = 0;
        this.cards = new Array();
    }
    addCards(numOfCards = 1) {
        // randomize and add new cards to the array
        this.cards.push(...liftCard(numOfCards));

        // Draw cards onto screen
        renderCards(this.cards, this.name)

        // Check points
        let value = 0, aces = 0;
        this.sum = 0;
        this.cards.forEach(element => {
            if (element >= 10) value = 10;
            else if (element == 1) { aces++; value = 0; }
            else value = element;
            this.sum += value;
        });
        while (aces >= 1) {
            if (this.sum + 11 > 21) { this.sum += 1; console.log('adding ace as 1'); }
            else { this.sum += 11; console.log('adding ace as 11'); }
            aces--;
        }

        // Draw points onto screen
        $("#" + this.name + "-points").html("points: " + this.sum);

        // CheckPoints
        checkPoints();
    }
}
// Checking if Player won/lose
checkPoints = () => {
    if (player.sum == 21 && player.cards.length == 2) endGame(3); // Player BJ
    else if (player.sum == 21) endGame(2); // Player has sum of 21
    else if (player.sum > 21) endGame(1); // Player exceeded total points
    else if (dealer.sum > 21) { console.log("De"); endGame(2); } // Dealer exceeded total points
}
// Generetes cards into screen
renderCards = (cardIds, elem) => {
    let deck = "";
    cardIds.forEach(element => {
        if (element < 1 || element > 13) console.error("Invalid card ID: " + element);
        else deck += "<div class= 'col-1' > <img src='images/cards/" + element + ".svg' alt='card" + element + "' class='play-card'> </div>"
    });
    $("#" + elem + "-deck").html(deck);
}
// Draws given number of cards
liftCard = (num = 1) => {
    cards = new Array();
    for (let i = 0; i < num; i++) {
        cards.push(Math.floor(Math.random() * 13) + 1);
    }
    return cards;
}
// Show player statistics in the screen
showStatistics = () => {
    let proc = Math.round(statistics.wins / statistics.deals * 10000) / 100;
    if (isNaN(proc)) proc = '';
    else proc += '%!';
    $("#statistics").html("Wins: " + statistics.wins + "  " + proc + "\nlost: " + statistics.lost + "\nDeals: " + statistics.deals);
}
// Endgame alert, update stats
endGame = (index) => {
    const alertM = $("#alert-text");

    switch (index) {
        case 1:
            alertM.html("Player Lost!");
            statistics.lost++;
            console.log('player lost');
            break;
        case 2:
            alertM.html("Player Won!");
            statistics.wins++;
            console.log('player won');
            break;
        case 3:
            alertM.html("This is BLACKJACK, Player Won!");
            statistics.wins++;
            console.log('player won');
            break;
        case 4:
            alertM.html("Dead Heat!");
            break;
        default:
            alertM.html("Error, contct me: <a href='mailto:pomoc@jkrok.pl'>pomoc@jkrok.pl</a>");
            break;
    }
    showStatistics();
    inGame = false;
    gameEnd = true;
    console.log('kurwa');

    $("#alert-modal").modal('show');
}
// Buttons
$("#btn-deal").on('click', function () {
    startGame();
});

$("#btn-hit").on('click', function () {
    if (inGame) player.addCards();
});

$("#btn-stand").on('click', function () {
    if (inGame) {
        inGame = false;
        dealer.addCards();
        console.log("Dealer 2nd card is " + dealer.cards[1]);
        while (dealer.sum <= 16) {
            dealer.addCards();
            console.log("Dealer draw");
        }
        //CheckEnd
        console.log(gameEnd);

        if (!gameEnd) {
            console.log('end checking');

            if (player.sum < dealer.sum) endGame(1);
            else if (player.sum > dealer.sum) endGame(2);
            else if (player.sum == dealer.sum) endGame(4);
        }
        showStatistics();
    }
});
// Game Controller
startGame = () => {
    gameEnd = false;
    statistics.deals++;
    showStatistics();
    player = new Player('player');
    dealer = new Player('dealer');
    console.log('----');

    dealer.addCards();

    $("#dealer-deck").html($("#dealer-deck").html() + "<div class= 'col-1' > <img src='images/cards/0.svg' alt='card0' class='play-card'> </div>");
    $("#dealer-points").html("points: " + dealer.sum + " + ?");

    inGame = true;

    player.addCards(2);
}