function Hero(io) {
	FFScriptable.call(this, io);
	var self = this;
    /**
     * Checks that there is a traversable path between two rooms. If a path
     * exists but is blocked, then local variable "blocked_message" is set.
     * @param room1 the id of the first room
     * @param room2 the id of the second room
     * @return <tt>true</tt> if a traversable path exists; <tt>false</tt>
     *         otherwise
     * @if an error occurs
     */
    var checkPath = function() {
        setLocalVarBlockedMessage("");
        var pass = false, node1, node2 = arguments[1];
    	if (arguments[0] instanceof PhysicalGraphNode) {
    		node1 = arguments[0];
    	} else {
    		node1 = FFWorldMap.getInstance().getRoom(room1).getMainNode();
    	}
        if (FFWorldMap.getInstance().hasPath(node1, node2)) {
            var ios = FFWorldMap.getInstance().getIosAlongPath(node1, node2);
            var blocked = false;
            if (ios !== null) {
                for (var i = ios.length - 1; i >= 0; i--) {
                    if (ios[i].equals(this.getIO())) {
                        continue;
                    }
                    setLocalVarBlockedMessage(
                            TextProcessor.getInstance().processText(
                                    null,
                                    ios[i],
                                    null,
                                    FFWebServiceClient.getInstance().loadText(
                                            "exit_blocked")));
                    blocked = true;
                }
            }
            ios = null;
            if (!blocked) {
                pass = true;
            }
        }
        node1 = null;
        node2 = null;
        return pass;
    }
    /**
     * Gets the eastern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     */
    var getDestinationEast = function(source) {
    	var destination = null;
        switch (source) {
        case 1:
            destination = FFWorldMap.getInstance().getRoom(12).getMainNode();
            break;
        case 12:
            if (!FFWorldMap.getInstance().getRoom(139).isVisited()) {
                destination = FFWorldMap.getInstance().getRoom(139).getNode(650, 1337);
            } else {
                destination = FFWorldMap.getInstance().getRoom(139).getMainNode();
            }
            break;
        case 82:
            destination = FFWorldMap.getInstance().getRoom(43).getMainNode();
            break;
        case 71:
            destination = FFWorldMap.getInstance().getRoom(1).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }
    /**
     * Gets the northern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     */
    var getDestinationNorth = function(source) {
    	var destination = null;
        switch (source) {
        case 71:
            destination = FFWorldMap.getInstance().getRoom(43).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }
    /**
     * Gets the southern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     */
    var getDestinationSouth = function(source) {
    	var destination = null;
        switch (source) {
        case 1:
            setLocalVarBlockedMessage(FFWebServiceClient.getInstance().loadText("1_SOUTH"));
            break;
        case 43:
            destination = FFWorldMap.getInstance().getRoom(71).getMainNode();
            break;
        default:
            break;
        }
        return destination;
    }
    /**
     * Gets the eastern destination when traveling from the source room. If
     * there is no valid destination, 0 is returned.
     * @param source the id of the source room
     * @return {@link PhysicalGraphNode}
     * @if an error occurs
     */
    var getDestinationWest = function(source) {
        var destination = null;
        switch (source) {
        case 1:
            destination = FFWorldMap.getInstance().getRoom(71).getMainNode();
            break;
        case 12:
            destination = FFWorldMap.getInstance().getRoom(1).getMainNode();
            break;
        case 43:
            destination = FFWorldMap.getInstance().getRoom(82).getMainNode();
            // destroy door_43
            if (Interactive.getInstance().getNpcByName("DOOR_43") !== null) {
                Interactive.getInstance().ARX_INTERACTIVE_DestroyIO(
                		Interactive.getInstance().getNpcByName("DOOR_43"));
                // add western exit to room 43
                FFWorldMap.getInstance().getRoom(source).addCommand(FFCommand.WEST);
                // load orc sentry 2
                var io = FFWebServiceClient.getInstance().loadNPC("ORC_SENTRY_2");
                io.setScriptLoaded(true);
                // load box 1
                io = FFWebServiceClient.getInstance().loadItem("BOX_1");
                io.setScriptLoaded(true);
            }
            break;
        case 139:
        	var x2 = 650, y = 1337;
            if (self.getIO().getPosition().equals(x2, y)) {
                destination =
                        FFWorldMap.getInstance().getRoom(12).getMainNode();
            }
            break;
        default:
            break;
        }
        return destination;
    }
    /**
     * Gets the value of the local variable "blocked_message".
     * @return {@link String}
     * @if an error occurs
     */
    var getLocalVarBlockedMessage = function() {
        return self.getLocalStringVariableValue("blocked_message");
    }
    /**
     * Gets the value of the local variable "combat_message".
     * @return {@link String}
     * @if an error occurs
     */
    var getLocalVarCombatMessage = function() {
        return self.getLocalStringVariableValue("combat_message");
    }
    /**
     * Gets the amount of 'OUCH' damage that occurred.
     * @return {@link float}
     * @if an error occurs
     */
    var getLocalVarOuch = function() {
        return self.getLocalFloatVariableValue("OUCH");
    }
    /**
     * Gets the amount of 'SUMMONED OUCH' damage that occurred.
     * @return {@link float}
     * @if an error occurs
     */
    var getLocalVarSummonedOuch = function() {
        return self.getLocalFloatVariableValue("SUMMONED_OUCH");
    }
    var getLocalVarTmpInt1 = function() {
        return self.getLocalIntVariableValue("tmp_int1");
    }
    /**
     * Gets the value of the local variable "travel_direction".
     * @return {@link String}
     * @if an error occurs
     */
    var getLocalVarTravelDirection = function() {
        return self.getLocalStringVariableValue("travel_direction");
    }
    var goToRoom = function(direction, source, destination) {
        // put hero in destination room
        self.getIO().setPosition(destination.getLocation());
        // add action text
        GameScreen.getInstance().addMessage(
                FFWebServiceClient.getInstance().loadText(
                		[source, "_", direction.toString()].join("")));
    }
    /**
     * Initializes all local variables.
     * @if an error occurs
     */
    var initLocalVars = function() {
        setLocalVarBlockedMessage("");
        self.setLocalVarCombatMessage("");
        setLocalVarTravelDirection("");
        setLocalVarTmpInt1(0);
    }
    /**
     * Loads a door by its id.
     * @param id the door's id
     * @if there is an error
     */
    var loadDoor = function(id) {
        FFWebServiceClient.getInstance().loadNPC(
                ["DOOR_", id].join("")).setScriptLoaded(true);
    }
    /**
     * Loads a door by its id.
     * @param id the door's id
     * @if there is an error
     */
    var loadDoor = function(name) {
        FFWebServiceClient.getInstance().loadNPC(name).setScriptLoaded(true);
    }
    /**
     * On IO Climb.
     * @return {@link int}
     * @if an error occurs
     */
    this.onClimb = function() {
        // get room occupied
    	var room = FFWorldMap.getInstance().getPlayerRoom();
    	var source = room.getId();
    	var msg = null;
        switch (source) {
        case 139:
        	var x1 = 652, x2 = 650, y = 1337;
            if (this.getIO().getPosition().equals(x1, y)) {
                room.setMainNode(room.getNode(x2, y));
                room.addCommand(FFCommand.WEST);
                room.removeCommand(FFCommand.CLIMB);
                this.getIO().setPosition(new SimpleVector2(x2, y));
                msg = "climb_139_out";
            } else {
                msg = "climb_139_in";
            }
            break;
        default:
            msg = "climb_no_where";
        }
        GameScreen.getInstance().addMessage(
                FFWebServiceClient.getInstance().loadText(msg));
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On IO entering room 43.
     * @return {@link int}
     * @if an error occurs
     */
    this.onEnterRoom = function() {
        var roomId = getLocalVarTmpInt1();
        var room = FFWorldMap.getInstance().getRoom(roomId);
        switch (roomId) {
        case 12:
            if (!room.isVisited()) {
                loadDoor(roomId);
            }
            break;
        case 43:
            if (!room.isVisited()) {
                loadDoor(roomId);
            }
            break;
        case 71:
            if (!room.isVisited()) {
                FFWebServiceClient.getInstance().loadNPC(
                        "ORC_SENTRY").setScriptLoaded(true);
            }
            break;
        case 82:
            // is the orc sentry not dead and awake?
            var io = Interactive.getInstance().getNpcByName("ORC_SENTRY_2");
            if (io !== null
                    && !io.getNPCData().IsDeadNPC()
                            && io.getScript().getLocalIntVariableValue("sleeping") === 0) {
                // send Hear event to the orc
                Script.getInstance().sendIOScriptEvent(io, ScriptGlobals.SM_046_HEAR, null, null);
            }
            io = null;
            break;
        default:
        }
        setLocalVarTmpInt1(0);
        room = null;
        return ScriptGlobals.ACCEPT;
    }
    this.onEscape = function() {
        console.log("escape!");
        // combat is by room. if combat is escaped in one room,
        // travel to the escape room
        var room = FFWorldMap.getInstance().getPlayerRoom();
        var roomId = room.getId();
        switch (roomId) {
        case 82:
            // change orc's aggression text
        	var io = Interactive.getInstance().getNpcByName("ORC_SENTRY_2");
            io.getScript().setLocalVariable("sp_aggression",
                    FFWebServiceClient.getInstance().loadText(
                            "orc_sentry_2_aggression_3"));
            // remove flag to allow escape
            io.getScript().setLocalVariable("escape_first_round", 0);
            io = null;
            room.setDisplayText(FFWebServiceClient.getInstance().loadText(
                    "82_SECONDARY"));
            goToRoom(FFCommand.EAST, roomId, getDestinationEast(roomId));
            break;
        default:
        }
        room = null;
        return ScriptGlobals.ACCEPT;
    }
    var old_onInit = this.onInit;
    /**
     * {@inheritDoc}
     */
    this.onInit = function() {
        initLocalVars();
        return old_onInit();
    }
    /**
     * {@inheritDoc}
     */
    this.onOuch = function() {
        ouchStart();
        return ScriptGlobals.ACCEPT;
    }
    /**
     * On IO travelling.
     * @return {@link int}
     * @if an error occurs
     */
    this.onTravel = function() {
        setLocalVarBlockedMessage("");
        // get room occupied
        var room = FFWorldMap.getInstance().getPlayerRoom();
        var source = room.getId();
        var destination = null;
        var direction = FFCommand.valueOf(getLocalVarTravelDirection());
        switch (direction) {
        case EAST:
            destination = getDestinationEast(source);
            break;
        case SOUTH:
            destination = getDestinationSouth(source);
            break;
        case WEST:
            destination = getDestinationWest(source);
            break;
        case NORTH:
            destination = getDestinationNorth(source);
            break;
        default:
            throw new Error(["Cannot run onTravel event for command ",
            		direction.toString()].join(""));
        }
        if (destination === null) {
            if (getLocalVarBlockedMessage().length() === 0) {
                GameScreen.getInstance().addMessage(
                        FFWebServiceClient.getInstance().loadText(
                                "invalid_exit"));
            } else {
                GameScreen.getInstance().addMessage(
                        getLocalVarBlockedMessage());
            }
        } else {
            // check to see if path is blocked
            if (checkPath(source, destination)) {
                travel(direction, source, destination);
            } else if (getLocalVarBlockedMessage().length() > 0) {
                GameScreen.getInstance()
                        .addMessage(getLocalVarBlockedMessage());
            }
        }
        return ScriptGlobals.ACCEPT;
    }
    /**
     * Starts the ouch event.
     * @throws PooledException if an error occurs
     * @if an error occurs
     */
    var ouchStart = function() {
    	var ouchDmg = getLocalVarSummonedOuch() + getLocalVarOuch();
        // speak combat message first
        if (getLocalVarCombatMessage().length() > 0) {
            Script.getInstance().speak(self.getIO(),
                    new SpeechParameters("",
                            String.format(getLocalVarCombatMessage(), ouchDmg)));
        }
    }
    /**
     * Sets the local variable "blocked_message".
     * @param val the variable value
     * @if an error occurs
     */
    var setLocalVarBlockedMessage = function(val) {
        self.setLocalVariable("blocked_message", val);
    }
    /**
     * Sets the local variable "combat_message".
     * @param val the variable value
     * @if an error occurs
     */
    this.setLocalVarCombatMessage = function(val) {
        this.setLocalVariable("combat_message", val);
    }
    var setLocalVarTmpInt1 = function(val) {
        self.setLocalVariable("tmp_int1", val);
    }
    /**
     * Sets the local variable "travel_direction".
     * @param val the variable value
     * @if an error occurs
     */
    var setLocalVarTravelDirection = function(val) {
    	self.setLocalVariable("travel_direction", val);
    }
    /**
     * Travels in a specific direction.
     * @param direction the direction
     * @param source the source room id
     * @param destination the destination room id
     * @if an error occurs
     */
    var travel = function(direction, source, destination) {
        // are there any IOs in the room besides the PC?
        var ios = FFWorldMap.getInstance().getIosInRoom(FFWorldMap.getInstance().getPlayerRoom());
        var npcs = null;
        // get all NPCs
        for (var i = ios.length - 1; i >= 0; i--) {
            if (ios[i].hasIOFlag(IoGlobals.IO_03_NPC)
                    && !ios[i].isInGroup("DOORS")) {
                if (npcs === null) {
                    npcs = new FFInteractiveObject[0];
                }
                npcs = ArrayUtilities.getInstance().extendArray(ios[i], npcs);
            }
        }
        if (npcs !== null) {
            // alert NPCs of a sound event
            for (var i = npcs.length - 1; i >= 0; i--) {
                Script.getInstance().sendIOScriptEvent(
                        npcs[i], ScriptGlobals.SM_046_HEAR, null, null);
                if (Combat.getInstance().isOver()) {
                    // NPC didn't hear or doesn't care PC is moving.
                    // go to destination
                    goToRoom(direction, source, destination);
                }
            }
        } else {
            goToRoom(direction, source, destination);
        }
    }
}
Hero.prototype = Object.create(FFScriptable.prototype);
