var Bukkit = Java.type("org.bukkit.Bukkit");
var Material = Java.type("org.bukkit.Material");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack");
var PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
var PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
var PersistentDataType = Java.type("org.bukkit.persistence.PersistentDataType");
var NamespacedKey = Java.type("org.bukkit.NamespacedKey");
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
var locatioN = Java.type("org.bukkit.Location");
var ItemFlag = Java.type("org.bukkit.inventory.ItemFlag");
var UUID = Java.type("java.util.UUID");
var Attribute = Java.type("org.bukkit.attribute.Attribute");
var AttributeModifier = Java.type("org.bukkit.attribute.AttributeModifier");
var EquipmentSlot = Java.type("org.bukkit.inventory.EquipmentSlot");
var Player = Java.type("org.bukkit.entity.Player");
var face = Java.type("org.bukkit.block.BlockFace");
var LivingEntity = Java.type("org.bukkit.entity.LivingEntity");
var Attribute = Java.type("org.bukkit.attribute.Attribute");
var Particle = Java.type("org.bukkit.Particle");
var Sound =Java.type("org.bukkit.Sound");
var BlockCommandSender = Java.type("org.bukkit.command.BlockCommandSender");
var Color = Java.type("org.bukkit.Color");
var CUSOTM_TAG = new NamespacedKey(bjs.getOwner(), "potion_item");
var config = bjs.getConfig();
var EntityDamageEvent = Java.type("org.bukkit.event.entity.EntityDamageEvent");
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
var COOKED_BEEF_5 =createItem(Material.COOKED_BEEF, 5);
var EXPERIENCE_BOTTLE_5 =createItem(Material.EXPERIENCE_BOTTLE, 5);
var GOLDEN_APPLE =createItem(Material.GOLDEN_APPLE);
var EXPERIENCE_BOTTLE_10 =createItem(Material.EXPERIENCE_BOTTLE, 10);
var ENCHANTED_GOLDEN_APPLE=createItem(Material.ENCHANTED_GOLDEN_APPLE);
var NETHERITE_INGOT=createItem(Material.NETHERITE_INGOT);
var NETHERITE_SCRAP=createItem(Material.NETHERITE_SCRAP);
var ELYTRA=createItem(Material.ELYTRA);
var DIAMOND_3=createItem(Material.DIAMOND,3);
//エンチャ本交換券
function enntyabonn() {
  // 作成
  var item = new ItemStack(Material.PAPER);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§d§lエンチャント本交換券");
  meta.setLore(["§bエンチャント本に交換できます"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "enntyabonn");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
bjs.command("giveenntyabonn", function(sender) {
  sender.getInventory().addItem(enntyabonn());
});

//レアリティごとにアイテム格納
var LR=[keraunosu()];
var UR=[eiruboots(),eiruchestplate(),eiruhead(),eirulegins(),karadoborugu(),ekusukariba() ];
var SSR=[NETHERITE_INGOT,hayabusa(),hera(),kanngaru(),satanchestplate()];
var SR=[NETHERITE_SCRAP,aresu(),mokuba(),horoburesu()];
var R=[DIAMOND_3];
var UC=[GOLDEN_APPLE,EXPERIENCE_BOTTLE_10,enntyabonn()];
var C=[COOKED_BEEF_5,EXPERIENCE_BOTTLE_5];

//key用
var inventory=[];
var out={};


bjs.command("capsuletoys", function(sender, args){
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
          if(a<=0.5){Result.push(LR)}
          else if(1.5>=a&&a>0.5){Result.push(UR)}
          else if(3>=a&&a>1.5){Result.push(SSR)}
          else if(5>=a&&a>3){Result.push(SR)}
          else if(15>=a&&a>5){Result.push(R)}
          else if(45>=a&&a>15){Result.push(UC)}
          else if(100>=a&&a>45){Result.push(C)}
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
        world.playSound(location,"random.levelup",2.0,1.0);
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

///////////////////////////////////////
//アイテム用
///////////////////////////////////////
//ヘラクレス
function herakuresuHelmet() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_HELMET);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§2§lヘラクレス(頭)");
  meta.setLore(["§f追加効果：","§d他のヘラクレスシリーズと合わせて装備すると","§d2セットで攻撃力上昇Ⅲ","§d4セットで攻撃力上昇Ⅳ", "","§b彼の有名な英雄ヘラクレスの防具"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "herakuresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function herakuresuChestplate() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§2§lヘラクレス(胴)");
  meta.setLore(["§f追加効果：","§d他のヘラクレスシリーズと合わせて装備すると","§d2セットで攻撃力上昇Ⅲ","§d4セットで攻撃力上昇Ⅳ", "","§b彼の有名な英雄ヘラクレスの防具"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "herakuresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function herakuresuLeggings() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_LEGGINGS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§2§lヘラクレス(足)");
  meta.setLore(["§f追加効果：","§d他のヘラクレスシリーズと合わせて装備すると","§d2セットで攻撃力上昇Ⅲ","§d4セットで攻撃力上昇Ⅳ", "","§b彼の有名な英雄ヘラクレスの防具"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "herakuresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function herakuresuBoots() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_BOOTS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§2§lヘラクレス(靴)");
  meta.setLore(["§f追加効果：","§d他のヘラクレスシリーズと合わせて装備すると","§d2セットで攻撃力上昇Ⅲ","§d4セットで攻撃力上昇Ⅳ", "","§b彼の有名な英雄ヘラクレスの防具"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "herakuresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ハヤブサの羽
function hayabusa() {
  // 作成
  var item = new ItemStack(Material.FEATHER);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§a§lハヤブサの羽");
  meta.setLore(["§f追加効果：","§d移動速度上昇Ⅱ","§dメインハンドに持つと移動速度上昇Ⅲ","","§b速く、速く、もっと速く..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "hayabusa");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ケラウノス(落雷の弓)
function keraunosu() {
  // 作成
  var item = new ItemStack(Material.BOW);
  item.addUnsafeEnchantment(Enchantment.ARROW_INFINITE,1);
  item.addUnsafeEnchantment(Enchantment.MENDING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§e§o§lケラウノス");
  meta.setLore(["§f特殊戦技『落雷』:","§d矢を放った先に雷が落ちる","§f追加効果：","§dウィザーⅡ","§d鈍足Ⅱ","§b全知全能の神ゼウスの力が込められた武器", "§b雷を呼び起こせるほどの強さを持つという..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "keraunosu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//アイギスの盾
function aigisu() {
  // 作成
  var item = new ItemStack(Material.SHIELD);
  item.addUnsafeEnchantment(Enchantment.THORNS,7);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§6§l§oアイギスの盾");
  meta.setLore(["§f追加効果：","§d耐性Ⅱ","","§bアテナの力を感じる盾", "§b災厄や魔物を退けるらしい..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "aigisu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//三叉槍
function sannsasou() {
  // 作成
  var item = new ItemStack(Material.TRIDENT);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  item.addUnsafeEnchantment(Enchantment.LOYALTY,10);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§9§l§o三叉槍");
  meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅱ","§d衝撃吸収Ⅰ","","§bポセイドンが持ったとされる武器", "§b海の支配者になれるかも..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "sannsasou");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ゼウス
function zeusu() {
  // 作成
  var item = new ItemStack(Material.YELLOW_DYE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§e§l§oゼウス");
  meta.setLore(["§f追加効果：","§d衝撃吸収Ⅰ（毎秒リセット）","§d耐火","","§bラース・オブ・ゴッド", "§b神々の力で溢れている..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "zeusu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//カラドボルグ
function karadoborugu() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_SWORD);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§3§l§oカラドボルグ");
  meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅲ(メインハンドのみ)","","§bエクスカリバーの原型とされている剣", "§b君も伝説の勇者に..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "karadoborugu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//エクスカリバー
function ekusukariba() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_SWORD);
  item.addUnsafeEnchantment(Enchantment.DAMAGE_UNDEAD,5);
  item.addUnsafeEnchantment(Enchantment.DAMAGE_ARTHROPODS,5);
  item.addUnsafeEnchantment(Enchantment.DAMAGE_ALL,5);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§6§l§oエクスカリバー");
  meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅰ","","§b言わずと知れた伝説の剣", "§b贋作も出回っているらしい..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "ekusukariba");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ポセイドン
function poseidonhead() {
 // 作成
 var item = new ItemStack(Material.DIAMOND_HELMET);
 item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
 var meta = item.getItemMeta();
 // メタ書き換え
 meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
 meta.setDisplayName("§9§l§oポセイドン(頭)");
 meta.setLore(["§f追加効果：","§d他のポセイドンシリーズと合わせて装備すると","§d2セットでイルカの好意","§d4セットでイルカの好意+コンジット", "","§b海の絶対者ポセイドン","§b川でも力発揮してるじゃないかって...?"]);
 var container = meta.getPersistentDataContainer();
 container.set(CUSOTM_TAG, PersistentDataType.STRING, "poseidon");
 // メタの保存
 item.setItemMeta(meta);
 return item;
}
function poseidonchestplate() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§9§l§oポセイドン(胸)");
  meta.setLore(["§f追加効果：","§d他のポセイドンシリーズと合わせて装備すると","§d2セットでイルカの好意","§d4セットでイルカの好意+コンジット", "","§b海の絶対者ポセイドン","§b川でも力発揮してるじゃないかって...?"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "poseidon");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function poseidonlegins() {
   // 作成
   var item = new ItemStack(Material.DIAMOND_LEGGINGS);
   item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
   var meta = item.getItemMeta();
   // メタ書き換え
   meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
   meta.setDisplayName("§9§l§oポセイドン(足)");
   meta.setLore(["§f追加効果：","§d他のポセイドンシリーズと合わせて装備すると","§d2セットでイルカの好意","§d4セットでイルカの好意+コンジット", "","§b海の絶対者ポセイドン","§b川でも力発揮してるじゃないかって...?"]);
   var container = meta.getPersistentDataContainer();
   container.set(CUSOTM_TAG, PersistentDataType.STRING, "poseidon");
   // メタの保存
   item.setItemMeta(meta);
   return item;
}
function poseidonboots() {
 // 作成
 var item = new ItemStack(Material.DIAMOND_BOOTS);
 item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
 var meta = item.getItemMeta();
 // メタ書き換え
 meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
 meta.setDisplayName("§9§l§oポセイドン(靴)");
 meta.setLore(["§f追加効果：","§d他のポセイドンシリーズと合わせて装備すると","§d2セットでイルカの好意","§d4セットでイルカの好意+コンジット", "","§b海の絶対者ポセイドン","§b川でも力発揮してるじゃないかって...?"]);
 var container = meta.getPersistentDataContainer();
 container.set(CUSOTM_TAG, PersistentDataType.STRING, "poseidon");
 // メタの保存
 item.setItemMeta(meta);
 return item;
}
//アテナ
function atenahead() {
// 作成
var item = new ItemStack(Material.DIAMOND_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§6§l§oアテナ(頭)");
meta.setLore(["§f追加効果：","§d他のアテナシリーズと合わせて装備すると","§d2セットで採掘速度上昇Ⅱ+弱体化","§d4セットで採掘速度上昇Ⅲ", "","§b技術・学芸や戦いなどをつかさどる女神","§b学力も上げてもらっていいですか..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "atena");
// メタの保存
item.setItemMeta(meta);
return item;
}
function  atenachestplate() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§6§l§oアテナ(胸)");
  meta.setLore(["§f追加効果：","§d他のアテナシリーズと合わせて装備すると","§d2セットで採掘速度上昇Ⅱ+弱体化","§d4セットで採掘速度上昇Ⅲ", "","§b技術・学芸や戦いなどをつかさどる女神","§b学力も上げてもらっていいですか..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "atena");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  atenalegins() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_LEGGINGS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§6§l§oアテナ(足)");
  meta.setLore(["§f追加効果：","§d他のアテナシリーズと合わせて装備すると","§d2セットで採掘速度上昇Ⅱ+弱体化","§d4セットで採掘速度上昇Ⅲ", "","§b技術・学芸や戦いなどをつかさどる女神","§b学力も上げてもらっていいですか..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "atena");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  atenaboots() {
// 作成
var item = new ItemStack(Material.DIAMOND_BOOTS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§6§l§oアテナ(靴)");
meta.setLore(["§f追加効果：","§d他のアテナシリーズと合わせて装備すると","§d2セットで採掘速度上昇Ⅱ+弱体化","§d4セットで採掘速度上昇Ⅲ", "","§b技術・学芸や戦いなどをつかさどる女神","§b学力も上げてもらっていいですか..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "atena");
// メタの保存
item.setItemMeta(meta);
return item;
}
//エイル
function eiruhead() {
// 作成
var item = new ItemStack(Material.DIAMOND_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.addAttributeModifier(Attribute.GENERIC_MAX_HEALTH, new AttributeModifier(UUID.randomUUID(), "generic.max_health", 4, AttributeModifier.Operation.ADD_NUMBER, EquipmentSlot.HEAD));
meta.setDisplayName("§5§l§oエイル(頭)");
meta.setLore(["§f追加効果：","§d他のエイルシリーズと合わせて装備すると","§d1セットにつきHP+4","§d2セットで再生Ⅰ","§d4セットで再生Ⅱ", "","§b死者をも蘇生できる治療の女神","§b女神様に治療していただけるなんて..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "eiru");
// メタの保存
item.setItemMeta(meta);
return item;
}
function  eiruchestplate() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addAttributeModifier(Attribute.GENERIC_MAX_HEALTH, new AttributeModifier(UUID.randomUUID(), "generic.max_health", 4, AttributeModifier.Operation.ADD_NUMBER, EquipmentSlot.CHEST));
  meta.setDisplayName("§5§l§oエイル(頭)");
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§5§l§oエイル(胸)");
  meta.setLore(["§f追加効果：","§d他のエイルシリーズと合わせて装備すると","§d1セットにつきHP+4","§d2セットで再生Ⅰ","§d4セットで再生Ⅱ", "","§b死者をも蘇生できる治療の女神","§b女神様に治療していただけるなんて..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "eiru");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  eirulegins() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_LEGGINGS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addAttributeModifier(Attribute.GENERIC_MAX_HEALTH, new AttributeModifier(UUID.randomUUID(), "generic.max_health", 4, AttributeModifier.Operation.ADD_NUMBER, EquipmentSlot.LEGS));
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§5§l§oエイル(足)");
  meta.setLore(["§f追加効果：","§d他のエイルシリーズと合わせて装備すると","§d1セットにつきHP+4","§d2セットで再生Ⅰ","§d4セットで再生Ⅱ", "","§b死者をも蘇生できる治療の女神","§b女神様に治療していただけるなんて..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "eiru");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  eiruboots() {
// 作成
var item = new ItemStack(Material.DIAMOND_BOOTS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addAttributeModifier(Attribute.GENERIC_MAX_HEALTH, new AttributeModifier(UUID.randomUUID(), "generic.max_health", 4, AttributeModifier.Operation.ADD_NUMBER, EquipmentSlot.FEET));
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§5§l§oエイル(靴)");
meta.setLore(["§f追加効果：","§d他のエイルシリーズと合わせて装備すると","§d1セットにつきHP+4","§d2セットで再生Ⅰ","§d4セットで再生Ⅱ", "","§b死者をも蘇生できる治療の女神","§b女神様に治療していただけるなんて..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "eiru");
// メタの保存
item.setItemMeta(meta);
return item;
}
//神の道しるべ
function  mitisirube() {
// 作成
var item = new ItemStack(Material.COMPASS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§c§l神の道しるべ");
meta.setLore(["§f追加効果：","§d満腹度回復Ⅰ","§d移動速度上昇Ⅰ","","§b神はどこへ私を導いてくださるのだろう"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "mitisirube");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ルナの半月刀
function  hanngetutou() {
// 作成
var item = new ItemStack(Material.DIAMOND_SWORD);
item.addUnsafeEnchantment(Enchantment.DURABILITY,5);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§5§lルナの半月刀");
meta.setLore(["","§bなんと美しいフォルム..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "hanngetutou");
// メタの保存
item.setItemMeta(meta);
return item;
}
//黄金のバット
function  batto() {
// 作成
var item = new ItemStack(Material.BLAZE_ROD);
item.addUnsafeEnchantment(Enchantment.KNOCKBACK,10);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§6§l黄金のバット");
meta.setLore(["","§b目指せホームラン王！"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "batto");
// メタの保存
item.setItemMeta(meta);
return item;
}
//アマテラスの冠
function  amaterasu() {
// 作成
var item = new ItemStack(Material.DIAMOND_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§e§lアマテラスの冠");
meta.setLore(["§f追加効果：","§d暗視","","§b世界を照らす...天照大神"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "amaterasu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//憤怒の血
function  hunndonoti() {
// 作成
var item = new ItemStack(Material.NETHER_WART);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§4§l憤怒の血");
meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅱ","","§b神々の怒りが込められている"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "hunndonoti");
// メタの保存
item.setItemMeta(meta);
return item;
}
//アキレス
function akiresuhead() {
// 作成
var item = new ItemStack(Material.DIAMOND_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§a§lアキレス(頭)");
meta.setLore(["§f追加効果：","§d他のアキレスシリーズと合わせて装備すると","§d2セットで移動速度上昇Ⅱ","§d4セットで移動速度上昇Ⅲ", "","§b屈強な脚で駆け巡れ！",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "akiresu");
// メタの保存
item.setItemMeta(meta);
return item;
}
function  akiresuchestplate() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§a§lアキレス(胸)");
  meta.setLore(["§f追加効果：","§d他のアキレスシリーズと合わせて装備すると","§d2セットで移動速度上昇Ⅱ","§d4セットで移動速度上昇Ⅲ", "","§b屈強な脚で駆け巡れ！",]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "akiresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  akiresulegins() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_LEGGINGS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§a§lアキレス(足)");
  meta.setLore(["§f追加効果：","§d他のアキレスシリーズと合わせて装備すると","§d2セットで移動速度上昇Ⅱ","§d4セットで移動速度上昇Ⅲ", "","§b屈強な脚で駆け巡れ！",]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "akiresu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  akiresuboots() {
// 作成
var item = new ItemStack(Material.DIAMOND_BOOTS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§a§lアキレス(靴)");
meta.setLore(["§f追加効果：","§d他のアキレスシリーズと合わせて装備すると","§d2セットで移動速度上昇Ⅱ","§d4セットで移動速度上昇Ⅲ", "","§b屈強な脚で駆け巡れ！",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "akiresu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//サタン
function satanhead() {
// 作成
var item = new ItemStack(Material.NETHERITE_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§8§l§oサタン(頭)");
meta.setLore(["§f追加効果：","§d他のサタンシリーズと合わせて装備すると","§dセットを重ねるごとにデバフが増加する...","","§bΟ Θεός και οι ανθρώπινοι εχθροί"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "satan");
// メタの保存
item.setItemMeta(meta);
return item;
}
function  satanchestplate() {
  // 作成
  var item = new ItemStack(Material.NETHERITE_CHESTPLATE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§8§l§oサタン(胸)");
  meta.setLore(["§f追加効果：","§d他のサタンシリーズと合わせて装備すると","§dセットを重ねるごとにデバフが増加する...","","§bΟ Θεός και οι ανθρώπινοι εχθροί"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "satan");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  satanlegins() {
  // 作成
  var item = new ItemStack(Material.NETHERITE_LEGGINGS);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§8§l§oサタン(足)");
  meta.setLore(["§f追加効果：","§d他のサタンシリーズと合わせて装備すると","§dセットを重ねるごとにデバフが増加する...","","§bΟ Θεός και οι ανθρώπινοι εχθροί"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "satan");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
function  satanboots() {
// 作成
var item = new ItemStack(Material.NETHERITE_BOOTS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§8§l§oサタン(靴)");
meta.setLore(["§f追加効果：","§d他のサタンシリーズと合わせて装備すると","§dセットを重ねるごとにデバフが増加する...","","§bΟ Θεός και οι ανθρώπινοι εχθροί"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "satan");
// メタの保存
item.setItemMeta(meta);
return item;
}
//カンガルーの加護
function  kanngaru() {
// 作成
var item = new ItemStack(Material.DIAMOND_BOOTS);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
meta.setDisplayName("§5§lカンガルーの加護");
meta.setLore(["§f追加効果：","§d跳躍力上昇Ⅲ","","§bホップ、ステップ、ジャンプ"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING,"kanngaru");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ヘファイストス
function  hehuxaisutosu() {
// 作成
var item = new ItemStack(Material.RED_DYE);
item.addUnsafeEnchantment(Enchantment.FIRE_ASPECT,2);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§4§lヘファイストス");
meta.setLore(["§f追加効果：","§d耐火","§d鈍足Ⅲ","","§b日々の鍛錬が結果となり実力となる"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "hehuxaisutosu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ヘラ
function  hera() {
// 作成
var item = new ItemStack(Material. CROSSBOW);
item.addUnsafeEnchantment(Enchantment.MULTISHOT,1);
item.addUnsafeEnchantment(Enchantment.PIERCING,4);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§5§lヘラ");
meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅰ","","§bあいつは今も女といる..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "hera");
// メタの保存
item.setItemMeta(meta);
return item;
}
//アポロン
function  aporonn() {
// 作成
var item = new ItemStack(Material. BOW);
item.addUnsafeEnchantment(Enchantment.MENDING,1);
item.addUnsafeEnchantment(Enchantment.ARROW_INFINITE,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§a§lアポロン");
meta.setLore(["","§bアポロンが狩りに用いたとされている弓"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "aporonn");
// メタの保存
item.setItemMeta(meta);
return item;
}
//聖書
function  seisyo() {
// 作成
var item = new ItemStack(Material.BOOK);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§9§l聖書");
meta.setLore(["§f追加効果：","§d耐性Ⅰ","","§b有難いお言葉が書かれている..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "seisyo");
// メタの保存
item.setItemMeta(meta);
return item;
}
//クロノス
function  kuronosu() {
// 作成
var item = new ItemStack(Material.GRAY_DYE);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§7§lクロノス");
meta.setLore(["§f追加効果：","§d低速落下","","§b大地讃頌"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "kuronosu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//アレス
function  aresu() {
// 作成
var item = new ItemStack(Material.PINK_DYE);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§c§lアレス");
meta.setLore(["§f追加効果：","§d村の英雄","","§b戦狂いの男の気配がする..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "aresu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//隠れ兜
function  kakurekabuto() {
// 作成
var item = new ItemStack(Material.DIAMOND_HELMET);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§a§l隠れ兜");
meta.setLore(["§f追加効果：","§d透明化","","§b頭隠して尻隠さず"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "kakurekabuto");
// メタの保存
item.setItemMeta(meta);
return item;
}
//えくすかりばー
function  ekusukaribanise() {
// 作成
var item = new ItemStack(Material.DIAMOND_SWORD);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§6§lえくすかりばー");
meta.setLore(["","§bしまった！偽物だ！"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "ekusukaribanise");
// メタの保存
item.setItemMeta(meta);
return item;
}
//セレス
function  seresu() {
// 作成
var item = new ItemStack(Material.DIAMOND_HOE);
item.addUnsafeEnchantment(Enchantment.LOOT_BONUS_BLOCKS,4);
var meta = item.getItemMeta();
// メタ書き換え
meta.setDisplayName("§2§lセレス");
meta.setLore(["","§b今年も豊作になりますように..."]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "seresu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ミョルニル
function  myoruniru() {
// 作成
var item = new ItemStack(Material.DIAMOND_AXE);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§c§l§oミョルニル");
meta.setLore(["§f特殊戦技『粉砕』:","§d敵を殴ると爆発を起こす","§f追加効果：","§d攻撃力上昇Ⅱ","","§bー全てを粉砕し殲滅するー","§b戦神トールが使ったとされる武器"]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "myoruniru");
// メタの保存
item.setItemMeta(meta);
return item;
}
//金剛杵
function  konngoukine() {
// 作成
var item = new ItemStack(Material.ORANGE_DYE);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§e§l金剛杵");
meta.setLore(["§f追加効果：","§d採掘速度上昇Ⅰ","","§b修行を重ねれば結果は必ずついてくる",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "konngoukine");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ロキ
function  roki() {
// 作成
var item = new ItemStack(Material.PURPLE_DYE);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§5§lロキ");
meta.setLore(["§f追加効果：","§d跳躍力上昇Ⅱ","§d弱体化Ⅱ","","§b嘘と邪悪に包まれた神のようだ...",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "roki");
// メタの保存
item.setItemMeta(meta);
return item;
}
//クラウソラス
function  kurausorasu() {
// 作成
var item = new ItemStack(Material.DIAMOND_SWORD);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§e§lクラウソラス");
meta.setLore(["§f追加効果：","§d発光Ⅰ","§d攻撃力上昇Ⅰ","","§b敵を照らし出せ！って...あれ？",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "kurausorasu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//ホロブレス
function  horoburesu() {
// 作成
var item = new ItemStack(Material.DRAGON_BREATH);
item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
var meta = item.getItemMeta();
// メタ書き換え
meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
meta.setDisplayName("§5§lホロブレス");
meta.setLore(["§f追加効果：","§d耐火","§d衰弱","§d攻撃力上昇Ⅱ","","§bー強さの代償ー",]);
var container = meta.getPersistentDataContainer();
container.set(CUSOTM_TAG, PersistentDataType.STRING, "horoburesu");
// メタの保存
item.setItemMeta(meta);
return item;
}
//木馬
function  mokuba() {
  // 作成
  var item = new ItemStack(Material.SADDLE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§5§lトロイの木馬");
  meta.setLore(["§f追加効果：","§d鈍足Ⅱ","§d弱体化Ⅱ","","§bオデュッセウスの気配を感じる...",]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "mokuba");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//エンリル
function  ennriru() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_PICKAXE);
  item.addUnsafeEnchantment(Enchantment.SILK_TOUCH,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDisplayName("§3§l§oエンリルのツルハシ");
  meta.setLore(["§f特殊戦技『勤労』：","§d前方2×3のブロックを破壊する","§d自分より下の高さのブロックは破壊しない","§f追加効果：","§d採掘速度上昇Ⅱ","","§b働け、働くのだ","§bそ、そんなぁ..."]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "ennriru");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//打ち出の小槌
function  koduti() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_PICKAXE);
  item.addUnsafeEnchantment(Enchantment.LOOT_BONUS_BLOCKS,10);
  item.addUnsafeEnchantment(Enchantment.DIG_SPEED,10);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.setDamage(1511)
  meta.setDisplayName("§e§l打ち出の小槌");
  meta.setLore(["§f追加効果：","§d合成不可","","§bえ、回数制限あるの？！"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "koduti");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//スレイプニル
function  sureipuniru() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_HORSE_ARMOR);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§2§lスレイプニル");
  meta.setLore(["§f追加効果：","§d合成不可","","§b足を8本持つとされる伝説の馬"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "sureipuniru");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ディオニソス
function  dexionisosu() {
  // 作成
  var item = new ItemStack(Material.BLACK_DYE);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§7§lディオニソス");
  meta.setLore(["§f追加効果：","§d攻撃力上昇Ⅰ","§d衝撃吸収Ⅰ","§d移動速度低下Ⅰ","§d盲目Ⅰ","","§b酔いの効果"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "dexionisosu");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//ルシファー
function  rusihuxa() {
  // 作成
  var item = new ItemStack(Material.BOOK);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags([ItemFlag.HIDE_ENCHANTS]);
  meta.setDisplayName("§8§lルシファーの書");
  meta.setLore(["§f追加効果：","§d盲目Ⅰ","§d弱体化Ⅰ","§d空腹Ⅰ","","§b悪魔の力が込められているのかもしれない"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "rusihuxa");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//アマテラスの冠(贋作)
function  amaterasunise() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_HELMET);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§e§lアマテラスの冠(贋作）");
  meta.setLore(["§f追加効果：","§d暗視","§d弱体化Ⅱ","","§b世界を照らす...偽物じゃないか！"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING, "amaterasunise");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}
//村正
function  muramasa() {
  // 作成
  var item = new ItemStack(Material.DIAMOND_SWORD);
  item.addUnsafeEnchantment(Enchantment.CHANNELING,1);
  var meta = item.getItemMeta();
  // メタ書き換え
  meta.addItemFlags(ItemFlag.HIDE_ENCHANTS);
  meta.setDisplayName("§5§l§o村正");
  meta.setLore(["§f特殊戦技『妖刀』：","§d攻撃した敵にデバフと負傷ダメージを与える","§f追加効果：","§d移動速度上昇Ⅱ","","§b美しいオーラーを放っている...","§b斬れ味はすさまじく天下人にもこよなく愛された"]);
  var container = meta.getPersistentDataContainer();
  container.set(CUSOTM_TAG, PersistentDataType.STRING,"muramasa");
  // メタの保存
  item.setItemMeta(meta);
  return item;
}









// 付与したタグを取得する関数
function getCustomTag(item) {
  if (item == null || Material.AIR.equals(item.getType()))
      return;

  var meta = item.getItemMeta();
  var container = meta.getPersistentDataContainer();
  return container.get(CUSOTM_TAG, PersistentDataType.STRING);
}


// テスト giveコマンド登録
bjs.command("giveherakuresu", function(sender) {
  sender.getInventory().addItem (herakuresuHelmet());
  sender.getInventory().addItem (herakuresuChestplate());
  sender.getInventory().addItem (herakuresuLeggings());
  sender.getInventory().addItem (herakuresuBoots());

});
bjs.command("givehayabusa", function(sender) {
  sender.getInventory().addItem(hayabusa());
});
bjs.command("givekeraunosu", function(sender) {
  sender.getInventory().addItem(keraunosu());
});
bjs.command("giveaigisu", function(sender) {
  sender.getInventory().addItem(aigisu());
});
bjs.command("givesannsasou", function(sender) {
  sender.getInventory().addItem(sannsasou());
});
bjs.command("givezeusu", function(sender) {
  sender.getInventory().addItem(zeusu());
});
bjs.command("givekaradoborugu", function(sender) {
  sender.getInventory().addItem(karadoborugu());
});
bjs.command("giveekusukariba", function(sender) {
  sender.getInventory().addItem(ekusukariba());
});
bjs.command("giveposeidon", function(sender) {
  sender.getInventory().addItem (poseidonhead());
  sender.getInventory().addItem (poseidonchestplate());
  sender.getInventory().addItem (poseidonlegins());
  sender.getInventory().addItem (poseidonboots());

});
bjs.command("giveatena", function(sender) {
  sender.getInventory().addItem (atenahead());
  sender.getInventory().addItem (atenachestplate());
  sender.getInventory().addItem (atenalegins());
  sender.getInventory().addItem (atenaboots());

});
bjs.command("giveeiru", function(sender) {
  sender.getInventory().addItem (eiruhead());
  sender.getInventory().addItem (eiruchestplate());
  sender.getInventory().addItem (eirulegins());
  sender.getInventory().addItem (eiruboots());

});
bjs.command("givemitisirube", function(sender) {
  sender.getInventory().addItem(mitisirube());
});
bjs.command("givehanngetutou", function(sender) {
  sender.getInventory().addItem(hanngetutou());
});
bjs.command("giveamaterasu", function(sender) {
  sender.getInventory().addItem(amaterasu());
});
bjs.command("givebatto", function(sender) {
  sender.getInventory().addItem(batto());
});
bjs.command("givehunndonoti", function(sender) {
  sender.getInventory().addItem(hunndonoti());
});
bjs.command("giveakiresu", function(sender) {
  sender.getInventory().addItem (akiresuhead());
  sender.getInventory().addItem (akiresuchestplate());
  sender.getInventory().addItem (akiresulegins());
  sender.getInventory().addItem (akiresuboots());

});
bjs.command("givekanngaru", function(sender) {
  sender.getInventory().addItem (kanngaru());
});
bjs.command("givesatan", function(sender) {
  sender.getInventory().addItem (satanhead());
  sender.getInventory().addItem (satanchestplate());
  sender.getInventory().addItem (satanlegins());
  sender.getInventory().addItem (satanboots());

});
bjs.command("givehehuxaisutosu", function(sender) {
  sender.getInventory().addItem(hehuxaisutosu());
});
bjs.command("givehera", function(sender) {
  sender.getInventory().addItem(hera());
});
bjs.command("giveaporonn", function(sender) {
  sender.getInventory().addItem(aporonn());
});
bjs.command("giveseisyo", function(sender) {
  sender.getInventory().addItem(seisyo());
});
bjs.command("givekuronosu", function(sender) {
  sender.getInventory().addItem(kuronosu());
});
bjs.command("givearesu", function(sender) {
  sender.getInventory().addItem(aresu());
});
bjs.command("givekakurekabuto", function(sender) {
  sender.getInventory().addItem(kakurekabuto());
});
bjs.command("giveekusukaribanise", function(sender) {
  sender.getInventory().addItem(ekusukaribanise());
});
bjs.command("giveseresu", function(sender) {
  sender.getInventory().addItem(seresu());
});
bjs.command("givemyoruniru", function(sender) {
  sender.getInventory().addItem(myoruniru());
});
bjs.command("givekonngoukine", function(sender) {
  sender.getInventory().addItem(konngoukine());
});
bjs.command("giveroki", function(sender) {
  sender.getInventory().addItem(roki());
});
bjs.command("givekurausorasu", function(sender) {
  sender.getInventory().addItem(kurausorasu());
});
bjs.command("givehoroburesu", function(sender) {
  sender.getInventory().addItem(horoburesu());
});
bjs.command("givemokuba", function(sender) {
  sender.getInventory().addItem(mokuba());
});
bjs.command("giveennriru", function(sender) {
  sender.getInventory().addItem(ennriru());
});
bjs.command("givekoduti", function(sender) {
  sender.getInventory().addItem(koduti());
});
bjs.command("givesureipuniru", function(sender) {
  sender.getInventory().addItem(sureipuniru());
});
bjs.command("giverusihuxa", function(sender) {
  sender.getInventory().addItem(rusihuxa());
});
bjs.command("givedexionisosu", function(sender) {
  sender.getInventory().addItem(dexionisosu());
});
bjs.command("giveamaterasunise", function(sender) {
  sender.getInventory().addItem(amaterasunise());
});
bjs.command("givemuramasa", function(sender) {
  sender.getInventory().addItem(muramasa());
});









// 1秒ごとに調べてエフェクトを付与する
var itemEffects = new java.util.HashMap();  // Map(pId: Map(EffectType, Bool(active)))
var activeEffects = new java.util.HashMap();  // Map(pId: Set(EffectType))
function markEffect(player, effectType) {
  if (!itemEffects.containsKey(player.uniqueId)) {
      itemEffects.put(player.uniqueId, new java.util.HashMap());
  }
  itemEffects.get(player.uniqueId).put(effectType, true);
}
function unmarkEffect(player, effectType) {
  if (!itemEffects.containsKey(player.uniqueId)) {
      itemEffects.put(player.uniqueId, new java.util.HashMap());
  }
  if (!itemEffects.get(player.uniqueId).containsKey(effectType)) {
      itemEffects.get(player.uniqueId).put(effectType, false);
  }
}
function clearEffect(player) {
  var removes = new java.util.HashSet();
  if (itemEffects.containsKey(player.uniqueId)) {
      itemEffects.get(player.uniqueId).forEach(function(effectType, added) {
          if (added) {
              if (!activeEffects.containsKey(player.uniqueId)) {
                  activeEffects.put(player.uniqueId, new java.util.HashSet());
              }
              activeEffects.get(player.uniqueId).add(effectType);
          } else {
              removes.add(effectType);
          }
      });
  }
  if (activeEffects.containsKey(player.uniqueId)) {
      activeEffects.get(player.uniqueId).forEach(function(effectType) {
          if (removes.contains(effectType)) {
              player.removePotionEffect(effectType); 
          }
      });
      activeEffects.get(player.uniqueId).removeAll(removes);
  }
  itemEffects.remove(player.uniqueId);
}
function isActiveEffect(player, effectType, effectLevel) {
  return player.getActivePotionEffects().stream()
      .anyMatch(function(e) { return e.type.equals(effectType) && e.amplifier == effectLevel; });
}
bjs.on("playerQuit", function(event) {
  itemEffects.remove(event.player.uniqueId);
  activeEffects.remove(event.player.uniqueId);
});

bjs.scheduleLoopTask(20, function(task) {
  bjs.getPlayers().forEach(function(player) {
      var customArmoredherakuresu = 0;
      var customArmoredposeidon = 0;
      var customArmoredatena = 0;
      var customArmoredeiru = 0;
      var customArmoredamaterasu = 0;
      var customArmoredakiresu = 0;
      var customArmoredsatan = 0;
      var customArmoredkanngaru= 0;
      var customArmoredkakurekabuto= 0;
      var customArmoredamaterasunise= 0;
      var armors = player.getInventory().getArmorContents();
      var items = player.getInventory().getItemInMainHand();
      var items2=player.getInventory().getItemInOffHand();
    
      for (idx in armors) {
          var armor = armors[idx];
          if ("herakuresu" == getCustomTag(armor)) {
              customArmoredherakuresu += 1;
          }
          if ("poseidon" == getCustomTag(armor)) {
              customArmoredposeidon += 1;
          }
          if ("atena" == getCustomTag(armor)) {
              customArmoredatena += 1;
          }
          if ("eiru" == getCustomTag(armor)) {
              customArmoredeiru += 1;
          }
          if ("amaterasu" == getCustomTag(armor)) {
              customArmoredamaterasu += 1;
          }
          if ("akiresu" == getCustomTag(armor)) {
              customArmoredakiresu += 1;
          }
          if ("satan" == getCustomTag(armor)) {
              customArmoredsatan += 1;
          }
          if ("kanngaru" == getCustomTag(armor)) {
              customArmoredkanngaru += 1;
          }
          if ("kakurekabuto" == getCustomTag(armor)) {
              customArmoredkakurekabuto += 1;
          }
          if ("amaterasunise" == getCustomTag(armor)) {
            customArmoredamaterasunise += 1;
        }
      }  

      //ヘラクレス
      if (customArmoredherakuresu >= 4) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 3, false, false))
      } else if (customArmoredherakuresu >= 2) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 2, false, false))
      } 
　　　　//ハヤブサ
       if ("hayabusa" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 2, false, false)) 
          }
      else if("hayabusa" == getCustomTag(items)||getCustomTag(items2)=="hayabusa" ){
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 1, false, false)) 
      }
     //アイギス
      if ("aigisu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, 30, 1, false, false)) 
          }
      else if("aigisu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, 30, 1, false, false)) 
      }
      //ケラウノス
      if ("keraunosu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 2, false, false)) 
          }
      else if("keraunosu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 2, false, false)) 
      }
       //三叉槍
       if ("sannsasou" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 30, 0, false, false)) 
          }
      else if("sannsasou" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 30, 0, false, false)) 
      }
        //ゼウス
        if ("zeusu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 30, 0, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false)) 
          }
      else if("zeusu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 30, 0, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false)) 
      }
      //カラドボルグ
      if ("karadoborugu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 2, false, false)) 
          }
      //else if("karadoborugu" == getCustomTag(items2)){
          //player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 2, false, false)) 
      //}
      //エクスカリバー
      if ("ekusukariba" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
          }
      else if("ekusukariba" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
      }
      //ポセイドン 
      if (customArmoredposeidon >= 4) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.CONDUIT_POWER, 30, 0, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.DOLPHINS_GRACE, 30, 0, false, false))
      } else if (customArmoredposeidon >= 2) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.DOLPHINS_GRACE, 30, 0, false, false))
      }
      //アテナ
      if (customArmoredatena >= 4) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 2, false, false))
      } else if (customArmoredatena >= 2) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 1, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 1, false, false))
      }
      //エイル
      if (customArmoredeiru >= 4) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.REGENERATION, 1)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.REGENERATION, 2147483647, 1, false, false));
              // 付与したことをマークする
              markEffect(player, PotionEffectType.REGENERATION);
          }
      }
      if (customArmoredeiru >= 2) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.REGENERATION, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.REGENERATION, 2147483647, 0, false, false));
              // 付与したことをマークする
              markEffect(player, PotionEffectType.REGENERATION);
          }
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.REGENERATION);
      }
      //道しるべ
      if ("mitisirube" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SATURATION, 30, 0, false, false))  
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 0, false, false))  
      }
      else if("mitisirube" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.SATURATION, 30, 0, false, false))  
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 0, false, false))   
      }
      //アマテラス
      if (customArmoredamaterasu >= 1) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.NIGHT_VISION, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, 2147483647, 0, false, false));
          }

          // 付与したことをマークする
          markEffect(player, PotionEffectType.NIGHT_VISION);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.NIGHT_VISION);
      }
      //憤怒の血
      if ("hunndonoti" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false))  
          }
      else if("hunndonoti" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false))   
      }
      //アキレス 
      if (customArmoredakiresu >= 4) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 2, false, false))
      } else if (customArmoredakiresu >= 2) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 1, false, false))
      }
      //サタン
      if (customArmoredsatan >= 4) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW_DIGGING, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.UNLUCK, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.GLOWING, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.CONFUSION, 30, 2, false, false))
      } 
      else if (customArmoredsatan >= 3) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW_DIGGING, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.CONFUSION, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.UNLUCK, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.GLOWING, 30, 2, false, false))
      }
      else if (customArmoredsatan >= 2) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.GLOWING, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW_DIGGING, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.UNLUCK, 30, 2, false, false))
      } 
      else if (customArmoredsatan >= 1) {
          player.addPotionEffect(new PotionEffect(PotionEffectType. WEAKNESS, 30, 2, false, false))
          player.addPotionEffect(new PotionEffect(PotionEffectType.UNLUCK, 30, 2, false, false))
      }
      //サタン（その他）
      if (customArmoredsatan >= 4) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 2, false, false));
              // 付与したことをマークする
          }
          if (!isActiveEffect(player, PotionEffectType.HUNGER, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.HUNGER, 2147483647, 2, false, false));
              // 付与したことをマークする  
          }
          if (!isActiveEffect(player, PotionEffectType.POISON, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.POISON, 2147483647, 2, false, false));
              // 付与したことをマークする  
          }
          if (!isActiveEffect(player, PotionEffectType.WITHER, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.WITHER, 2147483647, 2, false, false));
              // 付与したことをマークする
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.HUNGER);
          markEffect(player, PotionEffectType.POISON);
          markEffect(player, PotionEffectType.WITHER);
      }
      else if (customArmoredsatan >= 3) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 2, false, false));
              // 付与したことをマークする  
          }
          if (!isActiveEffect(player, PotionEffectType.HUNGER, 2)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.HUNGER, 2147483647, 2, false, false));
              // 付与したことをマークする
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.HUNGER);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.BLINDNESS);
          unmarkEffect(player, PotionEffectType.POISON);
          unmarkEffect(player, PotionEffectType.WITHER);
          unmarkEffect(player, PotionEffectType.HUNGER);
      }
      //カンガルーの加護
      if (customArmoredkanngaru >= 1) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.JUMP, 30, 2, false, false))
      }
      //ヘファイストス
      if ("hehuxaisutosu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 2, false, false))
          }
      else if("hehuxaisutosu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 2, false, false))
      }
       //ヘラ
       if ("hera" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
          }
      else if("hera" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
      }
      //聖書
      if ("seisyo" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, 30, 1, false, false)) 
          }
      else if("seisyo" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, 30, 1, false, false)) 
      }
      //クロノス
      if ("kuronosu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW_FALLING, 30, 0, false, false)) 
          }
      else if("kuronosu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW_FALLING, 30, 0, false, false)) 
      }
      //アレス
      if ("aresu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.HERO_OF_THE_VILLAGE, 30, 0, false, false)) 
          }
      else if("aresu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.HERO_OF_THE_VILLAGE, 30, 0, false, false)) 
      }
      //隠れ兜
      if (customArmoredkakurekabuto >= 1) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INVISIBILITY, 30, 0, false, false))
      }
       //ミョルニル
      if ("myoruniru" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
          }
      else if("myoruniru" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
      }
      //金剛杵
      if ("konngoukine" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 0, false, false)) 
          }
      else if("konngoukine" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 0, false, false)) 
      }
      //ロキ
      if ("roki" == getCustomTag(items)) {
      player.addPotionEffect(new PotionEffect(PotionEffectType.JUMP, 30, 1, false, false)) 
      player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 1, false, false)) 
      }
      else if("roki" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.JUMP, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 1, false, false)) 
      }
      //クラウソラス
      if ("kurausorasu" == getCustomTag(items)) {
      player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
      player.addPotionEffect(new PotionEffect(PotionEffectType.GLOWING, 30, 0, false, false)) 
      }
      else if("kurausorasu" == getCustomTag(items2)){
      player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
      player.addPotionEffect(new PotionEffect(PotionEffectType.GLOWING, 30, 0, false, false)) 
      }
      //ホロブレス
      if ("horoburesu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false))
          }
          else if("horoburesu" == getCustomTag(items2)){
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.FIRE_RESISTANCE, 30, 0, false, false)) 
          }
      //ホロブレス（その他）
      if ("horoburesu" == getCustomTag(items)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.WITHER, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType. WITHER, 2147483647, 0, false, false));
              // 付与したことをマークする
          }
          markEffect(player, PotionEffectType.WITHER);
      }
      else if ("horoburesu" == getCustomTag(items2)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.WITHER, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.WITHER, 2147483647, 0, false, false));
              // 付与したことをマークする
          }
          markEffect(player, PotionEffectType.WITHER);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.WITHER);
      }
      //トロイアの木馬
      if ("mokuba" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 1, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 1, false, false)) 
          }
      else if("mokuba" == getCustomTag(items2)){
      player.addPotionEffect(new PotionEffect(PotionEffectType. WEAKNESS, 30, 1, false, false)) 
      player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 1, false, false)) 
      }
      //エンリル
      if ("ennriru" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 1, false, false)) 
      }
      //ディオニソス
      if ("dexionisosu" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.INCREASE_DAMAGE, 30, 0, false, false)) 
          player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 0, false, false)) 
          }
      else if("dexionisosu" == getCustomTag(items2)){
      player.addPotionEffect(new PotionEffect(PotionEffectType. INCREASE_DAMAGE, 30, 0, false, false)) 
      player.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 30, 0, false, false)) 
      }
       //ディオニソス（その他）
      if ("dexionisosu" == getCustomTag(items)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 0, false, false));
          }
          if (!isActiveEffect(player, PotionEffectType.ABSORPTION, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 2147483647, 0, false, false));
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.ABSORPTION);
      }
      else if ("dexionisosu" == getCustomTag(items2)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 0, false, false));
          }
          if (!isActiveEffect(player, PotionEffectType.ABSORPTION, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.ABSORPTION, 2147483647, 0, false, false));
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.ABSORPTION);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.BLINDNESS);
          unmarkEffect(player, PotionEffectType.ABSORPTION);
      }
      //ルシファーの書
      if ("rusihuxa" == getCustomTag(items)) {
          player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 0, false, false)) 
          }
      else if("rusihuxa" == getCustomTag(items2)){
      player.addPotionEffect(new PotionEffect(PotionEffectType. WEAKNESS, 30, 0, false, false)) 
      }
　　　　//ルシファー（その他）
      if ("rusihuxa" == getCustomTag(items)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 0, false, false));
          }
          if (!isActiveEffect(player, PotionEffectType.HUNGER, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.HUNGER, 2147483647, 0, false, false));
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.HUNGER);
      }
      else if ("rusihuxa" == getCustomTag(items2)) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.BLINDNESS, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, 2147483647, 0, false, false));
          }
          if (!isActiveEffect(player, PotionEffectType.HUNGER, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.HUNGER, 2147483647, 0, false, false));
          }
          markEffect(player, PotionEffectType.BLINDNESS);
          markEffect(player, PotionEffectType.HUNGER);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.BLINDNESS);
          unmarkEffect(player, PotionEffectType.HUNGER);
      }
        //アマテラス(贋作)
      if (customArmoredamaterasunise >= 1) {
          // 付与したい効果とレベルが付与されていない？
          if (!isActiveEffect(player, PotionEffectType.NIGHT_VISION, 0)) {
              player.addPotionEffect(new PotionEffect(PotionEffectType.NIGHT_VISION, 2147483647, 0, false, false));
              // 付与したことをマークする
          }
          markEffect(player, PotionEffectType.NIGHT_VISION);
      }
      else {
          // 付与してないことをマークする
          unmarkEffect(player, PotionEffectType.NIGHT_VISION);
      }
      //アマテラス（贋作）（その他）
      if (customArmoredamaterasunise>= 1) {
        player.addPotionEffect(new PotionEffect(PotionEffectType.WEAKNESS, 30, 1, false, false))
      }
　　　//村正
      if ("muramasa" == getCustomTag(items)) {
        player.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 30, 1, false, false)) 
        }
      else if("muramasa" == getCustomTag(items2)){
      player.addPotionEffect(new PotionEffect(PotionEffectType. SPEED, 30, 1, false, false)) 
      } 



      // 全ての防具より一番下に
      clearEffect(player);
  });
});
       






//雷の弓
//key用
var arrows=[];
//弓が放たれた時
bjs.on("entityshootbow", function(event) {
  //放たれた弓の情報を取得   
  var bow = event.getBow();

  //もしそのアイテムがケラウノスのタグを持っていたら
  if (getCustomTag(bow) == "keraunosu") {
      //keyとしてその放たれた矢の情報を配列に入れる
      arrows.push(event.projectile);
  }
});
//矢がヒットしたとき
bjs.on("projectilehit", function(event) {
  //ヒットした矢の情報を取得
  var arrow = event.entity;

  //もしその矢と一致する情報が配列に含まれていたら
  if (arrows.indexOf(arrow) != -1) {
      //配列からイベントのあった矢を削除
      arrows.filter(function(x){return x !=arrow });

      //ヒットしたエンティティもしくはブロックのデータを取得
      var entity = event.hitEntity;
      var block = event.hitBlock;

      //もしブロックデータが空＝あたったのがエンティティなら
      if (block == null&&entity instanceof LivingEntity) {
          //そのエンティティのワールドと場所を取得
          var location1 = entity.location;
          var world1 = entity.world;
          //取得した場所にダメージのある雷を落とす
          world1.strikeLightning(location1)
         entity.addPotionEffect(new PotionEffect(PotionEffectType.WITHER, 140, 2, false, false)) 
         entity.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 140, 2, false, false)) 
      }
      //もしエンティティデータが空＝当たったのがブロックなら
      //if (entity == null) {
         // var world2 = block.world;
          //var location2 = block.location;
         // world2.strikeLightning(location2) 
     // }   
  }
});
//爆破斧
bjs.on("entitydamagebyentity", function(event) {
 
  var damager= event.damager
  if (damager instanceof Player) {
  var entity=event.entity
  var world=entity.world
  var location =entity.location
  var items = damager.getInventory().getItemInMainHand();
      if (getCustomTag(items) == "myoruniru") {
        // 棘によるダメージだったら無視
        if (EntityDamageEvent.DamageCause.THORNS == event.cause)
          return;

         if(entity instanceof LivingEntity){
          world.createExplosion(location,1.8,false,false,null);
         }
         if(!(entity instanceof Player)){
          var damage=event.getFinalDamage ()
          event.setDamage (damage*0.3)
         }
      }
  }
});


//一括破壊ツルハシ  
bjs.on("blockbreak", function(event) {
 
  var player = event.player
  var items = player.getInventory().getItemInMainHand();
  var location1 =event.block.location
  var world=event.block.world
  var z=location1.z
  var y=location1.y
  var x=location1.x

  if (getCustomTag(items) == "ennriru") {
      var location2=event.player.location
      var vector=location2.direction.normalize()
      var vx =vector.getX()
      var vz =vector.getZ()
      //採掘ルールを適用した関数
      function block(x,y,z){
          var location=new locatioN(world,x,y,z);
          var prohibit=["BEDROCK","END_PORTAL","END_PORTAL_FRAME","END_GATEWAY","NETHER_PORTAL","BARRIER","COMMAND_BLOCK","COMMAND_BLOCK_MINECART","LIGHT"]
          if ((prohibit.indexOf(""+location.block.type) == -1)&&!(location2.y>location.y)){
              location.block.breakNaturally(items);
          }
      }
  
      if(Math.abs(vx)>Math.abs(vz)){
      block(x,y,z+1)
      block(x,y,z-1)
      block(x,y-1,z)
      block(x,y-1,z-1)
      block(x,y-1,z+1)
     }
     if (Math.abs(vz)>Math.abs(vx)){
      block(x+1,y,z)
      block(x-1,y,z)
      block(x,y-1,z)
      block(x+1,y-1,z)
      block(x-1,y-1,z)
     }
  }

}); 
//馬鎧
bjs.on("entitymount", function(event) {
  var entity=""+event.mount.type
  if(entity=="HORSE"){
      var horse= event.mount
      var item =horse.inventory.armor
      if(getCustomTag(item) == "sureipuniru"){
          horse.addPotionEffect(new PotionEffect(PotionEffectType.HEALTH_BOOST, 2147483647, 1, false, false)) 
          horse.addPotionEffect(new PotionEffect(PotionEffectType.SPEED, 2147483647, 2, false, false)) 
          horse.addPotionEffect(new PotionEffect(PotionEffectType.JUMP, 2147483647, 3, false, false)) 
          horse.addPotionEffect(new PotionEffect(PotionEffectType.DAMAGE_RESISTANCE, 2147483647, 1, false, false)) 
          horse.addPotionEffect(new PotionEffect(PotionEffectType.HEAL, 2147483647, 0, false, false)) 
      }
  }
}); 
bjs.on("entitydismount", function(event) {
  var entity=""+event.dismounted.type
  if(entity=="HORSE"){
      var horse= event.dismounted
          horse.removePotionEffect(PotionEffectType.HEALTH_BOOST)
          horse.removePotionEffect(PotionEffectType.SPEED)
          horse.removePotionEffect(PotionEffectType.JUMP)
          horse.removePotionEffect(PotionEffectType.DAMAGE_RESISTANCE)
          horse.removePotionEffect(PotionEffectType.HEAL)
  }
}); 
//合成不可
bjs.on("prepareanvil", function(event) { 
  var item=event.result
  if(getCustomTag(item) == "koduti"){
       event.inventory.setRepairCost(2147483647)
  }
}); 
//村正
bjs.on("entitydamagebyentity", function(event) {  
  var player=event.damager
  var enemy=event.entity
  if (player instanceof Player) {
    var item=player.getInventory().getItemInMainHand();
    if(getCustomTag(item) == "muramasa"){
       enemy.addPotionEffect(new PotionEffect(PotionEffectType.WITHER, 140, 2, false, false)) 
       //enemy.addPotionEffect(new PotionEffect(PotionEffectType.POISON, 140, 2, false, false))
       enemy.addPotionEffect(new PotionEffect(PotionEffectType.SLOW, 140, 2, false, false))  
       enemy.addPotionEffect(new PotionEffect(PotionEffectType.HUNGER, 140, 2, false, false))  
       enemy.addPotionEffect(new PotionEffect(PotionEffectType.HARM, 10, 1, false, false))  
       if(!(enemy instanceof Player)){
        var damage=event.getFinalDamage ()
        event.setDamage (damage*0.8)
       }
    }
  }
}); 

//ダメージ補正
bjs.on("entitydamagebyentity", function(event) {
 
    var damager= event.damager
    if (damager instanceof Player) {
    var entity=event.entity
    var items = damager.getInventory().getItemInMainHand();
        if (getCustomTag(items) =="karadoborugu") {
           if(!(entity instanceof Player)){
            var damage=event.getFinalDamage ()
            event.setDamage (damage*0.8)
           }
        }
    }
  });