// ==UserScript==
// @name         SocialFightBot-Fight
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.7
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==

(function() {
    var isRegenerating = false;
    const responses = ["Vind en gratis pik i røven, sendes over MobilePay.",
                       "Tak fordi du bruger vores bot!",
                       "Hættedregne represent!",
                       "BAZINGA!",
                       "Quality comedy!",
                       "Strip for os!",
                       "If a women has starch masks on her body does that mean she has been pargnet before.?",
                       "My friends did a luigi board.. and it mentioned me! PLEAS HELP!?",
                       "YEE",
                       "Vidste du at vi kan skrive lige hvad vi vil i denne boks?",
                       "hvad vis du vis hvad han har gjort så ville du os forstå det 👌"];

    //The HTML constants, so they can be updated if the site changes.
    const HTMLAttack = "attack1";
    const HTMLAttackDiv = "normalattack";
    const HTMLHealth = "health";
    const HTMLAlert = "alert";


    //Take the raw HTML health and make it into something useful.
    var HTMLHealthString = document.getElementById(HTMLHealth).innerHTML.replace(/\s+/, "");
    var split1 = HTMLHealthString.split("/");
    var split2 = split1[1].split("HP");
    var PlayerHealth = split1[0];
    var PlayerHealthMax = split2[0];
    var PlayerHealthMin = PlayerHealthMax * 0.75;


    //Go into regen mode if PlayerHealth is less or equal than min. health
    if (PlayerHealth <= PlayerHealthMin)
    {
        isRegenerating = true;
    }
    //Go into attack mode if PlayerHealth is more or equal than max. health
    else if (PlayerHealth >= PlayerHealthMax)
    {
        isRegenerating = false;
    }


    if (isRegenerating)
    {
        console.log("Currently regenerating health.");
        console.log("Deired health: " + PlayerHealthMin);
        console.log("Current health: " + PlayerHealth);
    }

    else
    {
        document.getElementById(HTMLAttack).click();
    }



        setTimeout(function () {
            location.reload();
    }, 15 * 1000);
    
    //The site killed the alert, so we are adding it back in here:
    const AlertHTML = "<a class=\"alert\" href=\"#\">Shitty Alert!</a>";
    var AlertDIV = document.createElement('DIV');
    AlertDIV.className = HTMLAlert;
    AlertDIV.innerHTML = AlertHTML;
    //It have to be inserted at the top of the body before the header.
    document.body.insertBefore(AlertDIV, document.body.firstChild);

    //A fix to be able to see the whole page after the alert has been added back in.
    document.getElementsByTagName("HEADER")[0].style.paddingTop = "30px";

    //Take a random text in responses and show it in the top of the website.
    document.getElementsByClassName(HTMLAlert)[0].innerHTML = responses[Math.floor(Math.random()*responses.length)];
    
})();