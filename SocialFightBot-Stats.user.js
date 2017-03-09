// ==UserScript==
// @name         SocialFightBot-Stats
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.1
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==


(function()
{
    var StatsURL = document.body.getElementsByClassName("girl2")[0].children[0].href;
    var StatsDiv = document.createElement("div");
    StatsDiv.style.position = "fixed";
    StatsDiv.style.left = "0";
    StatsDiv.style.bottom = "0";
    StatsDiv.style.margin = "10px";
    StatsDiv.style.marginBottom = "50px";
    StatsDiv.id = "statsdiv";
    document.body.appendChild(StatsDiv);

    $( "#statsdiv" ).load( StatsURL + " .stats" );
    $("<div>").load(StatsURL + " .weapon", function() {
      $("#statsdiv").append($(this));
});
    $("<div>").load(StatsURL + " .girl", function() {
      $("#statsdiv").append($(this));
            document.body.getElementsByClassName("buttons")[0].outerHTML = "";
            document.body.getElementsByClassName("girl")[0].children[0].innerHTML = "";
            document.body.getElementsByClassName("girl")[0].style.minHeight = "0";
});

    



})();