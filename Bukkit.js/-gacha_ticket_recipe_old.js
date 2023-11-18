
var Bukkit = Java.type("org.bukkit.Bukkit");
var Material = Java.type("org.bukkit.Material");
var ItemStack = Java.type("org.bukkit.inventory.ItemStack");
var NamespacedKey = Java.type("org.bukkit.NamespacedKey");
var Keyed = Java.type("org.bukkit.Keyed");
var ShapedRecipe = Java.type("org.bukkit.inventory.ShapedRecipe");
var Player = Java.type("org.bukkit.entity.Player");

// variable
var GACHA_TICKET_ID = new NamespacedKey(bjs.getOwner(), "gacha_ticket");


// methods

function createTicketItem() {
    var item = new ItemStack(Material.PAPER);
    var meta = item.getItemMeta();

    meta.setDisplayName("§eガチャチケット");
    meta.setLore(["至って普通のガチャ券である"]);

    item.setItemMeta(meta);
    return item;
}

function registerRecipe() {
    var recipe = new ShapedRecipe(GACHA_TICKET_ID, createTicketItem());
    recipe.shape("RLR", "LRL", "RLR");
    recipe.setIngredient("R", Material.REDSTONE_BLOCK);
    recipe.setIngredient("L", Material.LAPIS_BLOCK);
    Bukkit.addRecipe(recipe);
}

function unregisterRecipe() {
    var it = Bukkit.recipeIterator();
    while (it.hasNext()) {
        var recipe = it.next();
        if (recipe instanceof Keyed) {
            if (GACHA_TICKET_ID.equals(recipe.getKey())) {
                it.remove();
                break;
            }
        }
    }
}


// registers

bjs.command("givegachaticket", function(sender) {
    if (!(sender instanceof Player)) {
        sender.sendMessage("§4プレイヤーのみ実行できるコマンドです");
        return;
    }

    sender.getInventory().addItem(createTicketItem());
});


// init
registerRecipe();


// script cleanup

function onUnload() {
    unregisterRecipe();
}


