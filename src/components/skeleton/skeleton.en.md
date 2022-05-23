# Skeleton

Graphically represent content placeholders.

## When to Use

Provides a placeholder graphic composition where you need to wait for content to load.

## Demos

<code src="./demos/demo1.tsx"></code>

## Skeleton

### Props

| Name     | Description                  | Type      | Default |
| -------- | ---------------------------- | --------- | ------- |
| animated | Whether to enable animation. | `boolean` | `false` |

### CSS Variables

| Name            | Description    | Default |
| --------------- | -------------- | ------- |
| --width         | Width.         | `100%`  |
| --height        | Height.        | `0`     |
| --border-radius | Border radius. | `0`     |

## Skeleton.Title

### Props

Same as Skeleton.

## Skeleton.Paragraph

### Props

| Name      | Description      | Type     | Default |
| --------- | ---------------- | -------- | ------- |
| lineCount | Number of lines. | `number` | `3`     |

And also supports the `animated` prop of Skeleton.
