setInterval(() => {
    if(player.aApoptosisMilestones[1]&&player.automation[0]){
        for(let i = 0;i<player.karyofoxUpgrades.length;i++){
            buyMaxKaryofoxUpgrade(i)
        }
    }
}, 1000/15);

function toggleAutomator(index) {
    player.automation[index] = !player.automation[index]
}