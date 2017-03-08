// ==UserScript==
// @name         SocialFightBot
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.1
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http://socialfight.dk/*
// @grant        none
// ==/UserScript==


(function() {
    var PlayerHealth = 0;
    var PlayerHealthMax = 0;
    
    //Get all the html things.
    var HTMLAttack = document.getElementById("attack1");
    var HTMLHealth = document.getElementById("health");
    var HTMLModal = document.getElementById("myModal2");
    
    var HTMLHealthString = HTMLHealth.innerHTML.replace(/\s+/, "");
    var split1 = HTMLHealthString.split("/");
    var split2 = split1[1].split("HP");
    
    PlayerHealth = split1[0];
    PlayerHealthMax = split2[0];
    
    
    console.log(split1[0] + " " + split2[0]);
    
    console.log(HTMLHealth.innerHTML);
    console.log(HTMLModal.style.display);
    
    if (HTMLModal.style.display == "block")
    {
        //
    }
        
    
})();