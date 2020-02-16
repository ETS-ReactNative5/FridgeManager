import React, { useState, useRef } from 'react';
import {View, TextInput, Text, Picker, StyleSheet, Keyboard, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {colors} from '../../definitions/colors';
import {searchRecipes} from '../../api/spoonacular';
import ListRecipes from '../shared/ListRecipes';
import {diets} from '../../api/diets';
import {cuisines} from '../../api/cuisines';

const Search = ({navigation}) => {
    const [recipes, setRecipes] = useState([]);
    const [isRefreshing, setRefreshingState] = useState( false );
    const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );
    const [diet, setDiet] = useState( '' );
    const [cuisine, setCuisine] = useState( '' );
    const searchTerm = useRef("");
    const paginationData = useRef( {currentOffset: 0, maxResults: 0} );

    const _inputSearchTermChanged = (text) => {
        searchTerm.current = text;
    };

    const _loadRecipes = async (prevRecipes) => {
        setRefreshingState( true );
        setErrorDataLoading( false );
        try {
            let apiSearchResult = (await searchRecipes(searchTerm.current, cuisine, diet, paginationData.current.currentOffset));
            paginationData.current = { currentOffset: paginationData.current.currentOffset + apiSearchResult.number, maxResults: apiSearchResult.totalResults };
            setRecipes( [...prevRecipes, ...apiSearchResult.results] );
        } catch (error) {
            paginationData.current = { currentOffset: 0, maxResults: 0 };
            setRecipes( [] );
            setErrorDataLoading( true );
        } finally {
            setRefreshingState( false );
        }
    };

    const _searchRecipes = () => {
        paginationData.current = { currentOffset: 0, maxResults: 0 };
        _loadRecipes([]);
    };

    const _loadMoreRecipes = () => {
        if( paginationData.current.currentOffset < paginationData.current.maxResults ) {
            _loadRecipes(recipes);
        }
    };

    const _navigateToRecipeDetails = (recipeID) => {
        navigation.navigate("Recipe", { recipeID });
    };

    return (
        <View style={ styles.mainView }>
            <View style={ styles.headerView }>
                <View style={ styles.rowSpaceBetween }>
                    <TextInput
                        placeholder='Recipe name'
                        style={ styles.searchField }
                        onChangeText={ text => _inputSearchTermChanged( text ) }
                        onSubmitEditing={ _searchRecipes }
                    />
                    <Button
                        icon={
                            <Icon
                                type="ionicon"
                                name="md-search"
                                size={20}
                                color="white"
                            />
                        }
                        onPress={ () => { _searchRecipes(); Keyboard.dismiss() } }
                        buttonStyle={ styles.searchButton }
                    />
                </View>
                <View style={ styles.rowSpaceBetween }>
                    <Picker
                      mode="dropdown"
                      itemStyle={styles.itemStyle}
                      selectedValue={ diet }
                      style={ styles.picker }
                      onValueChange={ (itemValue) => setDiet(itemValue) }
                    >
                        <Picker.Item label="Diet?" value="" />
                        { diets.map(diet => <Picker.Item key={diet} label={diet} value={diet} />) }
                    </Picker>
                    <Picker
                        mode="dropdown"
                        itemStyle={styles.itemStyle}
                        selectedValue={ cuisine }
                        style={ styles.picker }
                        onValueChange={ (itemValue) => setCuisine(itemValue) }
                    >
                        <Picker.Item label="Cuisine?" value="" />
                        { cuisines.map(cuisine => <Picker.Item key={cuisine} label={cuisine} value={cuisine} />) }
                    </Picker>
                </View>
                <View style={ styles.rowCenter }>
                    <Text style={{ fontStyle: 'italic'}}>OR</Text>
                </View>
                <View style={ styles.rowCenter }>
                    <Button
                        title="What can I cook today?"
                        color={ colors.primary }
                        buttonStyle={ styles.whatCanICookButton}
                        style={ styles.searchButton }
                    />
                </View>
            </View>
            <ListRecipes
                recipes={ recipes }
                showSaveIcon={ true }
                refreshingState={ isRefreshing }
                onClickNavigation={ _navigateToRecipeDetails }
                refreshRecipes={ _searchRecipes }
                loadMoreRecipes={ _loadMoreRecipes }
            />
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5,
        marginBottom: 5
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '98%',
        justifyContent: 'center',
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 1,
        width: '98%',
        justifyContent: 'space-between',
    },
    searchField: {
        padding: 5,
        height: 45,
        width: '90%',
        borderBottomWidth : 1.0,
        borderColor: colors.primary,
        marginBottom: 5
    },
    searchButton: {
        backgroundColor: colors.primary,
        width: 30,
        height: 30,
    },
    whatCanICookButton: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 30,
    },
    picker: {
        height: 35,
        width: '45%',
        backgroundColor: colors.secondary,
        color: 'white',
        marginHorizontal: 5,
        textAlign: 'center'
    },
    pickerItemStyle: {
        fontSize: 15,
        height: 75,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listRecipes: {
        flex: 1,
    }
});
