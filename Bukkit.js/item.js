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
var blockCommandSender = Java.type("org.bukkit.command.BlockCommandSender");
var Color = Java.type("org.bukkit.Color");
var TreeType = Java.type("org.bukkit.TreeType");
var MyPetApi = Java.type("de.Keyle.MyPet.MyPetApi");
var InactiveMyPet = Java.type("de.Keyle.MyPet.entity.InactiveMyPet");
var MyPetType = Java.type("de.Keyle.MyPet.api.entity.MyPetType");
var WorldGroup = Java.type("de.Keyle.MyPet.api.WorldGroup");
var RepositoryCallback = Java.type("de.Keyle.MyPet.api.repository.RepositoryCallback");
var Animals = Java.type("org.bukkit.entity.Animals");
var EntityType = Java.type("org.bukkit.entity.EntityType");
var CUSOTM_TAG = new NamespacedKey(bjs.getOwner(), "potion_item");
var config = bjs.getConfig();
config.load();

function createItem(material, amount) {
    return new ItemStack(material, (amount) ? amount : 1);
  }
//エンリル
function  ennriru1() {
    // 作成
    var item = new ItemStack(Material.DIAMOND_PICKAXE);
    item.addUnsafeEnchantment(Enchantment.SILK_TOUCH,1);
    var meta = item.getItemMeta();
    // メタ書き換え
    meta.setDisplayName("§3§l§oエンリルのツルハシ");
    meta.setLore(["§f特殊戦技『勤労』：","§d前方2×3のブロックを破壊する","§d自分より下の高さのブロックは破壊しない","§f追加効果：","§d採掘速度上昇Ⅱ","","§b働け、働くのだ","§bそ、そんなぁ..."]);
    var container = meta.getPersistentDataContainer();
    container.set(CUSOTM_TAG, PersistentDataType.STRING, "ennriru1");
    // メタの保存
    item.setItemMeta(meta);
    return item;
  }
//金の生る木
function  magicaltree() {
    // 作成
    var item = new ItemStack(Material.ACACIA_LEAVES);
    item.addUnsafeEnchantment(Enchantment.SILK_TOUCH,1);
    var meta = item.getItemMeta();
    // メタ書き換え
    meta.setDisplayName("§3金の生る木");
    meta.setLore(["§fお金がもらえるかも..."]);
    var container = meta.getPersistentDataContainer();
    container.set(CUSOTM_TAG, PersistentDataType.STRING, "magicaltree");
    // メタの保存
    item.setItemMeta(meta);
    return item;
  }

//ケラウノス(落雷の弓)
function keraunosu1() {
    // 作成
    var item = new ItemStack(Material.BOW);
    item.addUnsafeEnchantment(Enchantment.ARROW_INFINITE,1);
    item.addUnsafeEnchantment(Enchantment.MENDING,1);
    var meta = item.getItemMeta();
    // メタ書き換え
    meta.setDisplayName("§e§o§lケラウノス");
    meta.setLore(["§f特殊戦技『落雷』:","§d矢を放った先に雷が落ちる","§f追加効果：","§dウィザーⅡ","§d鈍足Ⅱ","§b全知全能の神ゼウスの力が込められた武器", "§b雷を呼び起こせるほどの強さを持つという..."]);
    var container = meta.getPersistentDataContainer();
    container.set(CUSOTM_TAG, PersistentDataType.STRING, "keraunosu1");
    // メタの保存
    item.setItemMeta(meta);
    return item;
  }


//give
bjs.command("giveennriru1", function(sender) {
    sender.getInventory().addItem(ennriru1());
  });
bjs.command("givemagicaltree", function(sender) {
    sender.getInventory().addItem(magicaltree());
  });
bjs.command("givekeraunosu1", function(sender) {
    sender.getInventory().addItem(keraunosu1());
});


//タグの確認
function getCustomTag(item) {
    if (item == null || Material.AIR.equals(item.getType()))
        return;
    var meta = item.getItemMeta();
    var container = meta.getPersistentDataContainer();
    return container.get(CUSOTM_TAG, PersistentDataType.STRING);
    }
// 1秒ごとに調べてエフェクトを付与する仕組み
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
//付与
bjs.scheduleLoopTask(20, function(task) {
    bjs.getPlayers().forEach(function(player) {
        var items = player.getInventory().getItemInMainHand();
        //エンリル
        if ("ennriru1" == getCustomTag(items)) {
            player.addPotionEffect(new PotionEffect(PotionEffectType.FAST_DIGGING, 30, 1, false, false)) 
        }
        // 全ての防具より一番下に
        clearEffect(player);
    });
});



var testingBreakEvents = new java.util.HashSet();
//一括破壊ツルハシ  
function testBreakBlock(player,block) {
    var breakEvent = new (Java.type("org.bukkit.event.block.BlockBreakEvent"))(block, player);
    testingBreakEvents.add(breakEvent);
    bjs.getServer().getPluginManager().callEvent(breakEvent);
    testingBreakEvents.remove(breakEvent);
    return !breakEvent.isCancelled();
}
bjs.on("blockbreak", function(event) {
    if (testingBreakEvents.contains(event))
        return;
    
    var player = event.player
    var block=event.block
    var items = player.getInventory().getItemInMainHand();
    var location1 =event.block.location
    var world=event.block.world
    var z=location1.z
    var y=location1.y
    var x=location1.x
  
    if (getCustomTag(items) == "ennriru1") {
        var location2=event.player.location
        var vector=location2.direction.normalize()
        var vx =vector.getX()
        var vz =vector.getZ()
        //採掘ルールを適用した関数
        function blockbreak(x,y,z,players){
            var location=new locatioN(world,x,y,z);
            var prohibit=["BEDROCK","END_PORTAL","END_PORTAL_FRAME","END_GATEWAY","NETHER_PORTAL","BARRIER","COMMAND_BLOCK","COMMAND_BLOCK_MINECART","LIGHT"]
            if ((prohibit.indexOf(""+location.block.type) == -1)&&!(location2.y>location.y)&&(testBreakBlock(players, location.block))){
                location.block.breakNaturally(items);
            }
        }
        var a=0;
        while(a<=2){
            
        if(vx>Math.abs(vz)){
       blockbreak(x+a,y,z,player)
       blockbreak(x+a,y,z+1,player)
       blockbreak(x+a,y,z-1,player)
       blockbreak(x+a,y-1,z,player)
       blockbreak(x+a,y-1,z-1,player)
       blockbreak(x+a,y-1,z+1,player)
       blockbreak(x+a,y+1,z+1,player)
       blockbreak(x+a,y+1,z,player)
       blockbreak(x+a,y+1,z-1,player)
       
       }
       else if (Math.abs(vx)>Math.abs(vz)){
       blockbreak(x-a,y,z,player)
       blockbreak(x-a,y,z+1,player)
       blockbreak(x-a,y,z-1,player)
       blockbreak(x-a,y-1,z,player)
       blockbreak(x-a,y-1,z-1,player)
       blockbreak(x-a,y-1,z+1,player)
       blockbreak(x-a,y+1,z,player)
       blockbreak(x-a,y+1,z+1,player)
       blockbreak(x-a,y+1,z-1,player)
       }
       else if(vz>Math.abs(vx)){
       blockbreak(x,y,z+a,player)
       blockbreak(x+1,y,z+a,player)
       blockbreak(x-1,y,z+a,player)
       blockbreak(x,y-1,z+a,player)
       blockbreak(x+1,y-1,z+a,player)
       blockbreak(x-1,y-1,z+a,player)
       blockbreak(x,y+1,z+a,player)
       blockbreak(x+1,y+1,z+a,player)
       blockbreak(x-1,y+1,z+a,player)

       }
       else if (Math.abs(vz)>Math.abs(vx)){
       blockbreak(x,y,z-a,player)
       blockbreak(x+1,y,z-a,player)
       blockbreak(x-1,y,z-a,player)
       blockbreak(x,y-1,z-a,player)
       blockbreak(x+1,y-1,z-a,player)
       blockbreak(x-1,y-1,z-a,player)
       blockbreak(x,y+1,z-a,player)
       blockbreak(x+1,y+1,z-a,player)
       blockbreak(x-1,y+1,z-a,player)
       }
       a=a+1
        }
    }
  
  }); 


//羊毛の木
function blockA(){
    var block = ["BLUE_WOOL", "BLACK_WOOL", "RED_WOOL","BROWN_WOOL","CYAN_WOOL","WHITE_WOOL","YELLOW_WOOL","ORANGE_WOOL","MAGENTA_WOOL","LIGHT_BLUE_WOOL","LIME_WOOL","PINK_WOOL","GRAY_WOOL","LIGHT_GRAY_WOOL","PURPLE_WOOL","GREEN_WOOL"];
    var n = Math.floor(Math.random() *block.length); // 値
    return eval("Material."+block[n]);
}
function blockB(){
    var random=Math.length()*100;

}
bjs.on("blockplace", function(event) {
    if ("magicaltree"==getCustomTag(event.itemInHand)) {
        var location=event.block.location
        var world=event.block.world

        var result = world.generateTree(location, new java.util.Random(), TreeType.BIRCH, function(blockState) { 
            if (Material.BIRCH_LEAVES.equals(blockState.getType())) {
                blockState.setType(Material.AIR);
            } else if (Material.BIRCH_LOG.equals(blockState.getType())) {
                blockState.setType(Material.AIR);
            }
            return false;
        });

        if (result==false) {
            event.cancelled = true;

        } else {
            world.generateTree(location, new java.util.Random(), TreeType.BIRCH, function(blockState) {
                // generateTree( ..) によって変更されるブロックがblockState として一つずつ下が実行される
                if (Material.BIRCH_LEAVES.equals(blockState.getType())) {
                    blockState.setType(blockA());
                }
            });
        }
    }
});

//採掘弓
//key用
var arrows={};
//弓が放たれた時
bjs.on("entityshootbow", function(event) {
  //放たれた弓の情報を取得   
  var bow = event.getBow();
  var player = event.entity
  
  if((player instanceof Player)&&(getCustomTag(bow) == "keraunosu"))
  //もしそのアイテムがケラウノスのタグを持っていたら
  {
     //keyとしてその放たれた矢の情報を配列に入れる
      arrows[event.projectile.uniqueId]=player

  }
});
//矢がヒットしたとき
bjs.on("projectilehit", function(event) {
  //ヒットした矢の情報を取得
  var arrow = event.entity.uniqueId;
  var Arrow = event.entity
  //もしその矢と一致する情報が配列に含まれていたら
  if (arrow in arrows) {
      //配列からイベントのあった矢を削除
      var player=arrows[event.entity.uniqueId]
     delete [event.entity]

      //ヒットしたエンティティもしくはブロックのデータを取得
      var block = event.hitBlock;

      //もしブロックデータが空＝あたったのがブロックなら
      if (block != null) {
      var vector =event.hitBlockFace.direction
      var vx =vector.getX()
      var vz =vector.getZ()
      var vy=vector.getY()
      var location1 =block.location
      var world=block.world
      var z=location1.z
      var y=location1.y
      var x=location1.x
      Arrow.remove()
        function blockbreak(x,y,z,players){
        var location=new locatioN(world,x,y,z);
        if (((location.block.type.name().endsWith("_ORE"))||(""+location.block.type=="ANCIENT_DEBRIS"))&&(testBreakBlock(players,location.block))){
            location.block.breakNaturally(ennriru1());
        }
        }  

        var a=0;
        while(a<=3){
            
        if(vx>Math.abs(vz)>Math.abs(vy)){
       blockbreak(x-a,y,z,player)
       blockbreak(x-a,y,z+1,player)
       blockbreak(x-a,y,z-1,player)
       blockbreak(x-a,y-1,z,player)
       blockbreak(x-a,y-1,z-1,player)
       blockbreak(x-a,y-1,z+1,player)
       blockbreak(x-a,y+1,z,player)
       blockbreak(x-a,y+1,z+1,player)
       blockbreak(x-a,y+1,z-1,player)
        
        }
       else if (Math.abs(vx)>Math.abs(vz)>Math.abs(vy)){
       blockbreak(x+a,y,z,player)
       blockbreak(x+a,y,z+1,player)
       blockbreak(x+a,y,z-1,player)
       blockbreak(x+a,y-1,z,player)
       blockbreak(x+a,y-1,z-1,player)
       blockbreak(x+a,y-1,z+1,player)
       blockbreak(x+a,y+1,z+1,player)
       blockbreak(x+a,y+1,z,player)
       blockbreak(x+a,y+1,z-1,player)
       }
       else if(vz>Math.abs(vx)>Math.abs(vy)){
       blockbreak(x,y,z-a,player)
       blockbreak(x+1,y,z-a,player)
       blockbreak(x-1,y,z-a,player)
       blockbreak(x,y-1,z-a,player)
       blockbreak(x+1,y-1,z-a,player)
       blockbreak(x-1,y-1,z-a,player)
       blockbreak(x,y+1,z-a,player)
       blockbreak(x+1,y+1,z-a,player)
       blockbreak(x-1,y+1,z-a,player)

       }
       else if (Math.abs(vz)>Math.abs(vx)>Math.abs(vy)){
       blockbreak(x,y,z+a,player)
       blockbreak(x+1,y,z+a,player)
       blockbreak(x-1,y,z+a,player)
       blockbreak(x,y-1,z+a,player)
       blockbreak(x+1,y-1,z+a,player)
       blockbreak(x-1,y-1,z+a,player)
       blockbreak(x,y+1,z+a,player)
       blockbreak(x+1,y+1,z+a,player)
       blockbreak(x-1,y+1,z+a,player)
       }

       else if (vy>0){
       blockbreak(x,y-a,z,player)
       blockbreak(x+1,y-a,z,player)
       blockbreak(x-1,y-a,z,player)
       blockbreak(x,y-a,z+1,player)
       blockbreak(x+1,y-a,z+1,player)
       blockbreak(x-1,y-a,z+1,player)
       blockbreak(x,y-a,z-1,player)
       blockbreak(x+1,y-a,z-1,player)
       blockbreak(x-1,y-a,z-1,player)
       }
       else if (vy<0){
       blockbreak(x,y+a,z,player)
       blockbreak(x+1,y+a,z,player)
       blockbreak(x-1,y+a,z,player)
       blockbreak(x,y+a,z+1,player)
       blockbreak(x+1,y+a,z+1,player)
       blockbreak(x-1,y+a,z+1,player)
       blockbreak(x,y+a,z-1,player)
       blockbreak(x+1,y+a,z-1,player)
       blockbreak(x-1,y+a,z-1,player)
       }
       a=a+1
       }

       }

  }
});


//ウィザーの弓
bjs.on("entityshootbow", function(event) {
    //放たれた弓の情報を取得   
    var bow = event.getBow();
    var player =event.entity
    var world=player.world
    var projectile=event.projectile
    var location =player.eyeLocation
    if((player instanceof Player)&&(getCustomTag(bow) == "keraunosu1"))
    //もしそのアイテムがケラウノスのタグを持っていたら
    {
     projectile.remove()
     var skull=world.spawnEntity (location,EntityType.WITHER_SKULL)
     skull.velocity = projectile.velocity;
     skull.setYield(20.0)
     skull.setCharged(true)
     skull.setShooter(player);  // 射撃者を設定する。これによってこのskullが誰の攻撃か判定できるようになる。
     event.setProjectile(skull)
     
    }
  });