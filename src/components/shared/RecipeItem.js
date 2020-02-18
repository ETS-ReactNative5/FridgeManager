import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-elements';
import {getRecipeImageUri} from '../../api/spoonacular';
import {assets} from '../../definitions/assets';
import {colors} from '../../definitions/colors';

const RecipeItem = ({ isSaved, showSavedIcon, recipe, onClickOnMe }) => {

    const _displaySaved = () => {
        if (isSaved && showSavedIcon) {
          return (
            <Image  style={ styles.saveIcon }
                    source={ assets.toUnsaveIcon } />
          );
        }
        return null;
    };

    return (
        <TouchableOpacity onPress={ () => onClickOnMe(recipe.id) }>
            <Card
                image={{ uri: getRecipeImageUri(recipe.image) }}
            >
                <View style={ styles.cardContentView }>
                    <View style={ styles.cardContentBordersView } />
                    <View style={ styles.cardContentCenterView }>
                      <Text style={ styles.recipeNameText }>
                        { recipe.title }
                      </Text>
                    </View>
                    <View style={ styles.cardContentBordersView }>
                      { _displaySaved() }
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default RecipeItem;

const styles = StyleSheet.create({
    recipeNameText: {
        textAlign: 'center',
        fontSize: 18,
    },
    saveIcon: {
        height: 28,
        width: 28,
        tintColor: colors.primary,
    },
    cardContentView: {
        flex: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContentBordersView: {
        flex: 1,
        alignItems: 'flex-end',
    },
    cardContentCenterView: {
        flex: 8,
    }
});
