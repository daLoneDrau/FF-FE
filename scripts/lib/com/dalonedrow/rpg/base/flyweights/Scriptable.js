/**
 *
 */
function Scriptable(ioInstance) {
    Hashcode.call(this);
    /** bit flag storing which events are allowed. */
    var allowedEvent;
    /** the list of actions for an event. */
    var eventActions;
    /** the IO associated with this script. */
    var io;
    /** the array of local {@link ScriptVariable}s. */
    var lvar;
    /** the master script. */
    var master;
    /** the list of script timers. */
    var timers = [];
    for (var i = ScriptConstants.MAX_SCRIPTTIMERS - 1; i >= 0; i--) {
    	timers.push(0);
    }
    lvar = [];
    eventActions = {};
    io = ioInstance;
    /**
     * Adds a local variable.
     * @param svar the local variable
     */
    this.addLocalVariable = function(svar) {
    	var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] === null) {
                lvar[i] = svar;
                index = i;
                break;
            }
        }
        if (index === -1) {
            lvar = ArrayUtilities.getInstance().extendArray(svar, lvar);
        }
    }
    /**
     * Adds a {@link ScriptAction} to the list of actions for an event.
     * @param eventID the event ID - usually the script message #
     * @param action the script action
     */
    this.addScriptAction = function(eventID, action) {
        if (eventActions[eventID] === null) {
            eventActions[eventID] = [];
        }
        if (action !== null) {
            action.setScript(this);
            eventActions[eventID].push(action);
        }
    }
    /**
     * Assigns a bit flag for an allowed event.
     * @param event the event flag
     */
    this.assignDisallowedEvent = function(event) {
        allowedEvent |= event;
    }
    /**
     * Changes the IO's behavior.
     * @param params the behavior parameters
     */
    this.behavior = function(params) {
        if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
            if ("STACK" === params.getAction().toUpperCase()) {
                io.getNPCData().ARX_NPC_Behaviour_Stack();
            } else if ("UNSTACK" === params.getAction().toUpperCase()) {
                io.getNPCData().ARX_NPC_Behaviour_UnStack();
            } else if ("UNSTACKALL" === params.getAction().toUpperCase()) {
                io.getNPCData().resetBehavior();
            } else {
                io.getNPCData().ARX_NPC_Behaviour_Change(params.getFlags(),
                		params.getBehaviorParam());
                if (params.getMovemode() > -1) {
                    io.getNPCData().setMovemode(params.getMovemode());
                }
                if (params.getTactics() > -1) {
                    io.getNPCData().setTactics(params.getTactics());
                }
                if (params.getTargetInfo() !== -1) {
                    io.setTargetinfo(params.getTargetInfo());
                }
            }
        }
    }
    /** Clears the bit flags for allowed events. */
    this.clearDisallowedEvents = function() {
        allowedEvent = 0;
    }
    /**
     * Clears a local variable assigned to the {@link Scriptable}.
     * @param varName the variable's name
     */
    this.clearLocalVariable = function(varName) {
        for (var i = lvar.length - 1; i >= 0; i--) {
            if (lvar[i] !== null
                    && lvar[i].getName() !== null
                    && lvar[i].getName().toLowerCase() === varName.toLowerCase()) {
                lvar[i].clear();
            }
            lvar[i] = null;
        }
    }
    /** Clears all local variables assigned to the {@link Scriptable}. */
    this.clearLocalVariables = function() {
        for (var i = lvar.length - 1; i >= 0; i--) {
            if (lvar[i] !== null) {
                lvar[i].clear();
            }
            lvar[i] = null;
        }
    }
    /**
     * Gets all event actions for a scripted event.
     * @param eventID the event ID - usually the script message #
     * @return {@link ScriptAction}[]
     */
    this.getEventActions = function(eventID) {
        if (eventActions.get(eventID) === null) {
            eventActions[eventID] = [];
        }
        return eventActions[eventID];
    }
    /**
     * Gets the IO associated with this script.
     * @return {@link IO}
     */
    this.getIO = function() {
        return io;
    }
    /**
     * Gets the local floating-point array value assigned to a specific
     * variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
    this.getLocalFloatArrayVariableValue = function(name) {
        if (lvar === null) {
        	lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_11_FLOAT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Float Array variable ", name, " was never set."].join(""));
        }
        return lvar[index].getFloatArrayVal();
    }
    /**
     * Gets the local floating-point value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
    this.getLocalFloatVariableValue = function(name) {
        if (lvar === null) {
        	lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_10_FLOAT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Float variable ", name, " was never set."].join(""));
        }
        return lvar[index].getFloatVal();
    }
    /**
     * Gets the local integer array value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
    this.getLocalIntArrayVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_13_INT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Int Array variable ", name, " was never set."].join(""));
        }
        return lvar[index].getIntArrayVal();
    }
    /**
     * Gets the local integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
    this.getLocalIntVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_12_INT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Int variable ", name, " was never set."].join(""));
        }
        return lvar[index].getIntVal();
    }
    /**
     * Gets the local long integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
    this.getLocalLongArrayVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_15_LONG_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Long Array variable ", name, " was never set."].join(""));
        }
        return lvar[index].getLongArrayVal();
    }
    /**
     * Gets the local long integer value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @throws PooledException if one occurs
     */
    this.getLocalLongVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_14_LONG) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local Long variable ", name, " was never set."].join(""));
        }
        return lvar[index].getLongVal();
    }
    /**
     * Gets the local text array value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
    this.getLocalStringArrayVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_09_TEXT_ARR) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local String Array variable ", name, " was never set."].join(""));
        }
        return lvar[index].getTextArrayVal();
    }
    /**
     * Gets the local text value assigned to a specific variable.
     * @param name the variable name
     * @return {@link String}
     * @if no such variable was assigned
     */
    this.getLocalStringVariableValue = function(name) {
        if (lvar === null) {
            lvar = [];
        }
        var index = -1;
        for (var i = 0; i < lvar.length; i++) {
            if (lvar[i] !== null
                    && lvar[i].getName() === name
                    && lvar[i].getType() === ScriptGlobals.TYPE_L_08_TEXT) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            throw new Error(["Local String variable ", name, " was never set."].join(""));
        }
        return lvar[index].getText();
    }
    /**
     * Gets the length of the local variable array.
     * @return int
     */
    this.getLocalVarArrayLength = function() {
        return lvar.length;
    }
    /**
     * Gets a local {@link Scriptable} variable.
     * @param index the index of the variable
     * @return {@link ScriptVariable}
     */
    this.getLocalVariable = function(varid) {
        var svar = null;
        if (parseInt(varid) === parseInt(varid)) {
            if (varid >= 0
                    && varid < lvar.length) {
                svar = lvar[varid];
            }
        } else {
            for (var i = lvar.length - 1; i >= 0; i--) {
                if (lvar[i] !== null
                        && lvar[i].getName() !== null
                        && lvar[i].getName() === name) {
                    svar = lvar[i];
                    break;
                }
            }
        }
        return svar;
    }
    /**
     * Gets the master script.
     * @return {@link Scriptable<IO>}
     */
    this.getMaster = function() {
        return master;
    }
    this.getTargetPos = function(io, smoothing) {
        if (io === null) {
            return;
        }

        if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
            if (io.getNPCData().hasBehavior(Behaviour.BEHAVIOUR_NONE)) {
                io.getTarget().setX(io.getPosition().getX());
                io.getTarget().setY(io.getPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
            if (io.getNPCData().hasBehavior(Behaviour.BEHAVIOUR_GO_HOME)) {
                if (io.getNPCData().getPathfinding().getListPosition() < io
                        .getNPCData().getPathfinding().getListnb()) {
                	var pos = io.getNPCData().getPathfinding().getListItem(
                            io.getNPCData().getPathfinding().getListPosition());
                    // io.getTarget().setX(ACTIVEBKG->anchors[pos].pos.x;
                    // io.getTarget().setY(ACTIVEBKG->anchors[pos].pos.y;
                    // io.getTarget().setZ(ACTIVEBKG->anchors[pos].pos.z;
                    return;
                }
                io.getTarget().setX(io.getInitPosition().getX());
                io.getTarget().setY(io.getInitPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
            if (io.hasIOFlag(IoGlobals.IO_03_NPC)
                    && io.getNPCData().getPathfinding().getListnb() !== -1
                    && io.getNPCData().getPathfinding().hasList()
                    && !io.getNPCData()
                            .hasBehavior(Behaviour.BEHAVIOUR_FRIENDLY)) {
                // Targeting Anchors !
                if (io.getNPCData().getPathfinding().getListPosition()
                		< io.getNPCData().getPathfinding().getListnb()) {
                	var pos = io.getNPCData().getPathfinding().getListItem(
                            io.getNPCData().getPathfinding().getListPosition());
                    // io.getTarget().setX(ACTIVEBKG->anchors[pos].pos.x;
                    // io.getTarget().setY(ACTIVEBKG->anchors[pos].pos.y;
                    // io.getTarget().setZ(ACTIVEBKG->anchors[pos].pos.z;
                } else if (Interactive.getInstance().hasIO(
                        io.getNPCData().getPathfinding().getTruetarget())) {
                	var ioo = Interactive.getInstance().getIO(
                			io.getNPCData().getPathfinding().getTruetarget());
                    io.getTarget().setX(ioo.getPosition().getX());
                    io.getTarget().setY(ioo.getPosition().getY());
                    io.getTarget().setZ(0);
                }
                return;
            }
        }
        if (io.getTargetinfo() === ScriptConstants.TARGET_PATH) {
            // if (io->usepath === NULL)
            // {
            // io->target.x = io->pos.x;
            // io->target.y = io->pos.y;
            // io->target.z = io->pos.z;
            // return;
            // }

            // ARX_USE_PATH * aup = (ARX_USE_PATH *)io->usepath;
            // aup->_curtime += smoothing + 100;
            // EERIE_3D tp;
            // long wp = ARX_PATHS_Interpolate(aup, &tp);

            // if (wp < 0)
            // {
            // if (io->ioflags & IO_CAMERA)
            // io->_camdata->cam.lastinfovalid = FALSE;
            // }
            // else
            // {

            // io->target.x = tp.x;
            // io->target.y = tp.y;
            // io->target.z = tp.z;

            // }

            // return;
        }

        if (io.getTargetinfo() === ScriptConstants.TARGET_NONE) {
            io.getTarget().setX(io.getPosition().getX());
            io.getTarget().setY(io.getPosition().getY());
            io.getTarget().setZ(0);
            return;
        }
        if (io.getTargetinfo() === ScriptConstants.TARGET_PLAYER
                || io.getTargetinfo() === -1) {
        	var player = Interactive.getInstance().getIO(
        			ProjectConstants.getInstance().getPlayer());
            io.getTarget().setX(player.getPosition().getX());
            io.getTarget().setY(player.getPosition().getY());
            io.getTarget().setZ(0);
            player = null;
            return;
        } else {
            if (Interactive.getInstance().hasIO(io.getTargetinfo())) {
            	var tio = Interactive.getInstance().getIO(io.getTargetinfo());
            	var pos = new SimpleVector2();
                if (Interactive.getInstance().GetItemWorldPosition(tio, pos)) {
                    io.getTarget().setX(pos.getX());
                    io.getTarget().setY(pos.getY());
                    io.getTarget().setZ(0);
                    return;
                }
                io.getTarget().setX(tio.getPosition().getX());
                io.getTarget().setY(tio.getPosition().getY());
                io.getTarget().setZ(0);
                return;
            }
        }
        io.getTarget().setX(io.getPosition().getX());
        io.getTarget().setY(io.getPosition().getY());
        io.getTarget().setZ(0);
    }
    /**
     * Gets a specific script timer's reference id.
     * @param index the timer's index
     * @return {@link int}
     */
    this.getTimer = function(index) {
        return timers[index];
    }
    /**
     * Shorthand method to get the type variable.
     * @return {@link String}
     * @if an error occurs
     */
    this.getType = function() {
        return this.getLocalStringVariableValue("type");
    }
    /**
     * Determines if the {@link InteractiveObject} allows a specific event.
     * @param event the event flag
     * @return true if the object has the event set; false otherwise
     */
    this.hasAllowedEvent = function(event) {
        return (allowedEvent & event) === event;
    }
    /**
     * Determines if a {@link ScriptObject} has local variable with a specific
     * name.
     * @param name the variable name
     * @return <tt>true</tt> if the {@link ScriptObject} has the local variable;
     *         <tt>false</tt> otherwise
     */
    this.hasLocalVariable = function(name) {
        return this.getLocalVariable(name) !== null;
    }
    /**
     * Determines if a {@link ScriptObject} has local variables assigned to it.
     * @return true if the {@link ScriptObject} has local variables; false
     *         otherwise
     */
    this.hasLocalVariables = function() {
        var has = false;
        for (var i = lvar.length - 1; i >= 0; i--) {
            if (lvar[i] !== null) {
                has = true;
                break;
            }
        }
        return has;
    }
    /**
     * Shorthand method to determine if the type variable matches a specific
     * type.
     * @param type the type
     * @return {@link boolean}
     * @if an error occurs
     */
    this.isType = function(type) {
        return this.getLocalStringVariableValue("type") === type;
    }
    /**
     * Script run when the {@link Scriptable} is added to a party.
     * @return {@link int}
     * @when an error occurs
     */
    this.onAddToParty = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Script run when the {@link Scriptable} is a target of aggression.
     * @return {@link int}
     * @when an error occurs
     */
    this.onAggression = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onAttackPlayer = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onCallHelp = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO chat start.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onChat = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onCheatDie = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onCollideDoor = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onCollideNPC = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onCollisionError = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO combine.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onCombine = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onControlsOff = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onControlsOn = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onDelation = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onDetectPlayer = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO dies.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onDie = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onDoorLocked = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO equipped.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onEquip = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onFleeEnd = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onGameReady = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onHear = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO hit.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onHit = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO attempt to identify.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onIdentify = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO initialization.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInit = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO initialization end.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInitEnd = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO closes inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInventoryClose = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO goes into inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInventoryIn = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO opens inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInventoryOpen = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO comes out of inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInventoryOut = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO is used inside inventory.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onInventoryUse = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onLoad = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onLookFor = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onLookMe = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO traveling on the game map.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onMovement = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO ouch.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onOuch = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onPlayerEnemy = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onReachedTarget = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onReload = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Causes an NPC to
     * @return
     * @throws RPGException
     */
    this.onSpeakNoRepeat = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onSpellcast = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onSteal = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO successfully strikes a target.
     * @return {@link int}
     * @if an error occurs
     */
    this.onStrike = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onTargetDeath = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onUndetectPlayer = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * On IO unequipped.
     * @return <code>int</code>
     * @if an error occurs
     */
    this.onUnequip = function() {
        return ScriptConstants.ACCEPT;
    }
    /**
     * Removed an event from the list of allowed events.
     * @param event the event flag
     */
    this.removeDisallowedEvent = function(event) {
        allowedEvent = allowedEvent & ~event;
    }
    /**
     * Sets the IO associated with this script.
     * @param val the IO to set
     */
    this.setIO = function(val) {
        io = val;
    }
    /**
     * Sets a local {@link ScriptVariable}.
     * @param index the index of the variable
     * @param svar the local {@link ScriptVariable}
     * @throws PooledException if one occurs
     * @if no such variable was assigned
     */
    this.setLocalVariable = function() {
    	if (arguments.length === 2) {
	        // if the index number is valid
	        if (arguments[0] >= 0) {
	        	for (var i = 0; i < arguments[0] + 1; i++) {
	        		if (i >= lvar.length) {
	        			lvar.push(null);
	        		}
	        	}
	            lvar[arguments[0]] = arguments[1];
	        } else {
	            throw new Error(["Invalid array index ", arguments[0], "."].join(""));
	        }
    	} else {
            if (arguments[0] !== null) {
                var found = false;
                for (var i = lvar.length - 1; i >= 0; i--) {
                    if (lvar[i] !== null
                            && lvar[i].getName() !== null
                            && lvar[i].getName() === arguments[0].getName())) {
                        lvar[i] = arguments[0];
                        found = true;
                        break;
                    }
                }
                // if the local variable was not found
                if (!found) {
                    // find an empty index
                	var i = lvar.length - 1;
                    for (; i >= 0; i--) {
                        if (lvar[i] === null) {
                            break;
                        }
                    }
                    if (i >= 0) {
                        lvar[i] = arguments[0];
                    } else {
                        lvar.push(svar);
                    }
                }
            }
    	}
    }
    /**
     * Sets a global variable.
     * @param name the name of the global variable
     * @param value the variable's value
     * @if an error occurs
     */
    this.setLocalVariable = function(final String name, final Object value) {
        boolean found = false;
        for (int i = 0, len = lvar.length; i < len; i++) {
            ScriptVariable svar = lvar[i];
            if (svar !== null
                    && svar.getName() !== null
                    && svar.getName() === name)) {
                svar.set(value);
                found = true;
                break;
            }
        }
        if (!found) {
            // create a new variable and add to the global array
            ScriptVariable svar = null;
            if (value instanceof String
                    || value instanceof char[]) {
                svar = new ScriptVariable(name, ScriptConstants.TYPE_L_08_TEXT,
                        value);
            } else if (value instanceof String[]
                    || value instanceof char[][]) {
                svar = new ScriptVariable(name,
                        ScriptConstants.TYPE_L_09_TEXT_ARR, value);
            } else if (value instanceof Float) {
                svar = new ScriptVariable(name, ScriptConstants.TYPE_L_10_FLOAT,
                        value);
            } else if (value instanceof Double) {
                svar = new ScriptVariable(name, ScriptConstants.TYPE_L_10_FLOAT,
                        value);
            } else if (value instanceof float[]) {
                svar = new ScriptVariable(name,
                        ScriptConstants.TYPE_L_11_FLOAT_ARR, value);
            } else if (value instanceof Integer) {
                svar = new ScriptVariable(name, ScriptConstants.TYPE_L_12_INT,
                        value);
            } else if (value instanceof int[]) {
                svar = new ScriptVariable(name,
                        ScriptConstants.TYPE_L_13_INT_ARR, value);
            } else if (value instanceof Long) {
                svar = new ScriptVariable(name, ScriptConstants.TYPE_L_14_LONG,
                        value);
            } else if (value instanceof long[]) {
                svar = new ScriptVariable(name,
                        ScriptConstants.TYPE_L_15_LONG_ARR, value);
            } else {
                PooledStringBuilder sb =
                        StringBuilderPool.getInstance().getStringBuilder();
                try {
                    sb.append("Local variable ");
                    sb.append(name);
                    sb.append(" was passed new value of type ");
                    sb.append(value.getClass().getCanonicalName());
                    sb.append(". Only String, Float, float[], Integer, int[],");
                    sb.append(" Long, or long[] allowed.");
                } catch (PooledException e) {
                    throw new RPGException(ErrorMessage.INTERNAL_ERROR, e);
                }
                RPGException ex = new RPGException(ErrorMessage.INVALID_PARAM,
                        sb.toString());
                sb.returnToPool();
                sb = null;
                throw ex;
            }
            lvar = ArrayUtilities.getInstance().extendArray(svar, lvar);
        }
    }
    /**
     * Sets the master script.
     * @param script the script to set
     */
    this.setMaster = function(final Scriptable<IO> script) {
        master = script;
    }
    this.setTarget = function(final TargetParameters params)
            {
        if (io.hasIOFlag(IoGlobals.IO_03_NPC)) {
            io.getNPCData().getPathfinding()
                    .removeFlag(ScriptConstants.PATHFIND_ALWAYS);
            io.getNPCData().getPathfinding()
                    .removeFlag(ScriptConstants.PATHFIND_ONCE);
            io.getNPCData().getPathfinding()
                    .removeFlag(ScriptConstants.PATHFIND_NO_UPDATE);
            if (params.hasFlag(ScriptConstants.PATHFIND_ALWAYS)) {
                io.getNPCData().getPathfinding()
                        .addFlag(ScriptConstants.PATHFIND_ALWAYS);
            }
            if (params.hasFlag(ScriptConstants.PATHFIND_ONCE)) {
                io.getNPCData().getPathfinding()
                        .addFlag(ScriptConstants.PATHFIND_ONCE);
            }
            if (params.hasFlag(ScriptConstants.PATHFIND_NO_UPDATE)) {
                io.getNPCData().getPathfinding()
                        .addFlag(ScriptConstants.PATHFIND_NO_UPDATE);
            }
            int old_target = -12;
            if (io.getNPCData().hasReachedtarget()) {
                old_target = io.getTargetinfo();
            }
            if (io.getNPCData().hasBehavior(Behaviour.BEHAVIOUR_FLEE)
                    || io.getNPCData()
                            .hasBehavior(Behaviour.BEHAVIOUR_WANDER_AROUND)) {
                old_target = -12;
            }
            int t = params.getTargetInfo();

            if (t === -2) {
                t = Interactive.getInstance().GetInterNum(io);
            }
            // if (io.hasIOFlag(ioglobals.io_camera)) {
            // EERIE_CAMERA * cam = (EERIE_CAMERA *)io->_camdata;
            // cam->translatetarget.x = 0.f;
            // cam->translatetarget.y = 0.f;
            // cam->translatetarget.z = 0.f;
            // }
            if (t === ScriptConstants.TARGET_PATH) {
                io.setTargetinfo(t); // TARGET_PATH;
                getTargetPos(io, 0);
            } else if (t === ScriptConstants.TARGET_NONE) {
                io.setTargetinfo(ScriptConstants.TARGET_NONE);
            } else {
                if (Interactive.getInstance().hasIO(t)) {
                    io.setTargetinfo(t); // TARGET_PATH;
                    getTargetPos(io, 0);
                }
            }

            if (old_target !== t) {
                io.getNPCData().setReachedtarget(false);

                // ARX_NPC_LaunchPathfind(io, t);
            }
        }
    }
    /**
     * Sets the reference id of the {@link ScriptTimer} found at a specific
     * index.
     * @param index the index
     * @param refId the reference id
     */
    this.setTimer = function(index, refId) {
        timers[index] = refId;
    }
    this.onOtherReflection = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onMiscReflection = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onPathfinderFailure = function() {
        return ScriptConstants.ACCEPT;
    }
    this.onSpellEnd = function() {
        return ScriptConstants.ACCEPT;
    }
}
Scriptable.prototype = Object.create(Hashcode.prototype);
