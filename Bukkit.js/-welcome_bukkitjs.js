
bjs.scheduleTask(0, function (task) {
    log.info("Printing... Welcome BukkitJS  by Necnion8");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("  §aBukkitJS §3開発用サーバーへようこそ～");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("    §6サーバーを停止するときは §bstop §6と実行してください。");
    bjs.server.consoleSender.sendMessage("    §6また、BukkitJSプラグインのコマンドは §bbjs §6です。");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("    §f例えばスクリプトを再読み込みしたい時は、§bbjs reload (scriptName) §fを実行します。");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("    §f(一覧)");
    bjs.server.consoleSender.sendMessage("    §e  bjs load (scriptName)");
    bjs.server.consoleSender.sendMessage("    §e  bjs unload (scriptName)");
    bjs.server.consoleSender.sendMessage("    §e  bjs reload (scriptName)");
    bjs.server.consoleSender.sendMessage("    §e  bjs list");
    bjs.server.consoleSender.sendMessage("    §e  bjs debug (jsCode)");
    bjs.server.consoleSender.sendMessage("    §e  bjs enable (scriptName)");
    bjs.server.consoleSender.sendMessage("    §e  bjs disable (scriptName)");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("");
    bjs.server.consoleSender.sendMessage("    §fスクリプトファイルを入れるフォルダ:");
    bjs.server.consoleSender.sendMessage("      §6BukkitJS_TestServer/plugins/BukkitJS/scripts/");
    bjs.server.consoleSender.sendMessage("");
});
