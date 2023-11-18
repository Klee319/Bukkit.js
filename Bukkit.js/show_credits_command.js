/*
    inspire from LoneDev's Credits plugin
    required: ProtocolLib
*/

var Bukkit = org.bukkit.Bukkit;
var PacketType = com.comphenix.protocol.PacketType;
var PacketContainer = com.comphenix.protocol.events.PacketContainer;
var ProtocolLibrary = com.comphenix.protocol.ProtocolLibrary;
var ENABLED = false;
var _fieldSpectatorMode = null;


function init() {
    ENABLED = false;
    if (!Bukkit.getPluginManager().isPluginEnabled("ProtocolLib")) {
        log.warn("Not enabled ProtocolLib");
        return;
    }

    try {
        _fieldSpectatorMode = PacketType.Play.Server.GAME_STATE_CHANGE.getPacketClass().getDeclaredField("e");
    } catch (err) {
        log.warn("Failed reflection");
        return;
    }
    ENABLED = true;
}

function onUnload() {
    _fieldSpectatorMode = null;
    ENABLED = false;
    log.info("Cleanup Credits");
}


function showCredits(player) {
    if (!ENABLED)
        return;
    var packet = new PacketContainer(PacketType.Play.Server.GAME_STATE_CHANGE);
    var spectatorMode = _fieldSpectatorMode.get(null);

    packet.getModifier().write(0, spectatorMode);
    packet.getFloat().write(0, 1);
    ProtocolLibrary.getProtocolManager().sendServerPacket(player, packet);
}


init();
if (ENABLED) {
    log.info("Enabled Credits");

    bjs.command("showcredits", function(sender, args) {
        if (0 >= args.length) {
            sender.sendMessage("§cプレイヤーを指定してください");
            return;
        }

        var target = bjs.getPlayer(args[0]);
        if (target) {
            showCredits(target);
            sender.sendMessage("§7Credits OK");
        } else {
            sender.sendMessage("§cプレイヤーが見つかりません");
        }
    });
}
