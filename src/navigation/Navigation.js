import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../definitions/colors';
import { assets } from '../definitions/assets';
import Search from '../components/search/Search';
import Me from '../components/me/Me';
import Settings from '../components/settings/Settings';

const SearchNavigation = createStackNavigator(
  {
    Search: Search,
  },
  {
    initialRouteName: 'Search',
  }
);

const MeNavigation = createStackNavigator(
  {
    Me: Me
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
          return <Ionicons name="md-search" size={35} color={tintColor} />
        },
      },
    },
    Me: {
      screen: MeNavigation,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Ionicons name="md-person" size={35} color={tintColor} />
        },
      },
    },
    Settings: {
      screen: SettingsNavigation,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => {
          return <Ionicons name="md-settings" size={35} color={tintColor} />
        },
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: colors.mainOrangeColor,
    },
    initialRouteName: 'Me',
  });

export default createAppContainer(TabNavigation);

const styles = StyleSheet.create({
  tabIcon: {
    width: 40,
    height: 40,
  },
});
