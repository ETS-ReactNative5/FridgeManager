import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListIngredients from './shared/ListIngredients';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../definitions/colors';

const MyFridge = ({fridge, navigation}) => {

    const _navigateToAddIngredient = () => {
        navigation.navigate("AddIngredient", { destination: 'fridge' });
    };

    return (
        <View style={ styles.mainView }>
            <ListIngredients
                ingredients={ fridge }
                refreshingState={ false }
                refreshIngredients={ null }
                source="fridge"
                destination="list"
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
        fridge: state.ingredientReducer.fridge
    }
};

export default connect(mapStateToProps)(MyFridge);

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
