# app-icon [![CircleCI](https://circleci.com/gh/dwmkerr/app-icon.svg?style=shield)](https://circleci.com/gh/dwmkerr/app-icon) [![codecov](https://codecov.io/gh/dwmkerr/app-icon/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmkerr/app-icon) [![dependencies Status](https://david-dm.org/dwmkerr/react-native-icon/status.svg)](https://david-dm.org/dwmkerr/react-native-icon) [![devDependencies Status](https://david-dm.org/dwmkerr/react-native-icon/dev-status.svg)](https://david-dm.org/dwmkerr/react-native-icon?type=dev)

Automatic icon resizing for Mobile Apps. Supports Native, Cordova and React Native. Inspired by [cordova-icon](github.com/AlexDisler/cordova-icon).

<img src="./assets/banner.png" width="614" alt="Banner">

## Introduction

This simple tool allows you to create a single icon in your app project, then create icons of all required sizes from it. It currently works for iOS and Android.

## Installation

Install with:

```bash
npm install app-icon
```

You will need [imagemagick](http://www.imagemagick.org/) installed:

```bash
brew install imagemagick          # OSX
sudo apt-get install imagemagick  # Debian/Ubuntu/etc
sudo yum install imagemagick      # CentOS/etc
```

## Usage

Add an icon (ideally at least 192x192 pixels) named `icon.png` to your project root. Then run:

```bash
./node_modules/.bin/app-icon
```

If an iOS project is present, then the icon will be copied at all required sizes to:

```
./ios/<ProjectName>/Images.xcassets/AppIcon.appiconset
```

If an Android project is present, then the icon will be copied at all required sizes to:

```
./android/app/src/main/res
```

## Coding

Useful commands abound:

| Command | Usage |
|---------|-------|
| `npm test` | Runs the unit tests. |
| `npm run test:debug` | Runs the tests in a debugger. Combine with `.only` and `debugger` for ease of debugging. |
| `npm run cov` | Runs the tests, writing coverage reports to `./artifacts/coverage`. |

This section will guide you on how to develop with this project.

Dependencies:

- Node.js
- Yarn

Currently the linting style is based on [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). Run `npm run lint` to lint the code.

### Setup

Install the dependencies (I recommend [Node Version Manager](https://github.com/creationix/nvm)):

```bash
nvm install 4
nvm use 4
npm install -g yarn
git clone git@github.com:dwmkerr/app-icon.git
cd app-icon
yarn
```

### Running Tests

Run the tests with:

```bash
npm test
```

Tests are executed with [Mocha](https://mochajs.org/) and coverage is handled by [Istanbul](https://github.com/gotwarlost/istanbul). Coverage reports are written to an `./artifacts` folder.

### Creating a Release

To create a release.

- Merge your work to master.
- Use `npm version` to bump, e.g. `npm version patch`
- Push and deploy `git push --tags && git push && npm publish`

## The Sample Projects

This project includes some sample apps in the `test` folder, which are used for the tests. You can also run these apps to see the icons produced in action.

### React Native

To run:

```bash
cd ./test/ReactNativeIconTest/
npm install
react-native run-ios
# OR react-native run-android
```

### Cordova

To run:

```bash
cd ./test/CordovaApp/
npm install
cordova run ios
# OR cordova run android
```

### Native

To run the native apps, open the `./test/NativeApp` directory, then open the iOS/Android projects in XCode/AndroidStudio as needed.

## License

MIT
