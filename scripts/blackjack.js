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
        if (this.sum == 21 && this.cards.length == 2) console.log("This is BLACKJACK! You won!");
        else if (this.sum == 21) console.log("You won!");
        else if (this.sum > 21) console.log("You Lose!");
    }
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

player = new Player('player');
dealer = new Player('dealer');
let inGame = false;


$("#btn-deal").on('click', function () {
    startGame();
});

$("#btn-hit").on('click', function () {
    if (inGame) player
});

function startGame() {


    dealer.addCards("dealer", liftCard(1));

    $("#dealer-deck").html($("#dealer-deck").html() + "<div class= 'col-1' > <img src='images/cards/0.svg' alt='card0' class='play-card'> </div>");
    $("#dealer-points").html("points: " + dealer.sum + " + ?");

    inGame = true;

}