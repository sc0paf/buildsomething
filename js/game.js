function gameLoop(that) {
    let diff = (Date.now() - that.player.lastUpdate)/1000
    that.player.playtime += 1*diff
    that.player.lastUpdate = Date.now()    
    // run active
    if (that.active) {
        that.player[that.active] += that.player.tools[that.active] * diff
    }
}