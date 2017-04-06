var ScriptGlobals = (function () {
	return {
    PATHFIND_ALWAYS                          : 1,
    PATHFIND_ONCE                          : 2,
    PATHFIND_NO_UPDATE                          : 4,
    TARGET_PATH : -3,
    TARGET_NONE : -2,
    TARGET_PLAYER : 0,
    ACCEPT                          : 1,
	BIGERROR						: -2,
	DISABLE_AGGRESSION				: 32,
	DISABLE_CHAT					: 2,
	DISABLE_COLLIDE_NPC				: 128,
	DISABLE_CURSORMODE				: 256,
	DISABLE_DETECT					: 16,
	DISABLE_EXPLORATIONMODE			: 512,
	DISABLE_HEAR					: 8,
	DISABLE_HIT						: 1,
	DISABLE_INVENTORY2_OPEN			: 4,
	DISABLE_MAIN					: 64,
	KILLBOTH						: 2,
	KILLCOMBINEDWITH				: 4,
	KILLCOMBINER					: 3,
	MAX_EVENT_STACK					: 800,
	MAX_SCRIPTTIMERS				: 5,
	REFUSE							: -1,
	SM_000_NULL						: 0,
	/** script messages to initialize an IO. */
	SM_001_INIT						: 1,
	SM_002_INVENTORYIN				: 2,
	SM_003_INVENTORYOUT				: 3,
	SM_004_INVENTORYUSE				: 4,
	SM_005_SCENEUSE					: 5,
	SM_006_EQUIPIN					: 6,
	SM_007_EQUIPOUT					: 7,
	SM_008_MAIN						: 8,
	SM_009_RESET						: 9,
	SM_010_CHAT						: 10,
	SM_011_ACTION					: 11,
	SM_012_DEAD						: 12,
	SM_013_REACHEDTARGET				: 13,
	SM_014_FIGHT						: 14,
	SM_015_FLEE						: 15,
	SM_016_HIT						: 16,
	SM_017_DIE						: 17,
	SM_018_LOSTTARGET				: 18,
	SM_019_TREATIN					: 19,
	SM_020_TREATOUT					: 20,
	/** script message to move to a travel location. */
	SM_021_MOVE						: 21,
	SM_022_DETECTPLAYER				: 22,
	SM_023_UNDETECTPLAYER			: 23,
	SM_024_COMBINE					: 24,
	SM_025_NPC_FOLLOW				: 25,
	SM_255_EXECUTELINE				: 255,
	SM_256_DUMMY					: 256,
	SM_026_NPC_FIGHT					: 26,
	SM_027_NPC_STAY					: 27,
	SM_028_INVENTORY2_OPEN			: 28,
	SM_029_INVENTORY2_CLOSE			: 29,
	SM_030_CUSTOM					: 30,
	SM_031_ENTER_ZONE				: 31,
	SM_032_LEAVE_ZONE				: 32,
	SM_033_INITEND					: 33,
	SM_034_CLICKED					: 34,
	SM_035_INSIDEZONE				: 35,
	SM_036_CONTROLLEDZONE_INSIDE		: 36,
	SM_037_LEAVEZONE					: 37,
	SM_038_CONTROLLEDZONE_LEAVE		: 38,
	SM_039_ENTERZONE					: 39,
	SM_040_CONTROLLEDZONE_ENTER		: 40,
	SM_041_LOAD						: 41,
	SM_042_SPELLCAST					: 42,
	SM_043_RELOAD					: 43,
	SM_044_COLLIDE_DOOR				: 44,
	SM_045_OUCH						: 45,
	SM_046_HEAR						: 46,
	SM_047_SUMMONED					: 47,
	SM_048_SPELLEND					: 48,
	SM_049_SPELLDECISION				: 49,
	SM_050_STRIKE					: 50,
	SM_051_COLLISION_ERROR			: 51,
	SM_052_WAYPOINT					: 52,
	SM_053_PATHEND					: 53,
	SM_054_CRITICAL					: 54,
	SM_055_COLLIDE_NPC				: 55,
	SM_056_BACKSTAB					: 56,
	SM_057_AGGRESSION				: 57,
	SM_058_COLLISION_ERROR_DETAIL	: 58,
	SM_059_GAME_READY				: 59,
	SM_060_CINE_END					: 60,
	SM_061_KEY_PRESSED				: 61,
	SM_062_CONTROLS_ON				: 62,
	SM_063_CONTROLS_OFF				: 63,
	SM_064_PATHFINDER_FAILURE		: 64,
	SM_065_PATHFINDER_SUCCESS		: 65,
	SM_066_TRAP_DISARMED				: 66,
	SM_067_BOOK_OPEN					: 67,
	SM_068_BOOK_CLOSE				: 68,
	SM_069_IDENTIFY					: 69,
	SM_070_BREAK						: 70,
	SM_071_STEAL						: 71,
	SM_072_COLLIDE_FIELD				: 72,
	SM_073_CURSORMODE				: 73,
	SM_074_EXPLORATIONMODE			: 74,
	SM_075_MAXCMD					: 75,
	/** flag indicating the script variable is a global string. */
	TYPE_G_00_TEXT					: 0,
	/** flag indicating the script variable is a global string. */
	TYPE_G_01_TEXT_ARR				: 1,
	/** flag indicating the script variable is a global floating-point type. */
	TYPE_G_02_FLOAT					: 2,
	/** flag indicating the script variable is a global floating-point array. */
	TYPE_G_03_FLOAT_ARR				: 3,
	/** flag indicating the script variable is a global integer. */
	TYPE_G_04_INT					: 4,
	/** flag indicating the script variable is a global integer array. */
	TYPE_G_05_INT_ARR				: 5,
	/** flag indicating the script variable is a global integer. */
	TYPE_G_06_LONG					: 6,
	/** flag indicating the script variable is a global long array. */
	TYPE_G_07_LONG_ARR				: 7,
	/** flag indicating the script variable is a local string. */
	TYPE_L_08_TEXT					: 8,
	/** flag indicating the script variable is a local string array. */
	TYPE_L_09_TEXT_ARR				: 9,
	/** flag indicating the script variable is a local floating-point type. */
	TYPE_L_10_FLOAT					: 10,
	/** flag indicating the script variable is a local floating-point array. */
	TYPE_L_11_FLOAT_ARR				: 11,
	/** flag indicating the script variable is a local integer. */
	TYPE_L_12_INT					: 12,
	/** flag indicating the script variable is a local integer array. */
	TYPE_L_13_INT_ARR				: 13,
	/** flag indicating the script variable is a local integer. */
	TYPE_L_14_LONG					: 14,
	/** flag indicating the script variable is a local long array. */
	TYPE_L_15_LONG_ARR				: 15
	}
})();