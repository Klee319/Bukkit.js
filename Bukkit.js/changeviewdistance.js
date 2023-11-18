
var COMMAND_PERMISSION = "changeviewdistance.command.changeviewdistance";

bjs.command("changeviewdistance", function(sender, args) {
    if (sender.type != "PLAYER") {
        sender.sendMessage("§cプレイヤーのみ実行可能なコマンドです");
        return;
    } else if (!sender.hasPermission(COMMAND_PERMISSION)) {
        sender.sendMessage("§cこのコマンドを実行する権限がありません");
        return;
    } else if (args.length <= 0) {
        sender.sendMessage("§cチャンク範囲(2-32)を指定してください");
        return;
    }

    var distance;
    try {
        distance = parseInt(args[0]);
        if (distance < 2 || 32 < distance)
            throw Error("out-of-range");
    } catch (err) {
        sender.sendMessage("§cチャンク範囲(2-32)を指定してください");
        return;
    }

    sender.setViewDistance(distance);
    sender.setSendViewDistance(distance);
    sender.sendMessage("§6プレイヤーの読み込みチャンクを §f" + distance + "チャンク §6に変更しました");
});
