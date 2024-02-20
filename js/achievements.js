addLayer("ach", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FFFFC8",                       // The color for this layer, which affects many elements.
    resource: "achievement points",            // The name of this layer's main prestige resource.
    symbol: "!",
    row: 'side',
    style() {return  {'background-color': '#373728'}},                                  // The row this layer is on (0 is the first row).

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(0),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "none",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.

    achievements: {
        11: {
            name: "<h4 style='margin-top:5px'>great, another generic prestige tree mod</h4>",
            done() { return true},
            tooltip: "you don't need to know how to get this one. it's free!",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        12: {
            name: "<h4 style='margin-top:5px'>just a few resets</h4>",
            done() { return hasMilestone("r", 1)},
            tooltip: "get reset milestone 2 '100 resets'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        13: {
            name: "<h4 style='margin-top:5px'>reset-reset time!</h4>",
            done() { return player['a'].points.gte(1)},
            tooltip: "get 1 ascenion point",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        14: {
            name: "<h4 style='margin-top:5px'>of course you can</h4>",
            done() { return hasUpgrade("a", 14)},
            tooltip: "get ascenion upgrade 'can i go back to resets?'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        15: {
            name: "<h4 style='margin-top:5px'>do you really need this many resets?</h4>",
            done() { return hasMilestone("r", 4)},
            tooltip: "get reset milestone 5 '1000000 resets'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        16: {
            name: "<h4 style='margin-top:5px'>reset-reset time! ...again</h4>",
            done() { return player['p'].points.gte(1)},
            tooltip: "get 1 prestige point",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        21: {
            name: "<h4 style='margin-top:5px'>you definitely don't need this many resets</h4>",
            done() { return player['r'].points.gte(100000000)},
            tooltip: "get 100,000,000 reset points",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        22: {
            name: "<h4 style='margin-top:5px'>the start of automation</h4>",
            done() { return hasUpgrade("p", 21)},
            tooltip: "get prestige upgrade 'too slow to be useful'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        23: {
            name: "<h4 style='margin-top:5px'>how many buttons do you need?</h4>",
            done() { return getBuyableAmount('r', 11) == 2024},
            tooltip: "max out 'reset button' by buying 2024 of them",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        24: {
            name: "<h4 style='margin-top:5px'>just kidding! you do need those resets</h4>",
            done() { return hasUpgrade('p', 23)},
            tooltip: "get prestige upgrade '3 per row is too low'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        25: {
            name: "<h4 style='margin-top:5px'>time for scientific notation</h4>",
            done() { return hasMilestone('r', 7)},
            tooltip: "get reset milestone 7 '1e10 resets'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        26: {
            name: "<h4 style='margin-top:5px'>time for reset-reset-resets?</h4>",
            done() { return player['rb'].points.gte(1)},
            tooltip: "get 1 rebirth point",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 26))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
        },
        31: {
            name:"<h4 style='margin-top:5px'>finally some new content</h4>",
            done() { return player['rb'].points.gte(3)},
            tooltip: "get 3 rebirth points",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        32: {
            name:"<h4 style='margin-top:5px'>fast enough to be useful</h4>",
            done() { return hasMilestone('rb', 4)},
            tooltip: "get the 5th rebirth milestone '5th rebirth'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        33: {
            name:"<h4 style='margin-top:5px'>is it just milesto-<br> oh.</h4>",
            done() { return hasMilestone('rb', 6)},
            tooltip: "get the 6th rebirth milestone '8th rebirth'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        34: {
            name:"<h4 style='margin-top:5px'>it was not just milestones</h4>",
            done() { return hasUpgrade('rb', 32)},
            tooltip: "get the rebirth upgrade 'rebirth power'",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        35: {
            name:"<h4 style='margin-top:5px'>it's rewind time!</h4>",
            done() { return player['rw'].points.gte(1)},
            tooltip: "get 1 rewind point",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        36: {
            name:"<h4 style='margin-top:5px'>from reset-reset to ascend-ascend</h4>",
            done() { return player['t'].points.gte(1)},
            tooltip: "get 1 transcendence point",
            style(){return {"border-radius": "10% / 10%", "width": "100px", "height": "100px", 'background-color': (hasAchievement('ach',this.id)?(hasAchievement('ach', 36))?'#FFDC3D':'#77BF5F':'#BF5F5F' )}},//second true, first true, no true 
            onComplete() {player['ach'].points = player['ach'].points.add(1) },
            unlocked() { return hasMilestone('rb', 0)},
        },
    },
    tabFormat: [
        ["display-text", function() { return "<h3> Achievements </h3><br> <h4 style='margin-top:5px'> just a collection of, who could of guessed it, achievements. your 'achievement points' act as a counter for your completed achievements. most of these can be completed by just playing through the game normally. </h4><br> You have <h1 style='color: #FFFFC8'> " + player['ach'].points + "</h1> achievements"}],
        "blank",
        ["display-text", function() { return " Set 1<br> <h1>The Basics</h1>"}],
        "blank",
        ["row", [["achievement", 11], ["achievement", 12], ["achievement", 13], ["achievement", 14], ["achievement", 15], ["achievement", 16]]],
        ["row", [["achievement", 21], ["achievement", 22], ["achievement", 23], ["achievement", 24], ["achievement", 25], ["achievement", 26]]],
        "blank",
        "blank",
        ["display-text", function() { return " Set 2<br> <h1>Reset^3</h1>"}],
        "blank",
        ["row", [["achievement", 31], ["achievement", 32], ["achievement", 33], ["achievement", 34], ["achievement", 35], ["achievement", 36]]],
    ],
})
