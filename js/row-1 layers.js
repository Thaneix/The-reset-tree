addLayer("a", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() { return (hasUpgrade('r', 23))},                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FF6872",                       // The color for this layer, which affects many elements.
    resource: "ascenion points",            // The name of this layer's main prestige resource.
    row: 1,
    symbol: "A",      
    style() {return  {'background-color': '#25070A'}},


    baseResource: "reset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['r'].points },  // A function to return the current amount of baseResource.

    requires: new Decimal(500),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.43,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('a', 15)) mult = mult.times(3)
        if (hasUpgrade('r', 32)) mult = mult.times(upgradeEffect('r', 13).add(39)/40)
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('r', 23)},          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        11: {
            title:"ascension power",
            description: "boost reset point gain based on ascension points. will also ",
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
            description: "unlock reset buyable 1", 
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
            body() { return "time to reset resets, or ascend i guess. at least ascenion is better than super-reset."  },
        },
    },
}),

addLayer("p", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() { return (hasUpgrade('a', 15))},                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FBFF9F",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 1,
    symbol: "P",      
    style() {return  {'background-color': '#474714'}},


    baseResource: "reset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['r'].points },  // A function to return the current amount of baseResource.

    requires: new Decimal(500000),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.3,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { return hasUpgrade('a', 15)},          // Returns a bool for if this layer's node should be visible in the tree.

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
            title:"stop wasting my time",
            description: "will automatically buy reset buyable 1 once reset milestone 5 is achieved.",
            unlocked() { return hasUpgrade('p', 12)},
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
            body() { return "prestige time"  },
        },
    },
})

