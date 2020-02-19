import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

const ListIngredients = ({ ingredients, refreshingState, refreshIngredients, source, fridge, list }) => {

    const _isInFridge = (ingredientID) => {
        return fridge.findIndex(obj => obj.id === ingredientID) !== -1;

    };

    const _isInList = (ingredientID) => {
        return list.findIndex(obj => obj.id === ingredientID) !== -1;

    };
    
    return (
        <FlatList
            style={ styles.listIngredients }
            contentContainerStyle={{ paddingBottom:15 }}
            data={ ingredients }
            keyExtractor={ (item) => item.id.toString() }
            extraData={ [fridge, list] }
            renderItem={ ({item}) => <Text>{item.name}</Text> }
            onRefresh={ refreshIngredients }
            refreshing={ refreshingState }
            onEndReachedThreshold={ 0.5 }
        />
    );
};

const mapStateToProps = (state) => {
    return {
        fridge: state.ingredientReducer.fridge,
        list: state.ingredientReducer.list,
    }
};

export default connect(mapStateToProps)(ListIngredients);

const styles = StyleSheet.create({
    listIngredients: {
        flex: 1,
    },
});
