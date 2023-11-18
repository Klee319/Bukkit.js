
// イベント処理のサンプル

// イベント名は以下のURLを参照してください。恐らくほぼ全て対応します
//   https://s7a.dev/spigot-event-list/only-bukkit.html
// 例えば PlayerChatEventであれば、 playerchat で OK です。


// PlayerJoinEvent というイベントを on します
// これによりプレイヤーが参加した時に、 function(event) {} が実行されます。
bjs.on("playerjoin", function(event) {
    // event に入ってるデータ => PlayerJoinEvent: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/event/player/PlayerJoinEvent.html

    var player = event.player;  // 参加したプレイヤーのオブジェクトを、変数 player に格納。
    // player に入ってるデータ => Player: https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/entity/Player.html

    // 例えば player.name とかすると、プレイヤーの名前を取得できる。


    // ブロードキャストしてみる
    bjs.broadcast("§6" + player.name + "さんがサーバーに参加しました！");
    // ※ § とは色コード。§6でGOLD、オレンジ色。

});

