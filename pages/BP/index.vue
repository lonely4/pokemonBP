<template>
	<view class="full flex-col">
		<view class="w-full head flex  justify-between align-center">
			<view class="leftB flex">
				<view class="BCircle text-center" v-for="item of leftB" :key="item">
					{{item}}
				</view>
			</view>
			<view>
				禁用
			</view>
			<view class="rightB flex">
				<view class="BCircle text-center" v-for="item of rightB" :key="item">
					{{item}}
				</view>
			</view>
		</view>
		<view class="container flex ">
			<view class="leftP h-full flex flex-col justify-center align-center">
				<view class="PCircle text-center" v-for="item of leftP" :key="item">
					{{item}}
				</view>
			</view>
			<view class="main flex-1 h-full">
				<view class="selectType">
					<text class="type" v-for="pkType of pkTypes" :key="pkType" @click="clickType(pkType)">
						{{pkType}}
					</text>
				</view>
				<view class="selectArea flex flex-col w-full">
					<view class="pokemonDetail full flex flex-col" v-show="pkDetailShow">
						<view class="detailClose"></view>
						<view class="detailMain flex flex-1">
							<view class="detailIcon flex flex-col justify-center align-center">
								<text>{{pkDetail.chinese_name}}</text>
								<view
									v-bind:class="['pokemon', 'sprite-icon',`sprite-icon-${pkDetail.id<100?(pkDetail.id<10?'00'+pkDetail.id:('0'+pkDetail.id)):pkDetail.id}`]">
								</view>
							</view>
							<view class="detailAttr flex-1 flex flex-col">
								<view class="detailRow">
									<text>属性:</text>
									<text>{{pkDetail.type.join(',')}}</text>
								</view>
								<view class="detailRow flex">
									<text>属性相克 :</text>
									<view class="attrRestraint flex-1 flex flex-wrap">
										<text v-for="item,key of attrRestraint" :key="key">{{key+':'+item}}</text>
									</view>
								</view>
								<view class="detailRow flex">
									<text>特性</text>
								</view>
								<view class="detailRow">
									<template v-for="ability,key of pkDetail.ability">
										<text :key="ability">{{`${ability} : `}}</text><text
											:key="key">{{`${abilityExplain[ability]}`}}</text>
									</template>
								</view>
							</view>
						</view>
					</view>
					<scroll-view :scroll-top="scrollTop" @scroll="scroll" enable-flex scroll-y show-scrollbar
						class="pokemonArae flex justify-center flex-wrap" :style="{height:selecting?'85%':'100%'}">
						<view
							v-bind:class="['pokemon','text-center', 'sprite-icon',`sprite-icon-${pk.id<100?(pk.id<10?'00'+pk.id:('0'+pk.id)):pk.id}`,`${preSelectPk.id===pk.id?'pkPreSelect':''}`]"
							@click="clickPK(pk)" v-for="pk of pkList" :key="pk.chinese_name">
							{{pk.chinese_name}}
						</view>
					</scroll-view>
					<view class="selectButtom w-full" v-if="selecting">
						<button class=" flex justify-center align-center">确定</button>
					</view>
				</view>
			</view>
			<view class="rightP h-full flex flex-col justify-center align-center">
				<view class="PCircle text-center" v-for="item of rightP" :key="item">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pekemonIcon from '@/style/pokemonIcon.css'
	import pokemons from '@/js/pokemon.js'
	import abilityExplain from '@/js/abilityExplain.js'
	export default {
		onLoad: function() {
			this.pkTypes = ['全部'].concat(pokemons.getPkTypes())
			this.pkList = pokemons.getPkByType()
		},
		data() {
			return {
				leftB: [1, 2, 3],
				rightB: [1, 2, 3],
				leftP: [1, 2, 3, 4, 5, 6],
				rightP: [1, 2, 3, 4, 5, 6],
				pkTypes: [],
				pkList: [],
				scrollTop: 0,
				oldScrollTop: 0,
				selecting: true,
				preSelectPk: null,
				pkDetailShow: true,
				pkDetail: {
					"chinese_name": "妙蛙种子",
					"id": 1,
					"japanese_name": "フシギダネ",
					"english_name": "Bulbasaur",
					"height": "0.7",
					"weight": "6.9",
					"type": ["草", "毒"],
					"ability": ["茂盛"],
					"隐藏特性": ["叶绿素"],
					"进化": "妙蛙草",
					"进化等级": 16,
					"属性相性": {
						"一般": 1.0,
						"格斗": 0.5,
						"飞行": 2.0,
						"毒": 1.0,
						"地面": 1.0,
						"岩石": 1.0,
						"虫": 1.0,
						"幽灵": 1.0,
						"钢": 1.0,
						"火": 2.0,
						"水": 0.5,
						"草": 0.25,
						"电": 0.5,
						"超能力": 2.0,
						"冰": 2.0,
						"龙": 1.0,
						"恶": 1.0,
						"妖精": 0.5
					}
				}
			};
		},
		methods: {
			scroll(e) {
				this.oldScrollTop = e.detail.scrollTop
			},
			clickType(type) {
				this.pkList = pokemons.getPkByType(type === '全部' ? null : type)
				this.scrollTop = this.oldScrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				this.preSelectPk = null
			},
			clickPK(pk) {
				if (pk.id === this.preSelectPk.id) {
					this.pkDetail = pk
					this.pkDetailShow = true
					return
				}
				this.preSelectPk = pk
			}
		},
		computed: {
			attrRestraint() {
				console.log(this.pkDetail["属性相性"])
				return this.pkDetail["属性相性"]
			}
		}
	}
</script>

<style lang="scss">
	.head {
		height: 14vh;
		padding-left: 20px;
		padding-right: 20px;
		box-sizing: border-box;
	}

	.BCircle {
		width: 9vh;
		height: 9vh;
		border-radius: 9vh;
		border: 1px solid #000000;
	}

	.BCircle+.BCircle {
		margin-left: 10px;
	}

	.container {
		height: 86vh;
		box-sizing: border-box;
	}

	.PCircle {
		width: calc(86vh / 6 - 2vh);
		height: calc(86vh / 6 - 2vh);
		border-radius: calc(86vh / 6 - 2vh);
		border: 1px solid #000000;
	}

	.PCircle+.PCircle {
		margin-top: 1vh;
	}

	.leftP {
		width: 13vw;
		border: 1px solid #000000;
	}

	.main {
		border: 1px solid #000000;
		padding: 10px;
	}

	.selectArea {
		position: relative;
		height: calc(100% - 72px);
		overflow: hidden;
		margin-top: 10px;
	}

	.selectButtom {
		height: 15%;
		box-sizing: border-box;

	}

	.selectButtom button {
		margin-top: 2px;
		width: 30%;
		height: calc(100% - 4px);
		// line-height: 1;
	}

	.pokemonArae {
		// overflow: scroll;
	}

	.pokemon {
		width: 50px;
		height: 50px;
		font-size: 10px;
		box-sizing: border-box;
		border: 1px solid #000000;
		margin-bottom: 5px;
		margin-right: 5px;
	}

	.pokemonDetail {
		position: absolute;
		z-index: 100;
		width: 80%;
		height: 80%;
		margin: 0 10% 0 10%;
		background-color: #ffffff;
		font-size: 10px;
	}

	.type {
		white-space: nowrap;
	}

	.type:first-of-type {
		margin-right: 10px;
	}

	.type+.type {
		margin-right: 10px;
	}

	.rightP {
		width: 13vw;
		border: 1px solid #000000;
	}

	.pkPreSelect {
		border: 2px solid #ffaa00;
	}

	.detailIcon {
		width: 30%;
		overflow: hidden;
	}

	.detailIcon view {
		transform: scale(2);
		border: none;
	}

	.detailAttr {}

	.attrRestraint {
		padding: 5px;
		box-sizing: border-box;
	}

	.detailRow {
		width: 100%;
		padding: 5px;
	}

	.detailRow text:first-child {
		white-space: nowrap;
	}

	.detailRow view text {
		white-space: nowrap;
		margin: 0 5px 5px 0;
	}
</style>
