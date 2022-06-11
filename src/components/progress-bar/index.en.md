# ProgressBar

Percentage progress is represented as a bar graph.

## When to Use

It is suitable for displaying the current progress of the task.

## Demos

<code src="./demos/demo1.tsx"></code>

## ProgressBar

### Props

| Name    | Description                 | Type     | Default |
| ------- | --------------------------- | -------- | ------- |
| percent | Percent of the progress bar | `number` | `0`     |

### CSS Variables

| Name          | Description             | Default                    | Global                           |
| ------------- | ----------------------- | -------------------------- | -------------------------------- |
| --fill-color  | The color of fill part. | `var(--adm-color-primary)` | `--adm-progress-bar-fill-color`  |
| --track-color | The color of line.      | `#e5e5e5`                  | `--adm-progress-bar-track-color` |
| --track-width | The width of line.      | `3px`                      | `--adm-progress-bar-track-width` |
