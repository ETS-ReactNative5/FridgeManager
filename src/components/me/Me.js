import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Me = () => {
    return (
        <View>
            <Button
                title='My fridge'
                onPress={() => { console.log('My Fridge'); }}
            />
            <Button
                title='My list'
                onPress={() => { console.log('My list'); }}
            />
            <Button
                title='My recipes'
                onPress={() => { console.log('My recipes'); }}
            />
        </View>
    );
}

export default Me;
