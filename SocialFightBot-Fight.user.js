// ==UserScript==
// @name         SocialFightBot-Fight
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.11
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==

//*************
//* Constants *
//*************
//The refresh delay
const RefreshDelay = 15;

//The HTML class or id names. If the site changes the names we can easily change it here.
const HealthId = "health";
const AttackId = "attack1";
const AlertClass = "alert";

//The site killed the alert, so we are adding it back in here:
const AlertHTML = "<a class=\"alert\" href=\"#\">Shitty Alert!</a>";

//Stupid peices of text that we display in the "alert" bar.
const AlertText = ["Vind en gratis pik i røven. Sendes over MobilePay.",
                   "Tak fordi du bruger vores bot!",
                   "Hættedregne represent!",
                   "BAZINGA!",
                   "Quality comedy!",
                   "If a women has starch masks on her body does that mean she has been pargnet before.?",
                   "My friends did a luigi board.. and it mentioned me! PLEAS HELP!?",
                   "YEE",
                   "Vidste du, at vi kan skrive, lige hvad vi vil i denne boks?",
                   "hvad vis du vis hvad han har gjort så ville du os forstå det 👌",
                   "Lavet af DaaseAllan og mads256c",
                   "Hvis du ikke skal bruge Stats, slå dem fra så botten kører hurtigere.",
                   "Vi har også lavet en bot til kridellerkran.dk"];

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


//Refresh code
var RefreshVar = RefreshDelay;

function RefreshHTMLUpdate()
{
    setTimeout(function()
               {
        RefreshVar--;
        document.getElementById("RefreshHTML").innerHTML = RefreshVar + " seconds until refreshing";
        RefreshHTMLUpdate();
    }, 1000);
}

(function() {
    //****************************
    //* Write critical code here *
    //****************************


    //Take the raw HTML health and make it into something useful.
    var split = document.getElementById(HealthId).innerHTML.replace(/\s+/, "").split("/");
    var PlayerHealth = parseInt(split[0]);
    var PlayerHealthMax = parseInt(split[1].split("HP")[0]);
    var PlayerHealthMin = parseInt(Math.ceil(PlayerHealthMax * 0.75));

    //Go into regen mode if PlayerHealth is less or equal than min. health
    if (PlayerHealth <= PlayerHealthMin)
    {
        log("Currently regenerating health.");
        log("Current health: " + PlayerHealth);
        log("Desired health: " + PlayerHealthMin);
        log("Maximum health: " + PlayerHealthMax);
    }
    //Go into attack mode if PlayerHealth is more or equal than max. health
    else
    {
        log("Currently attacking.");
        log("Current health: " + PlayerHealth);
        log("Desired health: " + PlayerHealthMin);
        log("Maximum health: " + PlayerHealthMax);
        document.getElementById(AttackId).click();
    }


    //Reloads the website after x seconds.
    setTimeout(function () {
        location.reload();
    }, RefreshDelay * 1000);

    //******************************
    //* Write uncritical code here *
    //******************************

    //The site killed the alert, so we are adding it back in here:
    var AlertDIV = document.createElement("DIV");
    AlertDIV.className = AlertClass;
    AlertDIV.innerHTML = AlertHTML;
    //It have to be inserted at the top of the body before the header.
    document.body.insertBefore(AlertDIV, document.body.firstChild);

    //A fix to be able to see the whole page after the alert has been added back in.
    document.getElementsByTagName("HEADER")[0].style.paddingTop = "30px";

    //Take a random text in responses and show it in the top of the website.
    document.getElementsByClassName(AlertClass)[0].innerHTML = AlertText[Math.floor(Math.random()*AlertText.length)];


    //Print the console log on screen. Should run last.
    var ConsoleHTML = document.createElement("DIV");
    ConsoleHTML.style.position = "fixed";
    ConsoleHTML.style.bottom = "0";
    ConsoleHTML.style.right = "0";
    ConsoleHTML.style.margin = "10px";
    ConsoleHTML.style.padding = "5px";
    ConsoleHTML.style.borderStyle = "dashed";
    ConsoleHTML.style.borderWidth = "1px";
    ConsoleHTML.style.borderRadius = "5px";
    ConsoleHTML.innerHTML = logString;

    document.body.appendChild(ConsoleHTML);

    //Display the countdown to refreshing
    var RefreshHTML = document.createElement("DIV");
    RefreshHTML.style.position = "fixed";
    RefreshHTML.style.bottom = "0";
    RefreshHTML.style.left = "0";
    RefreshHTML.style.margin = "10px";
    RefreshHTML.innerHTML = RefreshVar + " seconds until refreshing";
    RefreshHTML.id = "RefreshHTML";
    document.body.appendChild(RefreshHTML);
    RefreshHTMLUpdate();

})();