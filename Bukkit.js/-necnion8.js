
var Particle = Java.type("org.bukkit.Particle");
var Material = Java.type("org.bukkit.Material");
var Bukkit = Java.type("org.bukkit.Bukkit");
var location = Java.type("org.bukkit.Location");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack"); 
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
var Action = Java.type("org.bukkit.event.block.Action");



var config = bjs.getConfig();
config.load();


var p = bjs.getPlayer("Necnion8");

if (p != null) {
    function print(m) {
        p.sendMessage("" + m);
    }
    getBiomeName(p.location);

    // printLocalTime(print);
}


function getBiomeName(location) {
    var block = location.block;
    var chunk = block.chunk;
    var dedicatedServer = bjs.server.server;

    var IRegistry = Java.type("net.minecraft.core.IRegistry");


    var worldServer = block.world.handle;
    var biomeBase = worldServer.w(block.getPosition()).a();
    var registry = dedicatedServer.aX().a(IRegistry.aR).get();
    var biomeKey = registry.b(biomeBase);

    log.info(biomeKey);
    log.info(biomeKey.b());
}


function printBungeePlayTime() {
    var ListOpt = Java.type("com.gmail.necnionch.myplugin.bungeeplaytime.common.database.options.LookupTimeListOptions");
    var bpt = bjs.getPlugin("BungeePlayTime");
    log.info(bpt.getMessenger());
    // var options = new ListOpt()
    //     .count(5)
    //     .afters(new Date().getTime() - 24 * 60 * 60 * 1000);
    // bpt.lookupTimeTops(options).whenComplete(function(ret, err) {
    //     ret.getEntries().forEach(function(e) {
    //         var total = parseInt(e.getTotalTime() / 1000 / 60);
    //         var afk = parseInt(e.getAFKTime() / 1000 / 60);
    //         log.info(e.getPlayerId() + " " + total + "m" + " AFK: " + afk + "m");
    //     });
    // });
    var offlineList = bjs.getServer().getOfflinePlayers();
    log.info("Fetch start at " + (new Date()));
    for (i in offlineList) {
        var op = offlineList[i];
        // log.info(op + " : " + op.getName());
        bpt.lookupTime(op.getUniqueId()).whenComplete(function(ret, err) {
            if (err) {
                log.info(err);
                return;
            }
            try {
                log.info(ret.get().getPlayerId() + "  " + ret.get().getPlayTime());
            } catch (e) {
                log.info(e);
            }
            log.info("Fetch end at " + (new Date()));
        });
        // break;
    }
    
}
// printBungeePlayTime();



function printLocalTime(print) {
    var TemporalAdjusters = java.time.temporal.TemporalAdjusters;
    var DayOfWeek = java.time.DayOfWeek;
    var time = java.time.LocalDateTime.now();
    time = time.with(java.time.LocalTime.of(0, 0));
    time = time.with(TemporalAdjusters.previous(DayOfWeek.TUESDAY));
    print(time);
}




// bjs.on("PlayerInteractAtEntity", function(event) {
//     var p = event.getPlayer();
//     var e = event.getRightClicked();

//     p.sendMessage(e);
//     p.sendMessage(e.type);

//     var MythicBukkit = Java.type("io.lumine.mythic.bukkit.MythicBukkit");
//     var mgr = MythicBukkit.inst().getMobManager();

//     p.sendMessage("The Mythic mob: " + mgr.isMythicMob(e));

// });


// config.set("aaa", "AAA");
// config.set("bbb", "BBB");
// config.set("ccc.a1", "ccA1");
// config.set("ccc.b2", "ccB2");

// config.save();

// log.info("hi");
// log.info(config.keys);
// for (key in config.keys) {
//     log.info(key);
// }


// // function log(message) {
// //     var p = bjs.getPlayer("Necnion8");
// //     if (p != null)
// //         p.sendMessage(message);
// // }


// bjs.on("playerinteract", function(event) {
//     var player = event.player;
//     var block = event.clickedBlock;

//     if (!player.name.equals("Necnion8"))  // Necnion8 でなければ無視
//         return;
//     if (Action.RIGHT_CLICK_BLOCK !== event.action)  // ブロック右クリでなければ無視
//         return;

//     try {
//         log("Clicked: " + block.type);

//         if (player.isSneaking()) {  // スニークしていれば

//             block.setType(Material.SHULKER_BOX);
            
//             var item = new ItemStack(Material.APPLE);

//             block.state.inventory.addItem(item);

//         }

//     } catch (err) {
//         log("Error: " + err);
//     }

// });


// bjs.command("n8testplay", function(sender) {

//     var p = sender;
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);
//     p.world.playSound(p.location, "break.amethyst_block", 2.0, 2.0);

// });


// bjs.command("n8testdust", function(sender) {
//     var Particle = Java.type("org.bukkit.Particle");
//     var Color = Java.type("org.bukkit.Color");

//     var loc = sender.location;
//     var world = sender.world;

//     // var dust = new Particle.DustOptions(Color.fromRGB(255, 0, 0), 1);
//     // world.spawnParticle(Particle.SPELL_MOB_AMBIENT,   loc, 10, 0.0, 0.0, 0.0, 0.0, dust);
//     // world.spawnParticle(Particle.SPELL_MOB,   loc, 0, 1.0, 0.0, 0.0, 0.0);
//     // world.spawnParticle(Particle.REDSTONE ,   loc, 10, 0.0, 0.0, 0.0, 0.0, dust);

//     var red = 255 / 255;
//     var green = 0 /255;
//     var blue = 0 / 255;
//     world.spawnParticle(Particle.SPELL_MOB_AMBIENT, loc, 0, red, green, blue, 1);


// });

