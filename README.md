# bsmodal
[![Build Status](https://travis-ci.org/MarcinMichalik/bsmodal.svg?branch=master)](https://travis-ci.org/MarcinMichalik/bsmodal)
[![codecov](https://codecov.io/gh/MarcinMichalik/bsmodal/branch/master/graph/badge.svg)](https://codecov.io/gh/MarcinMichalik/bsmodal)
[![npm version](https://badge.fury.io/js/bsmodal.svg)](http://badge.fury.io/js/bsmodal)
[![devDependency Status](https://david-dm.org/MarcinMichalik/bsmodal/dev-status.svg)](https://david-dm.org/MarcinMichalik/bsmodal?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/MarcinMichalik/bsmodal.svg)](https://github.com/MarcinMichalik/bsmodal/issues)
[![GitHub stars](https://img.shields.io/github/stars/MarcinMichalik/bsmodal.svg)](https://github.com/MarcinMichalik/bsmodal/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/MarcinMichalik/bsmodal/master/LICENSE)

## Demo
https://MarcinMichalik.github.io/bsmodal/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

Bootstrap 4 modal for Angular4. Rewritten from 
[ng-bootstrap](https://github.com/ng-bootstrap) [@ng-bootstrap/ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) 
and adapted for use with angular 4

## Installation

Install through npm:
```
npm install --save bsmodal
```

Then include in your apps module:

```typescript
import { Component, NgModule } from '@angular/core';
import { BsModalModule } from 'bsmodal';

@NgModule({
  imports: [
    BsModalModule.forRoot()
  ]
})
export class MyModule {}
```

You may also find it useful to view the [demo source](https://github.com/MarcinMichalik/bsmodal/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/bsmodal/bundles/bsmodal.umd.js"></script>
<script>
    // everything is exported bsmodal namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://MarcinMichalik.github.io/bsmodal/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## Credits

Rewritten from [ng-bootstrap](https://github.com/ng-bootstrap) [@ng-bootstrap/ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap) 
and adapted for use with angular 4

## License

MIT