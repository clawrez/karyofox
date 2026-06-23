const ExocellUpgradeData = [
    {
        baseCost: new Decimal("100"),
        increase: new Decimal("9"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("150"),
        increase: new Decimal("7"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("500"),
        increase: new Decimal("13"),
        maxLevel: new Decimal("10"),
    },
    {
        baseCost: new Decimal("1000"),
        increase: new Decimal("5"),
        maxLevel: new Decimal("100"),
    },
]

const HypercellUpgradeData = [
    {
        baseCost: new Decimal("100"),
        increase: new Decimal("2"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("50"),
        increase: new Decimal("8"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("150"),
        increase: new Decimal("6"),
        maxLevel: null,
    },
    {
        baseCost: new Decimal("300"),
        increase: new Decimal("8"),
        maxLevel: new Decimal("15"),
    },
]

function buyExocellUpgrade(index){
    if (Decimal.gt(player.exocellUpgrades[index].cost,player.exocells)){return}
    player.exocells = Decimal.minus(player.exocells,player.exocellUpgrades[index].cost)
    player.exocellUpgrades[index].cost = Decimal.times(player.exocellUpgrades[index].cost,ExocellUpgradeData[index].increase)
    player.exocellUpgrades[index].level = Decimal.add(player.exocellUpgrades[index].level,"1")
}

function buyHypercellUpgrade(index){
    if (Decimal.gt(player.hypercellUpgrades[index].cost,player.hypercells)){return}
    player.hypercells = Decimal.minus(player.hypercells,player.hypercellUpgrades[index].cost)
    player.hypercellUpgrades[index].cost = Decimal.times(player.hypercellUpgrades[index].cost,HypercellUpgradeData[index].increase)
    player.hypercellUpgrades[index].level = Decimal.add(player.hypercellUpgrades[index].level,"1")
}