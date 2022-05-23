# Avatar

Used to represent a user or thing.

## When to Use

It is necessary to show the characteristics of people or things more intuitively.

## Demos

<code src="./demos/demo1.tsx"></code>

## Avatar

### Props

| Name     | Description                | Type                                                       | Default                     |
| -------- | -------------------------- | ---------------------------------------------------------- | --------------------------- |
| src      | The address of avatar.     | `string`                                                   | -                           |
| fallback | The fallback placeholder.  | `ReactNode`                                                | The default fallback image. |
| fit      | The fill mode of the image | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'`                   |

In addition, the following props of [Image](./image) are also supported: `alt` `lazy` `onClick` `onError`.

### CSS Variables

| Name            | Description                     | Default | Global                       |
| --------------- | ------------------------------- | ------- | ---------------------------- |
| --size          | The width and height of avatar. | `44px`  | `--adm-avatar-size`          |
| --border-radius | The border radius.              | `4px`   | `--adm-avatar-border-radius` |
