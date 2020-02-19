import React, {useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import IngredientFilter from './IngredientFilter';
import ListIngredients from './ListIngredients';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../../definitions/colors';

const AddIngredient = ({ initialSearchString, initialOrderByName, initialOrderByAisle }) => {
    const searchString = useRef(initialSearchString);
    const [sortByName, setSortByName] = useState(initialOrderByName);
    const [sortByAisle, setSortByAisle] = useState(initialOrderByAisle);
    const [ingredients, setIngredients] = useState([]);
    const [isRefreshing, setRefreshingState] = useState( false );
    const [isErrorDuringDataLoading, setErrorDataLoading] = useState( false );

    return (
        <View style={ styles.mainView }>
            <IngredientFilter
                onSortByName={ (val) => setSortByName(val)}
                onSortByAisle={ (val) => setSortByAisle(val)}
                onSearchStringUpdate={ (val) => searchString.current = val}
            />
            <ListIngredients
                ingredients={ ingredients }
                refreshingState={ isRefreshing }
                refreshIngredients={ _searchIngredients }
            />
            <Button
                title="Add new ingredient"
                icon={
                    <Icon
                        type="material"
                        name="add"
                        size={20}
                        color="white"
                    />
                }
                color={ colors.primary }
                buttonStyle={ styles.addIngredientButton}
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        list: state.ingredientReducer.list
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
