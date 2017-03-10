// ==UserScript==
// @name         SocialFightBot-LevelUp
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.3
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/levelup
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    const AttackUp = "http://socialfight.dk/levelup?plus=attack";
    const ArmorUp = "http://socialfight.dk/levelup?plus=strength";
    const DodgeUp = "http://socialfight.dk/levelup?plus=dodgechance";
    const HPUp = "http://socialfight.dk/levelup?plus=hitpoints";
    const RegenUp = "http://socialfight.dk/levelup?plus=regenerate";


    if (GM_getValue("state", 0) == 0)
    {
        GM_setValue("state", GM_getValue("state", 0)+ 1);
        window.location.href = AttackUp;
    }
    else if (GM_getValue("state", 0) == 1)
    {
        GM_setValue("state", GM_getValue("state", 0)+ 1);
        window.location.href = ArmorUp;
    }
    else if (GM_getValue("state", 0) == 2)
    {
        GM_setValue("state", GM_getValue("state", 0)+ 1);
        window.location.href = DodgeUp;
    }
    else if (GM_getValue("state", 0) == 3)
    {
        GM_setValue("state", GM_getValue("state", 0)+ 1);
        if (Math.floor(Math.random()*100) == 1)
        {
            window.location.href = HPup;
        }
        else
        {
            window.location.href = RegenUp;
        }
    }
    else if (GM_getValue("state", 0) == 4)
    {
        GM_setValue("state", GM_getValue("state", 0)+ 1);
        window.location.href = RegenUp;
    }
    else
    {
        GM_setValue("state", 0);
        window.location.reload();
    }

    setTimeout(function(){
        GM_setValue("state", 0);
        window.location.reload();
    }, 10000);

})();