import React from 'react';
import {View, StyleSheet} from 'react-native';
import IngredientFilter from './shared/IngredientFilter';

const MyList = () => {
    return (
        <View style={ styles.mainView }>
            <IngredientFilter
                onSortByName={ (val) => console.log('sort by name: ' + val)}
                onSortByAisle={ (val) => console.log('sort by aisle: ' + val)}
                onSearchStringUpdate={ (searchString) => console.log('search string: ' + searchString)}
            />
        </View>
    );
};

export default MyList;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 15
    }
});
