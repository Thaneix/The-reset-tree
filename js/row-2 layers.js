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

    baseResource: "points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1e12),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 0.5,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() {return hasUpgrade('r', 34)},           // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})