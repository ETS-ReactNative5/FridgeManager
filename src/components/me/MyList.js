import React from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import ListIngredients from './shared/ListIngredients';
import {connect} from 'react-redux';
import {Button, Icon} from 'react-native-elements';
import {colors} from '../../definitions/colors';

const MyList = ({list, navigation}) => {

    const _navigateToAddIngredient = () => {
        navigation.navigate("AddIngredient");
    };

    return (
        <View style={ styles.mainView }>
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
                buttonStyle={ styles.addIngredientButton }
                onPress={ _navigateToAddIngredient }
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
        height: 35,
        marginTop: 5,
        marginBottom: 5
    }
});
