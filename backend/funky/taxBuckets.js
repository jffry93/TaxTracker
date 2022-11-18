const federal = [
	{ amount: 50197, tax: 1.15 },
	{ amount: 100392, tax: 1.205 },
	{ amount: 155625, tax: 1.26 },
	{ amount: 221708, tax: 1.29 },
	{ amount: 221708, tax: 1.33 },
];

const provincial = {
	'newfoundland & labrador': [
		{ amount: 39147, tax: 1.087 },
		{ amount: 78294, tax: 1.145 },
		{ amount: 139780, tax: 1.158 },
		{ amount: 195693, tax: 1.178 },
		{ amount: 250000, tax: 1.198 },
		{ amount: 500000, tax: 1.208 },
		{ amount: 1000000, tax: 1.213 },
		{ amount: 1000000, tax: 1.218 },
	],
	'prince edward': [
		{ amount: 31984, tax: 1.098 },
		{ amount: 63969, tax: 1.138 },
		{ amount: 63969, tax: 1.167 },
	],
	'nova scotia': [
		{ amount: 29590, tax: 1.0879 },
		{ amount: 59180, tax: 1.1495 },
		{ amount: 93000, tax: 1.1667 },
		{ amount: 150000, tax: 1.175 },
		{ amount: 150000, tax: 1.21 },
	],
	'new brunswick': [
		{ amount: 44887, tax: 1.094 },
		{ amount: 89775, tax: 1.1482 },
		{ amount: 145955, tax: 1.1652 },
		{ amount: 166280, tax: 1.1784 },
		{ amount: 166280, tax: 1.203 },
	],
	quebec: [
		{ amount: 45105, tax: 1.15 },
		{ amount: 90200, tax: 1.2 },
		{ amount: 109755, tax: 1.24 },
		{ amount: 109755, tax: 1.2575 },
	],
	ontario: [
		{ amount: 46226, tax: 1.0505 },
		{ amount: 92454, tax: 1.0915 },
		{ amount: 150000, tax: 1.1116 },
		{ amount: 220000, tax: 1.1216 },
		{ amount: 220000, tax: 1.1316 },
	],
	manitoba: [
		{ amount: 34431, tax: 1.108 },
		{ amount: 74416, tax: 1.1275 },
		{ amount: 74416, tax: 1.174 },
	],
	saskatchewan: [
		{ amount: 46773, tax: 1.105 },
		{ amount: 133638, tax: 1.125 },
		{ amount: 133638, tax: 1.145 },
	],
	alberta: [
		{ amount: 131220, tax: 1.1 },
		{ amount: 157464, tax: 1.12 },
		{ amount: 209952, tax: 1.13 },
		{ amount: 314928, tax: 1.14 },
		{ amount: 314928, tax: 1.15 },
	],
	'british columbia': [
		{ amount: 43070, tax: 1.0506 },
		{ amount: 86141, tax: 1.077 },
		{ amount: 98901, tax: 1.105 },
		{ amount: 120094, tax: 1.1229 },
		{ amount: 162832, tax: 1.147 },
		{ amount: 227091, tax: 1.168 },
		{ amount: 227091, tax: 1.205 },
	],
	yukon: [
		{ amount: 43070, tax: 1.064 },
		{ amount: 86141, tax: 1.09 },
		{ amount: 98901, tax: 1.109 },
		{ amount: 120094, tax: 1.128 },
		{ amount: 162832, tax: 1.15 },
	],
	'northwest territories': [
		{ amount: 43070, tax: 1.059 },
		{ amount: 86141, tax: 1.086 },
		{ amount: 98901, tax: 1.122 },
		{ amount: 120094, tax: 1.1405 },
	],
	nunavut: [
		{ amount: 47862, tax: 1.04 },
		{ amount: 95724, tax: 1.07 },
		{ amount: 155625, tax: 1.09 },
		{ amount: 155625, tax: 1.115 },
	],
};

module.exports = { federal, provincial };
