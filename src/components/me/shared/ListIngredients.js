import React from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import { connect } from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {colors} from '../../../definitions/colors';
import IngredientItem from './IngredientItem';

const ListIngredients = ({ ingredients, refreshingState, refreshIngredients, onSearchStringUpdate, source, destination, canDelete, fridge, list, filters, dispatch }) => {

    const _inputSearchStringChanged = (text) => {
        dispatch({ type: 'SET_SEARCH_STRING', value: text });

        if (onSearchStringUpdate !== null) {
            onSearchStringUpdate(text);
        }
    };

    const _pressSortByName = () => {
        dispatch({ type: 'SORT_BY_NAME' });
    };

    const _pressSortByAisle = () => {
        dispatch({ type: 'SORT_BY_AISLE' });
    };


    const _filteredIngredients = () => {
        return onSearchStringUpdate === null ? ingredients.filter(ingredient => ingredient.name.includes(filters.searchString.toLowerCase())) : ingredients;
    };

    const _sortedIngredients = () => {
        if (filters.sortByName) {
            return _filteredIngredients().sort((a, b) => a.name.localeCompare(b.name, 'en-US'));
        } else if (filters.sortByAisle) {
            return _filteredIngredients().sort((a, b) => a.aisle ? a.aisle.localeCompare(b.aisle, 'en-US') : -1);
        }
    };
    
    return (
        <View style={ styles.mainView }>
            <View style={ styles.headerView }>
                <View style={ styles.row }>
                    <TextInput
                        placeholder='Ingredient name'
                        style={ styles.searchField }
                        value={ filters.searchString }
                        onChangeText={ text => _inputSearchStringChanged(text) }
                    />
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.sortByText }>Sort by:</Text>
                    <CheckBox
                        title='Name'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={ filters.sortByName }
                        onPress={ _pressSortByName }
                        containerStyle={ styles.radioButton }
                        textStyle={ styles.radioButtonText }
                        checkedColor={ colors.secondary }
                        uncheckedColor={ colors.secondary }
                        size={20}
                    />
                    <CheckBox
                        title='Aisle'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={ filters.sortByAisle }
                        onPress={ _pressSortByAisle }
                        containerStyle={ styles.radioButton }
                        textStyle={ styles.radioButtonText }
                        checkedColor={ colors.secondary }
                        uncheckedColor={ colors.secondary }
                        size={20}
                    />
                </View>
            </View>
            <FlatList
                style={ styles.listIngredients }
                contentContainerStyle={{ paddingBottom:15 }}
                data={ _sortedIngredients() }
                keyExtractor={ (item) => item.id.toString() }
                extraData={ [fridge, list] }
                renderItem={ ({item}) =>
                    <IngredientItem
                        ingredient={ item }
                        source={ source }
                        destination={ destination }
                        canDelete={ canDelete }
                    />
                }
                onRefresh={ refreshIngredients }
                refreshing={ refreshingState }
                onEndReachedThreshold={ 0.5 }
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        fridge: state.ingredientReducer.fridge,
        list: state.ingredientReducer.list,
        filters: state.ingredientFilterReducer
    }
};

export default connect(mapStateToProps)(ListIngredients);

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5,
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '100%',
        justifyContent: 'flex-start',
    },
    searchField: {
        height: 35,
        width: '100%',
        borderBottomWidth : 1.0,
        borderColor: colors.primary,
        marginBottom: 6
    },
    sortByText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.secondary,
        marginRight: 15
    },
    radioButton: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin: 0,
        marginLeft: 0,
        marginRight: 15,
        padding: 0
    },
    radioButtonText: {
        fontWeight: 'normal',
        marginLeft: 0,
        marginRight: 0,
    },
    listIngredients: {
        flex: 1,
    },
});
