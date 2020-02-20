import React from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import { getIngredientImageUri } from '../../../api/spoonacular';
import { colors } from '../../../definitions/colors';
import {connect} from 'react-redux';

const IngredientItem = ({ ingredient, source, destination, canDelete, list, fridge, dispatch }) => {

    const _isInFridge = () => {
        return fridge.findIndex(obj => obj.id === ingredient.id) !== -1;

    };

    const _isInList = () => {
        return list.findIndex(obj => obj.id === ingredient.id) !== -1;

    };

    const _save = async () => {
        const type = destination === 'fridge' ? 'ADD_TO_FRIDGE' : 'ADD_TO_LIST';
        dispatch({ type, value: ingredient });
    };

    const _delete = async () => {
        if (!canDelete) {
            return;
        }
        const type = source === 'fridge' ? 'REMOVE_FROM_FRIDGE' : 'REMOVE_FROM_LIST';
        dispatch({ type, value: ingredient });
    };

    const _displayAddTo = () => {

        const iconType = destination === 'fridge' ? 'material-community': 'ionicon';
        const iconName = destination === 'fridge' ? 'fridge-outline' : 'md-cart';
        const iconStyle = destination === 'fridge' ? styles.icon : styles.iconCart;
        const isSaved = destination === 'fridge' ? _isInFridge() : _isInList();

        if (isSaved) {
            return (
                // Using a disabled button instead of a view to match the layout of the button
                <Button
                    icon={
                        <Icon
                            type={ iconType }
                            name={ iconName }
                            size={27}
                            color={ colors.primary }
                            iconStyle={ iconStyle }
                        />
                    }
                    buttonStyle={ styles.activatedButton }
                    disabled={true}
                    disabledStyle={{backgroundColor: 'white'}}
                />
            );
        } else {
            return (
                <Button
                    icon={
                        <Icon
                            type={ iconType }
                            name={ iconName }
                            size={27}
                            color="white"
                            iconStyle={ iconStyle }
                        />
                    }
                    onPress={ _save }
                    buttonStyle={ styles.button }
                />
            );
        }
    };

    const _displayDelete = () => {
        if (!canDelete) {
            return null
        }
        return (
            <Button
                icon={
                    <Icon
                        type="material"
                        name="delete-forever"
                        size={27}
                        color="white"
                        iconStyle={ styles.icon }
                    />
                }
                onPress={ _delete }
                buttonStyle={ styles.button }
            />
        );
    };

    return (
        <View style={ styles.mainView }>
            <View style={ styles.imageView }>
                <Image style={ styles.ingredientImage }
                       source={{ uri: getIngredientImageUri(ingredient.image) }}
                       resizeMode="contain"
                />
            </View>
            <View style={ styles.textView }>
                <Text style={ styles.ingredientNameText }>
                    { ingredient.name.charAt(0).toUpperCase() + ingredient.name.substr(1)}
                </Text>
            </View>
            <View style={ styles.buttonsView }>
                { _displayAddTo() }
                { _displayDelete() }
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        fridge: state.ingredientReducer.fridge,
        list: state.ingredientReducer.list,
    }
};

export default connect(mapStateToProps)(IngredientItem);

const styles = StyleSheet.create({
    mainView: {
        flex: 300,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 10,
        borderBottomWidth : 3.0,
        borderColor: colors.primary,
        borderRadius: 1
    },
    imageView: {
        flex: 84,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        flex: 126
    },
    buttonsView: {
        flex: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 5
    },
    ingredientImage: {
        height: 85,
        width: 85
    },
    ingredientNameText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    icon: {
        padding: 8,
        margin: 2,
        height: 45,
        width: 45,
    },
    iconCart: {
        padding: 8,
        paddingLeft: 11,
        margin: 2,
        height: 45,
        width: 45,
    },
    button: {
        backgroundColor: colors.secondary,
        width: 40,
        height: 32,
        margin: 5
    },
    activatedButton: {
        backgroundColor: 'white',
        width: 40,
        height: 32,
        margin: 5
    }
});
