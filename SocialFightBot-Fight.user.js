// ==UserScript==
// @name         SocialFightBot-Fight
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.12
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
                   "Vi har også lavet en bot til kridellerkran.dk",
                   "Can you burn a Luigi board?"];

//**************************************
//* Code for the logging functionality *
//**************************************
var directLog = false;
var logString = "<h2 style=\"font-size: 1.5em\">Console Log</h2>"; //The string we print in the box.

//Used to log non-warnings and non-errors. Should only be used for debugging and for informational purposes.
function log(string)
{
    logString += "<p style=\"color: AliceBlue\">" + string + "</p>";
    if (directLog)
    {
        $("#console").html(logString);
    }
}

//Used to log warnings. Should be used if a non-critical part of the code fails.
function warn(string)
{
    console.warn(string);
    logString += "<p style=\"color: DarkOrange\">" + string + "</p>";
    if (directLog)
    {
        $("#console").html(logString);
    }
}

//Used to log errors. Should be used if a critical part of the code fails.
function error(string)
{
    console.error(string);
    logString += "<p style=\"color: DarkRed\">" + string + "</p>";
    if (directLog)
    {
        $("#console").html(logString);
    }
}


function checkhealth()
{
    //Take the raw HTML health and make it into something useful.
    var split = document.getElementById(HealthId).innerHTML.replace(/\s+/, "").split("/");
    //We make sure that all the Health variables are integers, because we had a comparison bug.
    var PlayerHealth = parseInt(split[0]);
    var PlayerHealthMax = parseInt(split[1]); //parseInt Converts string to int. It ignores all text and only uses the numbers. That why we dont need to remove the HP at the end.
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
}

//The refresh countdown code
var RefreshVar = RefreshDelay;

function RefreshHTMLUpdate()
{
    setTimeout(function()
    {
        RefreshVar--;
        $("#refreshhtml").html(RefreshVar + " sekunder tilbage.");
        RefreshHTMLUpdate();
    }, 1000);
}

(function() {
    //****************************
    //* Write critical code here *
    //****************************

    $('#health').bind("DOMSubtreeModified",function(){
        checkhealth();
    });
    //It is important that this code runs, so if we add unnessesary or unstable code add it after this.
    //Reloads the website after x seconds.
    setTimeout(function(){
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
    $("HEADER")[0].style.paddingTop = "30px";

    //Take a random text in responses and show it in the top of the website. We put this in a for loop, because they add and remove the alert all the time.
    var AlertElements = document.getElementsByClassName(AlertClass);
    for (var i = 0; i < AlertElements.length; ++i) {
        AlertElements[i].innerHTML = AlertText[Math.floor(Math.random()*AlertText.length)];
    }

    //Display the countdown to refreshing
    var RefreshHTML = document.createElement("DIV");
    RefreshHTML.style.position = "fixed";
    RefreshHTML.style.bottom = "0";
    RefreshHTML.style.left = "0";
    RefreshHTML.style.margin = "10px";
    RefreshHTML.innerHTML = RefreshVar + " sekunder tilbage.";
    RefreshHTML.id = "refreshhtml";
    //Add to the document
    $("BODY").append(RefreshHTML);
    //Start countdown
    RefreshHTMLUpdate();

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
    ConsoleHTML.id = "console";
    //Add to the document
    $("BODY").append(ConsoleHTML);
    directLog = true;

})();