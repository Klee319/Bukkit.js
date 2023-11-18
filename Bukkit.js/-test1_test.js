  

var Particle = Java.type("org.bukkit.Particle");
var Material = Java.type("org.bukkit.Material");
var Bukkit = Java.type("org.bukkit.Bukkit");
var locatioN = Java.type("org.bukkit.Location");
var Sound =Java.type("org.bukkit.Sound");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack"); 
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment"); 
var BlockCommandSender = Java.type("org.bukkit.command.BlockCommandSender"); 
var config = bjs.getConfig();
config.load();


//アイテム生成
//効率強化10
var pickaxe = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe.addUnsafeEnchantment(Enchantment.DIG_SPEED, 10);
//効率強化9
var pickaxe1 = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe1.addUnsafeEnchantment(Enchantment.DIG_SPEED, 9);
//効率強化8
var pickaxe2 = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe2.addUnsafeEnchantment(Enchantment.DIG_SPEED, 8);
//効率強化7
var pickaxe3 = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe3.addUnsafeEnchantment(Enchantment.DIG_SPEED, 7);
//効率強化6
var pickaxe4 = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe4.addUnsafeEnchantment(Enchantment.DIG_SPEED, 6);
//効率強化5
var pickaxe5 = new ItemStack(Material.DIAMOND_PICKAXE);
pickaxe5.addEnchantment(Enchantment.DIG_SPEED, 5);
//本：効率強化7
var book = new ItemStack(Material.ENCHANTED_BOOK);
var book_meta = book.getItemMeta();
book_meta.addStoredEnchant(Enchantment.DIG_SPEED, 7, true);
book.setItemMeta(book_meta);
//本：効率強化6
var book1 = new ItemStack(Material.ENCHANTED_BOOK);
var book_meta1 = book1.getItemMeta();
book_meta1.addStoredEnchant(Enchantment.DIG_SPEED, 6, true);
book1.setItemMeta(book_meta1);

//レアリティごとにアイテム格納
var UR=[];
var SSR=[pickaxe,];
var SR=[pickaxe1,pickaxe2];
var R=[book,book];
var UC=[pickaxe3,pickaxe4];
var C=[pickaxe5];

//確認用
var inventory=[];
var out={};


bjs.command("randommake", function(sender, args){
  var Name=args[0];
  var x=sender.player.location.x;
  var y=sender.player.location.y;
  var z=sender.player.location.z;
  var world=sender.world.name;
  config.set(Name, x + "," + y + "," + z+ ","+world);
  config.save();
  sender.sendMessage("§6"+Name+"のガチャを追加しました");
});

bjs.command("randomdelete",function(sender,args){
  var Name=args[0];
  config.set(Name, null);
  config.save();
  sender.sendMessage("§6"+Name+"のガチャを削除しました");
});

bjs.command("randomset", function(sender, args){
  log.info("確認1");

  if (!(sender instanceof BlockCommandSender)) {
    log.info("§6"+"このコマンドはコマンドブロックで実行する必要があります");
    return;
  }

  var times=parseInt(args[0]);
  var Name=args[1];
  var Result=[];
  log.info(Name);

  if (!config.keys.contains(Name)) {
    log.info("このガチャはセットされていません");
    return;
  }

  log.info("確認2");
  var count =0;
  var loc =config.getString(Name);
  var result = loc.split(',');
  var x=parseFloat (result[0]);
  var y=parseFloat (result[1]);
  var z=parseFloat (result[2]);
  var World=result[3];
  var world=Bukkit.getWorld(World);
  var location=new locatioN(world,x,y,z);

  // 確率から各ランクを選択
  while(count<=times) {
    count=count+1;
    log.info(Result);
    var a=Math.random();

    //if(a<=0.2){result.push(UR)}
    if(a<=0.2){Result.push(SSR)};
    if(0.4>=a&&a>0.2){Result.push(SR)};
    if(0.6>=a&&a>0.4){Result.push(R)};
    if(0.8>=a&&a>0.6){Result.push(UC)}
    if(1>=a&&a>0.8){Result.push(C)};

  }

  if(Result.indexOf(SSR)==-1){  //SSRが出るとき
    log.info("確認4");
    var b=Math.random();

    //通常
    if(b>=0.5){
      log.info("確認5");
      var blockData = Bukkit.createBlockData(Material.DIAMOND_BLOCK);
      // blockDataを元に FallingBlock をスポーンさせます
      var fallingBlock =world.spawnFallingBlock(location, blockData);
      log.info(config.getString(Name));
      var id = fallingBlock.uniqueId; 
      var key={};
      key["SSR1"] = Result;
      out[id]=key;

    } else {  //確定演出
      log.info("確認5");
      var blockData = Bukkit.createBlockData(Material.GOLD_BLOCK);
      // blockDataを元に FallingBlock をスポーンさせます
      var fallingBlock =world.spawnFallingBlock(location, blockData);
      id = fallingBlock.uniqueId; 
      var key={}
      key["SSR2"]=Result;
      out[id]=key;
    }

  } else if (Result.indexOf(SR)==-1){  //SRが出るとき
      log.info("確認5");
      var blockData = Bukkit.createBlockData(Material.GOLD_BLOCK);
      // blockDataを元に FallingBlock をスポーンさせます
      var fallingBlock =world.spawnFallingBlock(location, blockData);
      id = fallingBlock.uniqueId; 
      var key={}
      key["SR"]=Result;
      out[id]=key;
  } else if(Result.indexOf(R)==-1){  //Rが出るとき
    var blockData = Bukkit.createBlockData(Material.IRON_BLOCK);
    // blockDataを元に FallingBlock をスポーンさせます
    var fallingBlock =world.spawnFallingBlock(location, blockData);
    id = fallingBlock.uniqueId; 
    var key={}
    key["R"]=Result;
    out[id]=key;

  } else if(Result.indexOf(UC)==-1){  //UCが出るとき
    var blockData = Bukkit.createBlockData(Material.COAL_BLOCK);
    // blockDataを元に FallingBlock をスポーンさせます
    var fallingBlock =world.spawnFallingBlock(location, blockData);
    id = fallingBlock.uniqueId; 
    var key={}
    key["UC"]=Result;
    out[id]=key;

  } else if(Result.indexOf(C)==-1){  //Cが出るとき
    var blockData = Bukkit.createBlockData(Material.STONE);
    // blockDataを元に FallingBlock をスポーンさせます
    var fallingBlock =world.spawnFallingBlock(location, blockData);
    id = fallingBlock.uniqueId; 
    var key={};
    key["C"]=Result;
    out[id]=key;
  }

});


bjs.on("entitychangeblock", function(event) {
  //定義
  var block = event.block;
  var location = block.location;
  var world = block.world;
  var count = 0;
  var entity =event.getEntity();
  var id=entity.uniqueId;

  // 関係ないエンティティUUIDだったら抜ける
  if (!(id in out)) {
    return;
  }



  log.info(out);
  var output=out[id];
  delete out[id];

  //取得した数に応じて排出レアリティを決定。今回は30％でSSRが排出されるブロックが降ってくる
  if ("SSR1" in output) {
    var result = output["SSR1"];
    log.info("output:");

    //演出
    bjs.scheduleLoopTask(1, function(task) {
      // 繰り返し実行
      count += 1;
      world.spawnParticle(Particle.FIREWORKS_SPARK, location, 20, 2.0, 2.0, 2.0);
      world.spawnParticle(Particle.END_ROD, location, 20, 2.0, 2.0, 2.0);
      if(count==1) {
        world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);
      }

      // 繰り返しをやめるとき
      if (count == 20) {
        event.setCancelled(true);
        block.setType(Material.RED_SHULKER_BOX);

        //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
        var count2 = 0;
        while (count2<=result.length) {
          count2 = count2 + 1;
          var item = result[count2];
          var contents = Math.floor(Math.random()*item.length);

          //itemにランダム（同確率）でSSRのアイテムを格納
          var drop=(item[contents]);

          //排出
          var Inventory = block.state.inventory;
          Inventory.addItem(drop);
        }

        //終了
        if (count2>result.length) {
          inventory.push(block.state.inventory);
          task.cancel();
        }
      }
    });

    } else if ("SSR2" in output) {  //取得した数に応じて排出レアリティを決定。今回は30％でSSRが排出されるブロックが降ってくる

      var result=output["SSR2"];

      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 10tickまで繰り返し実行
        count += 1;
        if (count==1) {
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);}
        else if (count <= 5) {
          world.spawnParticle(Particle.COMPOSTER, location, 60, 2.0, 2.0, 2.0);
          world.spawnParticle(Particle.TOTEM, location, 60, 2.0, 2.0, 2.0);
        }　
        // 0.5秒後上記の繰り返しをやめる
    　　////1.5秒後2秒間爆発
        else if(count>=35&&count<50) {
          world.spawnParticle(Particle.EXPLOSION_LARGE, location, 40, 0.0, 0.0, 0.0);
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 1.0);
        }
    　　//ダイヤブロックに昇格
        else if(count==50){
          event.setCancelled(true);
          block.setType(Material.DIAMOND_BLOCK);
        }
    　　//2秒後爆発してアイテムが出る
        else if(count==80) {
           world.spawnParticle(Particle.EXPLOSION_HUGE, location, 20, 0.0, 0.0, 0.0,10);
           world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 1.0);
           event.setCancelled(true);
           block.setType(Material.RED_SHULKER_BOX);
        }
        else if(count==100){
          world.spawnParticle(Particle.FIREWORKS_SPARK, location, 20, 2.0, 2.0, 2.0);
          world.spawnParticle(Particle.END_ROD, location, 20, 2.0, 2.0, 2.0);
          var count2=0
          while(count2<=result.length){
          count2=count2+1;
          var item=result[count2]
          var contents= Math.floor(Math.random()*item.length)
          //itemにランダム（同確率）でSSRのアイテムを格納
          var drop=(item[contents])
  　　    //排出
          var Inventory=block.state.inventory;
          Inventory.addItem(drop);}
          //終了
          if(count2>result.length){
            inventory.push(block.state.inventory);
            task.cancel();}
        }
    });

    } else if ("SR"in output) {
      var result=output["SR"];

      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        if (count==1) {  
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);
          world.spawnParticle(Particle.COMPOSTER, location, 40, 2.0, 2.0, 2.0);
          world.spawnParticle(Particle.TOTEM, location, 40, 2.0, 2.0, 2.0);
        }
        // 繰り返しをやめるとき
        if (count == 10) { 
          event.setCancelled(true);
          Block=block.setType(Material.RED_SHULKER_BOX);
  　　  　//30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0

          while(count2<=result.length){
            count2=count2+1;
            var item=result[count2];


            // test
            log.warning("result preview => " + result);
            for (key in result) {
              log.info("  \"" + key + "\" value => " + result[key]);
            }

            log.warning("item preview => " + item);
            // log.warning("item preview => " + item);



            var contents= Math.floor(Math.random()*item.length)
            //itemにランダム（同確率）でSSRのアイテムを格納
            var drop=(item[contents])
            //排出
            var Inventory=block.state.inventory;
            Inventory.addItem(drop);}
            //終了
            if(count2>result.length){
              inventory.push(block.state.inventory);
              task.cancel();            }
        }
      });

    } else if ("R"in output) {
      var result=output["R"];
      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        world.spawnParticle(Particle.DRAGON_BREATH, location, 150, 2.0, 2.0, 2.0);        
        if(count==1){
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);
        }
        // 繰り返しをやめるとき
        if (count == 10) {
          event.setCancelled(true); 
          block.setType(Material.RED_SHULKER_BOX);
    　　  //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
          while(count2<=result.length){
          count2=count2+1;
          var item=result[count2]


            // test
            log.warning("result preview => " + result);
            for (key in result) {
              log.info("  \"" + key + "\" value => " + result[key]);
            }

            log.warning("item preview => " + item);
            // log.warning("item preview => " + item);



          
          var contents= Math.floor(Math.random()*item.length)
         //itemにランダム（同確率）でSSRのアイテムを格納
          var drop=(item[contents])
  　　    //排出
          var Inventory=block.state.inventory;
          Inventory.addItem(drop);}
          //終了
          if(count2>result.length){
          inventory.push(block.state.inventory);
          task.cancel();}
        }
      });
    } else if("UC"in output) {
      var result=output["UC"]
      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        world.spawnParticle(Particle.SPIT, location, 10, 2.0, 2.0, 2.0);
        if(count==1)
          world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);
            // 繰り返しをやめるとき
        if (count == 10) {
           event.setCancelled(true); 
          block.setType(Material.RED_SHULKER_BOX);
        　　 //30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
        while(count2<=result.length){
        count2=count2+1;
        var item=result[count2]
        var contents= Math.floor(Math.random()*item.length)
        //itemにランダム（同確率）でSSRのアイテムを格納
        var drop=(item[contents])
  　　    //排出
        var Inventory=block.state.inventory;
        Inventory.addItem(drop);}
        //終了
        if(count2>result.length){
        inventory.push(block.state.inventory);
        task.cancel();}
          }
      });
    } else if("C"in output) {
      var result=output["C"]

      //演出
      bjs.scheduleLoopTask(1, function(task) {
        // 繰り返し実行
        count += 1;
        world.spawnParticle(Particle.SMOKE_NORMAL, location, 200, 2.0, 2.0, 2.0);
          if(count==1){
            world.playSound(location, Sound.ENTITY_GENERIC_EXPLODE, 1.0, 2.0);
          }
          // 繰り返しをやめるとき
          if (count == 10) {
            event.setCancelled(true); 
            block.setType(Material.RED_SHULKER_BOX);
          　//30％以下なので排出対象はSSR。よってSSRの配列の中身の個数に応じて乱数を取得
          var count2=0
          while(count2<=result.length){
          count2=count2+1;
          var item=result[count2]
          var contents= Math.floor(Math.random()*item.length)
          //itemにランダム（同確率）でSSRのアイテムを格納
          var drop=(item[contents])
  　　    //排出
          var Inventory=block.state.inventory;
          Inventory.addItem(drop);}
          //終了
          if(count2>result.length){
            inventory.push(block.state.inventory);
            task.cancel();}
          }
      }); 

    }
  }
});

bjs.on("inventoryclose", function(event) {
  log.info("a")
  var Inventory =event.getInventory();
  if (inventory.indexOf(Inventory)==-1){
　if(Inventory.isEmpty()){
  Inventory.location.block.setType(Material.AIR);
  inventory = inventory.filter(function(inv){inv==Inventory});}
  }
});
