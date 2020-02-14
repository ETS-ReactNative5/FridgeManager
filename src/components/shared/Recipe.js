import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const Recipe = ({ navigation }) => {
    return (
        <View>
            <Text>Recipe works</Text>
            <Text>{ navigation.getParam('recipeID') }</Text>
        </View>
    );
};

export default Recipe;
