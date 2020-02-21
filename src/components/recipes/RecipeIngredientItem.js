import React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { getIngredientImageUri } from '../../api/spoonacular';
import { colors } from '../../definitions/colors';

const RecipeIngredientItem = ({ ingredient }) => {

    return (
        <View style={ styles.mainView }>
            <View style={ styles.imageView }>
                <Image style={ styles.ingredientImage }
                       source={{ uri: getIngredientImageUri(ingredient.image) }}
                       resizeMode="contain"
                />
            </View>
            <View style={ styles.textView }>
                <Text style={ styles.ingredientNameText }>
                    <Text style={{ fontWeight: 'bold' }}>{ ingredient.measures.metric.amount + ' ' + ingredient.measures.metric.unitShort } </Text>
                    { ingredient.name }
                </Text>
            </View>
        </View>
    );
};

export default RecipeIngredientItem;

const styles = StyleSheet.create({
    mainView: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 4,
        borderBottomWidth : 1.0,
        borderColor: colors.primary,
        borderRadius: 1
    },
    imageView: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        flex: 3,
        paddingLeft: 7,
        paddingRight: 4
    },
    ingredientImage: {
        height: 40,
        width: 40
    },
    ingredientNameText: {
        fontWeight: 'normal',
        fontSize: 12
    }
});
