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
				<scroll-view :scroll-top="scrollTop" @scroll="scroll" enable-flex scroll-y show-scrollbar
					class="pokemonArae flex justify-center flex-wrap">
					<view
						v-bind:class="['pokemon',  'sprite-icon',`sprite-icon-${pk.id<100?(pk.id<10?'00'+pk.id:('0'+pk.id)):pk.id}` ]"
						v-for="pk of pkList" :key="pk.chinese_name">
						{{pk.chinese_name}}
					</view>
					<view class="">

					</view>
				</scroll-view>
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
	import pokemons from '../../js/pokemon.js'
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
				oldScrollTop: 0
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
			},
		},
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

	.pokemonArae {
		margin-top: 10px;
		height: calc(100% - 72px);
		// overflow: scroll;
	}

	.pokemon {
		width: 50px;
		height: 50px;
		font-size: 10px;
		box-sizing: border-box;
		border: 1px solid #000000;
		margin-bottom: 5px;
	}

	.pokemon:first-of-type {
		margin-right: 5px;
	}

	.pokemon+.pokemon {
		margin-right: 5px;
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
</style>
