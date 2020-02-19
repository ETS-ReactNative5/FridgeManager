import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { colors } from '../../../definitions/colors';

const IngredientFilter = ({ onSortByName, onSortByAisle, onSearchStringUpdate }) => {

    const searchTerm = useRef("");
    const [sortByName, setSortByName] = useState(true);
    const [sortByAisle, setSortByAisle] = useState(false);

    const _inputSearchTermChanged = (text) => {
        searchTerm.current = text;
        onSearchStringUpdate(text);
    };

    const _pressSortByName = () => {
        const newState = !sortByName;
        setSortByName(newState);
        setSortByAisle(!newState);
        onSortByName(newState);
    };

    const _pressSortByAisle = () => {
        const newState = !sortByAisle;
        setSortByAisle(newState);
        setSortByName(!newState);
        onSortByAisle(newState);
    };

    return (
        <View style={ styles.headerView }>
            <View style={ styles.row }>
                <TextInput
                    placeholder='Ingredient name'
                    style={ styles.searchField }
                    onChangeText={ text => _inputSearchTermChanged(text) }
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
                    checkedColor={ colors.secondary }
                    uncheckedColor={ colors.secondary }
                />
                <CheckBox
                    title='Aisle'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={sortByAisle}
                    onPress={_pressSortByAisle}
                    containerStyle={ styles.radioButton }
                    checkedColor={ colors.secondary }
                    uncheckedColor={ colors.secondary }
                />
            </View>
        </View>
    );
};

export default IngredientFilter;

const styles = StyleSheet.create({
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
        padding: 5,
        height: 45,
        width: '100%',
        borderBottomWidth : 1.0,
        borderColor: colors.primary,
        marginBottom: 5
    },
    sortByText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.secondary
    },
    radioButton: {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    }
});