# ProgressBar 进度条

用条状图形表示百分比进度。

## 何时使用

适用于展示任务当前进度。

## 示例

<code src="./demos/demo1.tsx"></code>

## ProgressBar

### 属性

| 参数    | 说明   | 类型     | 默认值 |
| ------- | ------ | -------- | ------ |
| percent | 百分比 | `number` | `0`    |

### CSS 变量

| 属性          | 说明       | 默认值                     | 全局变量                         |
| ------------- | ---------- | -------------------------- | -------------------------------- |
| --fill-color  | 填充的颜色 | `var(--adm-color-primary)` | `--adm-progress-bar-fill-color`  |
| --track-color | 线条的颜色 | `#e5e5e5`                  | `--adm-progress-bar-track-color` |
| --track-width | 线条宽度   | `3px`                      | `--adm-progress-bar-track-width` |
