import React, { useState, useRef } from 'react';
import {View, TextInput, Text, Picker, StyleSheet, Keyboard, FlatList} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {colors} from '../../definitions/colors';
import {getRecipeByIngredients, searchRecipes} from '../../api/spoonacular';
import ListRecipes from './ListRecipes';
import {diets} from '../../api/diets';
import {cuisines} from '../../api/cuisines';
import {connect} from 'react-redux';
import DisplayError from '../shared/Error';

const Search = ({navigation, fridge}) => {
    const [recipes, setRecipes] = useState([]);
    const [isRefreshing, setRefreshingState] = useState(false);
    const [isErrorDuringDataLoading, setErrorDataLoading] = useState(false);
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [isSearchingByIngredients, setIsSearchingByIngredients] = useState(true);
    const [searchString, setSearchString] = useState('');
    const paginationData = useRef({currentOffset: 0, maxResults: 0});

    const _inputSearchStringChanged = (text) => {
        setSearchString(text);
    };

    const _loadRecipes = async (prevRecipes) => {
        setRefreshingState( true );
        setErrorDataLoading( false );
        setIsSearchingByIngredients(false);
        try {
            let apiSearchResult = (await searchRecipes(searchString, cuisine, diet, paginationData.current.currentOffset));
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

    const _refreshRecipes = () => {
        isSearchingByIngredients ? _searchRecipesByIngredients() : _searchRecipes();
    };

    const _searchRecipesByIngredients = async () => {
        setSearchString('');
        setDiet('');
        setCuisine('');
        setRefreshingState(true);
        setErrorDataLoading(false);
        setIsSearchingByIngredients(true);
        paginationData.current = { currentOffset: 0, maxResults: 0 };
        try {
            let apiSearchResult = await getRecipeByIngredients(fridge);
            setRecipes(apiSearchResult);
        } catch (error) {
            setRecipes([]);
            setErrorDataLoading(true);
        } finally {
            setRefreshingState(false);
        }
    };

    const _loadMoreRecipes = () => {
        if(!isSearchingByIngredients && paginationData.current.currentOffset < paginationData.current.maxResults ) {
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
                        onChangeText={ text => _inputSearchStringChanged( text ) }
                        onSubmitEditing={ _searchRecipes }
                        value={ searchString }
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
                        onPress={ _searchRecipesByIngredients }
                    />
                </View>
            </View>
            { isErrorDuringDataLoading ? (
                <DisplayError errorMessage='An error has occurred while fetching recipes'/>
            ) : (
                <ListRecipes
                    recipes={ recipes }
                    showSaveIcon={ true }
                    refreshingState={ isRefreshing }
                    onClickNavigation={ _navigateToRecipeDetails }
                    refreshRecipes={ _refreshRecipes }
                    loadMoreRecipes={ _loadMoreRecipes }
                />
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        fridge: state.ingredientReducer.fridge
    }
};

export default connect(mapStateToProps)(Search);

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
