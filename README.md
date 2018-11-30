# app-icon [![npm version](https://badge.fury.io/js/app-icon.svg)](https://badge.fury.io/js/app-icon) [![CircleCI](https://circleci.com/gh/dwmkerr/app-icon.svg?style=shield)](https://circleci.com/gh/dwmkerr/app-icon) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/3e334rknhjbpx555?svg=true)](https://ci.appveyor.com/project/dwmkerr/app-icon) [![codecov](https://codecov.io/gh/dwmkerr/app-icon/branch/master/graph/badge.svg)](https://codecov.io/gh/dwmkerr/app-icon) [![dependencies Status](https://david-dm.org/dwmkerr/app-icon/status.svg)](https://david-dm.org/dwmkerr/app-icon) [![devDependencies Status](https://david-dm.org/dwmkerr/app-icon/dev-status.svg)](https://david-dm.org/dwmkerr/app-icon?type=dev) [![GuardRails badge](https://badges.production.guardrails.io/dwmkerr/app-icon.svg)](https://www.guardrails.io) [![Greenkeeper badge](https://badges.greenkeeper.io/dwmkerr/app-icon.svg)](https://greenkeeper.io/)

Automatic icon resizing for Mobile Apps. Supports Native, Cordova and React Native. Also supports labelling of app icons. Inspired by [cordova-icon](https://github.com/AlexDisler/cordova-icon).

<img src="./assets/banner.png" width="614" alt="Banner">


<!-- vim-markdown-toc GFM -->

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
    * [Generating Icons](#generating-icons)
    * [Labelling Icons](#labelling-icons)
* [Developer Guide](#developer-guide)
    * [Initial Setup](#initial-setup)
    * [Running Tests](#running-tests)
    * [Creating a Release](#creating-a-release)
    * [Builds](#builds)
* [The Sample Projects](#the-sample-projects)
    * [React Native](#react-native)
    * [Cordova](#cordova)
    * [Native](#native)
* [Compatibility](#compatibility)
* [Troubleshooting](#troubleshooting)
* [License](#license)

<!-- vim-markdown-toc -->

## Introduction

This simple tool allows you to create a single icon in your app project, then create icons of all required sizes from it. It currently works for iOS and Android. You can also add labels to your app icons.

Create a single large `icon.png`, at least 192 pixels square, then run:

```bash
# If you are using npm 5.2 onwards...
npx app-icon generate

# ...for older versions of npm
npm install -g app-icon
app-icon generate
```

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

You can search in specific directories for icons, if the presence of other projects is interfering, just use the `--search` or `-s` parameter:

```bash
app-icon generate -s ./ios -s ./android
```

You can specify the path to the source icon, as well as the folder to search for app projects, just run `app-icon generate -h` to see the options.

### Labelling Icons

Add labels to an icon with the command below:

```bash
app-icon label -i icon.png -o output.png --top UAT --bottom 0.12.3
```

This would produce output like the below image:

![Labelled Icon Image](./assets/label.png)

This is a useful trick when you are creating things like internal QA versions of your app, where you might want to show a version number or other label in the icon itself.

## Developer Guide

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
git clone git@github.com:dwmkerr/app-icon.git
cd app-icon
npm install && npm test
```

### Running Tests

Run the tests with:

```bash
npm test
```

Tests are executed with [Mocha](https://mochajs.org/) and coverage is handled by [Istanbul](https://github.com/gotwarlost/istanbul). Coverage reports are written to an `./artifacts` folder.

Note that best practices are to pass Mocha a quoted string with a glob pattern for cross-platform execution of tests (see [Mocha Docs](https://mochajs.org/#the-test-directory)). However for some reason on AppVeyor this doesn't seem to work. Leaving the pattern unquoted works for `cmd` as well as the shell in builds for now. So please be careful if changing the quotes and test on both platforms.

### Creating a Release

To create a release.

- Merge your work to master.
- Use `npm version` to bump, e.g. `npm version patch`
- Push and deploy `git push --tags && git push && npm publish`

### Builds

Builds are run on CircleCI. You can run the CircleCI build locally with the following command:

```
make circleci
```

The CircleCI build runs on a custom image `dwmkerr/node:8-imagemagick` which is the standard [`circleci/node:8`](https://hub.docker.com/r/circleci/node/) image with ImageMagick installed on top.

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

## Compatibility

`app-icon` dependds on [ImageMagick](https://www.imagemagick.org/). ImageMagick 6 is installed by default on many Linux distributions, as well as OSX. Some platforms are regularly tested (such as Ubuntu, via CircleCI). Other platforms *may* work but are not tested when I make a release, so your results may vary.

The table below shows the current confirmed compatibility:

| Platform | `app-icon` | ImageMagick | Status |
|----------|------------|-------------|--------|
| OSX      | `0.6.x`    | 6, 7        | ✅ |
| Ubuntu 14 | `0.6.x`    | 6 | ✅ |

## Troubleshooting

**Images labelled with `app-icon label` have the text slightly vertically offset**

This seems to be an issue with Imagemagick 6 - try upgrading to 7.

## License

MIT
