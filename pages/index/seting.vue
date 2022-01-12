<template>
	<view class="main full flex flex-col align-center ">
		<uni-forms class="w-full" ref="form" labelWidth="88" :modelValue="setingData" :rules="rules">
			<uni-forms-item label="禁用数量" name="banNum">
				<uni-easyinput type="number" v-model="setingData.banNum" placeholder="请输入每方可禁用的宝可梦数量" />
			</uni-forms-item>
			<uni-forms-item label="选用数量" name="pickNum">
				<uni-easyinput type="number" v-model="setingData.pickNum" placeholder="请输入每方可选用的宝可梦数量" />
			</uni-forms-item>
			<uni-forms-item label='禁用神兽'>
				<switch @change="changeBanMA" />
			</uni-forms-item>
			<uni-forms-item label='创建者红蓝方'>
				<uni-data-checkbox v-model="setingData.createWay" :localdata="creatWayData">
				</uni-data-checkbox>
			</uni-forms-item>
		</uni-forms>
		<view class="invite w-full">
			<button @click="invite">邀请好友</button>
			<!-- 	<view class="friend">
			</view> -->
		</view>
		<view class="w-full start">
			<button type="primary" @click="start">开始BP</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setingData: {
					banNum: 3,
					pickNum: 6,
					banMA: false,
					createWay: 'red'
				},
				creatWayData: [{
					"value": 'red',
					"text": "红色方"
				}, {
					"value": 'blue',
					"text": "蓝色方"
				}, {
					"value": 'random',
					"text": "随机"
				}],
				rules: {
					banNum: {
						rules: [{
							required: true,
							message: '请输入禁用数量',
						}, {
							minimum: 0,
							maximum: 6,
							message: '禁用数量在 {minimum} 到 {maximum} 之间',
						}]
					},
					pickNum: {
						rules: [{
							required: true,
							message: '请输入选用数量',
						}, {
							minimum: 1,
							maximum: 6,
							message: '选用数量在 {minimum} 到 {maximum} 之间',
						}]
					}
				}
			}
		},
		methods: {
			changeBanMA() {
				this.setingData.banMA = !this.setingData.banMA
			},
			invite() {

			},
			start() {
				this.$refs.form.validate().then(res => {
					uni.redirectTo({
						url: `/pages/BP/index?${Object.keys(this.setingData).map(key=>`&${key}=${this.setingData[key]}`).join('').slice(1)}`
					})
				}).catch(e => {
					console.log(e)
				})
			},
		}
	}
</script>

<style>
	.uni-forms-item__content {
		display: flex;
		align-items: center;
	}

	.main {
		position: relative;
		box-sizing: border-box;
		padding: 10px;
	}

	.invite {
		margin-top: 20px;
	}

	.friend {
		width: 50px;
		height: 50px;
		border: 1px solid #000000;
		border-radius: 50px;
	}

	.start {
		position: absolute;
		bottom: 10px;
	}
</style>
