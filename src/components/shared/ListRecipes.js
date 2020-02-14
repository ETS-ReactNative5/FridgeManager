import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import RecipeItem from './RecipeItem';

const ListRecipes = ( {recipes, refreshingState, onClickNavigation, refreshRecipes, loadMoreRecipes} ) => {

    return (
        <FlatList
            style={ styles.listRecipes }
            data={ recipes }
            keyExtractor={ (item) => item.id.toString() }
            renderItem={ ({item}) => <RecipeItem
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

export default ListRecipes;

const styles = StyleSheet.create({
    listRecipes: {
        flex: 1,
    },
});