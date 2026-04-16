# useToast

Used to conveniently call the Toast light prompt component.

## Basic Usage

Need to import wd-toast component in the page as the mount point.

```html
<wd-toast />
<wd-button @click="showToast">toast</wd-button>
```

```ts
import { useToast } from '@/uni_modules/wot-ui'

const toast = useToast()

function showToast() {
  toast.show('Prompt message')
}
```

## Success, Error, Warning, Normal

```ts
toast.show('Prompt message')
toast.success('Operation successful')
toast.error('Mobile verification code input error, please re-enter')
toast.warning('Prompt message')
toast.info('Normal prompt message')
```

## Using Icons
You can use `iconClass` to specify icons, combined with `classPrefix` to use custom icons, see [Icon Custom Icons](/component/icon#custom-icons).
```ts
// Use component library internal icons
toast.show({
  iconClass: 'star',
  msg: 'Using component library internal icons'
})
```

```ts
// Use custom icons
toast.show({
  iconClass: 'kehuishouwu',
  classPrefix: 'fish',
  msg: 'Using custom icons'
})
```

## Loading Prompt

After `loading` is enabled, users need to manually close it. You can call `close` to close it, or call toast again, because only one toast exists at a time, and the new toast will automatically replace the old one.

```ts
toast.loading('Loading...')
```

Modify loading indicator type:

```ts
toast.loading({
  loadingType: 'ring',
  msg: 'Loading...'
})
```

Manually close loading:
```ts
toast.close()
```

## API

### Methods

| Method Name | Description                   | Parameters    | 
| -------- | --------------------- | ------- | 
| show     | Show prompt              | options | 
| success  | Success prompt              | options | 
| error    | Error prompt              | options | 
| info     | Normal prompt              | options | 
| warning  | Warning prompt              | options | 
| loading  | Loading prompt              | options | 
| close    | Manually close message prompt box     | -       | 

### Options

| Parameter    | Description                             | Type                | Optional Values           | Default Value |
|--------------|-----------------------------------------|---------------------|---------------------------|---------------|
| msg          | Message content                         | string              | -                         | ''            |
| duration     | Duration in ms, 0 means no auto-close   | number              | -                         | 2000          |
| direction    | Layout direction                        | string              | vertical / horizontal     | horizontal    |
| iconName     | Icon type                               | string              | success / error / warning | ''            |
| iconSize     | Left icon size                          | number              | -                         | -             |
| iconClass    | Custom icon class name                  | string              | -                         | ''            |
| classPrefix  | Class name prefix                       | string              | -                         | 'wd-icon'     |
| cssIcon      | CSS icon                                | `boolean \| string` | -                         | false         |
| position     | Position of prompt message box          | string              | top / middle / bottom     | middle-top    |
| zIndex       | toast z-index                           | number              | -                         | 100           |
| loadingType  | Loading icon type                       | string              | ring                      | outline       |
| loadingColor | Loading icon color                      | string              | -                         | #4D80F0       |
| selector     | Specify unique identifier               | string              | -                         | ''            |
| cover        | Whether there is a transparent cover    | boolean             | -                         | false         |
| opened       | Callback function after fully displayed | Function            | -                         | -             |
| closed       | Callback function after fully closed    | Function            | -                         | -             |
