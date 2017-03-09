// ==UserScript==
// @name         SocialFightBot-Stats
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.3
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==


(function()
{
    //Get the profile url.
    var StatsURL = document.body.getElementsByClassName("girl2")[0].children[0].href;

    //Make a div where the stats should be in.
    var StatsDiv = document.createElement("div");
    StatsDiv.style.position = "fixed";
    StatsDiv.style.left = "0";
    StatsDiv.style.top = "0";
    StatsDiv.style.bottom = "0";
    StatsDiv.style.margin = "10px";
    StatsDiv.style.marginTop = "50px";
    StatsDiv.style.marginBottom = "50px";
    StatsDiv.id = "statsdiv";
    document.body.appendChild(StatsDiv);
    //Load the stats from StatsURL
    $( "#statsdiv" ).load( StatsURL + " .stats" );

    $("<div>").load(StatsURL + " .weapon, .girl", function() {
      $("#statsdiv").append($(this));
            //Delete unneeded items
            document.body.getElementsByClassName("buttons")[0].outerHTML = "";
            document.body.getElementsByClassName("girl")[0].children[0].innerHTML = "";
            //Remove minHeight;
            document.body.getElementsByClassName("girl")[0].style.minHeight = "0";
    });
})();