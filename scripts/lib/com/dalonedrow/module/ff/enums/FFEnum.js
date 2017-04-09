var Dice = {
		ONE_D2: 1,
		ONE_D3: 2,
		ONE_D4: 3,
		TWO_D4: 4,
		ONE_D6: 5,
		TWO_D6: 6,
		THREE_D6: 7,
		ONE_D8: 8,
		ONE_D10: 9,
		properties: {
			1: {
				num: 1,
				die: 2,
				roll: function() {
					return 1 + Math.floor(Math.random() * 2);
				}
			},
			2: {
				num: 1,
				die: 3,
				roll: function() {
					return 1 + Math.floor(Math.random() * 3);
				}
			},
			3: {
				num: 1,
				die: 4,
				roll: function() {
					return 1 + Math.floor(Math.random() * 4);
				}
			},
			4: {
				num: 2,
				die: 4,
				roll: function() {
					var sum = 1 + Math.floor(Math.random() * 4);
					return sum + (1 + Math.floor(Math.random() * 4));
				}
			},
			5: {
				num: 1,
				die: 6,
				roll: function() {
					return 1 + Math.floor(Math.random() * 6);
				}
			},
			6: {
				num: 2,
				die: 6,
				roll: function() {
					var sum = 1 + Math.floor(Math.random() * 6);
					return sum + (1 + Math.floor(Math.random() * 6));
				}
			},
			7: {
				num: 3,
				die: 6,
				roll: function() {
					var sum = 1 + Math.floor(Math.random() * 6);
					sum += 1 + Math.floor(Math.random() * 6);
					return sum + (1 + Math.floor(Math.random() * 6));
				}
			},
			8: {
				num: 1,
				die: 8,
				roll: function() {
					return 1 + Math.floor(Math.random() * 8);
				}
			},
			9: {
				num: 1,
				die: 10,
				roll: function() {
					return 1 + Math.floor(Math.random() * 10);
				}
			}
		}
};
if (Object.freeze) {
	Object.freeze(Dice);
}