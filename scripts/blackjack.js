class Player {
    constructor(name) {
        this.name = name;
        this.sum = 0;
        this.cards = new Array();
    }
    addCards(elem, newCards) {
        // Add cards to object
        newCards.forEach(element => {
            this.cards.push(element);
        });

        // Draw cards to the screen
        drawCard(this.cards, elem)
        console.log(this.cards);

        let value = 0, aces = 0;
        this.sum = 0;

        for (i = 0; i < this.cards.length; i++) { // iterate over all Player cards
            if (this.cards[i] > 10) value = 10;
            else if (this.cards[i] == 1) { aces++; value = 0; }
            else value = this.cards[i];
            this.sum += value;
            console.log('adding ' + value);
        }
        console.log("The sum of " + this.name + " is now " + this.sum);

        while (aces >= 1) {
            if (this.sum + 11 > 21) { this.sum += 1; console.log('adding ace as 1'); }
            else { this.sum += 11; console.log('adding ace as 11'); }
            aces--;
        }
        $("#" + elem + "-points").html("points: " + this.sum);
        console.log("The sum with aces of " + this.name + " is now " + this.sum);
        if (this.sum == 21 && this.cards.length == 2) endGame(1, this.name);
        else if (this.sum == 21) endGame(2, this.name);
        else if (this.sum > 21) endGame(3, this.name);
    }
}

function endGame(index, who) {
    let alertM = $("#alert-text");

    switch (index) {
        case 1:
            alertM.html("This is BLACKJACK! " + who + " won!");
            statistics.wins++;
            break;
        case 2:
            alertM.html(who + " won!");
            if (who == 'player') statistics.wins++;
            else statistics.lost++;
            break;
        case 3:
            alertM.html(who + " Lose!");
            if (who == 'delaer') statistics.win++;
            else statistics.lost++;
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
    $("#alert-modal").modal('show');
}

function drawCard(cardsId, elem) {
    let deck = "";
    cardsId.forEach(element => {
        if (element < 1 || element > 13) console.error("invalid card id: " + element);
        deck += " <div class= 'col-1' > <img src='images/cards/" + element + ".svg' alt='card" + element + "' class='play-card'> </div>";
    });
    $("#" + elem + "-deck").html(deck);
}

function liftCard(num = 1) {
    cards = new Array();
    for (i = 0; i < num; i++)
        cards.push(Math.floor(Math.random() * 13) + 1);
    return cards;
}

function showStatistics() {
    let proc = Math.round(statistics.wins / statistics.deals * 10000) / 100;
    if (isNaN(proc)) proc = '';
    else proc += '%!';
    $("#statistics").html("Wins: " + statistics.wins + "  " + proc + "\nlost: " + statistics.lost + "\nDeals: " + statistics.deals);
}

let inGame = false;
let statistics = { wins: 0, lost: 0, deals: 0 }

$("#btn-deal").on('click', function () {
    startGame();
});

$("#btn-hit").on('click', function () {
    if (inGame) player.addCards("player", liftCard());
});

$("#btn-stand").on('click', function () {
    if (inGame) {
        inGame = false;
        dealer.addCards("dealer", liftCard());
        console.log("Dealer 2nd card is " + dealer.cards[1]);
        while (dealer.sum <= 16) {
            dealer.addCards("dealer", liftCard());
            console.log("Dealer draw");
        }

        if (player.sum > dealer.sum) endGame(2, "player");
        else if (player.sum <= dealer.sum && dealer.sum > 21) endGame(2, 'player');
        else if (player.sum == dealer.sum) endGame(4);
        else if (player.sum < dealer.sum) endGame(3, "player");
        else endGame(5);

        showStatistics();
    }
});

function startGame() {
    statistics.deals++;
    showStatistics();
    player = new Player('player');
    dealer = new Player('dealer');

    dealer.addCards("dealer", liftCard(1));

    $("#dealer-deck").html($("#dealer-deck").html() + "<div class= 'col-1' > <img src='images/cards/0.svg' alt='card0' class='play-card'> </div>");
    $("#dealer-points").html("points: " + dealer.sum + " + ?");

    inGame = true;

    player.addCards("player", liftCard(2));
}