/*
  ギルドメンバー
    QID: bjs:GSQ_members:make:(人数1):(G-EXP報酬1),(人数2):(G-EXP報酬2), ...
*/

// 表示名
DISPLAY_LINE = "ギルドメンバーを{count}人にする";


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


    bjs.scheduleTask(5, function() {
        checkMembers(quest);
    });

}

function onUnload(api, quest) {

}

function getIcon(api, icon) {
    var quest = getQuest(api);
    icon.icon = Java.type("org.bukkit.Material").SUNFLOWER;
    icon.category = "members";
    return null;
}


/*
  utils
*/


/*
  listeners
*/
// 参加された時
var GuildMemberJoinEvent = Java.type("com.gmail.necnionch.myplugin.guildsystem.bukkit.events.GuildMemberJoinEvent");
bjs.onEvent(GuildMemberJoinEvent.class, function(event) {
    var quest = getQuest(event.guild);
    if (quest != null)
        checkMembers(quest);

});

function checkMembers(quest) {
    // log.info("checkMembers");
    var guild = quest.guild;
    var members = guild.allMembers.length;
    var tier = getCompletedTier(quest);
    var next = getNextCount(quest);

    setCurrentCount(quest, members);

    // log.info("members: " + members + ", tier: " + tier + ", nextTier: " + next);
    // log.info(quest.objectives);

    // 目標カウントを超えた and 現Tierが存在する (tier+1になった時に、そのTierが存在しなければ無視される)
    if (members >= next && quest.objectives[tier] != null) {
        quest.api.updateTier(tier+1);

        quest.config.set("tier", tier+1);
        quest.config.save();

        checkMembers(quest);
    }

}
