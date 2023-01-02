const FILE_NAMES = [
	"save",
	"save_general",
	//"save_hub",
	//"save_player_chest"
];

export default (saveInis) => {
	// saveInis is an array of strings, each a save file
	const final= {};
	try {
		for (const [index, ini] of saveInis.entries()) {
			if (ini.length < 5) { continue; }
			const fileName = FILE_NAMES[index];
			final[fileName] = fileFuncs[fileName](ini);
		}
	} catch (err) {
		console.error("Something went wrong during ini processing");
		throw new Error(err.stack);
	}
	return final;
};

const fileFuncs = {
	"save": (raw) => {
		const result = {};
		const lines = raw.split("\n");
		console.log(`Read ${lines.length} lines of Basic save file`);
		let currentGroup = null;
		for (const line of lines) {
			if (line.indexOf("[") === 0) {
				// a label line, start a group?
				const cleanLine = line.substring(1, line.length - 1)
				result[cleanLine] = {};
				currentGroup = cleanLine;
				console.log(`Changing current group to ${currentGroup}`);
				continue;
			}
			// state changing conditions end here
			if (currentGroup === null) { throw new Error("No group after state changes in main loop"); }
			if (line.length < 3) { continue; } //throw new Error(`Line length under 3 found in main loop: ${line}`);
			const lineParts = line.split("=");
			// add the split line into the result in the current group
			result[currentGroup][lineParts[0]] = lineParts[1].substring(1, lineParts[1].length - 1)
		}
		// now run post processing
		result.Inventory = groupFuncs.Inventory.parseGroup(result.Inventory);
		return result;
	},
	"save_general": (raw) => {
		const result = {
			"FinishedQuests": []
		};
		const lines = raw.split("\n");
		console.log(`Read ${lines.length} lines of General save file`);
		let currentGroup = null;
		for (const line of lines) {
			if (line.indexOf("[") === 0) {
				// a label line, start a group?
				const cleanLine = line.substring(1, line.length - 2)
				result[cleanLine] = {};
				currentGroup = cleanLine;
				console.log(`Changing current group to ${currentGroup}`);
				continue;
			}
			// state changing conditions end here
			if (currentGroup === null) { throw new Error("No group after state changes in main loop"); }
			if (line.length < 3) { continue; } //throw new Error(`Line length under 3 found in main loop: ${line}`);
			const lineParts = line.split("=");
			// add the split line into the result in the current group
			result[currentGroup][lineParts[0]] = lineParts[1].substring(1, lineParts[1].length - 1)
		}
		// now run post processing
		const keys = Object.keys(result);
		console.log(`Post processing ${keys.length} objects`);
		for (const key in result) {
			const obj = result[key];
			const lowerKey = key.toLowerCase();
			if (lowerKey === "statistics") {
				result[key] = groupFuncs.Statistics.parseGroup(obj);
				continue;
			}
			if (lowerKey.indexOf("quest") !== -1) {
				// this is a quest
				const questParts = key.split("quest_");
				const questIndex = parseInt(questParts[1]);
				if (questIndex > 0) {
					// a numbered quest, put it in the list
					result["FinishedQuests"][questIndex] = groupFuncs.Quest.parseGroup(obj);
					delete result[key];
					continue;
				} else {
					// a trader quest i think?
					result[key] = groupFuncs.Quest.parseGroup(obj);
					continue;
				}
			}
			if (lowerKey.indexOf("trade") !== -1) {
				result[key] = groupFuncs.Trader.parseGroup(obj);
				continue;
			}
		}
		return result;
	}
}

const groupFuncs = {
	"Inventory": {
		parseGroup: (obj) => {
			// obj = the full inventory group
			// result = the parsed inventory group (may not have everything)
			const result = [];
			const MAPPING = {
				"Item_id_" : {
					new: "id",
					type: (v) => { return parseInt(v); },
					desc: "The ID for the item"
				},
				"Name_" : {
					new: "name",
					type: (v) => { return v.substring(0, v.length - 1); },
					desc: "The name of this item"
				},
				"Item_qnt_" : {
					new: "qty",
					type: (v) => { return parseInt(v); },
					desc: "The amount of the item there is"
				},
				"Item_x_" : {
					new: "x",
					type: (v) => { return parseInt(v); },
					desc: "The x position"
				},
				"Item_y_" : {
					new: "y",
					type: (v) => { return parseInt(v); },
					desc: "The y position"
				},
				"rotation" : {
					new: "rotation",
					type: (v) => { return parseInt(v); },
					desc: "How much to rotate the art?"
				},
				"item_ammo" : {
					new: "ammo",
					type: (v) => { return v; },
					desc: "What ammo item does this use"
				},
				"item_ammo_id" : {
					new: "ammo_id",
					type: (v) => { return v; },
					desc: "What ammo id does this use"
				},
				"created_from_player" : {
					new: "created_from_player",
					type: (v) => { return v; },
					desc: "Who made this?"
				},
				"durability" : {
					new: "durability",
					type: (v) => { return v; },
					desc: "Who made this?"
				},
			};
			let i = 1;
			const keys = Object.keys(MAPPING);
			console.log(`Parsing ${parseInt(obj["Number of items"])} items in inventory`);
			while (i <= parseInt(obj["Number of items"])) {
				const newItem = {};
				for (const key of keys) {
					const matchKey = `${key}${i}`
					//console.log(`Matching key: ${matchKey} for ${i} on ${MAPPING[key].new} (${obj[matchKey]})`);
					try {
						newItem[MAPPING[key].new] = MAPPING[key].type(obj[matchKey]);
					} catch (err) {
						console.log(`Type conversion failed and said: ${err}`);
					}
				}
				result.push(newItem);
				i++;
			}
			return result;
		}
	},
	"Trader": {
		parseGroup: (obj) => {
			// obj = the full inventory group
			// result = the parsed inventory group (may not have everything)
			const result = [];
			const MAPPING = {
				"page_" : {
					new: "page",
					type: (v) => { return parseInt(v); },
					desc: "The page for the trade"
				},
				"livello_min" : {
					new: "life_min",
					type: (v) => { return parseInt(v); },
					desc: "Min life?"
				},
				"qnt_" : {
					new: "qty",
					type: (v) => { return parseInt(v); },
					desc: "The amount of the item there is"
				},
				"x_" : {
					new: "x",
					type: (v) => { return parseInt(v); },
					desc: "The x position"
				},
				"y_" : {
					new: "y",
					type: (v) => { return parseInt(v); },
					desc: "The y position"
				},
				"item_" : {
					new: "id",
					type: (v) => { return parseInt(v); },
					desc: "The item ID?"
				}
			};
			let i = 0;
			const keys = Object.keys(MAPPING);
			console.log(`Parsing ${keys.length} properties in trader mapper, provided ${Object.keys(obj).length} properties`);
			let flag = false;
			while (i <= 1000 && flag === false) {
				const newItem = {};
				for (const key of keys) {
					const matchKey = `${key}${i}`
					//console.log(`Matching key: ${matchKey} for ${i} on ${MAPPING[key].new} (${obj[matchKey]})`);
					try {
						newItem[MAPPING[key].new] = MAPPING[key].type(obj[matchKey]);
						if (!obj[matchKey]) { throw new Error ("Object doesn't exist"); }
						delete obj[matchKey];
					} catch (err) {
						console.log(`Type conversion failed and said: ${err}`);
						flag = true;
						break;
					}
				}
				if (flag === true) { break; }
				result.push(newItem);
				i++;
			}
			console.log(`${Object.keys(obj).length} lines leftover`);
			obj.meta = { method: "trader" };
			return Object.assign(obj, { items: result});
		}
	},
	"Statistics": {
		parseGroup: (obj) => {
			// obj = the full section group
			// result = the parsed section group (may not have everything)
			const STATS_MAP = [
				"total hunts",
				"hunts survived",
				// expressed in percent. 52 = 52%
				"survival rate",
				"best survival streak",
				"current survival streak",
				"total money received",
				"most money from a single hunt",
				"most exp from a single hunt",
				// was under-represented in the save file by 2-3, but it almost has to be this value
				"total humans killed",
				"bandits killed",
				"green army killed",
				"crimson corporation killed",
				"scientists killed",
				"loners killed",
				"boss kills: lazar",
				"boss kills: arman",
				"boss kills: kibba",
				// again, didn't quite match the count in game
				"total mutants killed",
				"rabbits killed",
				"wolves killed",
				"boars killed",
				"ghouls killed",
				"spiders killed",
				"blinks killed",
				"bigs killed",
				"rats killed",
				"total chests opened",
				"tool boxes opened",
				"medication boxes opened",
				"electronics boxes opened",
				"bags opened",
				"cabinets opened",
				"safes opened",
				"wood boxes opened",
				"hidden stashes opened",
				"weapon boxes opened",
				"attachment boxes opened",
				"vending machines opened",
				// I think, haven't gotten this far in the game yet
				"crystals looted",
				"air drops opened",
			];
			const result = { data:[], meta: { method: "statistics" }};
			for (const key in obj) {
				const index = parseInt(key);
				result.data[index] = {
					name: STATS_MAP[index],
					value: obj[key].split('"').join("")
				};
			}
			return result;
		}
	},
	"Quest": {
		parseGroup: (obj) => {
			// obj = the full section group
			// result = the parsed section group (may not have everything)
			const keys = Object.keys(obj);
			const result = { quests: [], meta: { method: "quest" }};
			// these are completed quests
			if (keys.length === 1 && keys[0] === "Already_done") {
				// being marked done for tracking i bet
				return { done: true };
			}
			// these are currently open quests with a vendor
			// unsure if accepted or just available to be accepted
			if (keys.indexOf("quest_0") >= 0 && keys.indexOf("quest_reward0") >= 0) {
				for (const key in obj) {
					const keyParts = key.split("_");
					const index = parseInt(keyParts[1].charAt(keyParts[1].length - 1));
					if (!result.quests[index]) { result.quests[index] = {}; }
					if (keyParts[1].length >= 7) {
						// probably rewards, this sucks
						result.quests[index]["quest_reward"] = obj[key].split('"').join("");
					} else {
						const questId = parseInt(obj[key].split('"').join(""))
						result.quests[index]["quest"] = questId;
					}
					delete obj[key];
				}
				result.meta.submethod = "Method 2 (currently available quests?)";
			}
			// i think this is the quest history...?
			if (keys.indexOf("0_id") >= 0 && keys.indexOf("0_giver") >= 0) {
				for (const key in obj) {
					const keyParts = key.split("_");
					const index = parseInt(keyParts[0]);
					const prop = keyParts[1];
					if (prop.indexOf("_") >= 0) { /* don't understand multi _'s props yet, skip them */ continue; }
					if (!result.quests[index]) { result.quests[index] = {}; }
					result.quests[index][prop] = obj[key].split('"').join("");
					delete obj[key];
				}
				result.meta.submethod = "Method 3 (currently available quests?)";
			}
			return Object.assign(obj, result);
		}
	}
}