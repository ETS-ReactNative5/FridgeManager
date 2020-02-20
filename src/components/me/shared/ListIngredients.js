import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import { connect } from 'react-redux';
import {CheckBox} from 'react-native-elements';
import {colors} from '../../../definitions/colors';

const ListIngredients = ({ ingredients, refreshingState, refreshIngredients, onSearchStringUpdate, source, fridge, list }) => {

    const searchString = useRef("");
    const [sortByName, setSortByName] = useState(true);
    const [sortByAisle, setSortByAisle] = useState(false);

    const _inputSearchStringChanged = (text) => {
        searchString.current = text;
        onSearchStringUpdate(text);
    };

    const _pressSortByName = () => {
        const newState = !sortByName;
        setSortByName(newState);
        setSortByAisle(!newState);
    };

    const _pressSortByAisle = () => {
        const newState = !sortByAisle;
        setSortByAisle(newState);
        setSortByName(!newState);
    };

    const _isInFridge = (ingredientID) => {
        return fridge.findIndex(obj => obj.id === ingredientID) !== -1;

    };

    const _isInList = (ingredientID) => {
        return list.findIndex(obj => obj.id === ingredientID) !== -1;

    };
    
    return (
        <View style={ styles.mainView }>
            <View style={ styles.headerView }>
                <View style={ styles.row }>
                    <TextInput
                        placeholder='Ingredient name'
                        style={ styles.searchField }
                        onChangeText={ text => _inputSearchStringChanged(text) }
                    />
                </View>
                <View style={ styles.row }>
                    <Text style={ styles.sortByText }>Sort by:</Text>
                    <CheckBox
                        title='Name'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={sortByName}
                        onPress={_pressSortByName}
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
                        checked={sortByAisle}
                        onPress={_pressSortByAisle}
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
                data={ ingredients }
                keyExtractor={ (item) => item.id }
                extraData={ [fridge, list] }
                renderItem={ ({item}) => <Text>{item.name}</Text> }
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
        marginBottom: 5
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
        marginLeft: 0,
        marginRight: 0,
    },
    listIngredients: {
        flex: 1,
    },
});
