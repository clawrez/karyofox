const genomeData = [{
        name: "Extracellular Enhancement",
        desc: "Speeding up proliferation boosts by 2.5x instead of 1.5x.",
        cost: new Decimal("5000"),
        dependencies: null,
    },
    {
        name: "Second Genesis",
        desc: "Based on your starting cells, start generating exocells. This also unlocks a new tab.",
        cost: new Decimal("15000"),
        dependencies: [0],
    },
    {
        name: "Anomolous Duplication",
        desc: "Unlock an upgrade that multiplies your cell output.",
        cost: new Decimal("50000"),
        dependencies: [0],
    },
    {
        name: "Subordinate Replication",
        desc: "Unlock subordinate replication (in the Karyofox tab).",
        cost: new Decimal("1e50"),
        dependencies: [7,8],
    },
    {
        name: "Exertion Mastery",
        desc: "Multiply exocell emission by log2(level + 1).",
        cost: new Decimal("1e12"),
        dependencies: [1],
    },
    
    {
        name: "Direct Increase",
        desc: "Increase the fifth Karyofox upgrade's boost to 65%.",
        cost: new Decimal("1.21e21"),
        dependencies: [2],
    },
    {
        name: "Impatience",
        desc: "Decrease the exocell upgrade cost scaling by 5%.",
        cost: new Decimal("9e22"),
        dependencies: [4],
    },
    {
        name: "Furthered",
        desc: "Unlock a new exocell upgrade.",
        cost: new Decimal("1e30"),
        dependencies: [4],
    },
    {
        name: "Vulpic Grace",
        desc: "Set the level multiplier to 2.25x per Karyofox level (instead of 2x).",
        cost: new Decimal("3.5e35"),
        dependencies: [5],
    },
    {
        name: "Revisitation",
        desc: "Multiply cell output by 1 + (starting cells / 10).",
        cost: new Decimal("1e27"),
        dependencies: [5],
    },
    {
        name: "Hyperstition",
        desc: "Unlock the cat subordinate (adds bonus starting cells).",
        cost: new Decimal("1e270000"),
        dependencies: [12, 13],
    },
    {
        name: "Mythical",
        desc: "Unlock the dragon subordinate (multiplies effective cells on feed).",
        cost: new Decimal("1e270000"),
        dependencies: [14, 15],
    },
    {
        name: "Third Genesis",
        desc: "Based on your first exocell upgrade, start generating hypercells (in the Exocells tab).",
        cost: new Decimal("4.7e74"),
        dependencies: [6],
    },
    {
        name: "Insatiable",
        desc: "Make effective cells on feed 100x greater.",
        cost: new Decimal("1e270000"),
        dependencies: [7],
    },
    {
        name: "Necromancer",
        desc: "Set the Amelioratory Apoptosis multiplier to 55x (instead of 50x).",
        cost: new Decimal("1e90"),
        dependencies: [8],
    },
    {
        name: "Metapurpose",
        desc: "Multiply cell output by genomes bought.",
        cost: new Decimal("1e68"),
        dependencies: [9],
    },
]

function buyGenome(index) {
    if (Decimal.lt(player.cells, genomeData[index].cost)||player.genomesBought[index] == true) {
        return
    }
    if (genomeData[index].dependencies != null) {
        for (let i = 0; i < genomeData[index].dependencies.length; i++) {
            if (player.genomesBought[genomeData[index].dependencies[i]] != true) {
                
                return
            }
        }
    }
    player.cells = Decimal.minus(player.cells,genomeData[index].cost)
    player.genomesBought[index] = true
    player.noGenomesBought = Decimal.add(player.noGenomesBought, "1")
}