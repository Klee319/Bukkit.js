
bjs.command("onionmedic", function(sender, args) {
    if (!sender.hasPermission("onionmedic.command.onionmedic"))
        return;

    function heal(e) {
        if (!(e instanceof Java.type("org.bukkit.entity.LivingEntity")))
            return;

        var health = e.getHealth();
        var maxHealth = e.getAttribute(Java.type("org.bukkit.attribute.Attribute").GENERIC_MAX_HEALTH).getValue();
        e.setHealth(maxHealth);
        e.sendMessage("§dHealed +" + (Math.round(maxHealth - health)) + "!" + ((sender===e) ? "" : " by " + sender.getName()));

        if (!(e instanceof Java.type("org.bukkit.entity.HumanEntity")))
            return;

        e.setFoodLevel(20);
    }

    if (args.length == 0) {
        heal(sender);
    } else {
        var entities = Java.type("org.bukkit.Bukkit").selectEntities(sender, java.lang.String.join(" ", args));
        entities.forEach(heal);
    }
});
