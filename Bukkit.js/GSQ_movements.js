/*
  移動距離
    QID: bjs:GSQ_movements:make:(ブロック距離1):(G-EXP報酬1),(ブロック距離2):(G-EXP報酬2), ...

*/

// 表示名
DISPLAY_LINE = "{count}ブロック歩く";


/*
  ここから実装
*/
var quests = [];
function createQuest(api) {
    return {
        guild: api.guild,
        api: api,
        config: api.config,
        args: api.arguments,
        objectives: null,
        distance: null,
    };
}
function getGuild(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx].guild; }  }
function getQuest(apiOrGuild) {  for (idx in quests) { if (quests[idx].api === apiOrGuild || quests[idx].guild === apiOrGuild) return quests[idx] }  }
function getQuestsByMember(memberId) { return quests.filter(function (q) { return q.guild.isJoined(memberId); }); }
function make(clazz, guild, args) {
    return Java.extend(Java.type(clazz), {
        onLoad: function(api) {  var q = createQuest(api); quests.push(q); onLoad(api, q);  },
        onUnload: function(api) {  try {onUnload(api, getQuest(api))}catch(err){}; quests = quests.filter(function(q) { return q.api !== api });  },
        getReward: function(api) {  return getReward(getQuest(api));  },
        getMaxTier: function(api) {  return getQuest(api).objectives.length; },
        getCurrentTier: function(api) {  return getCompletedTier(getQuest(api));  },
        getDisplayName: function(api) {  return getDisplayName(getQuest(api));  },
        getProgressValue: function(api) {  return getCurrentCount(getQuest(api));  },
        getProgressMaxValue: function(api) {  return getNextCount(getQuest(api));  },
        getConfigId: function(api) {  return api.functionKey.scriptName;  },
    });
}

function getDisplayName(quest) {
    var nextCount = getNextCount(quest);
    return DISPLAY_LINE.replace("{count}", nextCount);
}

function getCurrentCount(quest) {
    return quest.distance;
}

// function setCurrentCount(quest, count) {
//     quest.config.set("count", count);
// }

function getNextCount(quest) {
    var objective = quest.objectives[getCompletedTier(quest)];
    return (objective) ? objective.count : null;
}

function getCompletedTier(quest) {
    return quest.config.getInt("tier", 0);
}

function setTier(quest, tier) {
    quest.config.set("tier", tier);
    quest.config.save();
}

function getReward(quest) {
    var objective = quest.objectives[getCompletedTier(quest)];
    return (objective) ? objective.reward : 0;
}

function onLoad(api, quest) {
    quest.objectives = [];

    for (idx in api.arguments) {
        var objective = api.arguments[idx].split(":");
        var count = parseInt(objective[0]);
        var reward = parseInt(objective[1]);
        if (isNaN(count) || isNaN(reward))
            api.throwLoad("パラメータが正しくありません(idx:" + idx + "): " + api.arguments[idx]);
        
        quest.objectives.push({count: count, reward: reward});
        // log.info("obj " + count);
        // log.info(api.arguments[idx]);
    }

    var obj = quest.config.get("distance");
    quest.distance = (obj instanceof java.lang.Number) ? obj.longValue() : 0;

}

function onUnload(api, quest) {
    quest.config.set("distance", quest.distance);

}

function getIcon(api, icon) {
    var quest = getQuest(api);
    icon.icon = Java.type("org.bukkit.Material").IRON_BOOTS;
    icon.category = "movements";
    return null;
}


/*
  utils
*/

var Bukkit = Java.type("org.bukkit.Bukkit");
var movementDistances = new java.util.HashMap();

/*
  listeners
*/

// 移動イベントより、プレイヤー毎に移動距離の統計を取る
bjs.on("playerMove", function(event) {
    var player = event.player;
    if (player.vehicle == null && !player.isFlying() && !player.isGliding() && !player.isInWater()) {
        var to = event.to.clone();
        to.setY(0);
        var from = event.from.clone();
        from.setY(0);
        
        var distance = movementDistances.getOrDefault(player.uniqueId, 0);
        distance += to.distance(from);
        movementDistances.put(player.uniqueId, distance);
    }
});

bjs.scheduleLoopTask(2 * 20, function() {
    var offlineIds = new java.util.HashSet();
    var updatedQuests = [];

    movementDistances.forEach(function(uniqueId, distance) {
        var player = Bukkit.getPlayer(uniqueId);

        getQuestsByMember(uniqueId).forEach(function(quest) {
            quest.distance += distance;

            if (player == null)
                offlineIds.add(uniqueId);

            if (!updatedQuests.some(function(q) { return q === quest; }))
                updatedQuests.push(quest);
        });

        movementDistances.put(uniqueId, 0);
    });

    movementDistances.keySet().removeAll(offlineIds);


    // check update
    updatedQuests.forEach(function(quest) {
        var config = quest.config;
        var api = quest.api;

        var tier = getCompletedTier(quest);
        var distance = quest.distance;

        var next = getNextCount(quest, tier);

        // 目標カウントを超えた and 現Tierが存在する (tier+1になった時に、そのTierが存在しなければ無視される)
        if (distance >= next && quest.objectives[tier] != null) {
            api.updateTier(tier+1);

            config.set("tier", tier+1);
            config.save();
        }
    });
});
