import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../definitions/colors';
import Search from '../components/recipes/Search';
import Me from '../components/me/Me';
import Settings from '../components/settings/Settings';
import Recipe from '../components/recipes/Recipe';
import MyRecipes from '../components/me/MyRecipes';
import AddIngredient from '../components/me/shared/AddIngredient';
import SavedIngredients from '../components/me/SavedIngredients';

const SearchNavigation = createStackNavigator(
    {
        Search: Search,
        Recipe: Recipe
    },
    {
        initialRouteName: 'Search',
    }
);

const MeNavigation = createStackNavigator(
    {
        Me: Me,
        MyFridge: {
            screen: props => <SavedIngredients {...props} source="fridge" destination="list"/>,
            navigationOptions: {
                title: 'My fridge'
            },
        },
        MyList: {
            screen: props => <SavedIngredients {...props} source="list" destination="fridge"/>,
            navigationOptions: {
                title: 'My list'
            },
        },
        MyRecipes: {
            screen: MyRecipes,
            navigationOptions: {
                title: 'My recipes'
            },
        },
        Recipe: Recipe,
        AddIngredient: {
            screen: AddIngredient,
            navigationOptions: {
                title: 'Add ingredient'
            },
        },
    },
    {
        initialRouteName: 'Me',
    }
);

const SettingsNavigation = createStackNavigator(
    {
        Settings: Settings
    },
    {
        initialRouteName: 'Settings',
    }
);

const TabNavigation = createBottomTabNavigator({
        Search: {
            screen: SearchNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-search" size={35} color={tintColor}/>
                },
            },
        },
        Me: {
            screen: MeNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-person" size={35} color={tintColor}/>
                },
            },
        },
        Settings: {
            screen: SettingsNavigation,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => {
                    return <Ionicons name="md-settings" size={35} color={tintColor}/>
                },
            },
        },
    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colors.primary,
        },
        initialRouteName: 'Me',
    });

export default createAppContainer(TabNavigation);
