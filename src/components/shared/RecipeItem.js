import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../definitions/colors';
import {Card, Icon} from 'react-native-elements';

const RecipeItem = ( {recipe, onClickOnMe} ) => {

    return (
        <Card
            image={{ uri: 'https://spoonacular.com/recipeImages/' + recipe.image }}
        >
            <Text style={ styles.recipeNameText }>
                { recipe.title }
            </Text>
            <View style={ styles.ratesContainer }>
                <View style={ styles.ratesContainer }>
                    <View style={ styles.commentContainer }>
                        <Icon type="ionicon" name="md-people" size={18} color="white" iconStyle={ styles.recipeDataIcons } />
                        <Text style={ styles.recipeDataText }>
                            { recipe.servings }
                        </Text>
                    </View>
                    <View style={ styles.markContainer }>
                        <Icon type="ionicon" name="md-time" size={18} color="white" iconStyle={ styles.recipeDataIcons } />
                        <Text style={ styles.recipeDataText }>
                            { recipe.readyInMinutes.toString() } minutes
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
        /*<TouchableOpacity style={ styles.mainContainer }
                          onPress={ () => onClickOnMe(recipe.id) } >
            <Image style={ styles.recipeImage }
                   source={{ uri: 'https://spoonacular.com/recipeImages/' + recipe.image }}/>
            <View style={ styles.itemsContainer }>
                <View style={ styles.recipeTextContainer }>
                    <Text style={ styles.recipeNameText }>
                        { recipe.title }
                    </Text>
                </View>
                <View style={ styles.ratesContainer }>
                    <View style={ styles.ratesContainer }>
                        <View style={ styles.markContainer }>
                            <Icon type="ionicon" name="md-time" size={15} color="white" iconStyle={ styles.recipeDataIcons } />
                            <Text style={ styles.recipeDataText }>
                                { recipe.readyInMinutes.toString() }
                            </Text>
                        </View>
                        <View style={ styles.commentContainer }>
                            <Icon type="ionicon" name="md-people" size={15} color="white" iconStyle={ styles.recipeDataIcons } />
                            <Text style={ styles.recipeDataText }>
                                { recipe.servings }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>*/
    );
};

export default RecipeItem;

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: "row",
    },
    recipeImage: {
        height: 80,
        width: 80,
        backgroundColor: colors.mainOrangeColor,
    },
    itemsContainer: {
        flex: 1,
        marginLeft: 10,
    },
    recipeTextContainer: {
    },
    recipeNameText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    recipeCuisinesText: {
        fontStyle: 'italic',
        fontSize: 16,
    },
    recipeDataIcons: {
        height: 18,
        width: 18,
        color: colors.mainOrangeColor,
    },
    recipeDataText: {
        fontSize: 15,
        paddingLeft: 2,
    },
    ratesContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    markContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    priceContainer: {
        flexDirection: 'row',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: "space-between",
    },
});