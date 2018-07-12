a postinstall npm script for [License Zero](https://licensezero.com) npm packages

```json
{
  "scripts": {
    "postinstall": "licensezero-postinstall"
  }
}
```

To preview the output for your npm package:

```bash
cd your-npm-package
npx licensezero-postinstall $PWD
```
