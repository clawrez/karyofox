function renameKaryofox() {
    let rename = prompt("Please enter a name for your Karyofox.", "")
    if(rename == null || rename == ""){
        return
    } else {
        player.karyofoxName = rename
    }
}

function toggleUseCompressedKaryofoxStats() {
    player.useCompressedKaryofoxStats = !player.useCompressedKaryofoxStats
}

function toggleShowMaxGenSelector() {
    player.showMaxGenSelector = !player.showMaxGenSelector
}