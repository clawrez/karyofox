function reset() {
    player = {
        lastTick: Date.now(),
        // Extras
        tutorialCompleted: false,
        unlocks: [],
        automation: [true],
        maxAutoCellGeneration: false,
        maxCellGenerationConfig: 0,
        karyofoxName: "Karyofox",
        karyofoxLevel: new Decimal("1"),
        maxKaryofoxLevel: new Decimal("100"),
        karyofoxMultis: [],
        karyofoxMultiplier: new Decimal("1"),
        karyofoxLevelReq: new Decimal("10"),
        karyofoxCostScaling: new Decimal("1"),
        // Settings
        useCompressedKaryofoxStats: false,
        showMaxGenSelector: true,
        // Cells
        cells: new Decimal("0"),
        totalCells: new Decimal("0"),
        cellsInHolding: new Decimal("1"),
        cellGeneration: new Decimal("0"),
        mitosisProgress: new Decimal("0"),
        mitosisChance: new Decimal("0"),
        mitosisChanceMaxL: new Decimal("0"),
        mitosisInterval: new Decimal("3"),
        maxCellGeneration: new Decimal("0"),
        startingCells: new Decimal("1"),
        // Karyofox Upgrades
        karyofoxUpgrades: [{
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
        ],
        // Amelioratory Apoptosis
        aApoptosisReq: new Decimal("20"),
        aApoptosisTimes: new Decimal("0"),
        aApoptosisMilestones: [],
        aApoptosisMulti: new Decimal("50"),
        // Subordinate Replication
        sReplicationStorage: [],
        sReplicationMax: new Decimal("3"),
        incubationProgress: new Decimal("0"),
        incubating: false,
        currentlyIncubating: null,
        incubationTime: new Decimal("30"),
        subordinateEffects: [
            {
                name: "Dog",
                effect: new Decimal("1"),
            }, {
                name: "Goat",
                effect: new Decimal("1"),
            }, {
                name: "Ferret",
                effect: new Decimal("1"),
            },
        ],
        effectiveFeedMultis: [new Decimal("1")],
        // Genomes
        genomesBought: [],
        noGenomesBought: new Decimal("0"),
        // Exocells
        exocells: new Decimal("0"),
        exocellCostScaling: new Decimal("1"),
        exocellMultiplier: new Decimal("1"),
        exocellMultis: [],
        exocellUpgrades: [{
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
        ],
        hypercells: new Decimal("0"),
        hypercellCap: new Decimal("100"),
        hypercellCostScaling: new Decimal("1"),
        hypercellMultiplier: new Decimal("1"),
        hypercellMultis: [],
        hypercellUpgrades: [{
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
        ],
    }
}

boostingProliferation = false
proliferationBoost = new Decimal("1")

var saveItemName = "karyofox save";

function save() {
    localStorage.setItem(saveItemName, btoa(JSON.stringify(player)));
}

function load() {
    reset()
    let loadgame = JSON.parse(atob(localStorage.getItem("karyofox save")))
    if (loadgame != null) {
        loadGame(loadgame)
    } else {
        // document.getElementById("loadingScreenCover").style.display = "none"
    }
}

//load()



function loadGame(loadgame) {
    let loadKeys = Object.keys(loadgame);
    for (i = 0; i < loadKeys.length; i++) {
        if (loadgame[loadKeys[i]] != "undefined") {
            let thisKey = loadKeys[i];
            if (typeof loadgame[thisKey] == "string" && thisKey != "karyofoxName") {
                player[thisKey] = new Decimal(loadgame[thisKey])
            } else if (Array.isArray(loadgame[thisKey]) && player[loadKeys[i]]) { // If the value is an array and the corresponding key exists in the game object
                for (j = 0; j < loadgame[thisKey].length; j++) { // Iterate through the array elements
                    //if (typeof loadgame[thisKey][j] == "string" && !isNaN(parseFloat(loadgame[thisKey][j]))) { // If the array element is a string that can be converted to a Decimal, do so
                    if (typeof loadgame[thisKey][j] == "string") {
                        player[loadKeys[i]][j] = new Decimal(loadgame[thisKey][j])
                    } else { // Otherwise, copy the value directly
                        player[loadKeys[i]][j] = loadgame[thisKey][j]
                    }
                }
            }
            //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
            else {
                player[loadKeys[i]] = loadgame[loadKeys[i]]
            }
        }
    }
}

function importSave() {
    let importedSave = prompt("Paste your save below.")
    if (importedSave && importedSave != null && importedSave != "") {
        localStorage.setItem(saveItemName, importedSave);
        location.reload()
    } else {
        alert("Not a valid save.")
    }
}

function hardReset() {
    if (confirm("Are you SURE you want to COMPLETELY RESET your save?")) {
        if (confirm("Like... /srs fr..???")) {
            reset()
            save()
            location.reload()
        }
    }
}

function exportSave() {
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(player))).then(function () {
        alert("Save exported to clipboard successfully.")
    }, function () {
        alert("Error exporting to clipboard.")
    });
}

setInterval(function () { // auto save
    save();
}, 15000);