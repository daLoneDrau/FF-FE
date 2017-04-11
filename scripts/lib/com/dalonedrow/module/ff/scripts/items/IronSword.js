function IronSword(io) {
	WeaponScript.call(this, io);
    var old_onInit = this.onInit;
    this.onInit = function() {
        // set local variables
        this.setLocalVariable("reagent", "none");
        this.setLocalVariable("poisonable", 1);
        return old_onInit();
    }
}
IronSword.prototype = Object.create(WeaponScript.prototype);
