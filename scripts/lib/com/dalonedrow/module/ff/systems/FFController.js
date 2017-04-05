function FFController() {
	ProjectConstants.call(this);
    var godMode = false;
    /** flag indicating whether menus are on. */
    var menusOn = true;
    /** the player IO's id. */
    var playerId = -1;
    this.getConsoleHeight = function() {
        return 30;
    }
    this.getConsoleWidth = function() {
        return 100;
    }
    this.getDamageElementIndex = function() {
        return FFEquipmentElements.valueOf("ELEMENT_DAMAGE").getIndex();
    }
    this.getMaxEquipped = function() {
        return EquipmentGlobals.MAX_EQUIPPED;
    }
    this.getMaxSpells = function() {
        // TODO Auto-generated method stub
        return 0;
    }
    this.getNumberEquipmentElements = function() {
        return FFEquipmentElements.getNumberOfValues();
    }
    this.getPlayer = function() {
        return playerId;
    }
    this.getPlayerIO = function() {
        return Interactive.getInstance().getIO(playerId);
    }
    this.godMode = function() {
        return godMode;
    }
    this.isGameOver = function() {
        return false;
    }
    /**
     * @return the menusOn
     */
    this.isMenusOn = function() {
        return menusOn;
    }
    /**
     * @param godMode the godMode to set
     */
    this.setGodMode = function(flag) {
        godMode = flag;
    }
    /**
     * @param menusOn the menusOn to set
     */
    this.setMenusOn = function(flag) {
        menusOn = flag;
    }
    /**
     * @param val the value to set
     */
    this.setPlayer = function(val) {
        playerId = val;
    }
    this.update = function() {
        // TODO Auto-generated method stub

    }
}
FFController.prototype = Object.create(ProjectConstants.prototype);
