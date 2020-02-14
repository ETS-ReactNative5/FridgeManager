import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getRecipeInformation } from '../../api/spoonacular';
import { colors } from '../../definitions/colors';
import { assets } from '../../definitions/assets';
import {Icon} from 'react-native-elements';

const Recipe = ( {navigation} ) => {
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
      //Do
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

  const _displaySaveRecipe = () => {
    return (
      <TouchableOpacity onPress={ () => console.log('save') }>
        <Image  style={ styles.saveIcon }
                source={ assets.toUnsaveIcon } />
      </TouchableOpacity>
    );
  };

  const _displayTitle = () => {
    const titleArray = recipeData.title.split(' ');
    return titleArray.map(
      word => <Text key={ word } style={ styles.titleText }>{ word } </Text>
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

  const _displayInstructions = () => {
/*    const instructions = recipeData.analyzedInstructions;
    if (instructions.length > 0) {
      return instructions.map(
        instruction => <Text style={{ color: colors.primary }}>{ instruction.number }. { instruction.step }</Text>
      );
    }*/
    return null;
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

            <Text style={ styles.subTitleText }>
              Ingredients
            </Text>
            <View style={ styles.ingredientsView }>
              <Text>TODO</Text>
            </View>

            <Text style={ styles.subTitleText }>
              Instructions
            </Text>

            <View style={ styles.instructionsView }>
              { _displayInstructions() }
            </View>

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

export default Recipe;

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
    paddingLeft: 20,
    paddingRight: 20,
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
    marginBottom: 20
  },
  cuisineAndDietTexts: {
    fontSize: 15,
    fontStyle: 'italic'
  },
  preparationTimeText: {
    fontSize: 15,
    marginTop: 12
  },
  ingredientsView: {

  },
  instructionsView: {

  }
});
