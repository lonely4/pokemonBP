<template>
	<view class="container flex justify-center full">
		<view class="startButtom">
			<view class="circle">
				<navigator url="/pages/BP/index" class="full">
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			
		}
	}
</script>

<style>
	.container {
		font-size: 14px;
		line-height: 24px;
	}
	.startButtom {
		margin-top: 70%;
	}

	.circle {
		width: 40vw;
		height: 40vw;
		border-radius: 40vw;
		background-color: #ff0000;
	}
</style>
