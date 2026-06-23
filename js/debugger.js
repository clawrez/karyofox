function allPets(id){
    player.sReplicationStorage = []
    for(let i = 0; i < player.sReplicationMax; i++){
        grantSubordinate(id)
        player.sReplicationStorage[i].effect = new Decimal("8")
    }
    
}

function apoptosisFrom(lvl){
    amelioratoryApoptosis(true)
    player.karyofoxLevel = new Decimal(lvl)
}