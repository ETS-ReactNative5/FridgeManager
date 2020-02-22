import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ListIngredients from './ListIngredients';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../definitions/colors';
import {ingredientsAutocomplete, searchRecipes} from '../../api/spoonacular';
import DisplayError from '../shared/Error';

const AddIngredient = ({ initialSearchString, navigation }) => {
    const searchString = useRef(initialSearchString);
    const [ingredients, setIngredients] = useState([]);
    const [isRefreshing, setRefreshingState] = useState( false );
    const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );

    useEffect(() => {
        if (initialSearchString !== '') {
            _searchIngredients();
        }
    }, []);

    const _searchIngredients = async () => {
        setRefreshingState( true );
        setErrorDataLoading( false );
        try {
            let apiResult = (await ingredientsAutocomplete(searchString.current));
            setIngredients(apiResult);
        } catch (error) {
            setIngredients([]);
            setErrorDataLoading( true );
        } finally {
            setRefreshingState( false );
        }
    };

    const _onSearchStringUpdate = async (val) => {
        searchString.current = val;
        await _searchIngredients();
    };

    return (
        <View style={ styles.mainView }>
            { isErrorDuringDataLoading ? (
                <DisplayError errorMessage='An error has occurred while fetching ingredients'/>
            ) : (
                <ListIngredients
                    ingredients={ ingredients }
                    refreshingState={ isRefreshing }
                    refreshIngredients={ _searchIngredients }
                    onSearchStringUpdate={ (val) => _onSearchStringUpdate(val)}
                    source={ null }
                    destination={ navigation.getParam('destination') }
                    canDelete={ false }
                />
            )}
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        list: state.ingredientReducer.list,
        initialSearchString: state.ingredientFilterReducer.searchString
    }
};

export default connect(mapStateToProps)(AddIngredient);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 15
    },
    addIngredientButton: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 30,
    }
});
