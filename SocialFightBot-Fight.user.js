// ==UserScript==
// @name         SocialFightBot-Fight
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.4
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==

(function() {
    var isRegenerating = false;
    const responses = ["Vind en gratis pik i røven, sendes over MobilePay.", "Tak fordi du bruger vores bot!", "Hvorfor MobilPay'er du ikke bare os?"];

    //Get all the html things.
    var HTMLAttack = document.getElementById("attack1");
    var HTMLHealth = document.getElementById("health");

    document.getElementsByClassName("alert")[0].innerHTML = responses[Math.floor(Math.random()*responses.length)];
    document.getElementById("attack1").innerHTML = "Auto attacker";

    var HTMLHealthString = HTMLHealth.innerHTML.replace(/\s+/, "");
    var split1 = HTMLHealthString.split("/");
    var split2 = split1[1].split("HP");

    var PlayerHealth = split1[0];
    var PlayerHealthMax = split2[0];
    var PlayerHealthMin = PlayerHealthMax * 0.75;



    if (PlayerHealth <= PlayerHealthMin)
    {
        isRegenerating = true;
    }

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

    else {
        document.getElementById("attack1").click();
    }



        setTimeout(function () {
            location.reload();
    }, 15 * 1000);
})();