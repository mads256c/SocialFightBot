// ==UserScript==
// @name         SocialFightBot-Fight
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.9
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==

//*************
//* Constants *
//*************
//The HTML class or id names. If the site changes the names we can easily change it here.
const HTMLAttack = "attack1";
const HTMLHealth = "health";
const HTMLAlert = "alert";

//The site killed the alert, so we are adding it back in here:
const AlertHTML = "<a class=\"alert\" href=\"#\">Shitty Alert!</a>";

//Stupid peices of text that we display in the "alert" bar.
const responses = ["Vind en gratis pik i røven, sendes over MobilePay.",
                   "Tak fordi du bruger vores bot!",
                   "Hættedregne represent!",
                   "BAZINGA!",
                   "Quality comedy!",
                   "If a women has starch masks on her body does that mean she has been pargnet before.?",
                   "My friends did a luigi board.. and it mentioned me! PLEAS HELP!?",
                   "YEE",
                   "Vidste du at vi kan skrive lige hvad vi vil i denne boks?",
                   "hvad vis du vis hvad han har gjort så ville du os forstå det 👌",
                   "Lavet af DaaseAllan og mads256c"];

//**************************************
//* Code for the logging functionality *
//**************************************
var logString = "<h2 style=\"font-size: 1.5em\">Console Log</h2>";

function log(string)
{
    console.log(string);
    logString += "<p style=\"color: AliceBlue\">" + string + "</p>";
}

function warn(string)
{
    console.warn(string);
    logString += "<p style=\"color: DarkOrange\">" + string + "</p>";
}

function error(string)
{
    console.error(string);
    logString += "<p style=\"color: DarkRed\">" + string + "</p>";
}

(function() {
    //****************************
    //* Write critical code here *
    //****************************


    //Take the raw HTML health and make it into something useful.
    var split = document.getElementById(HTMLHealth).innerHTML.replace(/\s+/, "").split("/");
    var PlayerHealth = split[0];
    var PlayerHealthMax = split[1].split("HP")[0];
    var PlayerHealthMin = PlayerHealthMax * 0.75;

    //Go into regen mode if PlayerHealth is less or equal than min. health
    if (PlayerHealth <= PlayerHealthMin)
    {
        log("Currently regenerating health.");
        log("Deired health: " + PlayerHealthMin);
        log("Current health: " + PlayerHealth);
    }
    //Go into attack mode if PlayerHealth is more or equal than max. health
    else if (PlayerHealth >= PlayerHealthMax)
    {
        log("Currently attacking.");
        document.getElementById(HTMLAttack).click();
    }
    //Something went wrong report it.
    else
    {
        log("Something went wrong");
        log("Current Health: " + PlayerHealth);
        log("Desired health: " + PlayerHealthMin);
        log("Maximum health: " + PlayerHealthMax);
    }


    //Reloads the website after x secounds.
    setTimeout(function () {
        location.reload();
    }, 15 * 1000);

    //******************************
    //* Write uncritical code here *
    //******************************

    //The site killed the alert, so we are adding it back in here:
    var AlertDIV = document.createElement('DIV');
    AlertDIV.className = HTMLAlert;
    AlertDIV.innerHTML = AlertHTML;
    //It have to be inserted at the top of the body before the header.
    document.body.insertBefore(AlertDIV, document.body.firstChild);

    //A fix to be able to see the whole page after the alert has been added back in.
    document.getElementsByTagName("HEADER")[0].style.paddingTop = "30px";

    //Take a random text in responses and show it in the top of the website.
    document.getElementsByClassName(HTMLAlert)[0].innerHTML = responses[Math.floor(Math.random()*responses.length)];


    //Print the console log on screen. Should run last.
    ConsoleHTML = document.createElement("DIV");
    ConsoleHTML.style.position = "fixed";
    ConsoleHTML.style.bottom = "0";
    ConsoleHTML.style.right = "0";
    ConsoleHTML.style.margin = "10px";
    ConsoleHTML.innerHTML = logString;

    document.body.appendChild(ConsoleHTML);
})();