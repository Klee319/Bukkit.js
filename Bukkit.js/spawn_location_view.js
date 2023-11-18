
var Bukkit = Java.type("org.bukkit.Bukkit");
var spawnPermission = "multiverse.core.spawn.self";


function getWorldManager() {
    var core = Bukkit.getServer().getPluginManager().getPlugin("Multiverse-Core");
    if (core != null) {
        return core.getMVWorldManager();
    }
    log.warning("Failed to hook Multiverse-Core");
    return null;
}

function getMVWorld(worldName) {
    if (worldManager == null) return;
    return worldManager.getMVWorld(worldName);
}


var worldManager = getWorldManager();


bjs.on("playerCommandPreprocess", function(event) {
    if (worldManager == null) return;

    var player = event.player;
    var command = event.message.toLowerCase().split(" ")[0];
    
    // スポーンコマンドでなければ無視
    if (!(command == "/spawn" || command == "/s" || command == "/mvs")) return;

    var mvWorld = getMVWorld(player.world.name);
    if (mvWorld == null)
        return;

    var spawnLocation = mvWorld.spawnLocation;
    var x = spawnLocation.blockX;
    var y = spawnLocation.blockY;
    var z = spawnLocation.blockZ;

    player.sendMessage("§eこのワールドの初期スポーン地点は §6" + x + "§7, §6" + y + "§7, §6" + z + "§e です！");

    // /spawn権限がない場合はキャンセルさせて、権限エラーを出さない
    if (!player.hasPermission(spawnPermission)) {
        event.setCancelled(true);
    }

});
