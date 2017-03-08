// ==UserScript==
// @name         SocialFightBot
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.1
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http://socialfight.dk/fight
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    //Get all the html things.
    var HTMLAttack = document.getElementById("attack1");
    var HTMLHealth = document.getElementById("health");
    var HTMLModal = document.getElementById("myModal2");

    var HTMLHealthString = HTMLHealth.innerHTML.replace(/\s+/, "");
    var split1 = HTMLHealthString.split("/");
    var split2 = split1[1].split("HP");

    var PlayerHealth = split1[0];
    var PlayerHealthMax = split2[0];
    var PlayerHealthMin = PlayerHealth / 4;

    console.log(GM_getValue("isRegenerating", false));

    if (PlayerHealth <= PlayerHealthMin)
    {
        GM_setValue("isRegenerating", true);
    }

    if (PlayerHealth => PlayerHealthMax)
    {
        GM_setValue("isRegenerating", false);
    }

    if (!GM_getValue("isRegenerating", false))
    {
        document.getElementById("attack1").click();
    }


        setTimeout(function () {
            location.reload();
    }, 30 * 1000);
})();