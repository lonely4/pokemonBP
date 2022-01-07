const pokemonData = require('@/data/pokemonData.json');
class Pokemons {
	constructor(pkData) {
		this.pkDataObj=pkData
		this.pkDataList = Object.keys(pkData).map(name=>pkData[name])
		this.pkByType = {}
		for (const name in pkData) {
			const pokemon = pkData[name]
			const types = pokemon.type
			for (let type of types) {
				type = type.replace(' ', '')
				if (type == 0) continue
				if (!this.pkByType[type]) {
					this.pkByType[type] = []
				}
				this.pkByType[type].push(pokemon)
			}
		}
	}
	getPkByType(type) {
		if (type) {
			return this.pkByType[type]
		}
		return this.pkDataList
	}
	getPkTypes() {
		return Object.keys(this.pkByType)
	}
	getPkByName(name) {
		let pokemons = []
		if (this.pkDataObj[name]) {
			pokemons.push(this.pkDataObj[name])
			return pokemons
		}
		const reg = new RegExp(name, 'g')
		Object.keys(this.pkDataObj).forEach(n => {
			if (reg.test(n)) {
				polemons.push(this.pkDataObj[n])
			}
		})
		return pokemons
	}
}
// "妙蛙种子": {
//        "chinese_name": "妙蛙种子",
//        "id": 1,
//        "japanese_name": "フシギダネ",
//        "english_name": "Bulbasaur",
//        "height": "0.7",
//        "weight": "6.9",
//        "type": ["草", "毒"],
//        "ability": ["茂盛"],
//        "隐藏特性": ["叶绿素"],
//        "进化": "妙蛙草",
//        "进化等级": 16,
//        "属性相性": {
//            "一般": 1.0,
//            "格斗": 0.5,
//            "飞行": 2.0,
//            "毒": 1.0,
//            "地面": 1.0,
//            "岩石": 1.0,
//            "虫": 1.0,
//            "幽灵": 1.0,
//            "钢": 1.0,
//            "火": 2.0,
//            "水": 0.5,
//            "草": 0.25,
//            "电": 0.5,
//            "超能力": 2.0,
//            "冰": 2.0,
//            "龙": 1.0,
//            "恶": 1.0,
//            "妖精": 0.5
//        }
//    },
const pokemons = new Pokemons(pokemonData)
export default pokemons
