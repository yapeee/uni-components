## 简介

通过v-model绑定当前激活tab对应的索引值，默认情况下启用第一个tab。
当tabs长度超过屏幕宽度，则支持在水平方向上滚动。切换时，选中tab自动居中。

## 基础用法

```
<tabs :list="list" v-model="active"></tabs>
```

## 属性说明

| 参数      | 说明                    | 类型   | 默认值             |
| --------- | ----------------------- | ------ | ------------------ |
| v-model   | 绑定当前选中tab的标识符 | number | 0                  |
| list      | 绑定tabs栏数据          | Array  | []                 |
| itemColor | tab选中颜色             | String | $uni-color-primary |
| lineColor | 下划线颜色              | String | $uni-color-primary |
| lineAnimated | 是否展示下划线滑动效果  | Boolean | false              |

## 实现方案

#### 基本设置

##### 使用`<scroll-view>`标签可实现tabList的移动

##### 使用`uni.createSelectorQuery()`获取节点信息

```
uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
	callback(data[0]);
});
```

#### 步骤一：设置选中tab项的下划线

**基本要求**

下划线为选中项宽度的一半，相对选中tab项居中。

**实现**

设置线的长度

```javascript
/* 
下划线.width = 选中item.width / 2
下划线.left（偏移量） = 选中item.width / 2 + （- tabs[0].left） + 选中item.left
*/

this.lineStyle = {
	width: `${lineWidth}px`,
	transform: `translateX(${lineLeft}px) translateX(-50%)`,
	transitionDuration: `0.3s`
};
```

#### 步骤二：设置选中tab项相对页面居中显示

**基本要求**

动态移动选中tab项相对页面居中

**实现**

```
itemLeft（偏移量） = 选中item.width / 2 + （-list.left） + 选中item.left - list.width / 2 - scrollLeft（移动前的偏移量）
```

## 更新日志
**2020.01.06**
1.修复BUG：修复手机端tabs栏滑动时抖动问题。
2.新增功能：增加tabLine（选中项下划线）动画效果可选参数。

**2019.12.20**
修复bug：设置设定位置时，组件无更新
原因：设置了currentIndex但是没有重新渲染setLine，且回退页面是，mounted没有再次执行。

**2019.12.13**
修复bug：手机端选中项下划线有偏差问题
原因：设置下划线style中的transform不能采用rpx（有偏差），需改用为px
**2019.12.10**
支持展示不定长度tab项