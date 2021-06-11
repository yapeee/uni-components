<template>
	<view class="calendar">
		<!--week-title-->
		<view class="calendar__title">
			<view v-for="(item,index) in week" :key="index" class="title__item">{{item}}</view>
		</view>
		<!--content-->
		<view class="calendar__content">
			<view class="content_panel" v-for="(item, index) in dayList" :key="index">
				<view class="content__month">{{index}}</view>
				<view class="content__date">
					<view class="date__item" v-for="(item2,index2) in item" :key="index2" @click="chooseCalendarDay(item2)">
						<view :class="[{'active': (item2.dateStr === selectDate.dateStr && item2.dateStr)}, 'item-box']">
							<view>{{item2.day}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: [Number, String],
			type: { // 传值
				type: String,
				default: 'day'
			},
			minDate: String, // tab主色调
			maxDate: String, // 下划线主色调
			formatter: ''
		},
		data() {
			return {
				week: ['日', '一', '二', '三', '四', '五', '六'],
				dayList: {},
				selectDate: {}
			}
		},
		mounted() {
			// 获取日历
			this.dayList = this.getDayList(this.minDate, this.maxDate)
		},
		methods: {
			getDayList(minDate, maxDate) { // 获取日历排班
				let num = Math.floor((new Date(maxDate) - new Date(minDate)) / 1000 / 60 / 60 / 24)
				let startDay = new Date(minDate)
				let list = {}
				for (let i = 0; i < num; i++) {
					let date = new Date(startDay.getTime() + i * 24 * 60 * 60 * 1000);
					// 获取月份
					let keyYear = this.formatWithPatternDate('yyyy', date),
						keyMonth = this.formatWithPatternDate('m', date);
					let key = this.formatWithPatternDate('yyyy-mm', date)
					if (!list.hasOwnProperty(key)) {
						list[key] = []
						// 判断当前日期前应该填充多少个空白项
						for (let k = 0; k < date.getDay(); k++) {
							list[key].push({
								day: ' '
							})
						}
					}
					list[key].push({
						date: date,
						day: date.getDate(),
						dateStr: this.formatWithPatternDate('yyyy-mm-dd', date)
					})
				}
				return list;
			},
			chooseCalendarDay(day) { // 选择日历日期
				if (day.dateStr) {
					this.selectDate = day
				}
			},
			formatWithPatternDate(format, date) { // 转换日期格式
				if (!date)
					return null;
				var look = function(m) { // Check whether a format character is doubled
						var n = 0;
						while (i + 1 < format.length && format.charAt(i + 1) === m) {
							n++;
							i++;
						}
						return n;
					},
					f1 = function(m, val, len) { // Format a number, with leading zero if necessary
						var n = '' + val;
						if (look(m)) {
							while (n.length < len) {
								n = '0' + n;
							}
						}
						return n;
					},
					i,
					output = '',
					literal = false;
				for (i = 0; i < format.length; i++) {
					if (literal) {
						if (format.charAt(i) === "'" && !look("'")) {
							literal = false;
						} else {
							output += format.charAt(i);
						}
					} else {
						switch (format.charAt(i)) {
							case 'd':
								output += f1('d', date.getDate(), 2);
								break;
							case 'o':
								output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
								break;
							case 'm':
								output += f1('m', date.getMonth() + 1, 2);
								break;
							case 'y':
								output += (look('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() %
									100);
								break;
							case 'h':
								var h = date.getHours();
								output += f1('h', (h > 12 ? (h - 12) : (h === 0 ? 12 : h)), 2);
								break;
							case 'H':
								output += f1('H', date.getHours(), 2);
								break;
							case 'i':
								output += f1('i', date.getMinutes(), 2);
								break;
							case 's':
								output += f1('s', date.getSeconds(), 2);
								break;
							case 'a':
								output += date.getHours() > 11 ? '下午' : '上午';
								break;
							case 'A':
								output += date.getHours() > 11 ? 'PM' : 'AM';
								break;
							case "'":
								if (look("'")) {
									output += "'";
								} else {
									literal = true;
								}
								break;
							default:
								output += format.charAt(i);
						}
					}
				}
				return output;
			}
		}
	}
</script>

<style lang="scss">
	.calendar {
		font-size: 28rpx;
		.calendar__title {
			display: flex;
			background: #fff;
			color: #A5A5A5;
			box-shadow: 0 2rpx 18rpx #A5A5A5;
			.title__item {
				flex: 1;
				padding: 10upx;
				text-align: center;
				&:first-child,
				&:last-child {
					// color: #FF0000;
				}
			}
		}
		.calendar__content {
			background: #fff;
			.content__month {
				padding: 20rpx;
				font-weight: bold;
				text-align: center;
			}
			.content__date {
				display: flex;
				flex-wrap: wrap;
				.date__item {
					width: 14.2%;
					text-align: center;
					margin: 10rpx 0;
					padding: 1rpx 0;
					font-size: 32rpx;
					&:nth-child(7n),
					&:nth-child(7n+1) {
						// color: #FF0000;
					}
					.item-box {
						padding: 6rpx 0;
						&.active {
							background: $uni-color-primary;
							border-radius: 16rpx;
							color: #fff;
							.tips {
								color: #fff;
							}
						}
						.tips {
							color: $uni-color-primary;
							&.none {
								color: #C8C9CC;
							}
						}
					}
				}
			}
		}
	}
</style>
