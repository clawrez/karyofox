const KaryofoxUpgradeData = [{
        baseCost: new Decimal("100"),
        increase: new Decimal("4"),
        maxLevel: new Decimal("20"),
    },
    {
        baseCost: new Decimal("10"),
        increase: new Decimal("2"),
        maxLevel: new Decimal("30"),
    },
    {
        baseCost: new Decimal("10"),
        increase: new Decimal("5"),
        maxLevel: new Decimal("20"),
    },
    {
        baseCost: new Decimal("20"),
        increase: new Decimal("3"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("10000"),
        increase: new Decimal("12"),
        maxLevel: new Decimal("100"),
    },
]

function mitosis() {
    player.mitosisProgress = new Decimal("0")

    let maxGen

    if (player.maxAutoCellGeneration) {
        maxGen = player.maxCellGeneration
    } else {
        maxGen = player.maxCellGenerationConfig
    }

    if (Decimal.gte(player.cellGeneration, maxGen)) {
        grantCells()
    } else {
        if (Decimal.lte(player.cellsInHolding, "25")) {
            let tempCells = new Decimal("0")
            for (let i = 0; i < player.cellsInHolding; i++) {
                let rn = Math.random()
                if (rn <= player.mitosisChance) {
                    tempCells = Decimal.add(tempCells, "1")
                }
            }
            player.cellsInHolding = Decimal.add(player.cellsInHolding, tempCells)
        } else {
            let rd
            if (Decimal.gte(player.mitosisChance, "1")) {
                rd = new Decimal("1")
            } else {
                // rd = (1 - (1 / 7)) + (Math.random() / 7)
                rd = Decimal.add(Decimal.minus("1", Decimal.divide("1", "7")), (Decimal.divide(Math.random(), "7")))
            }
            let mult = Decimal.times(Decimal.add(player.mitosisChance, "1"), rd)
            player.cellsInHolding = Decimal.times(player.cellsInHolding, mult)
        }
        player.cellGeneration = Decimal.add(player.cellGeneration, "1")
    }


}

function grantCells() {
    player.cells = Decimal.add(player.cells, Decimal.times(player.cellsInHolding, player.karyofoxMultiplier))
    player.totalCells = Decimal.add(player.totalCells, Decimal.times(player.cellsInHolding, player.karyofoxMultiplier))
    player.cellsInHolding = player.startingCells
    player.cellGeneration = new Decimal("0")
    increaseKaryofoxLevel()


}

function buyKaryofoxUpgrade(index) {
    if (Decimal.gt(player.karyofoxUpgrades[index].cost, player.cells)) {
        return
    }
    if (KaryofoxUpgradeData[index].maxLevel != null) {
        if (index == 2) {
            if (Decimal.gte(player.karyofoxUpgrades[index].level, Decimal.add(KaryofoxUpgradeData[index].maxLevel, player.mitosisChanceMaxL))) {
                return
            }
        } else {
            if (Decimal.gte(player.karyofoxUpgrades[index].level, KaryofoxUpgradeData[index].maxLevel)) {
                return
            }
        }
    }
    player.cells = Decimal.max(0, Decimal.minus(player.cells, player.karyofoxUpgrades[index].cost)) 
    player.karyofoxUpgrades[index].cost = Decimal.times(player.karyofoxUpgrades[index].cost, KaryofoxUpgradeData[index].increase)
    player.karyofoxUpgrades[index].level = Decimal.add(player.karyofoxUpgrades[index].level, "1")
}

function buyMaxKaryofoxUpgrade(index) {
    if (Decimal.gt(player.karyofoxUpgrades[index].cost, player.cells) || Decimal.lte(player.cells, "0")) {
        return;
    }

    let increase = Decimal.times(KaryofoxUpgradeData[index].increase, player.karyofoxCostScaling)

    let numUpgradesAffordable = Decimal.floor(Decimal.ln(
        Decimal.div(player.cells, player.karyofoxUpgrades[index].cost).times(Decimal.minus(increase, Decimal.one))
        .plus(Decimal.one)).div(Decimal.ln(increase)));

    if (KaryofoxUpgradeData[index].maxLevel != null) {
        let levelsUntilMax = Decimal.minus(KaryofoxUpgradeData[index].maxLevel, player.karyofoxUpgrades[index].level)
        if (Decimal.gt(numUpgradesAffordable, levelsUntilMax)) {
            numUpgradesAffordable = levelsUntilMax
        }
    }

    const totalCost = Decimal.div(Decimal.mul(player.karyofoxUpgrades[index].cost, Decimal.minus(Decimal.pow(increase, numUpgradesAffordable), Decimal.one)),
        Decimal.minus(increase, Decimal.one));

    player.cells = Decimal.max(0, Decimal.minus(player.cells, totalCost))
    player.karyofoxUpgrades[index].cost = Decimal.times(player.karyofoxUpgrades[index].cost, Decimal.pow(Decimal.times(increase), numUpgradesAffordable));
    player.karyofoxUpgrades[index].level = Decimal.add(player.karyofoxUpgrades[index].level, numUpgradesAffordable);
}

function increaseKaryofoxLevel() {
    if (Decimal.gt(player.karyofoxLevelReq, player.totalCells) || Decimal.lte(player.totalCells, "0" || Decimal.gte(player.karyofoxLevelReq, player.maxKaryofoxLevel))) {
        return;
    }

    let numLevelsAffordable = Decimal.floor(Decimal.ln(Decimal.div(player.totalCells, player.karyofoxLevelReq).times(Decimal.minus("10", Decimal.one)).plus(Decimal.one)).div(Decimal.ln("10")));

    let levelsUntilMax = Decimal.minus(player.maxKaryofoxLevel, player.karyofoxLevel)
    if (Decimal.gt(numLevelsAffordable, levelsUntilMax)) {
        numLevelsAffordable = levelsUntilMax
    }

    const totalCost = Decimal.div(Decimal.mul(player.karyofoxLevelReq, Decimal.minus(Decimal.pow("10", numLevelsAffordable), Decimal.one)), Decimal.minus("10", Decimal.one));

    player.totalCells = Decimal.max(0, Decimal.minus(player.totalCells, totalCost));
    player.karyofoxLevelReq = Decimal.times(player.karyofoxLevelReq, Decimal.pow("10", numLevelsAffordable));
    player.karyofoxLevel = Decimal.add(player.karyofoxLevel, numLevelsAffordable);
}

function configureMaxGeneration(x) {
    if (player.maxAutoCellGeneration) {
        player.maxAutoCellGeneration = false
        player.maxCellGenerationConfig = player.maxCellGeneration
    }
    if (x == 0) {
        if (player.maxCellGenerationConfig <= 0) {
            player.maxCellGenerationConfig = 0
        } else {
            player.maxCellGenerationConfig--
        }
    }
    if (x == 1) {
        if (Decimal.gte(player.maxCellGenerationConfig, player.maxCellGeneration)) {
            player.maxCellGenerationConfig = player.maxCellGeneration
        } else {
            player.maxCellGenerationConfig++
        }
    }
}


const AApoptosisMilestoneReqs = [
    new Decimal("1"),
    new Decimal("5"),
    new Decimal("10"),
]

function amelioratoryApoptosis(feed = false) {
    player.aResetting = true
    if (feed == false) {
        if (Decimal.lt(player.karyofoxLevel, player.aApoptosisReq)) return
        player.aApoptosisTimes = Decimal.add(player.aApoptosisTimes, "1")
    }
    player.karyofoxUpgrades = [{
            level: new Decimal("0"),
            cost: new Decimal("0"),
        },
        {
            level: new Decimal("0"),
            cost: new Decimal("0"),
        },
        {
            level: new Decimal("0"),
            cost: new Decimal("0"),
        },
        {
            level: new Decimal("0"),
            cost: new Decimal("0"),
        },
        {
            level: new Decimal("0"),
            cost: new Decimal("0"),
        },
    ]
    player.cellsInHolding = new Decimal("1")
    player.totalCells = new Decimal("0")
    player.mitosisProgress = new Decimal("0")
    player.generation = new Decimal("0")
    player.karyofoxLevel = new Decimal("1")
    player.karyofoxLevelReq = new Decimal("10").div(player.subordinateEffects[2].effect)
    player.cells = new Decimal("0")
    player.aResetting = false

}