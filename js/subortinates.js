const SubordinateData = [{
        name: "Dog",
        desc: "Multiplies cell output.",
        base: new Decimal("0.0293"),
    },
    {
        name: "Goat",
        desc: "Multiplies exocell emission.",
        base: new Decimal("0.0255"),
    },
    {
        name: "Ferret",
        desc: "Divides the Karyofox level requirement.",
        base: new Decimal("0.0333"),
    }
]

const subordinateNames = SubordinateData.map((subordinate) => subordinate.name);

function updateSubordinateEffects() {
    for (let i = 0; i < subordinateNames.length; i++) {
        let sum = new Decimal("0");
        for (let j = 0; j < player.sReplicationStorage.length; j++) {
            if (subordinateNames[i] === player.sReplicationStorage[j].name) {
                sum = Decimal.add(sum,player.sReplicationStorage[j].effect);
            }
        }
        if (Decimal.equals(sum,"0")) {
            sum = new Decimal("1");
        }
        player.subordinateEffects[i] = {
            name: subordinateNames[i],
            effect: sum,
        };
    }
}

function incubate(index) {
    if (Decimal.gte(player.sReplicationStorage.length, player.sReplicationMax) || player.incubating) return
    player.currentlyIncubating = index
    player.incubating = true
}

function grantSubordinate(index) {
    let sb = {}
    sb.name = SubordinateData[index].name
    sb.effect = new Decimal("1")
    sb.base = SubordinateData[index].base
    sb.lastFed = new Decimal("0")
    player.sReplicationStorage.push(sb)
}

function removeSubordinate(index){
    player.sReplicationStorage.splice(index, 1)
    // document.getElementById("subordinate-list").innerHTML = ""
}

function feedSubordinate(index){
    let x
    x = Decimal.add(Decimal.pow(Decimal.divide(player.cells, "1e48"), player.sReplicationStorage[index].base),"1")
    if(Decimal.lte(x,player.sReplicationStorage[index].effect)){
        return
    } else {
        player.sReplicationStorage[index].effect = x
        player.sReplicationStorage[index].lastFed = player.cells
        amelioratoryApoptosis(true)
    }
    
}