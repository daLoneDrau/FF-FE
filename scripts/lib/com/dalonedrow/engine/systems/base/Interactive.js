function Interactive() {
	Hashcode.call(this);
    /** the list of {@link BaseInteractiveObject}s. */
    var objs = [];
	var FAST_RELEASE = false;
    /**
     * Destroys dynamic info for an interactive object.
     * @param io the IO
     * @throws PooledException if an error occurs
     * @throws RPGException if an error occurs
     */
    this.ARX_INTERACTIVE_DestroyDynamicInfo = function(io) {
        if (io !== null) {
        	var n = GetInterNum(io);
            ARX_INTERACTIVE_ForceIOLeaveZone(io, 0);
            for (var i = objs.length - 1; i >= 0; i--) {
            	var pio = objs[i];
                if (pio != null
                        && pio.hasIOFlag(IoGlobals.IO_01_PC)) {
                	var found = false;
                	var player = pio.getPCData();
                    // check to see if player was equipped with the item
                	var j = ProjectConstants.getInstance().getMaxEquipped() - 1;
                    for (; j >= 0; j--) {
                        if (player.getEquippedItem(j) === n
                                && Interactive.getInstance().hasIO(n)) {
                            // have player unequip
                            io.getItemData().ARX_EQUIPMENT_UnEquip(pio, true);
                            player.setEquippedItem(j, -1);
                            found = true;
                            break;
                        }
                    }
                    player = null;
                    if (found) {
                        break;
                    }
                }
            }

            Script.getInstance().eventStackClearForIo(io);

            if (Interactive.getInstance().hasIO(n)) {
            	var i = ProjectConstants.getInstance().getMaxSpells();
                for (; i >= 0; i--) {
                	var spell = SpellController.getInstance().getSpell(i);
                    if (spell != null) {
                        if (spell.exists()
                                && spell.getCaster() === n) {
                            spell.setTimeToLive(0);
                            spell.setTurnsToLive(0);
                        }
                    }
                }
            }
        }
    }
    this.ARX_INTERACTIVE_DestroyIO = function(io) {
        if (io !== null
                && io.getShow() !== IoGlobals.SHOW_FLAG_DESTROYED) {
            ARX_INTERACTIVE_ForceIOLeaveZone(io, 0);
            // if interactive object was being dragged
            // if (DRAGINTER == ioo) {
            // set drag object to null
            // Set_DragInter(NULL);
            // }

            // if interactive object was being hovered by mouse
            // if (FlyingOverIO == ioo) {
            // set hovered object to null
            // FlyingOverIO = NULL;
            // }

            // if interactive object was being combined
            // if (COMBINE == ioo) {
            // set combined object to null
            // COMBINE = NULL;
            // }
            if (io.hasIOFlag(IoGlobals.IO_02_ITEM)
                    && io.getItemData().getCount() > 1) {
                io.getItemData().adjustCount(-1);
            } else {
                // Kill all spells
            	var numm = GetInterNum(io);

                if (hasIO(numm)) {
                    // kill all spells from caster
                    // ARX_SPELLS_FizzleAllSpellsFromCaster(numm);
                }

                // Need To Kill timers
                Script.getInstance().timerClearByIO(io);
                io.setShow(IoGlobals.SHOW_FLAG_DESTROYED);
                io.removeGameFlag(IoGlobals.GFLAG_ISINTREATZONE);

                if (!FAST_RELEASE) {
                    RemoveFromAllInventories(io);
                }
                // unlink from any other IOs
                // if (ioo->obj) {
                // EERIE_3DOBJ * eobj = ioo->obj;
                // while (eobj->nblinked) {
                // long k = 0;
                // if ((eobj->linked[k].lgroup != -1)
                // && eobj->linked[k].obj) {
                // INTERACTIVE_OBJ * iooo =
                // (INTERACTIVE_OBJ *)eobj->linked[k].io;

                // if ((iooo) && ValidIOAddress(iooo)) {
                // EERIE_LINKEDOBJ_UnLinkObjectFromObject(
                // ioo->obj, iooo->obj);
                // ARX_INTERACTIVE_DestroyIO(iooo);
                // }
                // }
                // }
                // }

                ARX_INTERACTIVE_DestroyDynamicInfo(io);

                if (io.isScriptLoaded()) {
                	var num = GetInterNum(io);
                    releaseIO(io);

                    if (hasIO(num)) {
                        objs[num] = null;
                    }
                }
            }
        }
    }
    this.GetInterNum = function(io) {
    	var num = -1;
        if (io !== null) {
            for (var i = objs.length - 1; i >= 0; i--) {
                if (objs[i].equals(io)) {
                    num = i;
                    break;
                }
            }
        }
        return num;
    }
    /**
     * Gets a {@link IO} by its reference id.
     * @param id the reference id
     * @return {@link IO}
     * @throws RPGException if the object does not exist
     */
    this.getIO = function(id) {
    	var io = null;
        if (this.hasIO(id)) {
            for (var i = objs.length - 1; i >= 0; i--) {
                if (objs[i] !== null
                        && objs[i].getRefId() === id) {
                    io = objs[i];
                    break;
                }
            }
        } else {
            throw new Error("IO does not exist");
        }
        return io;
    }
    this.getIOs = function() {
        return objs;
    }
    /**
     * Gets an IO's reference id by name.  If the target is "none" or does not
     * exist, -1 is returned.  If the target is "self" or "me", -2; 
     * @param name the IO's name
     * @return {@link int}
     * @throws RPGException if an error occurs
     */
    this.getTargetByNameTarget = function(name) {
    	var ioid = -1;
        if (name !== null) {
            if (name.toLowerCase() === "self"
                    || nametoLowerCase() === "me") {
                ioid = -2;
            } else if (nametoLowerCase() === "player") {
                ioid = ProjectConstants.getInstance().getPlayer();
            } else {
                for (var i = objs.length - 1; i >= 0; i--) {
                	var io = objs[i];
                    if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
                        if (name.toLowerCase() === io.getNPCData().getName().toLowerCase()) {
                            ioid = io.getRefId();
                            break;
                        }
                    } else if (io.hasIOFlag(IoGlobals.IO_02_ITEM)) {
                        if (name.toLowerCase() === io.getItemData().toLowerCase()) {
                            ioid = io.getRefId();
                            break;
                        }
                    }
                    io = null;
                }
            }
        }
        return ioid;
    }
    /**
     * Determines if the {@link Interactive} has an interactive object by a
     * specific id.
     * @param io the IO
     * @return true if an interactive object by that id has been stored already;
     *         false otherwise
     */
    this.hasIO = function(io) {
        var has = false;
        if (io !== null) {
	    	if (io instanceof BaseInteractiveObject) {
	            for (var i = objs.length - 1; i >= 0; i--) {
	                if (objs[i] !== null
	                        && io.getRefId() === objs[i].getRefId()
	                        && io.equals(objs[i])) {
	                    has = true;
	                    break;
	                }
	            }
	    	} else {
	            for (var i = objs.length - 1; i >= 0; i--) {
	                if (objs[i] !== null
	                        && io == objs[i].getRefId()) {
	                    has = true;
	                    break;
	                }
	            }
	    	}
        }
        return has;
    }
    /**
     * Determines if two separate IOs represent the same object. Two objects are
     * considered the same if they are both non-unique items that have the same
     * name. PCs and NPCs will always return <tt>false</tt> when compared.
     * @param io0 the first IO
     * @param io1 the second IO
     * @return <tt>true</tt> if the IOs represent the same object;
     *         <tt>false</tt> otherwise
     */
    this.isSameObject = function(io0, io1) {
    	var same = false;
        if (io0 !== null
                && io1 !== null) {
            if (!io0.hasIOFlag(IoGlobals.IO_13_UNIQUE)
                    && !io1.hasIOFlag(IoGlobals.IO_13_UNIQUE)) {
                if (io0.hasIOFlag(IoGlobals.IO_02_ITEM)
                        && io1.hasIOFlag(IoGlobals.IO_02_ITEM)
                        && io0.getOverscript() === null
                        && io1.getOverscript() === null) {
                	var n0 = io0.getItemData().getItemName();
                	var n1 = io1.getItemData().getItemName();
                    if (n0.toLowerCase() === n1.toLowerCase()) {
                        same = true;
                    }
                }
            }
        }
        return same;
    }
    /**
     * Sets the weapon on an NPC.
     * @param io the IO
     * @param temp the temp object
     * @throws RPGException
     */
    this.prepareSetWeapon = function(io, temp) {
        if (io !== null
                && io.hasIOFlag(IoGlobals.IO_03_NPC)) {
            if (io.getNPCData().getWeapon() !== null) {
                var oldWpnIO = io.getNPCData().getWeapon();
                // unlink the weapon from the NPC IO
                // EERIE_LINKEDOBJ_UnLinkObjectFromObject(io->obj, ioo->obj);
                io.getNPCData().setWeapon(null);
                releaseIO(oldWpnIO);
                oldWpnIO = null;
            }
            // load IO from DB
            var wpnIO = addItem(temp, IoGlobals.IO_IMMEDIATELOAD);
            if (wpnIO !== null) {
                io.getNPCData().setWeapon(wpnIO);
                io.setShow(IoGlobals.SHOW_FLAG_LINKED);
                wpnIO.setScriptLoaded(true);
                // TODO - link item to io
                // SetWeapon_Back(io);
            }
        }
    }
    /**
     * Releases the IO and all resources.
     * @param ioid the IO's id
     * @throws RPGException if an error occurs
     */
    this.releaseIO = function(ioid) {
        if (parseInt(ioid) === parseInt(ioid)) {
            io = getIO(io);
        }
        if (io !== null) {
            if (io.getInventory() !== null) {
            	var inventory = io.getInventory();
                if (inventory !== null) {
                    for (var j = 0; j < inventory.getNumInventorySlots(); j++) {
                        if (io.equals(inventory.getSlot(j).getIo())) {
                            inventory.getSlot(j).setIo(null);
                            inventory.getSlot(j).setShow(true);
                        }
                    }
                }
            }
            // release script timers and spells
            // release from groups
            //
            Script.getInstance().timerClearByIO(io);
            // MagicRealmSpells.getInstance().removeAllSpellsOn(io);
            Script.getInstance().releaseScript(io.getScript());
            Script.getInstance().releaseScript(io.getOverscript());
            Script.getInstance().releaseAllGroups(io);
            var id = io.getRefId();
            var index = -1;
            for (var i = 0; i < objs.length; i++) {
                if (objs[i] !== null
                        && id === objs[i].getRefId()) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                objs[index] = null;
            }
        }
    }
    /**
     * Removes an item from all available inventories.
     * @param itemIO the item
     * @throws RPGException if an error occurs
     */
    this.RemoveFromAllInventories = function(itemIO) {
        if (itemIO !== null) {
        	var i = Interactive.getInstance().getMaxIORefId();
            for (; i >= 0; i--) {
                if (Interactive.getInstance().hasIO(i)) {
                	var invIo = Interactive.getInstance().getIO(i);
                    var inventoryData;
                    if (invIo.getInventory() !== null) {
                        inventoryData = invIo.getInventory();
                        for (var j = inventoryData.getNumInventorySlots() - 1; j >= 0; j--) {
                        	var slot = inventoryData.getSlot(j);
                            if (slot.getIo() !== null
                                    && slot.getIo().equals(itemIO)) {
                                slot.setIo(null);
                                slot.setShow(true);
                            }
                        }
                    }
                    invIo = null;
                    inventoryData = null;
                }
            }
        }
    }
    this.ARX_INTERACTIVE_TeleportBehindTarget = function(io) {
        // TODO Auto-generated method stub
        
    }
    this.ARX_INTERACTIVE_Teleport = function(io, position) {
        // TODO Auto-generated method stub
        
    }
    /**
     * Determines an IO's world position and sets the location to a
     *  {@link SimpleVector2} parameter.
     * @param io the IO
     * @param pos the parameter
     * @return <tt>true</tt> if the item has a position; <tt>false</tt>
     * otherwise
     */
    this.GetItemWorldPosition = function(io, pos) {
    	var hasPosition = false;
        if (io !== null) {
            if (io.getShow() !== IoGlobals.SHOW_FLAG_IN_SCENE) {
                // TODO if item is being cursor dragged, set its location to
                // player's
    
            	var found = false;
                for (var i = objs.length - 1; i >= 0; i--) {
                	var iio = objs[i];
                    if (iio == null) {
                        continue;
                    }
                    if (iio.hasIOFlag(IoGlobals.IO_03_NPC)) {
                        if (iio.equals(io)) {
                            // teleporting to NPC io
                            pos.set(iio.getPosition());
                            found = true;
                            hasPosition = true;
                            break;
                        }
                        // check to see if NPC has IO in inventory
                        if (iio.getInventory().IsInPlayerInventory(io)) {
                            // teleporting to NPC io
                            pos.set(iio.getPosition());
                            found = true;
                            hasPosition = true;
                            break;
                        }
                    } else if (iio.hasIOFlag(IoGlobals.IO_01_PC)) {
                        if (iio.equals(io)) {
                            // teleporting to PC io
                            pos.set(iio.getPosition());
                            found = true;
                            hasPosition = true;
                            break;
                        }
                        // check to see if PC has IO in inventory
                        if (iio.getInventory().IsInPlayerInventory(io)) {
                            // teleporting to PC io
                            pos.set(iio.getPosition());
                            found = true;
                            hasPosition = true;
                            break;
                        }
                    }
                }
                if (!found) {
                    // not found as NPC, PC, or item in inventory
                    for (var i = objs.length - 1; i >= 0; i--) {
                    	var iio = objs[i];
                        if (iio.equals(io)) {
                            pos.set(iio.getPosition());
                            hasPosition = true;
                            break;
                        }
                    }
                }
            }
        }
        return hasPosition;
    }
}
Interactive.prototype = Object.create(Hashcode.prototype);
Interactive.getInstance = function() {
	return Interactive.instance;
}
Interactive.setInstance = function(i) {
	if (!(i instanceof Interactive)) {
		throw new Error("Instance must be an Interactive subclass.")
	}
	Interactive.instance = i;
}
