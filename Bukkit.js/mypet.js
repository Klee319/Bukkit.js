var Bukkit = Java.type("org.bukkit.Bukkit");
var Material = Java.type("org.bukkit.Material");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack");
var PotionEffect = Java.type("org.bukkit.potion.PotionEffect");
var PotionEffectType = Java.type("org.bukkit.potion.PotionEffectType");
var PersistentDataType = Java.type("org.bukkit.persistence.PersistentDataType");
var NamespacedKey = Java.type("org.bukkit.NamespacedKey");
var Enchantment = Java.type("org.bukkit.enchantments.Enchantment");
var EntityType = Java.type("org.bukkit.entity.EntityType");
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
var TreeType = Java.type("org.bukkit.TreeType");
var MyPetApi = Java.type("de.Keyle.MyPet.MyPetApi");
var MyPetBukkitEntity = Java.type("de.Keyle.MyPet.api.entity.MyPetBukkitEntity");
var InactiveMyPet = Java.type("de.Keyle.MyPet.entity.InactiveMyPet");
var MyPetType = Java.type("de.Keyle.MyPet.api.entity.MyPetType");
var MyPetTranslation = Java.type("de.Keyle.MyPet.api.util.locale.Translation");
var WorldGroup = Java.type("de.Keyle.MyPet.api.WorldGroup");
var RepositoryCallback = Java.type("de.Keyle.MyPet.api.repository.RepositoryCallback");
var Animals = Java.type("org.bukkit.entity.Animals");
var Monster = Java.type("org.bukkit.entity.Monster");
var CUSOTM_TAG = new NamespacedKey(bjs.getOwner(), "potion_item");
var UpgradeModifier = Java.type("de.Keyle.MyPet.api.skill.modifier.UpgradeModifier");
var config = bjs.getConfig();
config.load();

// MythicMobsがどうか調べるメソッド
// isMythicMob(entity) -> true/false
var _MMMGR = undefined;
function isMythicMob(entity) {
    // 一回だけで連携する (MythicMobsとのロードタイミング回避のため)
    if (_MMMGR == undefined) {
        try {
            _MMMGR = Java.type("io.lumine.mythic.bukkit.MythicBukkit").inst().getMobManager();
        } catch (err) {
            _MMMGR = null;
        }
    }
    return _MMMGR && _MMMGR.isMythicMob(entity);
}

// 手懐けようとしてるエンティティとプレイヤーのUUID(key) (敵のみ)
var enemyskey={};
var player={};
// 作成したCustomModifierをアンロードするための関数をMyPet UUID毎にリストする
var CUSTOM_MODIFIER_UNLOADERS = [];  // {myPetUUID: [function]}
var DEBUG_PRINT = false;

var ANIMALS = [
    "ALLAY", "AXOLOTL", "BAT", "BEE", "CAT", "CHICKEN", "COW", "DOLPHIN", "FOX", "FROG", "GOAT", "HORSE",
    "LLAMA", "MUSHROOM_COW", "OCELOT", "MULE", "DONKEY", "PANDA", "PARROT", "PIG", "POLAR_BEAR", "RABBIT",
    "SHEEP", "SKELETON_HORSE", "STRIDER", "TRADER_LLAMA", "TURTLE", "WOLF", "ZOMBIE_HORSE"
];
var MONSTERS = [
    "BLAZE", "CAVE_SPIDER", "CREEPER", "DROWNED", "ENDERMAN", "ENDERMITE", "EVOKER", "GUARDIAN", "HOGLIN",
    "HUSK", "MAGMA_CUBE", "PHANTOM", "PIGLIN", "PIGLIN_BRUTE", "PILLAGER", "RAVAGER", "SILVERFISH", "SKELETON",
    "SLIME", "SPIDER", "STRAY", "VEX", "VINDICATOR", "WARDEN", "WITCH", "WITHER", "WITHER_SKELETON", "ZOGLIN",
    "ZOMBIE", "ZOMBIE_VILLAGER", "ZOMBIFIED_PIGLIN"
];

var petHPOffset = 1;

var PET_BASE_VALUES = [
    {  // 1級
        modifierSkills: {
            "Life": [16, 25],
            "Damage": [6, 10]
        },
        types: ["PIGLIN_BRUTE", "ILLUSIONER"]
    },
    {  // 2級
        modifierSkills: {
            "Life": [11, 20],
            "Damage": [3, 8]
        },
        types: ["WITCH", "VINDICATOR", "PHANTOM", "GUARDIAN", "EVOKER", "RAVAGER", "VEX"]
    },
    {  // 3
        modifierSkills: {
            "Life": [5, 15],
            "Damage": [1, 5]
        },
        types: function() {  // ↑以外の敵 + POLAR_BEAR, IRON_GOLEM
            var ignores = ["PIGLIN_BRUTE", "ILLUSIONER", "WITCH", "VINDICATOR", "PHANTOM", "GUARDIAN", "EVOKER", "RAVAGER", "VEX"];
            return [
                "POLAR_BEAR",
                "IRON_GOLEM"
            ].concat(MONSTERS.filter(function(n) { return ignores.indexOf(n) == -1 }));
        }()
    },
    {  // 4
        modifierSkills: {
            "Life": [5, 15],
            "Damage": 0
        },
        types: ["ZOMBIE_HORSE", "HORSE", "PANDA", "SKELETON_HORSE", "ALLAY", "MULE", "DONKEY", "TURTLE", "LLAMA", "STRIDER"]
    },
    {  // 5
        modifierSkills: {
            "Life": [1, 10],
            "Damage": 0
        },
        types: function() {  // ↑以外のMob - VILLAGER
            var ignores = ["VILLAGER", "POLAR_BEAR", "IRON_GOLEM", "ZOMBIE_HORSE", "HORSE", "PANDA", "SKELETON_HORSE", "ALLAY", "MUTE", "DONKEY", "TURTLE", "LLAMA", "STRIDER"];
            return ANIMALS.filter(function(n) { return ignores.indexOf(n) == -1});
        }()
    },
    {  // wither
        modifierSkills: {
            "Life": [26, 40],
            "Damage": [13, 20]
        },
        types: ["WITHER"]
    },
    {  // warden
        modifierSkills: {
            "Life": [20, 30],
            "Damage": [8, 12]
        },
        types: ["WARDEN"]
    },
    {  // wolf, bee
        modifierSkills: {
            "Life": [1, 10],
            "Damage": [1, 5]
        },
        types: ["WOLF", "BEE"]
    }
];

// 内部データ
var _PET_BASE_VALUES_OF_TYPE = function() {  // {entityName: {skillName: INT or RANGE}}
    var types = {};

    // format
    for (i in PET_BASE_VALUES) {
        var e = PET_BASE_VALUES[i];  // {modifierSkills: xxx, types: yyy}
        for (ii in e.types) {
            var entityTypeName = e.types[ii];
            types[entityTypeName] = e.modifierSkills;
        }

        // check method
        for (skillName in e.modifierSkills) {
            try {
                Java.type("de.Keyle.MyPet.skill.skills." + skillName + "Impl").class.getMethod("get" + skillName);
            } catch (err) {
                log.severe("Unknown getter: " + err);
            }
        }
    }

    // check type
    for (e in types) {
        try {
            EntityType.valueOf(e);
        } catch (err) {
            log.severe("Unknown entity type: " + e);
        }
    }

    return types;
}();


// スキルツリーを再抽選するアイテムか調べる
function checkSkilltreeRandomItem(itemStack) {
    // return itemStack.type == "DIAMOND";
}

// 基礎ステータスを再抽選するアイテムか調べる
function checkBaseStatusRandomItem(itemStack) {
    // return itemStack.type == "GOLD_INGOT";
}

// 基礎ステータスを +1 するアイテムか調べる
function checkBaseStatusAddItem(itemStack) {
    // return itemStack.type == "GOLD_NUGGET";
}


/*
    ユーティリティ
 */

// minからmaxまでの範囲でランダムな値を返します
function randomRange(min, max) {
    return min + ((max - min) * new java.util.Random().nextFloat());
}

// minからmaxまでの範囲でランダムな値を返します (最大値が最小値の半分ほどの確率 ※大体)
function randomRange2(min, max) {
    var rand = new java.util.Random();
    return min + ((max - min) * (rand.nextFloat() * Math.min(1, rand.nextFloat() * 2 + rand.nextFloat() * rand.nextFloat())));
}

function logDebug(m) {
    if (DEBUG_PRINT)
        log.warning("[DEBUG]: " + m);
}



/*
    MyPet 関連のメソッド
 */

// エンティティを元にMyPetを作成します
function createMyPet(player, entity, petName) {
    // MyPet用のプレイヤーオブジェクトを取得する。なければ作成する
    var pm = MyPetApi.getPlayerManager();
    var myPetPlayer = (pm.isMyPetPlayer(player)) ? pm.getMyPetPlayer(player) : pm.registerMyPetPlayer(player);

    // MyPetを作成するための設計図(InactiveMyPet)を作成する
    var inactiveMyPet = new InactiveMyPet(myPetPlayer);
    // Mobタイプを設定
    var myPetType = MyPetType.byEntityTypeName(entity.type.name());
    inactiveMyPet.setPetType(myPetType);
    // ペットの名前を設定
    inactiveMyPet.setPetName(petName);
    // MyPetの所属ワールドグループを設定
    var wg = WorldGroup.getGroupByWorld(player.getWorld());
    inactiveMyPet.setWorldGroup(wg.getName());
    inactiveMyPet.getOwner().setMyPetForWorldGroup(wg, inactiveMyPet.getUUID());

    // エンティティ情報を適用する
    var converter = MyPetApi.getServiceManager().getService(Java.type("de.Keyle.MyPet.api.util.service.types.EntityConverterService").class);
    converter.ifPresent(function(service) { inactiveMyPet.setInfo(service.convertEntity(entity)) });

    // MyPet設計図をMyPetプラグインに登録(追加)する
    MyPetApi.getRepository().addMyPet(inactiveMyPet, new RepositoryCallback(function(v) {
        // MyPet設計図を実体(MyPet)化させる。失敗すると null になる
        var myPet = MyPetApi.getMyPetManager().activateMyPet(inactiveMyPet).orElse(null);

        if (myPet != null) {  // MyPetが作成された
            // MyPetになったペットエンティティをスポーンさせてみる
            myPet.createEntity();
        }
    }));

    onCreatePet(player, inactiveMyPet);
    return inactiveMyPet;
}

// 指定されたプレイヤーのアクティブなMyPetを返します
function getMyPetByOwner(player) {
    var myPetPlayer = MyPetApi.getPlayerManager().getMyPetPlayer(player);
    return (myPetPlayer != null) ? myPetPlayer.getMyPet() : null;
}

// カスタム計算式の作成メソッド
function createCustomModifier(modifyFunction) {
    return new (Java.extend(UpgradeModifier, {
        getValue: function() {
            return 0;  // 調べ不足
        },
        modify: modifyFunction
        /*
        modify: function(num) {
            return num * value;  // 新しい値を返す
            // 例としてこれを num.doubleValue() * 2 にして返すと、既存攻撃力x2 になる
        }
        */
    }))();
}

// MyPetのスキルを取得
function getMyPetSkillByName(myPet, skillName) {
    var skills = myPet.getSkills();
    var skill = skills.get(skillName);
    if (!skill)
        throw new Error("Not found skill: " + skillName);
    return skill;
}

// MyPetのスキルのUpgradeComputerを取得
function getMyPetSkillUpgradeComputerByName(myPet, skillName) {
    var skills = myPet.getSkills();
    var skill = skills.get(skillName);
    if (!skill)
        throw new Error("Not found skill: " + skillName);
    return eval("skill.get" + skillName + "()");
}



/*
    イベントリスナーとコマンド
 */

// スキルを切り替えた時
bjs.onEvent(Java.type("de.Keyle.MyPet.api.event.MyPetSelectSkilltreeEvent").class, function(event) {
    var myPet = event.getMyPet();
    onChangePetSkilltree(myPet, event.getSkilltree());
});

// MyPetプラグインがMyPetを読み込んだ時
bjs.onEvent(Java.type("de.Keyle.MyPet.api.event.MyPetActivatedEvent").class, function(event) {
    var myPet = event.getMyPet();
    onActivatePet(myPet);
});

// MyPetが削除された時
bjs.onEvent(Java.type("de.Keyle.MyPet.api.event.MyPetRemoveEvent").class, function(event) {
    onRemovePet(event.getMyPet());
});

bjs.on("playerinteractentity", function(event) {
var enemy=event.rightClicked
var hand=event.player.inventory
var item=hand.itemInMainHand.type
var location=enemy.location

if (isMythicMob(enemy))
    return;

if (enemy instanceof MyPetBukkitEntity) {
    if (event.getHand() == "HAND" && onClickedPet(event.getPlayer(), enemy.getMyPet()))
        event.setCancelled(true);
    return;
}

if(!(enemy instanceof LivingEntity)){
    return;
}  

if(ANIMALS.indexOf(""+enemy.type)!=-1){
    if(item=="ENCHANTED_GOLDEN_APPLE"){
        if(enemy.hasAI()==false){
            return;}
        hand.getItemInMainHand().amount--;
        location.world.spawnParticle(Particle.HEART,enemy.location,15.0,1.0,1.0,1.0,0.3);
        location.world.playSound(enemy.location,"random.levelup",2.0,1.0);
        location.world.playSound(enemy.location, Sound.ENTITY_PLAYER_LEVELUP, 2.0, 1.0);
        event.player.sendMessage("§a§l能力を開放した！")
        enemy.remove()
        createMyPet(event.player, enemy, enemy.type);
    }
}
else if(MONSTERS.indexOf(""+enemy.type)!=-1){
        if(item=="DIAMOND"){
            if(event.player.uniqueId in enemyskey || enemy.hasAI()==false){
            return;}
            hand.getItemInMainHand().amount--;
            enemyskey[event.player.uniqueId]=enemy;
        }
    } 
 }); 

bjs.on("entitydeath", function(event) {
    var enemy = event.entity;
    var location = enemy.location;
    var killerID = null;
    var killer = null;

    if (isMythicMob(enemy))
        return;

    if (enemy.getKiller()) {  // プレイヤーによる殺害の場合だけ (プレイヤーが関わってない死の時は手懐けを失敗させる)

        // 殺されたエンティティを手懐けようとしたプレイヤーのUUIDを探す
        for (_playerId in enemyskey) {
            if (enemy === enemyskey[_playerId]) {
                killerID = _playerId;
                killer = bjs.getPlayer(killerID);
            }
        }

        // 手懐けようとしたプレイヤーが見つかったら仲間に。
        if (killer) {
            event.drops.clear()  
            event.setDroppedExp(0)

            var dummyEntity = enemy.world.spawnEntity(location,enemy.type)
            dummyEntity.setAI(false); 
            dummyEntity.setInvulnerable(true);

            location.world.spawnParticle(Particle.HEART,location,15.0,1.0,1.0,1.0,0.3)
            location.world.playSound(location,"random.levelup",2.0,1.0);
            location.world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 2.0, 1.0); 
            killer.sendMessage("§a敵が仲間になりたいようだ！");
            killer.sendMessage("§a/named <名前> で仲間にします（30秒後デスポーンします）");

            player[killer]= dummyEntity;

            bjs.scheduleTask(600, function(task) {
                if(killer in player){
                    dummyEntity.remove();
                    delete player[killer];
                    delete enemyskey[killerID]
                    task.cancel();
                }
            });
        }
    }

    // 手懐けようとしたMobが死んだら、再び手懐けできるようにする
    for (_playerId in enemyskey) {
        if (enemy === enemyskey[_playerId] && killerID != _playerId) {
            delete enemyskey[_playerId];
        }
    }
});

bjs.command("named", function(sender, args){
    if(sender in player){
        var name =args[0];
        player[sender].remove();
        createMyPet(sender,player[sender] , name);
        sender.sendMessage("§a§l敵が仲間になった！")
        delete player[sender];
        delete enemyskey[sender.uniqueId];

    } else {
        bjs.broadcast("§6Aさんがサーバーに参加しました！");
        sender.sendMessage("§c仲間にできる敵が存在しません")
    }
});



/*
    メイン処理 (イベント)
*/

// スクリプトがロード/アンロードされる時に実行される
function onLoad() {
    // 既にアクティブなMyPetに基礎ステータスを適用する
    var activePets = MyPetApi.getMyPetManager().getAllActiveMyPets();
    for (i in activePets) {
        var myPet = activePets[i];
        try {
            applyMyPetStatus(myPet);
        } catch (e) {
            log.severe("Failed to apply status MyPet (" + myPet.getUUID() + "): " + e);
        }
    }
}

function onUnload() {
    // 付与されているCustonModifierを全て解除する
    for (myPetUUID in CUSTOM_MODIFIER_UNLOADERS) {
        var unloaders = CUSTOM_MODIFIER_UNLOADERS[myPetUUID];
        for (i in unloaders) {
            try {
                unloaders[i]();
            } catch (e) {
                log.warning(e);
            }
        }
    }
    CUSTOM_MODIFIER_UNLOADERS = [];
}


// MyPetを新たに作成(ペット化)した時に実行される (createMyPetメソッドによる作成のみ)
function onCreatePet(player, inactiveMyPet) {
    logDebug("on create pet: " + inactiveMyPet);

    // 基礎ステータスを振って保存する
    createMyPetStatus(inactiveMyPet);
}

// MyPetが設定から読み込まれ実体化した時に実行される
function onActivatePet(myPet) {
    logDebug("on activate pet: " + myPet);

    // 基礎ステータスを適用する
    applyMyPetStatus(myPet);
}

// MyPetのスキルツリーを変更した時に実行される
function onChangePetSkilltree(myPet, skilltree) {
    logDebug("on change pet skilltree: " + myPet + " to " + skilltree);

    // 基礎ステータスを適用する
    applyMyPetStatus(myPet);
}

// MyPetが削除された時に実行される
function onRemovePet(myPet) {
    // 保存していたデータを削除する
    deleteMyPetStatus(myPet);
    unloadMyPetStatus(myPet);
}

// MyPetをクリックした時に実行される
function onClickedPet(player, myPet) {

    // ペット主でなければ無視
    if (myPet.getOwner().getPlayer() !== player)
        return;

    var item = player.getInventory().getItemInMainHand();
    var location = myPet.getLocation().orElse(player.getLocation());
    var world = player.getWorld();

    // 手持ちアイテムの確認
    if (checkSkilltreeRandomItem(item)) {  // スキルツリーの再抽選
        var selected = randomSkilltree(myPet);
        if (!selected)
            return;

        item.setAmount(item.getAmount() - 1);

        player.sendMessage("§eスキルツリー " + selected.displayName + " が選択されました！");
        world.playSound(location, "random.levelup", 1.0, 2.0);
        world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 1.0, 2.0);
        world.playSound(location, "firework.large_blast", 1.0, 1.0);
        world.playSound(location, Sound.ENTITY_FIREWORK_ROCKET_LARGE_BLAST, 1.0, 1.0);
        world.spawnParticle(Particle.FIREWORKS_SPARK, location.add(0, 1, 0), 10, .2, .5, .2, .05);

    } else if (checkBaseStatusRandomItem(item)) {  // 基礎ステータスの再抽選
        if (!createMyPetStatus(myPet))
            return;
        
        item.setAmount(item.getAmount() - 1);
        applyMyPetStatus(myPet);

        player.sendMessage("§e基礎ステータスが再抽選されました！");
        world.playSound(location, "random.levelup", 1.0, 2.0);
        world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 1.0, 2.0);
        world.playSound(location, "firework.large_blast", 1.0, 1.0);
        world.playSound(location, Sound.ENTITY_FIREWORK_ROCKET_LARGE_BLAST, 1.0, 1.0);
        world.spawnParticle(Particle.FIREWORKS_SPARK, location.add(0, 1, 0), 10, .2, .5, .2, .05);

    } else if (checkBaseStatusAddItem(item)) {  // 基礎ステータスを 1 上げる
        var skillParameters = _PET_BASE_VALUES_OF_TYPE[myPet.getPetType().getBukkitName()];  // {skillName: INT or RANGE}

        if (!skillParameters)
            return;

        var currentValues = getConfiguredStatus(myPet);
        var currentValuesSelf = getConfiguredStatusSelf(myPet);

        // 強化できるスキルをリストする
        var upgradableNames = [];
        for (skillName in skillParameters) {
            var value = skillParameters[skillName];
            if (typeof value != "number")
                value = Math.max(value[0], value[1]);
            
            var current = currentValues[skillName] || 0;
            current += currentValuesSelf[skillName] || 0;

            if (value > current) {
                upgradableNames.push(skillName);
            }
        }

        if (upgradableNames.length <= 0) {
            player.sendMessage("§c既に最大まで強化されています！");
            return;
        }
        
        // +1 強化
        var idx = (new java.util.Random()).nextInt(upgradableNames.length);
        var selectedName = upgradableNames[idx];

        var value = getConfiguredStatusSelf(myPet)[selectedName] || 0;
        value += 1;
        
        setConfiguredStatusSelf(myPet, selectedName, value);
        applyMyPetStatus(myPet);

        item.setAmount(item.getAmount() - 1);

        var selectedName = MyPetTranslation.getString("Name.Skill." + selectedName, player);
        if (selectedName == "Name.Skill.Life") selectedName = "体力";
        player.sendMessage("§e" + selectedName + "の基礎ステータスを強化しました！");
        world.playSound(location, "random.levelup", 1.0, 2.0);
        world.playSound(location, Sound.ENTITY_PLAYER_LEVELUP, 1.0, 2.0);

    } else {
        return false;
    }
    return true;
}



/*
    メイン処理
 */

// 指定されたMyPetの基礎ステータスを作成し、保存する
function createMyPetStatus(inactiveMyPet) {
    var skillParameters = _PET_BASE_VALUES_OF_TYPE[inactiveMyPet.getPetType().getBukkitName()];  // {skillName: INT or RANGE}

    if (!skillParameters)
        return;

    // 既存の値を削除
    config.set("mypet." + inactiveMyPet.getUUID() + ".base", null);
    // config.set("mypet." + inactiveMyPet.getUUID() + ".base-self", null);

    logDebug("Creating MyPet(" + inactiveMyPet.getUUID() + ") base status");
    for (skillName in skillParameters) {
        var skillValue = skillParameters[skillName];

        if (typeof skillValue != "number") {  // range
            // select random
            skillValue = randomRange2(skillValue[0], skillValue[1]);
        }

        skillValue = Math.floor(skillValue);
        logDebug("  " + skillName + " = " + skillValue);
        config.set("mypet." + inactiveMyPet.getUUID() + ".base." + skillName, skillValue);
    }
    config.save();
    return true;  // 成功したら true を返す
}

// 指定されたMyPetの基礎ステータスをコンフィグから読み込み、式を適用する (強化値があればそれも適用)
function applyMyPetStatus(myPet) {
    // MyPetのUUIDに基づいた設定が含まれていなければ何もしない
    if (!config.getKeys("mypet").contains(myPet.getUUID().toString()))
        return;

    // 上限値の参照のために取得
    var skillParameters = _PET_BASE_VALUES_OF_TYPE[myPet.getPetType().getBukkitName()];  // {skillName: INT or RANGE}

    // 既存の式を解除
    unloadMyPetStatus(myPet);
    var unloaders = CUSTOM_MODIFIER_UNLOADERS[myPet.getUUID()] || [];
    CUSTOM_MODIFIER_UNLOADERS[myPet.getUUID()] = unloaders;

    // 値の適用
    logDebug("Appling MyPet(" + myPet.getUUID() + ") base status");
    config.getKeys("mypet." + myPet.getUUID() + ".base").forEach(function(skillName) {
        var value = config.getDouble("mypet." + myPet.getUUID() + ".base." + skillName);

        value += getConfiguredStatusSelf(myPet)[skillName] || 0;

        // 上限リミット
        if (skillParameters && skillParameters[skillName]) {
            var limitValue = skillParameters[skillName];
            if (typeof limitValue != "number")
                limitValue = Math.max(limitValue[0], limitValue[1]);
            value = Math.min(value, limitValue);
        }

        // HP オフセット
        if (skillName == "Life") {
            value -= petHPOffset;
        }

        var modifier = createCustomModifier(function(current) {
            return current + value;
        });

        var computer;
        try {
            computer = getMyPetSkillUpgradeComputerByName(myPet, skillName);
        } catch (err) {
            log.severe("Failed to get skill(" + skillName + ") upgrade computer: " + err);
            return;
        }

        computer.addUpgrade(modifier);
        
        unloaders.push(function() {
            computer.removeUpgrade(modifier);
        });

        if (skillName == "Life") {
            logDebug("  " + skillName + " = " + (value + petHPOffset) + " (offset -" + petHPOffset + ")");
        } else {
            logDebug("  " + skillName + " = " + value);
        }
    });
    return true;  // 成功したら true を返す
}

// 指定されたMyPetの基礎ステータスをコンフィグから削除する
function deleteMyPetStatus(inactiveMyPet) {
    config.set("mypet." + inactiveMyPet.getUUID(), null);
    config.save();
}

// 適用した基礎ステータスを削除(する関数を実行する)
function unloadMyPetStatus(myPet) {
    if (CUSTOM_MODIFIER_UNLOADERS[myPet.getUUID()]) {
        var unloaders = CUSTOM_MODIFIER_UNLOADERS[myPet.getUUID()];
        for (i in unloaders) {
            try {
                unloaders[i]();
            } catch (e) {
                // log.warning(e);
            }
        }
    }
    delete CUSTOM_MODIFIER_UNLOADERS[myPet.getUUID()];
}

// ランダムなスキルツリーに変更する
function randomSkilltree(myPet) {
    var skilltree = MyPetApi.getSkilltreeManager().getRandomSkilltree(myPet);
    if (skilltree === myPet.getSkilltree())
        skilltree = MyPetApi.getSkilltreeManager().getRandomSkilltree(myPet);
    if (skilltree === myPet.getSkilltree()) {
        return null;
    }
    myPet.setSkilltree(skilltree, Java.type("de.Keyle.MyPet.api.event.MyPetSelectSkilltreeEvent").Source.Other);
    return skilltree;
}

// 設定されている基礎ステータス
function getConfiguredStatus(inactiveMyPet) {
    var values = {};
    config.getKeys("mypet." + inactiveMyPet.getUUID() + ".base").forEach(function(skillName) {
        var value = config.getDouble("mypet." + inactiveMyPet.getUUID() + ".base." + skillName);
        values[skillName] = value;
    });
    return values;
}

// 設定されている(強化された)基礎ステータス
function getConfiguredStatusSelf(inactiveMyPet) {
    var values = {};
    config.getKeys("mypet." + inactiveMyPet.getUUID() + ".base-self").forEach(function(skillName) {
        var value = config.getDouble("mypet." + inactiveMyPet.getUUID() + ".base-self." + skillName);
        values[skillName] = value;
    });
    return values;
}

// 強化された基礎ステータスを設定
function setConfiguredStatusSelf(inactiveMyPet, skillName, value) {
    config.set("mypet." + inactiveMyPet.getUUID() + ".base-self." + skillName, value);
    config.save();
}

onLoad();
