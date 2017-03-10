// ==UserScript==
// @name         SocialFightBot-Stats
// @namespace    https://github.com/mads256c/SocialFightBot
// @version      0.5
// @description  A bot for socialfight.dk
// @author       DaaseAllan and mads256c
// @match        http*://socialfight.dk/fight
// @run-at       document-end
// ==/UserScript==

const ProfileClass = ".girl2";
const ButtonClass = ".buttons";
const ProfileImageClass = ".girl";
const WeaponClass = ".weapon";
const StatsClass = ".stats";

(function()
 {
    //Get the profile url.
    var StatsURL = $(ProfileClass)[0].children[0].href;
    var EnemyStatsURL = $(ProfileClass)[1].children[0].href;

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
    $( "#statsdiv" ).load( StatsURL + " .stats, .weapon, .girl", function() {
        //Delete unneeded items
        $(ButtonClass)[0].remove();
        $(ProfileImageClass).first().children().first().remove();
        //Remove minHeight
        $(ProfileImageClass).first().css("min-height", "0");
        //Fix ordering
        $(WeaponClass).prependTo('#statsdiv');
        $(StatsClass).first().prependTo('#statsdiv');
    });


    var EnemyStatsDiv = document.createElement("div");
    EnemyStatsDiv.style.position = "fixed";
    EnemyStatsDiv.style.right = "0";
    EnemyStatsDiv.style.top = "0";
    EnemyStatsDiv.style.bottom = "0";
    EnemyStatsDiv.style.margin = "10px";
    EnemyStatsDiv.style.marginTop = "50px";
    EnemyStatsDiv.style.marginBottom = "50px";
    EnemyStatsDiv.id = "enemystatsdiv";

    document.body.appendChild(EnemyStatsDiv);
    //Load the enemy stats from EnemyStatsURL
    $( "#enemystatsdiv" ).load( EnemyStatsURL + " .stats" );
})();