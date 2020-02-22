import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity, Alert,
} from 'react-native';
import { getRecipeInformation } from '../../api/spoonacular';
import { connect } from 'react-redux';
import { colors } from '../../definitions/colors';
import { assets } from '../../definitions/assets';
import RecipeIngredientItem from './RecipeIngredientItem';
import {Button, Icon} from 'react-native-elements';

const Recipe = ( {navigation, myRecipes, fridge, list, dispatch} ) => {
    const [isLoading, setLoadingState] = useState( true );
    const [recipeData, setRecipeData] = useState( null );

    useEffect(() => {
        _loadRecipe();
    }, []);

    const _loadRecipe = async () => {
        try {
            setRecipeData( await getRecipeInformation(navigation.getParam('recipeID')) );
            setLoadingState( false );
        } catch (error) {
            Alert.alert(
                `Error ${error.message}`,
                 'An error has occurred while fetching the recipe. Please try again later.',
                [{ text: 'OK' }]
            );
            navigation.goBack();
        }
    };

    const _displayLoading = () => {
        if (isLoading) {
            return (
                <View style={styles.loadingView}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return null;
    };

    const _saveRecipe = async () => {
        if( recipeData ) {
            const action = { type: 'SAVE_RECIPE', value: recipeData };
            dispatch(action);
        }
    };

    const _unsaveRecipe = async () => {
        if( recipeData ) {
            const action = { type: 'UNSAVE_RECIPE', value: recipeData };
            dispatch(action);
        }
    };

    const _displaySaveRecipe = () => {
        if( myRecipes.findIndex(obj => obj.id === navigation.getParam('recipeID')) !== -1 ) {
            return (
                <TouchableOpacity onPress={ _unsaveRecipe }>
                    <Image  style={ styles.saveIcon }
                            source={ assets.toUnsaveIcon } />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={ _saveRecipe }>
                <Image  style={ styles.saveIcon }
                        source={ assets.toSaveIcon } />
            </TouchableOpacity>
        );
    };

    const _displayTitle = () => {
        const titleArray = recipeData.title.split(' ');
        return titleArray.map(
            (word, index) => <Text key={ index } style={ styles.titleText }>{ word } </Text>
        );
    };

    const _displayCuisines = () => {
        const cuisines = recipeData.cuisines.map(
            cuisine => cuisine.charAt(0).toUpperCase() + cuisine.substr(1)
        );
        if (cuisines.length > 0) {
            return (
                <Text style={ styles.cuisineAndDietTexts }>
                    { cuisines.join(', ') } cuisine{ cuisines.length > 1 ? 's' : ''}
                </Text>
            );
        }
        return null;
    };

    const _displayDiets = () => {
        const diets = recipeData.diets.map(
            diet => diet.charAt(0).toUpperCase() + diet.substr(1)
        );
        if (diets.length > 0) {
            return (
                <Text style={ styles.cuisineAndDietTexts }>
                    { diets.join(', ') } diet{ diets.length > 1 ? 's' : ''}
                </Text>
            );
        }
        return null;
    };

    const _inMyFridge = () => {
        const ingredients = recipeData.extendedIngredients.filter(
            ingredient => fridge.some(fridgeIngredient => fridgeIngredient.id === ingredient.id)
        );
        const inMyFridgeJSX = [];

        ingredients.forEach(
            (ingredient, index) => inMyFridgeJSX.push(
                <RecipeIngredientItem key={ ingredient.id + index } ingredient={ ingredient }/>
            )
        );

        return inMyFridgeJSX;
    };

    const _notInMyFridge = () => {
        const ingredients = recipeData.extendedIngredients.filter(
            ingredient => !fridge.some(fridgeIngredient => fridgeIngredient.id === ingredient.id)
        );
        const notInMyFridgeJSX = [];

        ingredients.forEach(
            (ingredient, index) => notInMyFridgeJSX.push(
                <RecipeIngredientItem key={ ingredient.id + index } ingredient={ ingredient }/>
            )
        );

        return notInMyFridgeJSX;
    };

    const _addAllToMyList = () => {
        recipeData.extendedIngredients.filter(
            ingredient => !fridge.some(fridgeIngredient => fridgeIngredient.id === ingredient.id)
        ).forEach(
            ingredient => dispatch({ type: 'ADD_TO_LIST', value: ingredient })
        );
    };

    const _displayAddAllToMyList = () => {
        const ingredientsNotInMyListOrMyFridge = recipeData.extendedIngredients.filter(
            ingredient =>
                !list.some(listIngredient => listIngredient.id === ingredient.id) &&
                !fridge.some(fridgeIngredient => fridgeIngredient.id === ingredient.id)
        );

        if (ingredientsNotInMyListOrMyFridge.length !== 0) {
            return (
                <Button
                    title="Add all to my list"
                    icon={
                        <Icon type="ionicon" name="md-cart" size={15} color="white" iconStyle={ styles.icon } />
                    }
                    color={ colors.primary }
                    buttonStyle={ styles.addToMyListButton }
                    onPress={ _addAllToMyList }
                />
            );
        }
    };

    const _displayIngredients = () => {
        return (
            <View>
                <Text style={ styles.subTitleText }>
                    Ingredients
                </Text>
                <View style={ styles.ingredientsSplitView }>
                    <View style={ styles.inMyFridgeView }>
                        <Text style={ styles.ingredientsSplitTitle }>In my fridge</Text>
                        <View style={ styles.inMyFridgeListView }>
                            { _inMyFridge() }
                        </View>
                    </View>
                    <View style={ styles.missingView }>
                        <Text style={ styles.ingredientsSplitTitle }>Missing</Text>
                        <View style={ styles.missingListView }>
                            { _notInMyFridge() }
                            { _displayAddAllToMyList() }
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const _displayInstructions = () => {
        let instructionsJSX = [];
        recipeData.analyzedInstructions.forEach((instruction, instructionIndex) => {
            let stepsJSX = [];
            instruction.steps.forEach((item, stepIndex) => {
                stepsJSX.push(
                    <View key={ instructionIndex + '.' + stepIndex } style={ styles.stepView }>
                        <Text style={ styles.stepNumberText }>{ item.number }.</Text>
                        <Text style={ styles.stepText }>{ item.step }</Text>
                    </View>
                )
            });
            instructionsJSX.push(
                <View key={ instructionIndex } style={ styles.instructionView }>
                    { instruction.name !== '' ? <Text style={ styles.instructionNameText }>{ instruction.name }</Text> : null }
                    { stepsJSX }
                </View>
            );
        });

        return (
            <View>
                <Text style={ styles.subTitleText }>
                    Instructions
                </Text>
                { instructionsJSX }
            </View>
        );
    };

    const _displayPairedWines = () => {
        if (recipeData.winePairing.pairedWines === undefined || recipeData.winePairing.pairedWines.length === 0) {
            return null;
        }

        const wines = recipeData.winePairing.pairedWines.map(
            wine => wine.split(' ').map(word =>  word.charAt(0).toUpperCase() + word.substr(1)).join(' ')
        );

        if (wines.length > 0) {
            return <Text style={ styles.winesText }>{ wines.join(', ') }</Text>;
        }
    };

    const _displayPairedWinesText = () => {
        if (recipeData.winePairing.pairingText === undefined || recipeData.winePairing.pairingText === '') {
            return null;
        }

        return <Text>{ recipeData.winePairing.pairingText }</Text>;
    };

    const _displayWinePairing = () => {

        const pairedWines = _displayPairedWines();
        const pairingText = _displayPairedWinesText();

        if (pairedWines === null && pairingText === null) {
            return null;
        }
        return (
            <View>
                <Text style={{ ...styles.subTitleText, fontStyle: 'italic' }}>
                    Un peu de vin monsieur?
                </Text>
                { pairedWines }
                { pairingText }
            </View>
        );
    };

    const _displayRecipe = () => {
        if (recipeData) {
            return (
                <ScrollView style={styles.scrollViewRecipe}>
                    <Image style={ styles.recipeImage }
                           source={{ uri: recipeData.image }}/>
                    <View style={ styles.recipeInfoView }>
                        <View style={ styles.titleView }>
                            { _displayTitle() }
                            { _displaySaveRecipe() }
                        </View>

                        { _displayCuisines() }
                        { _displayDiets() }

                        <Text style={ styles.preparationTimeText }>
                            Ready in { recipeData.readyInMinutes } minutes, up to { recipeData.servings } serving{ recipeData.servings > 1 ? 's' : '' }
                        </Text>

                        { _displayIngredients() }
                        { _displayInstructions() }
                        { _displayWinePairing() }
                    </View>
                </ScrollView>
            );
        }
        return null;
    };

    return (
        <View style={styles.mainView}>
            {_displayLoading()}
            {_displayRecipe()}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        myRecipes: state.recipeReducer.recipes,
        fridge: state.ingredientReducer.fridge,
        list: state.ingredientReducer.list
    }
};

export default connect(mapStateToProps)(Recipe);

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    loadingView: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewRecipe: {
        flex: 1
    },
    recipeImage: {
        height: 180,
        backgroundColor: colors.primary,
    },
    saveIcon: {
        height: 30,
        width: 30,
        tintColor: colors.primary,
    },
    recipeInfoView: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 25,
    },
    titleView: {
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop: 5,
        marginBottom: 15
    },
    titleText: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    subTitleText: {
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    cuisineAndDietTexts: {
        fontSize: 15,
        fontStyle: 'italic'
    },
    preparationTimeText: {
        fontSize: 15,
        marginTop: 12
    },
    instructionView: {
        marginBottom: 10
    },
    instructionNameText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: colors.secondary,
        marginBottom: 14
    },
    stepView: {
        flex: 15,
        flexDirection: 'row'
    },
    stepNumberText: {
        flex: 1,
        color: colors.primary,
        fontWeight: 'bold'
    },
    stepText: {
        flex: 14
    },
    winesText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.secondary,
        marginBottom: 10
    },
    ingredientsSplitView: {
        flex: 2,
        flexDirection: 'row'
    },
    inMyFridgeView: {
        flex: 1,
        borderRightWidth : 1.0,
        borderColor: colors.secondary,
    },
    missingView: {
        flex: 1
    },
    ingredientsSplitTitle: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 14,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    inMyFridgeListView: {
        paddingRight: 10
    },
    missingListView: {
        paddingLeft: 10
    },
    addToMyListButton: {
        marginTop: 5,
        backgroundColor: colors.primary,
        width: '100%',
        height: 30
    },
    icon: {
        paddingRight: 5,
        paddingTop: 2
    }
});
