/*
  ログインクエスト (１人あたり１日１カウント)
    QID: bjs:GSQ_logins:make:(回数1):(G-EXP報酬1),(回数2):(G-EXP報酬2), ...
*/

// 表示名
DISPLAY_LINE = "{count}回ログインする";


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
    };
}
function getGuild(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx].guild; }  }
function getQuest(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx] }  }
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
    return quest.config.getInt("count", 0);
}

function setCurrentCount(quest, count) {
    quest.config.set("count", count);
}

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
    }
}

function onUnload(api, quest) {

}

function getIcon(api, icon) {
    var quest = getQuest(api);
    icon.icon = Java.type("org.bukkit.Material").OAK_DOOR;
    icon.category = "logins";
    return null;
}


/*
  utils
*/
function getToday() {
    var today = new Date();
    return today.getFullYear() + "." + (today.getMonth()+1) + "." + today.getDate();
}


/*
  listeners
*/
bjs.on("playerJoin", function(event) {
    getQuestsByMember(event.player.uniqueId).forEach(function(quest) {
        var config = quest.config;
        var api = quest.api;

        // 日付チェック。今日のカウントなら無視
        if (config.getString("players." + event.player.uniqueId, "") == getToday())
            return;
        
        config.set("players." + event.player.uniqueId,  getToday());
        

        var count = getCurrentCount(quest);
        count += 1;

        var tier = getCompletedTier(quest);
        var next = getNextCount(quest);

        setCurrentCount(quest, count);

        // 目標カウントを超えた and 現Tierが存在する (tier+1になった時に、そのTierが存在しなければ無視される)
        if (count >= next && quest.objectives[tier] != null) {
            api.updateTier(tier+1);

            config.set("tier", tier+1);
            config.save();
        }

    });
});
