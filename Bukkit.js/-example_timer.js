
// タイマーのサンプル
// メモ: 20 Ticks => 1 Second!


log.info("今から1分後にログを表示します！")

// 60 * 20 tick後に、function(task) {} を実行してくれ、と命令
bjs.scheduleTask(60 * 20, function(task) {
    // 1分後経ってから実行される
    log.info("1分が経過しました！");

});
// リピートタイマーのサンプル。中止(cancel)するまで繰り返し実行する

// ループした回数
var count = 0;
// 20tick毎に function(task) {} を実行してくれ、と命令
bjs.scheduleLoopTask(20, function(task) {
    count += 1;  // 1増やす
    log.info("ループした回数... " + count);  // ログ表示

    if (count >= 5) {
        log.info("ループ回数が5に達したため、ループを終了します。");

        // ループを中止したため、これ以降は実行されない。
        task.cancel();
    }
});

