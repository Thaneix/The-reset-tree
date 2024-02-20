addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() { return (this.isUnlocked)},                  // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FF6872",                       // The color for this layer, which affects many elements.
    resource: "ascenion points",            // The name of this layer's main prestige resource.
    row: 1,
    symbol: "A",      
    style() {return  {'background-color': '#25070A'}},
    branches: ['rb', 't'],


    baseResource: "reset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['r'].points },  // A function to return the current amount of baseResource.

    requires: new Decimal(500),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.43,                          // "normal" prestige gain is (currency^exponent).
    softcap: new Decimal(1e16),
    softcappower: 0.6,

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('a', 15)) mult = mult.times(3)
        if (hasUpgrade('r', 32)) mult = mult.times(upgradeEffect('r', 13).add(39)/40)
        if (hasUpgrade('a', 25)) mult = mult.times(3)
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    passiveGeneration() {
        let generation = new Decimal(0)
        if (hasUpgrade('p', 21)) generation = generation.add(0.01)
        if (hasMilestone('rb', 4)) generation = generation.add(0.49)
        return generation
    },

     doReset(reset) {
        let keep = [];
        if ( hasMilestone("t", 0) ) keep.push("upgrades")
        if ( layers[reset].row > this.row) layerDataReset("a", keep)
    }, 

    layerShown() { return hasUpgrade('r', 23) || this.layer.points > 0 || hasUpgrade(this.layer, 11)},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title:"ascension power",
            description: "boost reset point gain based on ascension points.",
            cost: new Decimal(1),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        12: {
            title:"ascension power?",
            description: "apply ascension power boost to points but /4", 
            cost: new Decimal(2),
            unlocked() { return (hasUpgrade('a', 11))},
        },
        13: {
            title:"another reset component",
            description: "unlock the first reset buyable 'reset button'", 
            cost: new Decimal(3),
            unlocked() { return (hasUpgrade('a', 12))},
        },
        14: {
            title:"can i go back to resets?",
            description: "unlock 3 more reset upgrades", 
            cost: new Decimal(7),
            unlocked() { return (hasUpgrade('a', 13))},
        },
        15: {
            title:"ok resets got boring again",
            description: "unlock a new layer and x3 ascendion point gain", 
            cost: new Decimal(75),
            unlocked() { return (hasUpgrade('a', 14))},
        },
        16: {
            title:"transcendence power",
            description: "unlock a new layer", 
            cost: new Decimal(1e15),
            unlocked() { return (hasUpgrade('rb', 33))},
        },
        21: {
            title:"i've just been waiting for resets to go up",
            description: "reset point gain is x20", 
            cost: new Decimal(500),
            unlocked() { return (hasMilestone('rb', 2))},
        },
        22: {
            title:"thats what 'i can help you with names' was for",
            description: "boost point gain based on prestige points, but ascenion point gain is reduced (/4)", 
            cost: new Decimal(5000),
            unlocked() { return (hasMilestone('rb', 2))},
            effect() {
                return player['p'].points.add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title:"rebirth points should do more",
            description: "point gain is x(4 x rebirth points)", 
            cost: new Decimal(30000),
            unlocked() { return (hasMilestone('rb', 2))},
        },
        24: {
            title:"rebirth points NEED to do more",
            description: "reset point gain is x(3/2 x rebirth points)", 
            cost: new Decimal(70000),
            unlocked() { return (hasMilestone('rb', 2))},
        },
        25: {
            title:"ok they do enough now",
            description: "boost ascension point gain by x3", 
            cost: new Decimal(250000),
            unlocked() { return (hasMilestone('rb', 5))},
        },
    },
    hotkeys: [
        {
            key: "a", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "A: reset your reset points for ascension points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.a.unlocked) doReset("a") },
        }
    ],
    infoboxes: {
        lore: {
            title: "ascension",
            body() { return "time to reset resets, or ascend i guess. at least ascenion is a better name than super-reset.<br> (a soft cap is applied after 1e16 ascension points.)"},
        },
    },
}),

addLayer("p", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() { return (hasUpgrade('a', 15))},                    // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FBFF9F",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 1,
    symbol: "P",      
    style() {return  {'background-color': '#474714'}},
    branches: ['rb', 'rw'],


    baseResource: "reset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['r'].points },  // A function to return the current amount of baseResource.

    requires: new Decimal(500000),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.3,                         // "normal" prestige gain is (currency^exponent).


    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('r', 14)) mult = mult.times(upgradeEffect('a', 11).add(100)/100)
        return mult
    },                           // Returns your multiplier to your gain of the prestige resource.
        
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    passiveGeneration() {
        let generation = new Decimal(0)
        if (hasUpgrade('rb', 21)) generation = generation.add(0.05)
        return generation
    },

    doReset(reset) {
        let keep = [];
        if ( hasMilestone("rb", 1) ) keep.push("upgrades")
        if ( layers[reset].row > this.row) layerDataReset("p", keep)
        (isUnlocked == true)
    }, 

    layerShown() { return hasUpgrade('a', 15) || this.layer.points > 0 || hasUpgrade(this.layer, 11)},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title:"no need to hold down r",
            description: "generate 5% of your reset on reset",
            cost: new Decimal(1),
        },
        12: {
            title:"ok so you clearly sill needed to hold r",
            description: "generate 25% of your reset on reset",
            unlocked() { return hasUpgrade('p', 11)},
            cost: new Decimal(2),
        },
        13: {
            title:"stop wasting my resets",
            description: "reset buttons will no longer spend reset points",
            unlocked() { return hasUpgrade('p', 12)},
            cost: new Decimal(8),
        },
        14: {
            title:"rewind power",
            description: "unlock a new layer", 
            cost: new Decimal(1e9),
            unlocked() { return (hasUpgrade('rb', 31))},
        },
        21: {
            title:"too slow to be useful",
            description: "gain 1% of ascendion points on reset",
            unlocked() { return hasUpgrade('p', 13)},
            cost: new Decimal(12),
        },
        22: {
            title:"stop wasting my time",
            description: "automatically buy reset buttons... if you have '1000000 resets'",
            unlocked() { return hasUpgrade('p', 13)},
            cost: new Decimal(12),
        },
        23: {
            title:"3 per row is too low",
            description: "add a 4th upgrade to each row of reset upgrades",
            unlocked() { return hasUpgrade('p', 21) & hasUpgrade('p', 22)},
            cost: new Decimal(8),
        },
    },
    hotkeys: [
        {
            key: "p", // What the hotkey button is. Use uppercase if it's combined with shift, or "ctrl+x" for holding down ctrl.
            description: "P: reset your reset points for prestige points", // The description of the hotkey that is displayed in the game's How To Play tab
            onPress() { if (player.p.unlocked) doReset("p") },
        }
    ],
    infoboxes: {
        lore: {
            title: "prestige",
            body() { return "weird that a prestige tree mod doesn't start with prestige."  },
        },
    },
})

