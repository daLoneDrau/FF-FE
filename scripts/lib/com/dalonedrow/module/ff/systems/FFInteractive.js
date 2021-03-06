function FFInteractive() {
	Interactive.call(this);
	var self = this;
    /** the next available id. */
    var nextId = 0;
    this.addAnimation = function(id, animId) {
        // TODO Auto-generated method stub

    }
    this.addItem = function(item, flags) {
        // TODO Auto-generated method stub
        return null;
    }
    this.ARX_INTERACTIVE_ForceIOLeaveZone = function(io, flags) {
        // TODO Auto-generated method stub

    }
    /**
     * Gets the IO that occupies a specific position.  No two IOs can occupy
     * the same position.
     * @param pt the {@link SimplePoint}
     * @return {@link FFInteractiveObject}
     */
    this.getIoAtPosition = function(pt) {
    	if (!(pt instanceof SimpleVector2)) {
    		throw new Error("Argument must be SimpleVector2");
    	}
        var io = null;
        var objs = this.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
        	var ioo = objs[i];
            if (ioo != null
                    && ioo.getPosition() != null
                    && ioo.getPosition().equals(pt)) {
                io = ioo;
            }
        }
        objs = null;
        return io;
    }
    /**
     * Gets the master script object.
     * @return {@link FFInteractiveObject}
     */
    this.getMasterScript = function() {
    	var io = getNewIO();
        // TODO - set master script
        // io.setScript(new MasterScript());
        // io.addIOFlag(FFIo.IO_16_IMMORTAL);
        return io;
    }
    this.getMaxIORefId = function() {
        return nextId;
    }
    var getNewIO = function() {
        // step 1 - find the next id
    	var id = nextId++;
    	var io = null;
        // try {
        io = new FFInteractiveObject(id);
        // } catch (RPGException e) {
        // JOGLErrorHandler.getInstance().fatalError(e);
        // }
        // step 2 - find the next available index in the objs array
        var index = -1, objs = self.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
            if (objs[i] === null) {
                index = i;
                break;
            }
        }
        // step 3 - put the new object into the arrays
        if (index < 0) {
            objs.push(io);
        } else {
            objs[index] = io;
        }
        objs = null;
        return io;
    }
    /**
     * Gets an NPC object by its name.
     * @param name the name
     * @return {@link FFInteractiveObject}
     */
    this.getNpcByName = function(name) {
    	var io = null, objs = this.getIOs();
        for (var i = objs.length - 1; i >= 0; i--) {
            if (objs[i] !== null
                    && objs[i].hasIOFlag(IoGlobals.IO_03_NPC)
                    && name.toLowerCase() === objs[i].getNPCData().getName().toLowerCase()) {
                io = objs[i];
                break;
            }
        }
        objs = null;
        return io;
    }
    /**
     * Loads an item by its name.
     * @param itemName the item's name
     * @return {@link FFInteractiveObject}
     * @throws RPGException if an error occurs
     */
    this.getModifierByCode = function(name) {
        var modifier = new EquipmentItemModifier();
    	var obj = JSON.parse(Interactive.getInstance().modifierSynchronousService.getEntityByCode(
    			name));
    	obj = obj[0];
    	modifier.setPercentage(obj.percent);
    	modifier.setValue(obj.value);
    	obj = null;
    	return modifier;
    }
    /**
     * Loads an item by its name.
     * @param itemName the item's name
     * @return {@link FFInteractiveObject}
     * @throws RPGException if an error occurs
     */
    this.loadItem = function(itemName) {
        var io = this.newItem();
        var itemData = new FFItem();
        io.setItemData(itemData);
    	var obj = JSON.parse(Interactive.getInstance().itemSynchronousService.getEntityByName(
    			"IRON SWORD"));
    	obj = obj[0];
        // *************************************************
        // weight
        // *************************************************
        if (obj.weight !== undefined) {
            itemData.setWeight(obj.weight);
        } else {
            itemData.setWeight(0);
        }
        // *************************************************
        // stack_size
        // *************************************************
        if (obj.stack_size !== undefined) {
            itemData.setStackSize(obj.stack_size);
        } else {
            itemData.setStackSize(1);
        }
        // *************************************************
        // name
        // *************************************************
        itemData.setItemName(obj.name);
        // *************************************************
        // title
        // *************************************************
        itemData.setTitle(obj.title);
        // *************************************************
        // max_owned
        // *************************************************
        if (obj.max_owned !== undefined) {
            itemData.setMaxOwned(obj.max_owned);
        } else {
            itemData.setMaxOwned(1);
        }
        // *************************************************
        // description
        // *************************************************
        itemData.setDescription(obj.description);
        // *************************************************
        // types
        // *************************************************
        if (obj.types !== undefined) {
        	for (var i = obj.types.length - 1; i >= 0; i--) {
                itemData.ARX_EQUIPMENT_SetObjectType(obj.types[i].flag, true);        		
        	}
        }
        // *************************************************
        // modifiers
        // *************************************************
        if (obj.modifiers !== undefined) {
        	for (var i in obj.modifiers) {
                var elementIndex =
                    FFEquipmentElements.valueOf(i).getIndex();
                itemData.getEquipitem().getElement(elementIndex).set(
                		this.getModifierByCode(obj.modifiers[i]));
        		
        	}
        	
        }
        // *************************************************
        // internal_script
        // *************************************************
        io.setScript(new window[obj.internal_script]());
        // *************************************************
        // groups
        // *************************************************
        if (obj.groups !== undefined) {
        	for (var i = obj.groups.length - 1; i >= 0; i--) {
        		io.addGroup(obj.groups[i].name);
        	}
        }
        Script.getInstance().sendInitScriptEvent(io);
        return io;
    }
    /**
     * Gets a new Player IO.
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
   this.newHero = function() {
	   var io = getNewIO();
	   io.addIOFlag(IoGlobals.IO_01_PC);
	   io.setPCData(new FFCharacter());
	   io.getPCData().newHero();
	   ProjectConstants.getInstance().setPlayer(io.getRefId());
	   io.setScript(new Hero(io));
	   Script.getInstance().sendInitScriptEvent(io);
	   return io;
    }
    /**
     * Gets a new Item IO
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
   this.newItem = function() {
	   var io = getNewIO();
	   io.addIOFlag(IoGlobals.IO_02_ITEM);
       return io;
    }
    /**
     * Gets a new Item IO
     * @return {@link FFInteractiveObject}
     * @throws RPGException
     */
   this.newNPC = function() {
	   var io = getNewIO();
       io.addIOFlag(IoGlobals.IO_03_NPC);
       return io;
    }
}
FFInteractive.prototype = Object.create(Interactive.prototype);
