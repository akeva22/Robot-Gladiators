// function to set name 
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robots name is " + name);
};

var playerInfo = {
    name: window.prompt("what is your Robots name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("refilling players health by 20 for 7 dollars")
        }
        else {
            window.alert("You dont have enough money!");
        }
        this.health += 20;
        this.money -= 7;
    }, // comma!
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading players attack by 6 for 7 dollars");

            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You dont have enough money!")
        }
    }
};


 /* var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
*/
console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // Conditional Recursive Function Call
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.playerMoney = playerInfo.money - 10;
            return true();
            shop();
        }

    }
    return false();
}


// fight function (now with parameter for enemy's name)
var fight = function (enemy) {
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerturn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        fightOrSkip();

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
        }
    }
};


// Function to start a new game
var startGame = function () {
    // reset player stats
    playerInfo.reset();

    // reset player stats 
    playerInfo.health = 100;
    playerInfo.attack = 10;
    playerInfo.money = 10;

    // fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));


            // pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];

            // reset enemyHealth before starting new fight
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemyHealth = Math.max(0, enemyHealth - damage);

            // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1)
                // ask is player wants to use the store before the next round 
                var storeConfirm = window.confirm("The fight is over, wanna visit the store?")

            // if yes, take them to the store() function
            if (storeConfirm)
                shop();

        }
        // if player isn't alive, stop the game
        else {
            window.alert('You have lost your robot in battle! Game Over!');
            break;
        }
    }
    // play again
    endGame();

};

// function to end the entire game
var endGame = function () {
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // parseInt will change int to string. 
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

//function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// start the game when the page loads
startGame();
