function FFInventory() {
	InventoryData.call(this);
    var slots = [];
    for (var i = ProjectConstants.getInstance().getNumberInventorySlots() - 1; i >= 0; i--) {
        slots.push(new InventorySlot());
    }
    this.setSlots(slots);
    this.PutInFrontOfPlayer = function(itemIO, doNotApplyPhysics) {
        // TODO Auto-generated method stub

    }
}
FFInventory.prototype = Object.create(InventoryData.prototype);
