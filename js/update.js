let devSpeed = 1
setInterval(() => {


        let dt = ((Date.now() - player.lastTick) / 1000) * devSpeed;
        player.lastTick = Date.now();
        // Proliferation Boost (the hold button)
        if (boostingProliferation) {
            if (player.genomesBought[0] == true) {
                proliferationBoost = new Decimal("2.5")
            } else {
                proliferationBoost = new Decimal("1.5")
            }
        } else {
            proliferationBoost = new Decimal("1")
        }
        // Unlocks
        if (Decimal.gte(player.karyofoxLevel,"3")){
            player.tutorialCompleted = true // Unlock the other two initial upgrades
        }
        if (Decimal.gte(player.karyofoxLevel, "5")) {
            player.unlocks[0] = true // Unlock genomes
        }
        if (Decimal.gte(player.karyofoxLevel, "20")) {
            player.unlocks[1] = true // Unlock a. apoptosis
        }
        if (Decimal.gte(player.karyofoxLevel, "100")) {
            player.unlocks[2] = true // Unlock excision
        }

        // Karyofox Level
        // if (Decimal.lt(player.karyofoxLevel, "100")) {
        //     if (Decimal.gte(player.totalCells, player.karyofoxLevelReq)) {
        //         player.totalCells = new Decimal("0")
        //         player.karyofoxLevel = Decimal.add(player.karyofoxLevel, "1")
        //         if (Decimal.gte(player.karyofoxLevel,"100")) {
        //             player.karyofoxLevelReq = Infinity
        //         } else {
        //             player.karyofoxLevelReq = Decimal.divide(Decimal.pow("10", player.karyofoxLevel), player.subordinateEffects[2].effect)
        //         }
        //     }
        // }
        player.karyofoxLevelReq = Decimal.divide(Decimal.pow("10", player.karyofoxLevel), player.subordinateEffects[2].effect)

        // if(Decimal.gte(player.karyofoxLevel,player.maxKaryofoxLevel)){
        //     player.karyofoxLevelReq = new Decimal(Infinity)
        // } else {
        //     player.karyofoxLevelReq = Decimal.divide(Decimal.pow("10", player.karyofoxLevel), player.subordinateEffects[2].effect)
        // }
        // if (Decimal.gte(player.totalCells, player.karyofoxLevelReq)) {
        //     increaseKaryofoxLevel()
        // }
        

        if (player.genomesBought[8]) {
            player.karyofoxMultis[0] = Decimal.pow("2.25", Decimal.minus(player.karyofoxLevel, "1"))
        } else {
            player.karyofoxMultis[0] = Decimal.pow("2", Decimal.minus(player.karyofoxLevel, "1"))
        }
        player.karyofoxMultiplier = player.karyofoxMultis.reduce((a, b) => Decimal.times(a, b))

        // Mitosis
        player.mitosisProgress = Decimal.add(player.mitosisProgress, Decimal.times(Decimal.times("1", proliferationBoost), dt))
        if (Decimal.gte(Decimal.add(player.mitosisProgress, Decimal.times(Decimal.times("1", proliferationBoost), dt)), player.mitosisInterval)) {
            mitosis()
        }

        // Karyofox Upgrades
        for (let i = 0; i < KaryofoxUpgradeData.length; i++) {
            player.karyofoxUpgrades[i].cost = Decimal.times(KaryofoxUpgradeData[i].baseCost, Decimal.pow(Decimal.times(KaryofoxUpgradeData[i].increase, player.karyofoxCostScaling), player.karyofoxUpgrades[i].level))
        }

        player.maxCellGeneration = player.karyofoxUpgrades[0].level
        player.mitosisInterval = Decimal.times("3", Decimal.pow("0.90", player.karyofoxUpgrades[1].level))
        player.mitosisChance = Decimal.add("0", Decimal.times("0.05", player.karyofoxUpgrades[2].level))
        player.startingCells = Decimal.add(Decimal.add("1", player.karyofoxUpgrades[3].level), Decimal.times(player.exocellUpgrades[3].level, Decimal.add("5",player.hypercellUpgrades[3].level)))
        if (player.genomesBought[5]) {
            player.karyofoxMultis[1] = Decimal.pow("1.6", player.karyofoxUpgrades[4].level)
        } else {
            player.karyofoxMultis[1] = Decimal.pow("1.5", player.karyofoxUpgrades[4].level)
        }

        // Amelioratory Apoptosis
        player.aApoptosisReq = Decimal.add("20", Decimal.times(player.aApoptosisTimes, "5"))
        player.karyofoxMultis[3] = Decimal.pow(player.aApoptosisMulti, player.aApoptosisTimes)

        if (Decimal.gte(player.aApoptosisTimes, "1")) {
            player.aApoptosisMilestones[0] = true
        } else {
            player.aApoptosisMilestones[0] = false
        }
        if (Decimal.gte(player.aApoptosisTimes, "5")) {
            player.aApoptosisMilestones[1] = true
        } else {
            player.aApoptosisMilestones[1] = false
        }
        if (Decimal.gte(player.aApoptosisTimes, "10")) {
            player.aApoptosisMilestones[2] = true
        } else {
            player.aApoptosisMilestones[2] = false
        }
        if (Decimal.gte(player.aApoptosisTimes, "20")) {
            player.aApoptosisMilestones[3] = true
        } else {
            player.aApoptosisMilestones[3] = false
        }
        // Subordinate Replication
        if (player.incubating) {
            player.incubationProgress = Decimal.add(player.incubationProgress, Decimal.times("1", dt))
            if (Decimal.gte(player.incubationProgress, player.incubationTime)) {
                player.incubating = false
                player.incubationProgress = new Decimal("0")
                grantSubordinate(player.currentlyIncubating)
            }
        }
        updateSubordinateEffects();
        player.karyofoxMultis[5] = player.subordinateEffects[0].effect
        player.exocellMultis[2] = player.subordinateEffects[1].effect
        player.effectiveFeedMultis

        // Genomes
        if (player.genomesBought[4]) {
            player.exocellMultis[1] = Decimal.log2(Decimal.add(player.karyofoxLevel, "1"))
        } else {
            player.exocellMultis[1] = new Decimal("1")
        }
        if (player.genomesBought[6]) {
            player.exocellCostScaling = Decimal.times("1", "0.95")
        } else {
            player.exocellCostScaling = new Decimal("1")
        }
        if (player.genomesBought[9]) {
            player.karyofoxMultis[4] = Decimal.add("1", Decimal.divide(Decimal.add(player.startingCells, "1"), "10"))
        } else {
            player.karyofoxMultis[4] = new Decimal("1")
        }
        if (player.genomesBought[15]) {
            player.karyofoxMultis[6] = player.noGenomesBought
        } else {
            player.karyofoxMultis[6] = new Decimal("1")
        }
        if(player.genomesBought[14]){
            player.aApoptosisMulti = new Decimal("55")
        } else {
            player.aApoptosisMulti = new Decimal("50")
        }

        // Exocells
        player.exocells = Decimal.add(player.exocells, Decimal.times(Decimal.times(player.startingCells, player.exocellMultiplier), dt))

        for (let i = 0; i < ExocellUpgradeData.length; i++) {
            player.exocellUpgrades[i].cost = Decimal.times(ExocellUpgradeData[i].baseCost, Decimal.pow(Decimal.times(ExocellUpgradeData[i].increase, player.exocellCostScaling), player.exocellUpgrades[i].level))
        }

        if (player.genomesBought[1] == true) {
            player.exocellMultis[0] = Decimal.pow("2", player.exocellUpgrades[0].level)
        } else {
            player.exocellMultis[0] = new Decimal("0")
        }
        player.exocellMultiplier = player.exocellMultis.reduce((a, b) => Decimal.times(a, b))

        player.karyofoxMultis[2] = Decimal.pow("2", player.exocellUpgrades[1].level)
        player.karyofoxCostScaling = Decimal.times("1", Decimal.pow("0.99", player.exocellUpgrades[2].level))
        // player.mitosisChanceMaxL = player.exocellUpgrades[3].level

        // Hypercells
        if (Decimal.gte(Decimal.add(player.hypercells, Decimal.times(Decimal.times(player.exocellUpgrades[0].level, player.hypercellMultiplier), dt)), player.hypercellCap)) {
            player.hypercells = player.hypercellCap
        } else {
            player.hypercells = Decimal.add(player.hypercells, Decimal.times(Decimal.times(player.exocellUpgrades[0].level, player.hypercellMultiplier), dt))
        }

        for (let i = 0; i < HypercellUpgradeData.length; i++) {
            player.hypercellUpgrades[i].cost = Decimal.times(HypercellUpgradeData[i].baseCost, Decimal.pow(Decimal.times(HypercellUpgradeData[i].increase, player.hypercellCostScaling), player.hypercellUpgrades[i].level))
        }

        if (player.genomesBought[12] == true) {
            player.hypercellMultis[0] = Decimal.pow("1.50", player.hypercellUpgrades[1].level)
        } else {
            player.hypercellMultis[0] = new Decimal("0")
        }
        player.hypercellMultiplier = player.hypercellMultis.reduce((a, b) => Decimal.times(a, b))

        player.hypercellCap = Decimal.times("100", Decimal.pow("2", player.hypercellUpgrades[0].level))
        player.exocellMultis[3] = Decimal.pow("2", player.hypercellUpgrades[2].level)
        player.incubationTime = Decimal.minus("30", Decimal.times("2", player.hypercellUpgrades[3].level))
}, 1000 / 30);