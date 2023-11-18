var Particle = Java.type("org.bukkit.Particle");
var Material = Java.type("org.bukkit.Material");
var Bukkit = Java.type("org.bukkit.Bukkit");
var locatioN = Java.type("org.bukkit.Location");
var Sound =Java.type("org.bukkit.Sound");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack"); 
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment"); 
var BlockCommandSender = Java.type("org.bukkit.command.BlockCommandSender"); 
var Color = Java.type("org.bukkit.Color");
var NamespacedKey = Java.type("org.bukkit.NamespacedKey");
var PersistentDataType = Java.type("org.bukkit.persistence.PersistentDataType");
var ItemFlag = Java.type("org.bukkit.inventory.ItemFlag");

var CUSOTM_TAG = new NamespacedKey(bjs.getOwner(), "potion_item");


var config = bjs.getConfig();
config.load();

function createEnchantedItem(material, enchantWithLevels) {
  var item = new ItemStack(material);
  var meta = item.getItemMeta();

  for (eIndex in enchantWithLevels) {
    var enchant = enchantWithLevels[eIndex][0];
    var level = enchantWithLevels[eIndex][1];

    if (Material.ENCHANTED_BOOK === material) {
      // エンチャ本なら addStoredEnchant を使う
      meta.addStoredEnchant(enchant, level, true);
    } 
    else {
      meta.addUnsafeEnchantment(enchant, level);
    }

  }
  item.setItemMeta(meta);
  return item;
}
//var book =createEnchantedItem(Material.ENCHANTED_BOOK, [[Enchantment.DAMAGE_UNDEAD, 6],[Enchantment.VANISHING_CURSE, 1],])

function createItem(material, amount) {
  return new ItemStack(material, (amount) ? amount : 1);
}
//var COOKED_BEEF_5 =createItem(Material.COOKED_BEEF, 5)

//アイテム生成
//var SLIME_BLOCK_20 =createItem(Material.SLIME_BLOCK, 20);
function  gatya() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§6§o§lレ§9§o§lア§a§o§lガ§c§o§lチ§e§o§lャ§5§o§lチ§d§o§lケ§f§o§lッ§2§o§lト");
  meta.setLore(["§b凄いものが出る予感がする..."]);
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "gatya");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}




bjs.command("givesango", function(sender) {
  sender.getInventory().addItem(sanngo());
});
bjs.command("givesangoblock", function(sender) {
  sender.getInventory().addItem(sanngoblock());
});
bjs.command("givekonnkurito", function(sender) {
  sender.getInventory().addItem(konnkurito());
});
bjs.command("givekonnkurito", function(sender) {
  sender.getInventory().addItem(konnkurito());
});
bjs.command("givehappa", function(sender) {
  sender.getInventory().addItem(happa());
});
bjs.command("givesennryou", function(sender) {
  sender.getInventory().addItem(sennryou());
});
bjs.command("givegennboku", function(sender) {
  sender.getInventory().addItem(gennboku());
});
bjs.command("givegatya", function(sender) {
  sender.getInventory().addItem(gatya());
});

//レア度：4
var HONEYCOMB_BLOCK_10 = createItem(Material.HONEYCOMB_BLOCK, 10);
var HONEY_BLOCK_10 = createItem(Material.HONEY_BLOCK, 10);
var CRYING_OBSIDIAN_10 = createItem(Material.CRYING_OBSIDIAN, 10);
var SEA_LANTERN_10 = createItem(Material.SEA_LANTERN, 10);
var GILDED_BLACKSTONE_10 = createItem(Material.GILDED_BLACKSTONE, 10);
var BELL_10 = createItem(Material.BELL, 10);
var END_ROD_10 = createItem(Material.END_ROD, 10);
// var END_ROD_10 = createItem(Material.END_ROD, 10);
// var END_ROD_10 = createItem(Material, 10);
// var END_ROD_10 = createItem(Material.END_ROD, 10);
//レア度：3
var CANDLE_20 = createItem(Material.CANDLE, 20);
var REDSTONE_LAMP_20 = createItem(Material.REDSTONE_LAMP, 20);
var LANTERN_20 = createItem(Material.LANTERN, 20);
var SHROOMLIGHT_20 = createItem(Material.SHROOMLIGHT, 20);
var BOOKSHELF_20 = createItem(Material.BOOKSHELF, 20);
var CALCITE_20 = createItem(Material.CALCITE, 20);
var PRISMARINE_BRICKS_20 = createItem(Material.PRISMARINE_BRICKS, 20);
var PRISMARINE_20 = createItem(Material.PRISMARINE, 20);
var SOUL_LANTERN_20 = createItem(Material.SOUL_LANTERN, 20);
var DARK_PRISMARINE_20 = createItem(Material.DARK_PRISMARINE, 20);
var SLIME_BLOCK_20 = createItem(Material.SLIME_BLOCK, 20);
var DRIPSTONE_BLOCK_20 = createItem(Material.DRIPSTONE_BLOCK, 20);
var SEA_PICKLE_20 = createItem(Material.SEA_PICKLE, 20);
//サンゴブロック交換券
function  sanngoblock() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§lサンゴブロック交換券");
  meta.setLore(["§bサンゴブロックと交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "sangoblock");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//サンゴ交換券
function  sanngo() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§lサンゴ交換券");
  meta.setLore(["§bサンゴと交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "sango");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
var GLOWSTONE_20 = createItem(Material.GLOWSTONE, 20);
var RED_SAND_20 = createItem(Material.RED_SAND, 20);
//レア度：2
var OBSIDIAN_32 = createItem(Material.OBSIDIAN, 32);
var SNOW_BLOCK_32 = createItem(Material.SNOW_BLOCK, 32);
var PURPUR_BLOCK_32 = createItem(Material.PURPUR_BLOCK, 32);
var PACKED_ICE_32 = createItem(Material.PACKED_ICE, 32);
var NETHER_WART_BLOCK_32 = createItem(Material.NETHER_WART_BLOCK, 32);
var WARPED_WART_BLOCK_32 = createItem(Material.WARPED_WART_BLOCK, 32);
var TERRACOTTA_32 = createItem(Material.TERRACOTTA, 32);
var IRON_BARS_32 = createItem(Material.IRON_BARS, 32);
var WHITE_WOOL_32 = createItem(Material.WHITE_WOOL, 32);
//コンクリート交換券
function  konnkurito() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§lコンクリート交換券");
  meta.setLore(["§bコンクリートと交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "konnkurito");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//染料交換券
function  sennryou() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§l染料交換券");
  meta.setLore(["§b染料と交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "sennryou");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
var CHAIN_32 = createItem(Material.CHAIN, 32);
var TUFF_32 = createItem(Material.TUFF, 32);
var BROWN_MUSHROOM_BLOCK_32 = createItem(Material.BROWN_MUSHROOM_BLOCK, 32);
var MUSHROOM_STEM_32 = createItem(Material.MUSHROOM_STEM, 32);
var RED_MUSHROOM_BLOCK_32 = createItem(Material.RED_MUSHROOM_BLOCK, 32);
//レア度：1
var MAGMA_BLOCK_32 = createItem(Material.MAGMA_BLOCK, 32);
var BLACKSTONE_32 = createItem(Material.BLACKSTONE, 32);
//葉っぱ交換券
function  happa() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§l葉っぱ交換券");
  meta.setLore(["§b葉っぱと交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "happa");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
var NETHER_BRICKS_32 = createItem(Material.NETHER_BRICKS, 32);
var SMOOTH_STONE_32 = createItem(Material.SMOOTH_STONE, 32);
var DIORITE_32 = createItem(Material.DIORITE, 32);
var MOSS_BLOCK_32 = createItem(Material.MOSS_BLOCK, 32);
//原木交換券
function  gennboku() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§f§l原木交換券");
  meta.setLore(["§b原木と交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "genboku");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
var GLASS_32 = createItem(Material.GLASS, 32);
var GRANITE_32 = createItem(Material.GRANITE, 32);
var END_STONE_BRICKS_32 = createItem(Material.END_STONE_BRICKS, 32);
var ANDESITE_32 = createItem(Material.ANDESITE, 32);
var RED_NETHER_BRICKS_32 = createItem(Material.RED_NETHER_BRICKS, 32);


//レアリティごとにアイテム格納
var LR=[null];
var UR=[null];
var SSR=[null]
var SR=[HONEYCOMB_BLOCK_10, HONEY_BLOCK_10, CRYING_OBSIDIAN_10, SEA_LANTERN_10, GILDED_BLACKSTONE_10, BELL_10, END_ROD_10];
var R=[sanngoblock(),sanngo(),CANDLE_20, REDSTONE_LAMP_20, LANTERN_20, SHROOMLIGHT_20, BOOKSHELF_20, CALCITE_20, PRISMARINE_BRICKS_20, PRISMARINE_20, SOUL_LANTERN_20, DARK_PRISMARINE_20, SLIME_BLOCK_20, DRIPSTONE_BLOCK_20, SEA_PICKLE_20, GLOWSTONE_20, RED_SAND_20];
var UC=[konnkurito(),sennryou(),OBSIDIAN_32, SNOW_BLOCK_32, PURPUR_BLOCK_32, PACKED_ICE_32, NETHER_WART_BLOCK_32, WARPED_WART_BLOCK_32, TERRACOTTA_32, IRON_BARS_32, WHITE_WOOL_32, CHAIN_32, TUFF_32, BROWN_MUSHROOM_BLOCK_32, MUSHROOM_STEM_32, RED_MUSHROOM_BLOCK_32];
var C=[gennboku(),happa(),MAGMA_BLOCK_32, BLACKSTONE_32, NETHER_BRICKS_32, SMOOTH_STONE_32, DIORITE_32, MOSS_BLOCK_32, GLASS_32, GRANITE_32, END_STONE_BRICKS_32, ANDESITE_32, RED_NETHER_BRICKS_32];

//key用
var inventory=[];
var out={};


bjs.command("capsuletoys1", function(sender, args){
  if(args[0]=="make"){
  var Name=args[1];
  var x=sender.player.location.x;
  var y=sender.player.location.y;
  var z=sender.player.location.z;
  var world=sender.world.name;
  config.set(Name, x + "," + y + "," + z+ ","+world);
  config.save();
  sender.sendMessage("§6"+Name+"のガチャを追加しました");
  }
  if(args[0]=="delete"){
  var Name=args[1]
  config.set(Name, null);
  config.save();
  sender.sendMessage("§6"+Name+"のガチャを削除しました");
  }
  if(args[0]=="set"){
    if(sender instanceof BlockCommandSender){
    
    var times=parseInt(args[1]);
    var Name=args[2];
    var Result=[];
    
      if (config.keys.contains(Name)) { 
      var count =0;
      var loc =config.getString(Name);
      var result = loc.split(',');
      var x=parseFloat (result[0]);
      var y=parseFloat (result[1]);
      var z=parseFloat (result[2]);
      var World=result[3]
      var world=Bukkit.getWorld(World);
      var location=new locatioN(world,x,y,z);
     
        while(count<times){ 
        count=count+1
        var a=Math.random()*100;
          if(a<=-1){Result.push(LR)}
          else if(a<=-1){Result.push(UR)}
          else if(a<=-1){Result.push(SSR)}
          else if(10>=a&&a>=0.0){Result.push(SR)}
          else if(25>=a&&a>10){Result.push(R)}
          else if(50>=a&&a>25){Result.push(UC)}
          else if(100>=a&&a>50){Result.push(C)}
        }
        //LRが出るとき
        if(Result.indexOf(LR)!=-1){
          
          var b=Math.random();
          var c=Math.random();
          if(c<0.2){
            var count=0;
            bjs.scheduleLoopTask(20, function(task) {
              count += 1;  // 1増やす
              world.playSound(location, Sound.BLOCK_BELL_USE, 1.0, 6.0);
              if (count >=2) {
                  task.cancel();
              }
          });
          }
         
         
          if(0.8>=b&&b>=0){
            var blockData = Bukkit.createBlockData(Material.NETHERITE_BLOCK);
            // blockDataを元に FallingBlock をスポーンさせます
            var fallingBlock =world.spawnFallingBlock(location, blockData);
            log.info(config.getString(Name));
            var id = fallingBlock.uniqueId; 
            var reality="LR1"
            var key={};
            key[reality]=Result;
            out[id]=key;
          }
          if(0.9>=b&&b>0.8){
            var blockData = Bukkit.createBlockData(Material.DIAMOND_BLOCK);
            // blockDataを元に FallingBlock をスポーンさせます
            var fallingBlock =world.spawnFallingBlock(location, blockData);
            id = fallingBlock.uniqueId; 
            var reality="LR2"
            var key={}
            key[reality]=Result;
            out[id]=key;
          }
          if(0.95>=b&&b>0.9){
            var blockData = Bukkit.createBlockData(Material.GOLD_BLOCK);
            // blockDataを元に FallingBlock をスポーンさせます
            var fallingBlock =world.spawnFallingBlock(location, blockData);
            id = fallingBlock.uniqueId; 
            var reality="LR3"
            var key={}
            key[reality]=Result;
            out[id]=key;
          }
          if(1>=b&&b>0.95){
            var blockData = Bukkit.createBlockData(Material.DIRT);
            // blockDataを元に FallingBlock をスポーンさせます
            var fallingBlock =world.spawnFallingBlock(location, blockData);
            id = fallingBlock.uniqueId; 
            var reality="LR4"
            var key={}
            key[reality]=Result;
            out[id]=key;
          }
        }
        //URが出るとき
        else if(Result.indexOf(UR)!=-1){
        var b=Math.random();
        var c=Math.random();
          if(c<0.1){
            var count=0;
            bjs.scheduleLoopTask(20, function(task) {
              count += 1;  // 1増やす
              world.playSound(location, Sound.BLOCK_BELL_USE, 1.0, 6.0);
              if (count >=2) {
                  task.cancel();
              }
          });
          }
          if(0.9>=b&&b>=0){
          var blockData = Bukkit.createBlockData(Material.DIAMOND_BLOCK);
          // blockDataを元に FallingBlock をスポーンさせます
          var fallingBlock =world.spawnFallingBlock(location, blockData);
          log.info(config.getString(Name));
          var id = fallingBlock.uniqueId; 
          var reality="UR1"
          var key={};
          key[reality]=Result;
          out[id]=key;
          }
          if(1>=b&&b>0.9){
          var blockData = Bukkit.createBlockData(Material.GOLD_BLOCK);
          // blockDataを元に FallingBlock をスポーンさせます
          var fallingBlock =world.spawnFallingBlock(location, blockData);
          id = fallingBlock.uniqueId; 
          var reality="UR2"
          var key={}
          key[reality]=Result;
          out[id]=key;
          }
        }
        //SSRが出るとき
        else if(Result.indexOf(SSR)!=-1){
        var blockData = Bukkit.createBlockData(Material.GOLD_BLOCK);
        // blockDataを元に FallingBlock をスポーンさせます
        var fallingBlock =world.spawnFallingBlock(location, blockData);
        id = fallingBlock.uniqueId; 
        var reality="SSR"
        var key={}
        key[reality]=Result;
        out[id]=key;
        }
        //SRが出るとき
        else if(Result.indexOf(SR)!=-1){
        var blockData = Bukkit.createBlockData(Material.IRON_BLOCK);
        // blockDataを元に FallingBlock をスポーンさせます
        var fallingBlock =world.spawnFallingBlock(location, blockData);
        id = fallingBlock.uniqueId; 
        var reality="SR"
        var key={}
        key[reality]=Result;
        out[id]=key;
        }
        //Rが出るとき
        else if(Result.indexOf(R)!=-1){
        var blockData = Bukkit.createBlockData(Material.COAL_BLOCK);
        // blockDataを元に FallingBlock をスポーンさせます
        var fallingBlock =world.spawnFallingBlock(location, blockData);
        id = fallingBlock.uniqueId; 
        var reality="R"
        var key={}
        key[reality]=Result;
        out[id]=key;
        }
        //UCが出るとき
        else if(Result.indexOf(UC)!=-1){
        var blockData = Bukkit.createBlockData(Material.STONE);
        // blockDataを元に FallingBlock をスポーンさせます
        var fallingBlock =world.spawnFallingBlock(location, blockData);
        id = fallingBlock.uniqueId; 
        var reality="UC"
        var key={}
        key[reality]=Result;
        out[id]=key;
        }
        //Cが出るとき
        else if(Result.indexOf(C)!=-1){
          var blockData = Bukkit.createBlockData(Material.DIRT);
          // blockDataを元に FallingBlock をスポーンさせます
          var fallingBlock =world.spawnFallingBlock(location, blockData);
          id = fallingBlock.uniqueId; 
          var reality="C"
          var key={}
          key[reality]=Result;
          out[id]=key;
          }
      }
      else{
      log.info("このガチャはセットされていません");
      }
    }
    else{
    log.info("§6"+"このコマンドはコマンドブロックで実行する必要があります");
    }
  }
  if(args[0]=="list"){
    for(index in config.keys){
    sender.sendMessage(config.keys[index]);
    }
  }
})


bjs.on("entitychangeblock", function(event) {
  //定義
  var block = event.block;
  var location = block.location;
  var world = block.world;
  var count = 0;
  var entity =event.getEntity();
  var id=entity.uniqueId
    if(id in out){
    var output=out[id]
    delete out[id];
    //最大排出レアリティに応じた演出
      if("LR1"in output){
        var result=output["LR1"]
        var i=0;
      //演出
      var s=0;
        for (; s <5; s++) {
        world.playSound(location,"random.levelup",2.0,1.0)
        world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 2.0, 1.0); }
      for (; i < 80; i++) {
        world.playSound(location, Sound.BLOCK_AMETHYST_BLOCK_BREAK, 2.0, 2.0);
        world.playSound(location,"break.amethyst_block", 2.0, 2.0);}
        
      
      
        bjs.scheduleLoopTask(1, function(task) {
          // 繰り返し実行
          count += 1;
            // 繰り返しをやめるとき
            if (count < 20) {
              var dust = new Particle.DustOptions(Color.fromRGB(0, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust);
              var dust1 = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust1);
              var dust2 = new Particle.DustOptions(Color.fromRGB(0, 255, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust2);
              var dust3 = new Particle.DustOptions(Color.fromRGB(255,0 , 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust3);
              var dust4 = new Particle.DustOptions(Color.fromRGB(255, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust4);
              var dust5 = new Particle.DustOptions(Color.fromRGB(0, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust5);
              var dust6 = new Particle.DustOptions(Color.fromRGB(50, 50, 50), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust6);
              var dust7 = new Particle.DustOptions(Color.fromRGB(50, 30,80), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust7);
              world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0);
              }
          else if(count==30){
            world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15,0.0,0.0,0.0,0.1);
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
            event.setCancelled(true);
            block.setType(Material.RED_SHULKER_BOX);
            //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
            var count2=0
            while(count2<result.length){
              var item=result[count2]
              var contents= Math.floor(Math.random()*item.length)
              //itemにランダム（同確率）でSSRのアイテムを格納
              var drop=(item[contents])
              //排出
              var Inventory=block.state.inventory;
              Inventory.addItem(drop);
              count2=count2+1;
              }
              //終了
              if(count2>=result.length){
              inventory.push(""+block.state.inventory);
              }
          }
          else if(count>30){event.setCancelled(true);
          task.cancel();
          }
          });
      }
      if("LR2"in output){
        var result=output["LR2"]
        var i=0;
        var s=0;
        for (; s <5; s++) {
          world.playSound(location,"random.levelup",2.0,1.0)
          world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 2.0, 1.0); }
        for (; i < 80; i++) {
          world.playSound(location, Sound.BLOCK_AMETHYST_BLOCK_BREAK, 2.0, 2.0);
          world.playSound(location,"break.amethyst_block", 2.0, 2.0);}
        
          
        
      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 10tickまで繰り返し実行
        count += 1;
          
           if(count<20){
            world.spawnParticle(Particle.FIREWORKS_SPARK, location, 5, 1.0, 1.0, 1.0,0.1);
            world.spawnParticle(Particle.END_ROD, location, 5, 1.0, 1.0, 1.0,0.1);
            var dust = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 10, 1.0, 1.0, 1.0,0.5, dust);
            }
          // 0.5秒後上記の繰り返しをやめる
          ////1.5秒後2秒間爆発
          else if(count>=30&&count<50) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 3, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          }
          //ネザライトブロックに昇格
          else if(count==50){
          event.setCancelled(true);
          block.setType(Material.NETHERITE_BLOCK);
          }
          else if(count>=60&&count<70){
            var dust = new Particle.DustOptions(Color.fromRGB(0, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust);
              var dust1 = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust1);
              var dust2 = new Particle.DustOptions(Color.fromRGB(0, 255, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust2);
              var dust3 = new Particle.DustOptions(Color.fromRGB(255,0 , 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust3);
              var dust4 = new Particle.DustOptions(Color.fromRGB(255, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust4);
              var dust5 = new Particle.DustOptions(Color.fromRGB(0, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust5);
              var dust6 = new Particle.DustOptions(Color.fromRGB(50, 50, 50), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust6);
              var dust7 = new Particle.DustOptions(Color.fromRGB(50, 30,80), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
              world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust7);
              world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0);
            }
          //2秒後爆発してアイテムが出る
          else if(count==80) {
            world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15,0.0,0.0,0.0,0.1);
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
            event.setCancelled(true);
            block.setType(Material.RED_SHULKER_BOX);
            var count2=0
            while(count2<result.length){
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }
          }
          else if(count>80){task.cancel();
          }
        })
      }
      if("LR3"in output){
        var result=output["LR3"]
        var s=0;
        for (; s <5; s++) {
          world.playSound(location, Sound.ENTITY_EXPERIENCE_ORB_PICKUP, 1.0, 1.0);   
          world.playSound(location,"random.orb", 1.0, 1.0);}
          var i = 0;
          for (; i <50; i++) {
          world.playSound(location,"place.calcite", 1.5, 0.5);
          world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 1.5, 0.5);
        }
  
      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 10tickまで繰り返し実行
        count += 1;
           if(count<10){
            world.spawnParticle(Particle.COMPOSTER, location, 20, 1.0, 1.0, 1.0);
            world.spawnParticle(Particle.TOTEM, location, 20, 1.0, 1.0, 1.0);}
          // 0.5秒後上記の繰り返しをやめる
          //1.5秒後2秒間爆発
          else if(count>=30&&count<50) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 3, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          }
          //ダイヤブロックに昇格
          else if(count==50){
          event.setCancelled(true);
          block.setType(Material.DIAMOND_BLOCK);
          }
          else if(count>=60&&count<70){world.spawnParticle(Particle.FIREWORKS_SPARK, location, 5, 1.0, 1.0, 1.0,0.1);
            world.spawnParticle(Particle.END_ROD, location, 5, 1.0, 1.0, 1.0,0.1);
            var dust = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);
            world.spawnParticle(Particle.REDSTONE, location, 10, 1.0, 1.0, 1.0,0.5, dust);
          }
          //1.5秒後2秒間爆発
          else if(count>80&&count<100) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 3, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          }
          //ネザライトブロックに昇格
          else if(count==100){
          event.setCancelled(true);
          block.setType(Material.NETHERITE_BLOCK);
          }
          //2秒後爆発してアイテムが出る
          else if(count>110&&count<120){
            var dust = new Particle.DustOptions(Color.fromRGB(0, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust);
            var dust1 = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust1);
            var dust2 = new Particle.DustOptions(Color.fromRGB(0, 255, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust2);
            var dust3 = new Particle.DustOptions(Color.fromRGB(255,0 , 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust3);
            var dust4 = new Particle.DustOptions(Color.fromRGB(255, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust4);
            var dust5 = new Particle.DustOptions(Color.fromRGB(0, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust5);
            var dust6 = new Particle.DustOptions(Color.fromRGB(50, 50, 50), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust6);
            var dust7 = new Particle.DustOptions(Color.fromRGB(50, 30,80), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust7);
            world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0);
          }
          else if(count==130) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          var count2=0
            while(count2<result.length){
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }
          }
          else if(count>130){task.cancel();
          }
          
        })
      } 
      if("LR4"in output){
        
        var result=output["LR4"]
        var i=0;
        for (; i < 70; i++) {
        world.playSound(location,"place.calcite", 1.5, 1.0);
        world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 1.5, 1.0);}
      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 10tickまで繰り返し実行
        count += 1;
          if(count==29){world.spigot().strikeLightningEffect(location, false);
          }
          // 0.5秒後上記の繰り返しをやめる
          ////1.5秒後2秒間爆発
          else if(count==30) {
          //ネザライトブロックに昇格
          event.setCancelled(true);
          block.setType(Material.NETHERITE_BLOCK);
          }
          //2秒後爆発してアイテムが出る
          else if(count>35&&count<70){
            var dust = new Particle.DustOptions(Color.fromRGB(0, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust);
            var dust1 = new Particle.DustOptions(Color.fromRGB(255, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust1);
            var dust2 = new Particle.DustOptions(Color.fromRGB(0, 255, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust2);
            var dust3 = new Particle.DustOptions(Color.fromRGB(255,0 , 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust3);
            var dust4 = new Particle.DustOptions(Color.fromRGB(255, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust4);
            var dust5 = new Particle.DustOptions(Color.fromRGB(0, 0, 255), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust5);
            var dust6 = new Particle.DustOptions(Color.fromRGB(50, 50, 50), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust6);
            var dust7 = new Particle.DustOptions(Color.fromRGB(50, 30,80), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 2, 1.0, 1.0, 1.0,0.5, dust7);
            world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0);
            }
          else if(count==70) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 5, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          var count2=0
            while(count2<result.length){
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }
          }
          else if(count>70){task.cancel();
          }
        })
      }
      if("UR1"in output){
        var i=0;
        var result=output["UR1"]
        var s=0;
        for (; s <5; s++) {
          world.playSound(location,"random.levelup",2.0,1.0)
          world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 2.0, 1.0); }
        for (; i < 80; i++) {
          world.playSound(location, Sound.BLOCK_AMETHYST_BLOCK_BREAK, 2.0, 2.0);
          world.playSound(location,"break.amethyst_block", 2.0, 2.0);}
         
  
          bjs.scheduleLoopTask(1, function(task) {
          // 繰り返し実行
          count += 1; 
          if (count <20) {
            world.spawnParticle(Particle.FIREWORKS_SPARK, location, 3, 1.0, 1.0, 1.0,0.1);
            world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0,0.1);
            var dust = new Particle.DustOptions(Color.fromRGB(225, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 10, 1.0, 1.0, 1.0,0.5, dust);
          }
          if(count==30){ 
            world.spawnParticle(Particle.EXPLOSION_HUGE, location, 5, 0.0, 0.0, 0.0,0.1);
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
            event.setCancelled(true);
            block.setType(Material.RED_SHULKER_BOX);
            //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
            var count2=0
              while(count2<result.length){
            
              var item=result[count2]
              var contents= Math.floor(Math.random()*item.length)
              //itemにランダム（同確率）でSSRのアイテムを格納
              var drop=(item[contents])
              //排出
              var Inventory=block.state.inventory;
              Inventory.addItem(drop);
              count2=count2+1;
              }
              //終了
              if(count2>=result.length){
              inventory.push(""+block.state.inventory);
              }  
            }   
            // 繰り返しをやめるとき 
            else if(count>30){
              task.cancel();}
          });
      }
      if("UR2"in output){
      var result=output["UR2"]
      var s=0;
      for (; s <5; s++) {
        world.playSound(location, Sound.ENTITY_EXPERIENCE_ORB_PICKUP, 1.0, 1.0);   
        world.playSound(location,"random.orb", 1.0, 1.0);}
        var i = 0;
        for (; i <50; i++) {
        world.playSound(location,"place.calcite", 1.5, 0.5);
        world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 1.5, 0.5);
      }
      //演出
        bjs.scheduleLoopTask(1, function(task) {
        // 10tickまで繰り返し実行
        count += 1;
         
           if (count <= 10) {
          world.spawnParticle(Particle.COMPOSTER, location, 20, 1.0, 1.0, 1.0);
          world.spawnParticle(Particle.TOTEM, location, 20, 1.0, 1.0, 1.0);
          }
          // 0.5秒後上記の繰り返しをやめる
          ////1.5秒後2秒間爆発
          else if(count>=30&&count<50) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 3, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          }
          //ダイヤブロックに昇格
          else if(count==50){
          event.setCancelled(true);
          block.setType(Material.DIAMOND_BLOCK);
          }
          //2秒後爆発してアイテムが出る
          else if(count>=60&&count<70){
            world.spawnParticle(Particle.FIREWORKS_SPARK, location, 3, 1.0, 1.0, 1.0);
            world.spawnParticle(Particle.END_ROD, location, 3, 1.0, 1.0, 1.0);
            var dust = new Particle.DustOptions(Color.fromRGB(225, 255, 0), 1);  // RED, GREEN, BLUE のRGB指定で、0=0% 255=100%。
            world.spawnParticle(Particle.REDSTONE, location, 10, 1.0, 1.0, 1.0,0.5, dust);
            }
          else if(count==80) {
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          var count2=0
            while(count2<result.length){
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }
          }
          else if(count>80){task.cancel()
          }
        })
      }
      if("SSR"in output){
      var result=output["SSR"]
      //演出
      var s = 0;
      for (; s <5; s++) {
        world.playSound(location, Sound.ENTITY_EXPERIENCE_ORB_PICKUP, 1.0, 1.0);   
        world.playSound(location,"random.orb", 1.0, 1.0);}
        var i = 0;
        for (; i <50; i++) {
        world.playSound(location,"place.calcite", 2.0, 0.5);
        world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 2.0, 0.5);
      }
  
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        if (count <10) {
          world.spawnParticle(Particle.COMPOSTER, location, 20, 1.0, 1.0, 1.0,0.1);
        world.spawnParticle(Particle.TOTEM, location, 20, 1.0, 1.0, 1.0,0.1);
        } 
         else  if(count==30){ 
            world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
            event.setCancelled(true);
            block.setType(Material.RED_SHULKER_BOX);
            //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
            var count2=0
              while(count2<result.length){
              var item=result[count2]
              var contents= Math.floor(Math.random()*item.length)
              //itemにランダム（同確率）でSSRのアイテムを格納
              var drop=(item[contents])
              //排出
              var Inventory=block.state.inventory;
              Inventory.addItem(drop);
              count2=count2+1;
              }
              //終了
              if(count2>=result.length){
              inventory.push(""+block.state.inventory);
              }  }
          // 繰り返しをやめるとき
          else if(count>30){task.cancel();
          }
        });
      }
      if("SR"in output){
      var result=output["SR"]
      //演出
      world.playSound(location, Sound.BLOCK_ANVIL_PLACE, 1.0, 2.0);
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1; 
        if (count <30) {
          world.spawnParticle(Particle.DRAGON_BREATH, location, 15, 1.0, 1.0, 1.0,0.1);
        } 
        else if(count==30){ 
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
            while(count2<result.length){
          
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }  }
          // 繰り返しをやめるとき
         
          else if(count>30){task.cancel();
          }
        }); 
      }    
      if("R"in output){
      var result=output["R"]
      //演出
      var i = 0;
      for (; i <50; i++) {
      world.playSound(location,"place.calcite", 1.5, 0.5);
      world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 1.5, 0.5);}
      world.playSound(location, Sound.ENTITY_GENERIC_EXTINGUISH_FIRE, 1.0, 1.0);
      world.playSound(location,"random.fizz", 1.0, 1.0);
      world.playSound(location, Sound.ENTITY_GENERIC_EXTINGUISH_FIRE, 1.0, 1.0);
      world.playSound(location,"random.fizz", 1.0, 1.0);
     
       
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        if (count <30) {
          world.spawnParticle(Particle.SPIT, location, 5, 1.0, 1.0, 1.0,0.1);
        } 
        else if(count==30){ 
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
            while(count2<result.length){
          
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }  
          }
          // 繰り返しをやめるとき 
          else if(count>30){task.cancel();
          }
        });  
      }    
      if("UC"in output){
      var result=output["UC"]
      //演出
      var i=0;
      for (; i < 70; i++) {
        world.playSound(location,"place.calcite", 1.5, 1.0);
        world.playSound(location,Sound.BLOCK_CALCITE_PLACE, 1.5, 1.0);}
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;   
        if (count <30) {
          world.spawnParticle(Particle.SMOKE_NORMAL, location, 15, 1.0, 1.0, 1.0,0.1);
        } 
        if(count==30){ 
          world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
          event.setCancelled(true);
          block.setType(Material.RED_SHULKER_BOX);
          //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
            while(count2<result.length){
          
            var item=result[count2]
            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);
            count2=count2+1;
            }
            //終了
            if(count2>=result.length){
            inventory.push(""+block.state.inventory);
            }  }
          // 繰り返しをやめるとき
          
          else if(count>30){task.cancel();
          }
        }); 
      }
      if("C"in output){
        var result=output["C"]
        //演出
        var i=0;
        for (; i < 70; i++) {
          world.playSound(location,"dig.grass", 1.0, 1.0);
          world.playSound(location,Sound.BLOCK_GRASS_PLACE, 1.0, 1.0);}
        bjs.scheduleLoopTask(1, function(task) {
          // 繰り返し実行
          count += 1;   
          if(count==30){ 
            world.spawnParticle(Particle.EXPLOSION_HUGE, location, 15, 0.0, 0.0, 0.0,0.1);
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 0.8, 1.0);
            event.setCancelled(true);
            block.setType(Material.RED_SHULKER_BOX);
            //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
            var count2=0
              while(count2<result.length){
            
              var item=result[count2]
              var contents= Math.floor(Math.random()*item.length)
              //itemにランダム（同確率）でSSRのアイテムを格納
              var drop=(item[contents])
              //排出
              var Inventory=block.state.inventory;
              Inventory.addItem(drop);
              count2=count2+1;
              }
              //終了
              if(count2>=result.length){
              inventory.push(""+block.state.inventory);
              }  }
            // 繰り返しをやめるとき
            
            else if(count>30){task.cancel();
            }
          }); 
        }
    }  
  });

bjs.on("inventoryclose", function(event) {
var Inventory =event.getInventory();
  if (inventory.indexOf("" + Inventory) != -1) {
    if(Inventory.isEmpty()) {
    Inventory.location.block.setType(Material.AIR);
    inventory = inventory.filter(function(inv) { inv === ("" + Inventory) });
    }
  }
});