addLayer("rb", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() {return hasUpgrade('r', 34)},                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#7AFF7D",                       // The color for this layer, which affects many elements.
    resource: "rebirth points",            // The name of this layer's main prestige resource.
    row: 3,   
    style() {return  {'background-color': '#164519'}},                               // The row this layer is on (0 is the first row).
    symbol:"RB",
    position: 2,
    branches: ['rw', 't'],

    baseResource: "reset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['r'].points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e12),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.25,                    // "normal" prestige gain is (currency^exponent).

    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('rb', 22)) mult = mult.times(3)
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    canBuyMax() { return hasMilestone("rb", 6) },

    layerShown() {return hasUpgrade('r', 34)},           // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    milestones: {
        0: {
            requirementDescription: "1st rebirth",
            effectDescription: "keep reset upgrades when doing resets and multiplies reset point gain by rebirth points",
            done() { return player['rb'].points.gte(1) },
            unlocked() { return true},
        },
        1: {
            requirementDescription: "2nd rebirth",
            effectDescription: "keep prestige upgrades when doing resets",
            done() { return player['rb'].points.gte(2) },
            unlocked() { return hasMilestone('rb', 0)},
        },
        2: {
            requirementDescription: "3rd rebirth",
            effectDescription: "unlock another row of ascenion upgrades.",
            done() { return player['rb'].points.gte(3) },
            unlocked() { return hasMilestone('rb', 1)},
        },
        3: {
            requirementDescription: "4th rebirth",
            effectDescription: "keep reset milestones when doing resets",
            done() { return player['rb'].points.gte(4) },
            unlocked() { return hasMilestone('rb', 2)},
        },
        4: {
            requirementDescription: "5th rebirth",
            effectDescription: "boost ascension points passive gain to 50%",
            done() { return player['rb'].points.gte(5) },
            unlocked() { return hasMilestone('rb', 3)},
        },
        5: {
            requirementDescription: "8th rebirth",
            effectDescription: "unlock the 5th ascesion upgrade in row 2",
            done() { return player['rb'].points.gte(8) },
            unlocked() { return hasMilestone('rb', 4)},
        },
        6: {
            requirementDescription: "12th rebirth",
            effectDescription: "will allow for max buying rebirth points",
            done() { return player['rb'].points.gte(12) },
            unlocked() { return hasMilestone('rb', 5)},
        },
        7: {
            requirementDescription: "16th rebirth",
            effectDescription: "unlock rebirth upgrades",
            done() { return player['rb'].points.gte(16) },
            unlocked() { return hasMilestone('rb', 6)},
        },
    },

    upgrades: {
        11: {
            title:"basic strength",
            description: "boost point gain x15",
            cost: new Decimal(16),
            unlocked() { return hasMilestone('rb', 7)},
        },
        21: {
            title:"prestige strength",
            description: "will generate 5% of prestige points on reset per second.",
            unlocked() { return hasUpgrade('rb', 11)},
            cost: new Decimal(20),
        },
        22: {
            title:"ascenion strength",
            description: "apply 'ascenion power' again but /50",
            unlocked() { return hasUpgrade('rb', 11)},
            cost: new Decimal(20),
        },
        31: {
            title:"prestige-prestige?",
            description: "unlocks a new prestige upgrade",
            unlocked() { return hasUpgrade('rb', 31)}, // change to 21 when starting on rewind
            cost: new Decimal(50),
        },
        32: {
            title:"rebirth strength",
            description: "boost rebirth gain by x3",
            unlocked() { return hasUpgrade('rb', 21) & hasUpgrade('rb', 22)},
            cost: new Decimal(22),
        },
        33: {
            title:"ascend-ascend?",
            description: "unlocks a new ascend upgrade",
            unlocked() { return hasUpgrade('rb', 22)},
            cost: new Decimal(30),
        },
    },
    infoboxes: {
        lore: {
            title: "Rebirth",
            body() { return "welcome to the reset-reset-reset's (reset^3)" },
        },
    },
}),
/*
requires() { return new Decimal(1).times((player.b.unlockOrder&&!player.b.unlocked)?5000:1) }, expression that changes reset requirement based on order of layers unlocked
increaseUnlockOrder: ["b"], used to change the unlock order needed for the requirement change expression.
*/
addLayer("rw", {
    startData() { return {                  // startData is a function that returns default data for a layer.                    // You can add more variables here to add them to your layer.
        points: new Decimal(0),  
        unlocked() {return hasUpgrade('p', 14)},           // "points" is the internal name for the main resource of the layer.
    }},

    color: "#FFD068",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    symbol: "RW",
    row: 3,                                 // The row this layer is on (0 is the first row).
    position: 3,
    style() {return  {'background-color': '#555028'}},  

    baseResource: "prestige points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['p'].points },  // A function to return the current amount of baseResource.

    requires() { return new Decimal(1000000)},              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.2,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {return hasUpgrade('p', 14)},    // Returns a bool for if this layer's node should be visible in the tree.


    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
    infoboxes: {
        lore: {
            title: "Rewind",
            body() { return "time to go back in time! but not really, your just generating time." },
        },
    },
}),

addLayer("t", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked() {return hasUpgrade('a', 16)},            // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#AAC2FF",                       // The color for this layer, which affects many elements.
    resource: "transcendence points",            // The name of this layer's main prestige resource.
    symbol: "T",
    row: 3,                                 // The row this layer is on (0 is the first row).
    position: 1,
    style() {return  {'background-color': '#2B3156'}},  

    baseResource: "ascenion points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player['a'].points },  // A function to return the current amount of baseResource.

    requires() { return new Decimal(1e15)},           // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {return hasUpgrade('a', 16) },          // Returns a bool for if this layer's node should be visible in the tree.

    milestones: {
        0: {
            requirementDescription: "1 transcendence",
            effectDescription: "unlocks first transcendence challenge and keep ascenion upgrades",
            done() { return player['t'].points.gte(1) },
            unlocked() { return true},
        },
        1: {
            requirementDescription: "100 transcendence",
            effectDescription: "unlocks second transcendence challenge",
            done() { return player['t'].points.gte(100) },
            unlocked() { return false},
        },
        2: {
            requirementDescription: "10000 transcendence",
            effectDescription: "unlocks third transcendence challenge",
            done() { return player['t'].points.gte(10000) },
            unlocked() { return false},
        },
    },

    challenges: {
        11: {
            name: "resets doesn't need any multipliers",
            challengeDescription: "your reset multiplier is set to 0.01",
            rewardDescription: "idk",
            goalDescription: "30000 reset points",
            canComplete() {return player['r'].points.gte(30000)},
            unlocked() { return hasMilestone('t', 0)},
        }
    },
    infoboxes: {
        lore: {
            title: "Transcendence",
            body() { return "hope you like challenges, because that's what most of this layer is." },
        },
    },
})