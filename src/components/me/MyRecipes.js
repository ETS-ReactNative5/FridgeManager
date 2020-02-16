import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import ListRecipes from '../shared/ListRecipes';
import DisplayError from '../shared/Error';

const MyRecipes = ( {myRecipes, navigation} ) => {

    const _navigateToRecipeDetails = ( recipeID ) => {
        navigation.navigate("Recipe", { recipeID });
    };

    return(
        <View style={ styles.mainView }>
            { myRecipes.length > 0 ? (
                <ListRecipes
                    recipes={ myRecipes }
                    showSaveIcon={ false }
                    refreshingState={ false }
                    onClickNavigation={ _navigateToRecipeDetails }
                    refreshRecipes={ null }
                    loadMoreRecipes={ null }
                />
            ) : (
                <DisplayError errorMessage="You didn't save any recipe yet"/>
            )}
        </View>
    );

};

const mapStateToProps = (state) => {
    return {
        myRecipes: state.recipes
    }
};

export default connect(mapStateToProps)(MyRecipes);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});
