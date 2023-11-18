
// 金床の･･･
// アイテム１ と アイテム２

// アイテム１も２も区別せず全部足して大きい方のレベルを結果として出す。
// ただし、オーバーレベルのソースがなければ、結果は通常の最大レベルを超えることはない

// コスト
//    バニラと同じ比例でOKです
//    レベル上がるごとに+1かな


var EnchantmentStorageMeta = Java.type("org.bukkit.inventory.meta.EnchantmentStorageMeta");
var DEBUG = false;

function debug(message) {  if (DEBUG) log.warning("DEBUG | " + message);  }


// エンチャントアイテムか、エンチャ本からエンチャントを取り出す関数を定義
function getEnchantments(item) {
    var meta = item.itemMeta;
    return (meta instanceof EnchantmentStorageMeta) ? meta.storedEnchants : item.enchantments;
}
function getEnchantmentLevel(item, ench) {
    return getEnchantments(item).getOrDefault(ench, 0);
}


bjs.on("prepareanvil", function(event) {
    // 金床のインベントリを取得
    var inv = event.inventory;

    // アイテムの取得 (ソース1, 2, 出力アイテム)
    var source1 = inv.getItem(0);
    var source2 = inv.getItem(1);
    var result = event.getResult();

    debug(source1 + ":" + source2 + ":" + result);

    // いずれかが空なら無視
    if (source1 == null || source2 == null || result == null)
        return;

    // キープするオーバーレベルのエンチャントの箱
    var keepEnchantments = new java.util.HashMap();  // Javaオブジェクトを格納するために、Javaの連想配列を初期化

    // 調べる
    getEnchantments(source1).forEach(function(ench, level) {
        debug("checking source1 ench:" + ench.name + ", level:" + level + ", max:" + ench.maxLevel);
        // s1がLv最大以上なら
        if (level > ench.maxLevel) {
            debug("hit1 " + ench.name + " lv" + level);
            if (keepEnchantments.containsKey(ench) && level <= keepEnchantments.get(ench))
                return;

            keepEnchantments.put(ench, level);
        }

    });

    getEnchantments(source2).forEach(function(ench, level) {
        debug("checking source2 ench:" + ench.name + ", level:" + level);
        // s1がLv最大以上なら
        if (level > ench.maxLevel) {
            debug("hit2 " + ench.name + " lv" + level);
            if (keepEnchantments.containsKey(ench) && level <= keepEnchantments.get(ench))
                return;

            keepEnchantments.put(ench, level);
        }
    });


    // 合成
    var moreCost = 0;
    for (ench in keepEnchantments) {
        var level = keepEnchantments[ench];
        debug("hit3 " + ench + " lv" + level);

        var currentLevel = getEnchantmentLevel(result, ench);
        moreCost += level - currentLevel;

        if (result.itemMeta instanceof EnchantmentStorageMeta) {
            result.itemMeta.removeStoredEnchant(ench);
            result.itemMeta.addStoredEnchant(ench, level, true);
        } else {
            result.removeEnchantment(ench);
            result.addUnsafeEnchantment(ench, level);
        }
    }

    var cost = inv.getRepairCost();
    debug("repairCost original: " + cost + ", more: " + moreCost + ", changed: " + (cost + moreCost));
    inv.setRepairCost(cost + moreCost);

});
