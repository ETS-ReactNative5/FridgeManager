# Fridge Manager

[![FridgeManager](assets/icon.png)](https://expo.io/@gilleshz/fridge-manager)

Fridge Manager is a React Native mobile app using the [Spoonacular](https://spoonacular.com/food-api/docs) API.

It has been developed as part of a university project in the second year of my computer science master's degree.

Try this app by clicking [here](https://expo.io/@gilleshz/fridge-manager).

#### Features

- Manage the list of ingredients stored in the fridge
- Manage a shopping list
- Search recipes and filter them by cuisine and/or diet
- Search recipes based on the ingredients currently stored in the fridge
- Save recipes
- Configuration allowing to add removed ingredients from the fridge to the shopping list / remove ingredients from the shopping list when added to the fridge

## Getting started

For retrieving, building and running the application you'll need:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/)
- [Expo CLI](https://www.npmjs.com/package/expo-cli)
- [Expo Mobile app](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US)

An integrated development environment (IDE) is strongly recommended.
Consider using [IntelliJ IDEA](https://www.jetbrains.com/idea/).

#### 1. Cloning the repository

```shell
git clone https://github.com/gilleshz/FridgeManager
```

#### 2. Installing expo-cli

```shell
npm install -g expo-cli
```

#### 3. Running the project

In the project directory, run

```shell
expo start
```

or 
```shell
npm run start
```

On your phone, scan the QR code with the Expo app.
If you are not on the same LAN network as your computer select `Tunnel`.


#### 4. Building the APK

For this step you'll need an Expo account.

In the project directory run:

```shell
expo build:android -t apk
```

## GitHub actions

The GitHub action [Expo Publish](.github/workflows/expo.yml) runs whenever a source file is updated in the `master` branch.
Which includes the `assets` directory, the `src` directory and all `.js` and `.json` files at the root of the project.

This action publishes the app on [expo.io](https://expo.io/@gilleshz/fridge-manager), and also builds an APK.
The latest APK being available in the `android` directory.

## Contributing

If you wish to contribute, please see [Contributing.md](Contributing.md).
