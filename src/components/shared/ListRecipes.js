import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import RecipeItem from './RecipeItem';

const ListRecipes = ( {recipes, showSaveIcon, refreshingState, myRecipes, onClickNavigation, refreshRecipes, loadMoreRecipes} ) => {

    const _isItSaved = ( recipeID ) => {
        return myRecipes.findIndex(obj => obj.id === recipeID) !== -1;

    };
    
    return (
        <FlatList
            style={ styles.listRecipes }
            contentContainerStyle={{ paddingBottom:15 }}
            data={ recipes }
            keyExtractor={ (item) => item.id.toString() }
            extraData={ myRecipes }
            renderItem={ ({item}) => <RecipeItem
                isSaved={ _isItSaved(item.id) }
                showSavedIcon={ showSaveIcon }
                recipe={ item }
                onClickOnMe={ onClickNavigation }
            /> }
            onRefresh={ refreshRecipes }
            refreshing={ refreshingState }
            onEndReached={ loadMoreRecipes }
            onEndReachedThreshold={ 0.5 }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        myRecipes: state.recipes
    }
};

export default connect(mapStateToProps)(ListRecipes);

const styles = StyleSheet.create({
    listRecipes: {
        flex: 1,
    },
});
