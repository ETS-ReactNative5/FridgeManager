import React from 'react';
import {View, StyleSheet} from 'react-native';
import IngredientFilter from './shared/IngredientFilter';
import ListIngredients from './shared/ListIngredients';
import {connect} from 'react-redux';
import ListRecipes from '../recipes/ListRecipes';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../definitions/colors';

const MyList = ({ list }) => {
    return (
        <View style={ styles.mainView }>
            <IngredientFilter
                onSortByName={ (val) => console.log('sort by name: ' + val)}
                onSortByAisle={ (val) => console.log('sort by aisle: ' + val)}
                onSearchStringUpdate={ (searchString) => console.log('search string: ' + searchString)}
            />
            <ListIngredients
                ingredients={ list }
                refreshingState={ false }
                refreshIngredients={ null }
                source="list"
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

export default connect(mapStateToProps)(MyList);

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
