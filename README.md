# app-icon [![CircleCI](https://circleci.com/gh/dwmkerr/app-icon.svg?style=shield)](https://circleci.com/gh/dwmkerr/app-icon) [![codecov](https://codecov.io/gh/dwmkerr/app-icon/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmkerr/app-icon) [![dependencies Status](https://david-dm.org/dwmkerr/react-native-icon/status.svg)](https://david-dm.org/dwmkerr/react-native-icon) [![devDependencies Status](https://david-dm.org/dwmkerr/react-native-icon/dev-status.svg)](https://david-dm.org/dwmkerr/react-native-icon?type=dev)

Automatic icon resizing for Mobile Apps. Supports Native, Cordova and React Native. Also supports labelling of app icons. Inspired by [cordova-icon](https://github.com/AlexDisler/cordova-icon).

<img src="./assets/banner.png" width="614" alt="Banner">

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
	- [Generating Icons](#generating-icons)
	- [Labelling Icons](#labelling-icons)
- [Coding](#coding)
	- [Initial Setup](#initial-setup)
	- [Running Tests](#running-tests)
	- [Creating a Release](#creating-a-release)
- [The Sample Projects](#the-sample-projects)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Introduction

This simple tool allows you to create a single icon in your app project, then create icons of all required sizes from it. It currently works for iOS and Android. You can also add labels to your app icons.

## Installation

Install with:

```bash
npm install -g app-icon
```

You will need [imagemagick](http://www.imagemagick.org/) installed:

```bash
brew install imagemagick          # OSX
sudo apt-get install imagemagick  # Debian/Ubuntu/etc
sudo yum install imagemagick      # CentOS/etc
```

## Usage

The commandline tool can be used to generate icons or label icons.

### Generating Icons

Add an icon (ideally at least 192x192 pixels) named `icon.png` to your project root. To automatically generate icons of all sizes for all app projects in the same folder, run:

```bash
app-icon generate
```

If an iOS project is present, then the icon will be copied at all required sizes to:

```
./ios/<ProjectName>/Images.xcassets/AppIcon.appiconset
```

If an Android project is present, then the icon will be copied at all required sizes to:

```
./android/app/src/main/res
```

You can limit the platforms which icons are generated for with the `--platforms` flag, specifying:

```bash
app-icon generate --platforms=ios
app-icon generate --platforms=android,ios
```

By default the tool will generate icons for both platforms.

You can specify the path to the source icon, as well as the folder to search for app projects, just run `app-icon generate -h` to see the options.

### Labelling Icons

Add labels to an icon with the command below:

```bash
app-icon label -i icon.png -o output.png --top UAT --bottom 0.12.3
```

This would produce output like the below image:

![Labelled Icon Image](./assets/label.png)

This is a useful trick when you are creating things like internal QA versions of your app, where you might want to show a version number or other label in the icon itself.

## Coding

The only dependencies are Node 6 (or above) and Yarn.

Useful commands for development are:

| Command | Usage |
|---------|-------|
| `npm test` | Runs the unit tests. |
| `npm run test:debug` | Runs the tests in a debugger. Combine with `.only` and `debugger` for ease of debugging. |
| `npm run cov` | Runs the tests, writing coverage reports to `./artifacts/coverage`. |

Currently the linting style is based on [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb). Run `npm run lint` to lint the code.

### Initial Setup

Install the dependencies (I recommend [Node Version Manager](https://github.com/creationix/nvm)):

```bash
nvm install 6
nvm use 6
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

## Troubleshooting

**Images labelled with `app-icon label` have the text slightly vertically offset**

This seems to be an issue with Imagemagick 6 - try upgrading to 7.

## License

MIT
