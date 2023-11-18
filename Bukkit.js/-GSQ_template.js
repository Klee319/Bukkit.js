/*
  LOGuildSystemプラグインとBukkitJSによるクエスト実装テンプレ

  導入:
    1. (スクリプト名).js を plugins/BukkitJS/scripts/ に配置
    2. ギルドシステム設定ファイルの 'guild-quests' セクションリストにクエストIDを追記し、クエストとして読み込ませる
      ※ クエストID は "bjs:(スクリプト名):make" です。(スクリプト名に .js 拡張子は不要)
    3. BukkitJS で先に読み込ませます。(/bjs load (スクリプト名))
    4. 最後に、ギルドシステムの設定を反映させます。(/guildsystem reload)
    ※ サーバーが閉じられていれば、3と4の手順は不要


  用意されるモノ:
    ・クエストAPIのクエストインスタンス (api)
    ・Tier更新を知らせるメソッド (api.updateTier(changedTier))
    ・ギルドオブジェクト (getGuild(api))
    ・クエストオブジェクト (getQuest(api) OR getQuestsByMember(playerUniqudId))
    ・ギルドとクエスト単位の設定ファイル (api.config)
    ・BukkitJS(bjs)のAPI
  
  
  引数について:
    クエストIDで引数を設定することも可能で、それらの値が入った配列を api.arguments などで参照できます。
      例:
        クエストID: bjs:example:make
        api.arguments -> []

        クエストID: bjs:example:make:abc:123:456,789:0
        api.arguments -> ["abc", "123", "456,789", "0"]

    引数でクエスト内容を変える場合は、設定ファイルが競合しないように
    引数に合わせて getConfigId() が返す値を変える必要があります。

  
  グローバル変数について:
    クエストはギルド毎に複数インスタンス化されるの対し、スクリプトは１つのインスタンスのため、
    グローバル変数は本スクリプトで実装される全てのクエストで共有されます。
  
    クエスト単位にデータ格納をする場合は、
    createQuest または onLoad でクエストオブジェクトなどに格納できます。

    (この仕様が面倒なので将来的に、クエストインスタンス単位でスクリプトを個別に読み込めるようにしたい･･･)
    
*/


/*
  ここから実装
*/
var quests = [];
function getGuild(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx].guild; }  }
function getQuest(api) {  for (idx in quests) { if (quests[idx].api === api) return quests[idx] }  }
function getQuestsByMember(memberId) { return quests.filter(function (q) { return q.guild.isJoined(memberId); }); }
function make(clazz, guild, args) {
    return Java.extend(Java.type(clazz), {
        onLoad: function(api) {  var q = createQuest(api); quests.push(q); onLoad(api, q, args);  },
        onUnload: function(api) {  try {onUnload(api, getQuest(api))}catch(err){}; quests = quests.filter(function(q) { return q.api !== api });  },
        getReward: function(api) {  return getReward(getQuest(api));  },
        getMaxTier: function(api) {  return getMaxTier(getQuest(api));  },
        getCurrentTier: function(api) {  return getCompletedTier(getQuest(api));  },
        getDisplayName: function(api) {  return getDisplayName(getQuest(api));  },
        getProgressValue: function(api) {  return getCurrentCount(getQuest(api));  },
        getProgressMaxValue: function(api) {  return getMaxCount(getQuest(api));  },
        getConfigId: function(api) {  return getConfigId(getQuest(api));  },
    });
}
/*
  ここまでクエスト実装テンプレ
*/



// クエストオブジェクトのインスタンス化(定義)
function createQuest(api) {
    return {
        guild: api.guild,
        api: api,
        config: api.config,
        args: api.arguments,
        // ここで、インスタンスごとのデータを格納しても良い。
    };
}


// データ保存用のファイルID
function getConfigId(quest) {
    return null;
}

// クエストの表示テキストを返す
function getDisplayName(quest) {
    return "クエストサンプル";
}

// 完了Tierを返す
function getCompletedTier(quest) {
    return 0;
}

// 最大Tierを返す
function getMaxTier(quest) {
    return 1;
}

// 現Tierの進行状況を返す (数値の表示と、この値を元に割合を算出される)
function getCurrentCount(quest) {
    return 5;
}

// 現Tierの最大カウント
function getMaxCount(quest) {
    return 10;
}

// 現Tierの達成報酬。G-Exp値
function getReward(quest) {
    return 0;
}

function onLoad(api, quest, args) {
    // クエストをロードした時に初期化する

    // エラーメッセージを出して異常終了したいとき
    //   api.throwLoad("メッセージ")

}

function onUnload(api, quest) {

}


/*
  ここから、フリーゾーン

  イベントを登録してアクションを監視したりして、クエスト条件に必要な処理を実装する
  Tierが変更されるときは、api.updateTier(changedTier) を呼ぶ

*/
