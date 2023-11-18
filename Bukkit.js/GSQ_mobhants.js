/*
  Mob討伐クエスト
    QID: bjs:GSQ_mobhants:make:(EntityType):(EntityType2):(ETy...),(討伐数1):(G-EXP報酬1),(討伐数2):(G-EXP報酬2), ...
*/

// 表示名
DISPLAY_LINE = "{mob}を{count}体討伐する";


/*
  ここから実装
*/
var EntityType = Java.type("org.bukkit.entity.EntityType");
var EntityDamageByEntityEvent = Java.type("org.bukkit.event.entity.EntityDamageByEntityEvent");

var quests = [];
function createQuest(api) {
    return {
        guild: api.guild,
        api: api,
        config: api.config,
        args: api.arguments,
        targetEntities: null,
        objectives: null,
    };
}
function getGuild(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx].guild; }  }
function getQuest(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx] }  }
function getQuestsByMember(memberId) { return quests.filter(function (q) { return q.guild.isJoined(memberId); }); }
function make(clazz, guild, args) {
    return Java.extend(Java.type(clazz), {
        onLoad: function(api) {  var q = createQuest(api); quests.push(q); onLoad(api, q);  },
        onUnload: function(api) {  try {onUnload(api, getQuest(api))}catch(err){}; quests = quests.filter(function(q) { return q.api !== api });  },
        getReward: function(api) {  return getReward(getQuest(api), getCompletedTier(api.config));  },
        getMaxTier: function(api) {  return getQuest(api).objectives.length; },
        getCurrentTier: function(api) {  return getCompletedTier(api.config);  },
        getDisplayName: function(api) {  return getDisplayName(getQuest(api), api.config);  },
        getProgressValue: function(api) {  return getCurrentCount(api.config);  },
        getProgressMaxValue: function(api) {  return getNextCount(getQuest(api), getCompletedTier(api.config));  },
        getConfigId: function(api) {  return api.functionKey.scriptName + "-" + args[0];  },
    });
}

function getDisplayName(quest, config) {
    var nextCount = getNextCount(quest, getCompletedTier(config));
    var targets = quest.targetEntities;
    return DISPLAY_LINE
        .replace("{count}", nextCount)
        .replace("{mob}", (targets.length == 1) ? ENTITY_NAMES[targets[0].name] : "特定のMob");
}

function getCurrentCount(config) {
    return config.getInt("count", 0);
}

function setCurrentCount(config, count) {
    config.set("count", count);
}

function getNextCount(quest, currentTier) {
    var objective = quest.objectives[currentTier];
    return (objective) ? objective.count : null;
}

function getCompletedTier(config) {
    return config.getInt("tier", 0);
}

function setTier(config, tier) {
    config.set("tier", tier);
    config.save();
}

function getReward(quest, currentTier) {
    var objective = quest.objectives[currentTier];
    return (objective) ? objective.reward : 0;
}

function onLoad(api, quest) {
    if (api.arguments.length < 2)
        api.throwLoad("引数が足りません");

    var types = [];
    api.arguments[0].split(":").forEach(function(typeName) {
        try {
            types.push(EntityType.valueOf(typeName));
        } catch (e) {
            api.throwLoad("エンティティタイプ " + typeName + " は無効です");
        }
    });

    quest.targetEntities = types;
    quest.objectives = [];

    for (idx in api.arguments) {
        if (idx == 0)
            continue;
        
        var objective = api.arguments[idx].split(":");
        var count = parseInt(objective[0]);
        var reward = parseInt(objective[1]);
        if (isNaN(count) || isNaN(reward))
            api.throwLoad("パラメータが正しくありません(idx:" + idx + "): " + api.arguments[idx]);
        
        quest.objectives.push({count: count, reward: reward});
    }

}

function onUnload(api, quest) {

}

function getIcon(api, icon) {
    var quest = getQuest(api);
    icon.icon = Java.type("org.bukkit.Material").GOLDEN_SWORD;
    icon.category = "mobhants";
    return quest.targetEntities;
}


/*
  utils
*/
function getDamagerByEvent(entityDeathEvent) {
    var cause = entityDeathEvent.entity.lastDamageCause;
    return (cause instanceof EntityDamageByEntityEvent) ? cause.damager : null;
}


/*
  listeners
*/
bjs.on("entityDeath", function(event) {
    var deadEntity = event.entity;
    var damager = getDamagerByEvent(event);
    if (damager == null)
        return;
    
    getQuestsByMember(damager.uniqueId).forEach(function(quest) {
        var config = quest.config;
        var api = quest.api;

        var tier = getCompletedTier(config);

        if (quest.targetEntities.indexOf(deadEntity.type) == -1)
            return;

        var count = getCurrentCount(config);
        count += 1;

        var next = getNextCount(quest, tier);

        setCurrentCount(config, count);

        // 目標カウントを超えた and 現Tierが存在する (tier+1になった時に、そのTierが存在しなければ無視される)
        if (count >= next && quest.objectives[tier] != null) {
            api.updateTier(tier+1);

            config.set("tier", tier+1);
            config.save();
        }
    });
});



var ENTITY_NAMES = {
    "item": "アイテム",
    "experience_orb": "経験値オーブ",
    "area_effect_cloud": "エリアエフェクトクラウド",
    "elder_guardian": "エルダーガーディアン",
    "wither_skeleton": "ウィザースケルトン",
    "stray": "ストレイ",
    "egg": "投げられた卵",
    "leash_knot": "リードの結び目",
    "painting": "絵画",
    "arrow": "矢",
    "snowball": "雪玉",
    "fireball": "火の玉",
    "small_fireball": "小さな火の玉",
    "ender_pearl": "投げられたエンダーパール",
    "eye_of_ender": "エンダーアイ",
    "potion": "ポーション",
    "experience_bottle": "投げられたエンチャントの瓶",
    "item_frame": "額縁",
    "wither_skull": "ウィザーの頭蓋骨",
    "tnt": "着火されたTNT",
    "falling_block": "落下中のブロック",
    "firework_rocket": "ロケット花火",
    "husk": "ハスク",
    "spectral_arrow": "光の矢",
    "shulker_bullet": "シュルカーの弾",
    "dragon_fireball": "ドラゴンの火の玉",
    "zombie_villager": "村人ゾンビ",
    "skeleton_horse": "スケルトンホース",
    "zombie_horse": "ゾンビホース",
    "armor_stand": "防具立て",
    "donkey": "ロバ",
    "mule": "ラバ",
    "evoker_fangs": "エヴォーカーの牙",
    "evoker": "エヴォーカー",
    "vex": "ヴェックス",
    "vindicator": "ヴィンディケーター",
    "illusioner": "イリュージョナー",
    "command_block_minecart": "コマンドブロック付きトロッコ",
    "boat": "ボート",
    "minecart": "トロッコ",
    "chest_minecart": "チェスト付きトロッコ",
    "furnace_minecart": "かまど付きトロッコ",
    "tnt_minecart": "TNT付きトロッコ",
    "hopper_minecart": "ホッパー付きトロッコ",
    "spawner_minecart": "スポナー付きトロッコ",
    "creeper": "クリーパー",
    "skeleton": "スケルトン",
    "spider": "クモ",
    "giant": "ジャイアント",
    "zombie": "ゾンビ",
    "slime": "スライム",
    "ghast": "ガスト",
    "zombified_piglin": "ゾンビピグリン",
    "enderman": "エンダーマン",
    "cave_spider": "洞窟グモ",
    "silverfish": "シルバーフィッシュ",
    "blaze": "ブレイズ",
    "magma_cube": "マグマキューブ",
    "ender_dragon": "エンダードラゴン",
    "wither": "ウィザー",
    "bat": "コウモリ",
    "witch": "ウィッチ",
    "endermite": "エンダーマイト",
    "guardian": "ガーディアン",
    "shulker": "シュルカー",
    "pig": "ブタ",
    "sheep": "ヒツジ",
    "cow": "ウシ",
    "chicken": "ニワトリ",
    "squid": "イカ",
    "wolf": "オオカミ",
    "mooshroom": "ムーシュルーム",
    "snow_golem": "スノウゴーレム",
    "ocelot": "ヤマネコ",
    "iron_golem": "アイアンゴーレム",
    "horse": "ウマ",
    "rabbit": "ウサギ",
    "polar_bear": "シロクマ",
    "llama": "ラマ",
    "llama_spit": "ラマの唾",
    "parrot": "オウム",
    "villager": "村人",
    "end_crystal": "エンドクリスタル",
    "turtle": "カメ",
    "phantom": "ファントム",
    "trident": "トライデント",
    "cod": "タラ",
    "salmon": "サケ",
    "pufferfish": "フグ",
    "tropical_fish": "熱帯魚",
    "drowned": "ドラウンド",
    "dolphin": "イルカ",
    "cat": "ネコ",
    "panda": "パンダ",
    "pillager": "ピリジャー",
    "ravager": "ラヴェジャー",
    "trader_llama": "商人のラマ",
    "wandering_trader": "行商人",
    "fox": "キツネ",
    "bee": "ミツバチ",
    "hoglin": "ホグリン",
    "piglin": "ピグリン",
    "strider": "ストライダー",
    "zoglin": "ゾグリン",
    "piglin_brute": "ピグリンブルート",
    "axolotl": "ウーパールーパー",
    "glow_item_frame": "輝く額縁",
    "glow_squid": "ヒカリイカ",
    "goat": "ヤギ",
    "marker": "マーカー",
    "fishing_bobber": "浮き",
    "lightning_bolt": "雷",
    "player": "プレイヤー"
  };
