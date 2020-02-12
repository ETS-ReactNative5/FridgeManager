import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import {Ionicons} from '@expo/vector-icons';
import {colors} from '../../definitions/colors';

const Me = () => {
    return (
        <View style={ styles.mainView }>
            <TouchableOpacity
                onPress={() => { console.log('My Fridge'); }}
                style={ styles.touchableOpacity }
            >
                <Icon type="material-community" name="fridge-outline" size={30} color="white" iconStyle={ styles.icon } />
                <Text style={ styles.buttonText }>My fridge</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { console.log('My list'); }}
                style={ styles.touchableOpacity }
            >
                <Icon type="ionicon" name="md-cart" size={30} color="white" iconStyle={ styles.icon } />
                <Text style={ styles.buttonText }>My list</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { console.log('My recipes'); }}
                style={ styles.touchableOpacity }
            >
                <Icon type="ionicon" name="md-bookmarks" size={30} color="white" iconStyle={ styles.icon } />
                <Text style={ styles.buttonText }>My recipes</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Me;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.mainOrangeColor,
        height: 60,
        width: 160,
        borderRadius: 5,
        margin: 15,
    },
    icon: {
        padding: 8,
        margin: 2,
        height: 45,
        width: 45,
    },
    buttonText: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
        fontSize: 20,
    },
});