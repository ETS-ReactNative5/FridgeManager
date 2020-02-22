import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import ListIngredients from './shared/ListIngredients';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { colors } from '../../definitions/colors';

/**
 * Component that handles both MyFridge and MyList depending on the source and destination props
 *
 * @param fridge contains all the ingredients stored in the fridge
 * @param list contains all the ingredients stored in the shopping list
 * @param navigation
 * @param source: 'fridge'|'list' indicates whether the data comes from the fridge or the shopping list
 * @param destination: 'fridge'|'list' indicates whether the data should be sent when clicking on save buttons
 * @param dispatch
 */
const SavedIngredients = ({ fridge, list, navigation, source, destination, dispatch }) => {

    useEffect(() => {
        dispatch({ type: 'CLEAR_FILTER' });
    }, []);

    const _navigateToAddIngredient = () => {
        const component = `AddIngredientToMy${source.charAt(0).toUpperCase() + source.substr(1)}`;
        navigation.navigate(component);
    };

    return (
        <View style={ styles.mainView }>
            <ListIngredients
                ingredients={ source === 'fridge' ? fridge : list }
                refreshingState={ false }
                refreshIngredients={ null }
                onSearchStringUpdate={ null }
                source={ source }
                destination={ destination }
                canDelete={ true }
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
                buttonStyle={ styles.addIngredientButton }
                onPress={ _navigateToAddIngredient }
            />
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        fridge: state.ingredientReducer.fridge,
        list: state.ingredientReducer.list
    }
};

export default connect(mapStateToProps)(SavedIngredients);

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 15
    },
    addIngredientButton: {
        backgroundColor: colors.primary,
        width: '100%',
        height: 35,
        marginTop: 5,
        marginBottom: 5
    }
});
