
// 設定ファイル、コンフィグ(config)とも言いますが...。のサンプル
// このファイルの場所は (スクリプト名).yml で保存されます。


// Configオブジェクトを取得します
var config = bjs.getConfig();


// ファイルから読み込みます。
config.load();



// 'lastJoin' をキーとして、'Necnion8' という文字列を格納します。
config.set("lastJoin", "Necnion8");
// 値は文字列ではなく数字もOK
config.set("testInt", 100);


// キー 'lastJoin' の文字列をConfigから取得し、lastJoinSitaHitonoNamae という変数に格納。
var lastJoinSitaHitonoNamae = config.getString("lastJoin");
// 数字も同様
var testIntTteiuSuuzi = config.getInt("testInt");


// ファイルに保存
config.save();



// キーと値があって、連想配列 みたいだね
