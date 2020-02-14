import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {getRecipeImageUri} from '../../api/spoonacular';

const RecipeItem = ( {recipe, onClickOnMe} ) => {

    return (
        <TouchableOpacity onPress={ () => onClickOnMe(recipe.id) }>
            <Card
                image={{ uri: getRecipeImageUri(recipe.image) }}
            >
                <Text style={ styles.recipeNameText }>
                    { recipe.title }
                </Text>
            </Card>
        </TouchableOpacity>
    );
};

export default RecipeItem;

const styles = StyleSheet.create({
    recipeNameText: {
        textAlign: 'center',
        fontSize: 18,
    }
});
