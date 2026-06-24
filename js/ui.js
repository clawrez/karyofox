let _ = document
let activeGenome
let activeClone

const karyofoxNavButton = _.getElementById("karyofox-nav-button")
const karyofoxMainButton = _.getElementById("karyofox-main-nav")
const aApoptosisNavButton = _.getElementById("a-apoptosis-nav")

const genomeNavButton = _.getElementById("genome-nav-button")

const sReplicationNavButton = _.getElementById("s-replication-nav")

const exocellsNavButton = _.getElementById("exocells-nav-button")
const exocellsMainButton = _.getElementById("exocells-main-nav")
const hypercellsNavButton = _.getElementById("hypercells-nav")
const excisionNavButton = _.getElementById("excision-nav-button")

const automationNavButton = _.getElementById("automation-nav-button")



const subCloneInfoElement = _.getElementById("subordinate-info")

const karyofoxNameElement = _.getElementById("karyofox-name")
const karyofoxLevelElement = _.getElementById("karyofox-level")
const karyofoxMultiplierElement = _.getElementById("karyofox-multiplier")
const karyofoxUntilElement = _.getElementById("karyofox-until")
const karyofoxStatsPanel = _.getElementById("karyofox-stats")

const maxGenerValueDisplay = _.getElementById("max-gener-value")
const autoMaxGenerButton = _.getElementById("auto-max-gener-button")
const maxGenSelectorDiv = _.getElementById("max-generation-selector")
const karyofoxStatsSection = _.getElementById("karyofox-stats-section")

const aApoptosisTimesElement = _.getElementById("amelioratory-apoptosis-times")
const aApoptosisButton = _.getElementById("amelioratory-apoptosis-button")
const aApoptosisRequirement = _.getElementById("amelioratory-apoptosis-requirement")
const aApoptosisBoostText = _.getElementById("aa-boost")

const subordinateProgressElement = _.getElementById("sreplication-progress")
const subordinateSpace = _.getElementById("sreplication-space")
const subordinateList = _.getElementById("subordinate-list")
const incubationTimeStat = _.getElementById("incubation-time-stat")

const exocellsCurrencyElement = _.getElementById("exocells-currency")
const hypercellsCurrencyElement = _.getElementById("hypercells-currency")
const genessenceCurrencyElement = _.getElementById("genessence-currency")


const cellsValue = _.getElementById("cells-value")
const exocellsValue = _.getElementById("exocells-value")
const hypercellsValue = _.getElementById("hypercells-value")
const genessenceValue = _.getElementById("genessence-value")

const exocellIncomeElement = _.getElementById("exocell-income")
const hypercellIncomeElement = _.getElementById("hypercell-income")

// Karyofox
const karyofoxMaxGeneration = _.getElementById("karyofox-max-generations")
const karyofoxMitosisInterval = _.getElementById("karyofox-mitosis-interval")
const karyofoxDeathChance = _.getElementById("karyofox-death-chance")
const karyofoxStartingCells = _.getElementById("karyofox-starting-cells")

const karyofoxGeneration = _.getElementById("karyofox-generation")
const karyofoxCellHolding = _.getElementById("karyofox-cell-holding")
const karyofoxProgress = _.getElementById("karyofox-progress")

// Options
const compressKaryofoxStatsOptionButton = _.getElementById("compressed-karyofox-stats-options")
const showMaxGenSelectorOptionButton = _.getElementById("show-max-gen-options")

// Karyofox Upgrades
const karyofoxUpHTML = [];

const karyofoxUp4Base = _.getElementById("karyofox-up-base-4")

// Get all upgrade elements
const karyofoxUpgradeElements = document.querySelectorAll('.button-row#karyofox-upgrades .upgrade');

// Iterate over each upgrade element and push it to the array
karyofoxUpgradeElements.forEach((upgradeElement) => {
    const upgrade = {
        element: upgradeElement, // Reference to the HTML element
        level: upgradeElement.querySelector('.upgrade-level'),
        desc: upgradeElement.querySelector('.upgrade-desc'),
        cost: upgradeElement.querySelector('.upgrade-cost'),
    };
    karyofoxUpHTML.push(upgrade);
});

// Genomes
const genomeNameText = _.getElementById("genome-name")
const genomeDescText = _.getElementById("genome-desc")
const genomeCostText = _.getElementById("genome-cost")

const genomeNodeElements = []

document.querySelectorAll(".genome-node").forEach((element) => {
    genomeNodeElements.push(element)
})

const genomeRowElements = []

document.querySelectorAll(".genome-row").forEach((element) => {
    genomeRowElements.push(element)
})

// Exocell Upgrades
const exocellUpHTML = [];

// Get all upgrade elements
const exocellUpgradeElements = document.querySelectorAll('.button-row#exocell-upgrades .upgrade');

// Iterate over each upgrade element and push it to the array
exocellUpgradeElements.forEach((upgradeElement) => {
    const upgrade = {
        element: upgradeElement, // Reference to the HTML element
        level: upgradeElement.querySelector('.upgrade-level'),
        desc: upgradeElement.querySelector('.upgrade-desc'),
        cost: upgradeElement.querySelector('.upgrade-cost'),
    };
    exocellUpHTML.push(upgrade);
});

const exocellUpgradeEffect3 = _.getElementById("exocell-up-effect-3")

const hypercellUpHTML = [];

// Get all upgrade elements
const hypercellUpgradeElements = document.querySelectorAll('.button-row#hypercell-upgrades .upgrade');

// Iterate over each upgrade element and push it to the array
hypercellUpgradeElements.forEach((upgradeElement) => {
    const upgrade = {
        element: upgradeElement, // Reference to the HTML element
        level: upgradeElement.querySelector('.upgrade-level'),
        desc: upgradeElement.querySelector('.upgrade-desc'),
        cost: upgradeElement.querySelector('.upgrade-cost'),
    };
    hypercellUpHTML.push(upgrade);
});

// A. Apoptosis
const aApoptosisMilestoneElements = []

document.querySelectorAll(".milestone.a-apoptosis").forEach((element) => {
    aApoptosisMilestoneElements.push(element)
})

const automationTogglesHTML = [];

// Get all automation toggle elements
const automationTogglesElements = document.querySelectorAll('.button-row#automation-toggles .automation-toggle');

// Iterate over each upgrade element and push it to the array
automationTogglesElements.forEach((toggleElement) => {
    const toggle = {
        element: toggleElement, // Reference to the HTML element
        status: toggleElement.querySelector('.toggle-status'),
    };
    automationTogglesHTML.push(toggle);
});

setInterval(() => {
    // Unlocks
    if (player.tutorialCompleted == true) {
        karyofoxUpHTML[0].element.classList.remove("invisible")
        karyofoxUpHTML[2].element.classList.remove("invisible")

    } else {
        karyofoxUpHTML[0].element.classList.add("invisible")
        karyofoxUpHTML[2].element.classList.add("invisible")
    }
    if (player.unlocks[0] == true) {
        genomeNavButton.classList.remove("not-unlocked")
        genomeNavButton.textContent = "Genomes"
    } else {
        genomeNavButton.classList.add("not-unlocked")
        genomeNavButton.textContent = "[Level 5]"
    }
    if (player.unlocks[1] == true) {
        aApoptosisNavButton.classList.remove("not-unlocked")
        aApoptosisNavButton.textContent = "Apoptosis"
    } else {
        aApoptosisNavButton.classList.add("not-unlocked")
        aApoptosisNavButton.textContent = "[Level 20]"
    }
    if (player.unlocks[2] == true) {
        excisionNavButton.classList.remove("not-unlocked")
        excisionNavButton.textContent = "Excision"
        genessenceCurrencyElement.classList.remove("hidden")
    } else {
        excisionNavButton.classList.add("not-unlocked")
        excisionNavButton.textContent = "[Level 100]"
        genessenceCurrencyElement.classList.add("hidden")
    }
    // Extras
    karyofoxNameElement.textContent = player.karyofoxName
    karyofoxLevelElement.textContent = "Level " + formatWhole(player.karyofoxLevel)
    if (Decimal.gte(player.karyofoxLevel, "100")) {
        karyofoxStatsPanel.classList.add("over-100")
    } else {
        karyofoxStatsPanel.classList.remove("over-100")
    }
    karyofoxMultiplierElement.textContent = format(player.karyofoxMultis[0], 2, true) + "x cell output"
    if (Decimal.gte(player.karyofoxLevel, player.maxKaryofoxLevel)) {
            karyofoxUntilElement.textContent = `INFINITE cells until the next level`

    } else {
        karyofoxUntilElement.textContent = formatWhole(Decimal.minus(player.karyofoxLevelReq, player.totalCells)) + ` cell${pluraliser(Decimal.minus(player.karyofoxLevelReq, player.totalCells))} until the next level`
    }
    // Currencies
    cellsValue.textContent = formatWhole(player.cells, true)
    exocellsValue.textContent = formatWhole(player.exocells, true)
    hypercellsValue.textContent = formatWhole(player.hypercells, true)
    if (Decimal.gte(player.hypercells, player.hypercellCap)) {
        hypercellsCurrencyElement.classList.add("capped")
    } else {
        hypercellsCurrencyElement.classList.remove("capped")
    }
    // Karyofox
    if (player.useCompressedKaryofoxStats) {
        if (player.maxAutoCellGeneration == true) {
            karyofoxMaxGeneration.textContent = formatWhole(player.maxCellGeneration, true) + ` max generation${pluraliser(player.maxCellGeneration)}`
        } else {
            karyofoxMaxGeneration.textContent = formatWhole(player.maxCellGenerationConfig, true) + ` max generation${pluraliser(player.maxCellGenerationConfig)}`
        }
        karyofoxMitosisInterval.textContent = format(Decimal.divide(player.mitosisInterval, proliferationBoost), 2) + ` second${pluraliser(player.mitosisInterval)}`
        karyofoxDeathChance.textContent = formatWhole(Decimal.times(player.mitosisChance, "100"), true) + "% mitosis chance"
        karyofoxStartingCells.textContent = formatWhole(player.startingCells) + ` starting cell${pluraliser(player.startingCells)}`
    } else {
        if (player.maxAutoCellGeneration == true) {
            karyofoxMaxGeneration.textContent = "Cells can advance " + formatWhole(player.maxCellGeneration, true) + ` generation${pluraliser(player.maxCellGeneration)}.`
        } else {
            karyofoxMaxGeneration.textContent = "Cells can advance " + formatWhole(player.maxCellGenerationConfig, true) + ` generation${pluraliser(player.maxCellGenerationConfig)}.`
        }
        karyofoxMitosisInterval.textContent = "Cells attempt mitosis every " + format(Decimal.divide(player.mitosisInterval, proliferationBoost), 2) + ` second${pluraliser(player.mitosisInterval)}.`
        karyofoxDeathChance.textContent = "Cells have a " + formatWhole(Decimal.times(player.mitosisChance, "100"), true) + "% chance of undergoing mitosis."
        karyofoxStartingCells.textContent = "Starting with " + formatWhole(player.startingCells) + ` cell${pluraliser(player.startingCells)}.`
    }

    karyofoxGeneration.textContent = "Cell Generation #" + formatWhole(player.cellGeneration)
    karyofoxCellHolding.textContent = formatWhole(player.cellsInHolding, true) + ` cell${pluraliser(player.cellsInHolding)} in holding`
    karyofoxProgress.style.width = Decimal.times(Decimal.divide(player.mitosisProgress, player.mitosisInterval), "100") + "%"

    if (player.maxAutoCellGeneration) {
        maxGenerValueDisplay.textContent = formatWhole(player.maxCellGeneration, true)
        autoMaxGenerButton.classList.remove("disabled")
    } else {
        maxGenerValueDisplay.textContent = formatWhole(player.maxCellGenerationConfig, true)
        autoMaxGenerButton.classList.add("disabled")
    }
    // Karyofox Upgrades
    for (let i = 0; i < karyofoxUpHTML.length; i++) {
        if (i == 2) {
            karyofoxUpHTML[i].level.textContent = `Level ${formatWhole(player.karyofoxUpgrades[i].level)}${hasMax(Decimal.add(KaryofoxUpgradeData[i].maxLevel, player.mitosisChanceMaxL))}`
        } else {
            karyofoxUpHTML[i].level.textContent = `Level ${formatWhole(player.karyofoxUpgrades[i].level)}${hasMax(KaryofoxUpgradeData[i].maxLevel)}`
        }
        karyofoxUpHTML[i].cost.textContent = `${formatWhole(player.karyofoxUpgrades[i].cost)} Cells`
        if (Decimal.gt(player.karyofoxUpgrades[i].cost, player.cells)) {
            karyofoxUpHTML[i].element.classList.add("cant-afford")
        } else {
            karyofoxUpHTML[i].element.classList.remove("cant-afford")
        }
        if (KaryofoxUpgradeData[i].maxLevel != null) {
            if (i == 2) {
                if (Decimal.gte(player.karyofoxUpgrades[i].level, Decimal.add(KaryofoxUpgradeData[i].maxLevel, player.mitosisChanceMaxL))) {
                    karyofoxUpHTML[i].element.classList.add("maxed")
                } else {
                    karyofoxUpHTML[i].element.classList.remove("maxed")
                }
            } else {
                if (Decimal.gte(player.karyofoxUpgrades[i].level, KaryofoxUpgradeData[i].maxLevel)) {
                    karyofoxUpHTML[i].element.classList.add("maxed")
                } else {
                    karyofoxUpHTML[i].element.classList.remove("maxed")
                }
            }

        }

    }

    if (player.genomesBought[2] == true) {
        karyofoxUpHTML[4].element.classList.remove("hidden")
    } else {
        karyofoxUpHTML[4].element.classList.add("hidden")
    }
    if (player.genomesBought[3] == true) {
        sReplicationNavButton.classList.remove("hidden")
    } else {
        sReplicationNavButton.classList.add("hidden")
    }
    if (player.genomesBought[5]) {
        karyofoxUp4Base.textContent = "65"
    } else {
        karyofoxUp4Base.textContent = "50"
    }
    if (player.genomesBought[12] == true) {
        hypercellsNavButton.classList.remove("hidden")
        hypercellsCurrencyElement.classList.remove("hidden")
    }
    // Amelioratory Apoptosis
    aApoptosisTimesElement.textContent = "You have undergone Amelioratory Apoptosis " + formatWhole(player.aApoptosisTimes) + ` time${pluraliser(player.aApoptosisTimes)}.`
    aApoptosisBoostText.textContent = formatWhole(player.aApoptosisMulti)
    if (Decimal.lt(player.karyofoxLevel, player.aApoptosisReq)) {
        aApoptosisButton.classList.add("cant-prestige")
    } else {
        aApoptosisButton.classList.remove("cant-prestige")
    }
    aApoptosisRequirement.textContent = `Reach Level ${formatWhole(player.aApoptosisReq)}`
    for (let i = 0; i < aApoptosisMilestoneElements.length; i++) {
        if (player.aApoptosisMilestones[i]) {
            aApoptosisMilestoneElements[i].classList.add("unlocked")
        } else {
            aApoptosisMilestoneElements[i].classList.remove("unlocked")
        }
    }
    if (player.aApoptosisMilestones[0]) {
        genomeRowElements[2].classList.remove("hidden")
        genomeRowElements[3].classList.remove("hidden")
        genomeRowElements[4].classList.remove("hidden")
    } else {
        genomeRowElements[2].classList.add("hidden")
        genomeRowElements[3].classList.add("hidden")
        genomeRowElements[4].classList.add("hidden")
    }
    if (player.aApoptosisMilestones[1]) {
        automationNavButton.classList.remove("hidden")
    } else {
        automationNavButton.classList.add("hidden")
    }
    if (player.aApoptosisMilestones[2]) {
        genomeRowElements[5].classList.remove("hidden")
        genomeRowElements[6].classList.remove("hidden")
    } else {
        genomeRowElements[5].classList.add("hidden")
        genomeRowElements[6].classList.add("hidden")
    }
    if (player.aApoptosisMilestones[3]) {

    } else {

    }
    // Subordinate Replication
    subordinateProgressElement.style.width = Decimal.times(Decimal.divide(player.incubationProgress, player.incubationTime), "100") + "%"
    subordinateSpace.textContent = `You have ${player.sReplicationStorage.length} / ${player.sReplicationMax} subordinate${pluraliser(player.sReplicationStorage.length)}.`
    for (let i = 0; i < player.sReplicationStorage.length; i++) {
        if (document.getElementById("subordinate-" + i) != null) continue
        let element = document.createElement("div");
        element.id = "subordinate-" + i;
        element.classList.add("subordinate")
        element.innerHTML = `<div class="subordinate-name"  id="subord-name-${i}">
        ` + player.sReplicationStorage[i].name + `
        </div><img class="subordinate-image"  id="subord-image-${i}" src="img/placeholder.png">
        <div class="subordinate-power" id="subord-power-${i}">1.00
        </div>
        <div class="subordinate-last-fed" id="subord-last-fed-${i}">Last fed 0
        </div>
        <div class="subordinate-buttons">
            <button class="subordinate-button subordinate-feed" onclick="feedSubordinate(${i})">
                Feed
            </button>
            <button class="subordinate-button subordinate-remove" onclick="removeSubordinate(${i})">
                Remove
            </button>
        </div>`
        subordinateList.appendChild(element)
        // idx++
    };
    if (subordinateList.childElementCount > player.sReplicationStorage.length) {
        subordinateList.lastElementChild.remove()
    }
    for (let i = 0; i < player.sReplicationStorage.length; i++) {
        document.getElementById("subord-power-" + i).textContent = format(player.sReplicationStorage[i].effect)
        document.getElementById("subord-last-fed-" + i).textContent = "Last fed " + formatWhole(player.sReplicationStorage[i].lastFed, true)
    };
    for (let i = 0; i < player.sReplicationStorage.length; i++) {
        document.getElementById("subord-name-" + i).textContent = player.sReplicationStorage[i].name
    };

    incubationTimeStat.textContent = `A subordinate takes ${formatWhole(player.incubationTime, true)} seconds to incubate. Their effects stack additively.`

    // Genomes
    for (let i = 0; i < genomeNodeElements.length; i++) {
        if (Decimal.gte(player.cells, genomeData[i].cost)) {
            if (genomeData[i].dependencies != null) {
                for (let j = 0; j < genomeData[i].dependencies.length; j++) {
                    if (player.genomesBought[genomeData[i].dependencies[j]] != true) {
                        genomeNodeElements[i].classList.remove("can-afford")
                    } else {
                        genomeNodeElements[i].classList.add("can-afford")
                    }
                }
            } else {
                genomeNodeElements[i].classList.add("can-afford")
            }

        } else {
            genomeNodeElements[i].classList.remove("can-afford")
        }
    }
    for (let i = 0; i < genomeNodeElements.length; i++) {
        if (player.genomesBought[i] == true) {
            genomeNodeElements[i].classList.add("bought")
        } else {
            genomeNodeElements[i].classList.remove("bought")
        }
    }
    if (player.genomesBought[1] == true) {
        exocellsNavButton.classList.remove("hidden")
        exocellsCurrencyElement.classList.remove("hidden")
    }
    // Exocells
    exocellIncomeElement.textContent = "You are getting " + formatWhole(Decimal.times(player.startingCells, player.exocellMultiplier), true) + ` exocell${pluraliser(Decimal.times(player.startingCells, player.exocellMultiplier))} per second.`
    // Exocell Upgrades
    for (let i = 0; i < exocellUpHTML.length; i++) {
        exocellUpHTML[i].level.textContent = `Level ${formatWhole(player.exocellUpgrades[i].level)}${hasMax(ExocellUpgradeData[i].maxLevel)}`
        exocellUpHTML[i].cost.textContent = `${formatWhole(player.exocellUpgrades[i].cost)} Exocells`
        if (Decimal.gt(player.exocellUpgrades[i].cost, player.exocells)) {
            exocellUpHTML[i].element.classList.add("cant-afford")
        } else {
            exocellUpHTML[i].element.classList.remove("cant-afford")
        }
        if (ExocellUpgradeData[i].maxLevel != null) {
            if (Decimal.gte(player.exocellUpgrades[i].level, ExocellUpgradeData[i].maxLevel)) {
                exocellUpHTML[i].element.classList.add("maxed")
            } else {
                exocellUpHTML[i].element.classList.remove("maxed")
            }
        }
    }
    if (player.genomesBought[7]) {
        exocellUpHTML[3].element.classList.remove("hidden")
    } else {
        exocellUpHTML[3].element.classList.add("hidden")
    }

    exocellUpgradeEffect3.textContent = formatWhole(Decimal.add("5", player.hypercellUpgrades[3].level), true)

    // Hypercells
    hypercellIncomeElement.textContent = "You are getting " + formatWhole(Decimal.times(player.exocellUpgrades[0].level, player.hypercellMultiplier), true) + ` hypercell${pluraliser(Decimal.times(player.exocellUpgrades[0].level, player.hypercellMultiplier))} per second.`
    // Hypercell Upgrades
    for (let i = 0; i < hypercellUpHTML.length; i++) {
        hypercellUpHTML[i].level.textContent = `Level ${formatWhole(player.hypercellUpgrades[i].level)}${hasMax(HypercellUpgradeData[i].maxLevel)}`
        hypercellUpHTML[i].cost.textContent = `${formatWhole(player.hypercellUpgrades[i].cost)} Hypercells`
        if (Decimal.gt(player.hypercellUpgrades[i].cost, player.hypercells)) {
            hypercellUpHTML[i].element.classList.add("cant-afford")
        } else {
            hypercellUpHTML[i].element.classList.remove("cant-afford")
        }
        if (HypercellUpgradeData[i].maxLevel != null) {
            if (Decimal.gte(player.hypercellUpgrades[i].level, HypercellUpgradeData[i].maxLevel)) {
                hypercellUpHTML[i].element.classList.add("maxed")
            } else {
                hypercellUpHTML[i].element.classList.remove("maxed")
            }
        }
    }
    // Automation Toggles
    for (let i = 0; i < automationTogglesHTML.length; i++) {
        if (player.automation[i]) {
            automationTogglesHTML[i].element.classList.remove("disabled")
            automationTogglesHTML[i].status.textContent = "Enabled"
        } else {
            automationTogglesHTML[i].element.classList.add("disabled")
            automationTogglesHTML[i].status.textContent = "Disabled"
        }
    }
    // Options Toggles
    if (player.useCompressedKaryofoxStats) {
        compressKaryofoxStatsOptionButton.classList.remove("disabled")
        karyofoxStatsSection.style.width = "330px"
        karyofoxStatsSection.style.flexDirection = "row"
        karyofoxStatsSection.style.columnGap = "18px"
    } else {
        compressKaryofoxStatsOptionButton.classList.add("disabled")
        karyofoxStatsSection.style.width = "auto"
        karyofoxStatsSection.style.flexDirection = "column"
        karyofoxStatsSection.style.columnGap = "6px"
    }

    if (player.useCompressedKaryofoxStats && !player.showMaxGenSelector) {

        karyofoxStatsSection.style.justifyContent = "center"
    } else {

        karyofoxStatsSection.style.justifyContent = "left"
    }

    if (player.showMaxGenSelector && player.tutorialCompleted) {
        showMaxGenSelectorOptionButton.classList.remove("disabled")
        maxGenSelectorDiv.classList.remove("hidden")
        maxGenSelectorDiv.classList.remove("hidden")
        karyofoxStatsSection.style.textAlign = "left"
        karyofoxStatsSection.style.marginRight = "auto"
    } else {
        showMaxGenSelectorOptionButton.classList.add("disabled")
        maxGenSelectorDiv.classList.add("hidden")
        maxGenSelectorDiv.classList.add("hidden")
        karyofoxStatsSection.style.textAlign = "center"
        karyofoxStatsSection.style.marginRight = "0"
    }
}, 1000 / 30);




function pluraliser(number) {
    if (Decimal.equals(number, "1")) {
        return ""
    } else {
        return "s"
    }
}

function hasMax(value) {
    if (value != null) {
        return (" / " + value)
    } else {
        return ""
    }
}

function setActiveGenome(index) {
    activeGenome = index
    genomeNameText.textContent = genomeData[activeGenome].name
    genomeDescText.textContent = genomeData[activeGenome].desc
    genomeCostText.textContent = "Costs " + formatWhole(genomeData[activeGenome].cost) + " cells"
}

function setActiveClone(index) {
    activeClone = index
    subCloneInfoElement.textContent = SubordinateData[activeClone].desc
}