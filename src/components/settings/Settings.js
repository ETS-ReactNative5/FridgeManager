import React from 'react';
import {View, Text, CheckBox, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../definitions/colors';
import { connect } from 'react-redux';

const Settings = ({settings, dispatch}) => {

    const _confirmClearData = () => {
        Alert.alert(
            'Clear data',
            'Are you sure? You will lose every saved items.',
            [
                {text: 'Cancel', style: 'cancel',
                },
                {text: 'Confirm', onPress: _clearData},
            ]
        );
    };

    const _clearData = async () => {
        dispatch( { type: 'CLEAR_DATA' });
    };

    const _switchAddToListWhenRemovedFromFridge = async () => {
        dispatch( { type: 'SWITCH_ADD_TO_LIST_WHEN_REMOVED_FROM_FRIDGE' });
    };

    const _switchRemoveFromListWhenAddedToFridge = async () => {
        dispatch( { type: 'SWITCH_REMOVE_FROM_LIST_WHEN_ADDED_TO_FRIDGE' });
    };

    return (
        <View style={ styles.mainView }>
            <View style={ styles.configurationView }>
                <Text style={ styles.titleText }>Configuration</Text>
                <View style={ styles.configLineView }>
                    <View style={ styles.configCheckBoxView }>
                        <CheckBox
                            value={settings.addToListWhenRemovedFromFridge}
                            onValueChange={ _switchAddToListWhenRemovedFromFridge }
                        />
                    </View>
                    <View style={ styles.configCheckTextView }><Text>Add ingredients removed from the fridge to the shopping list</Text></View>
                </View>
                <View style={ styles.configLineView }>
                    <View style={ styles.configCheckBoxView }>
                        <CheckBox
                            value={settings.removeFromListWhenAddedToFridge}
                            onValueChange={ _switchRemoveFromListWhenAddedToFridge }
                        />
                    </View>
                    <View style={ styles.configCheckTextView }><Text>When adding an ingredient to the fridge from the shopping list, remove it from the shopping list</Text></View>
                </View>
            </View>
            <View style={ styles.apiView }>
                <Text style={ styles.titleText }>API</Text>
                <View style={ styles.apiLineView }>
                    <Text>API credits remaining: </Text>
                    <Text style={{ fontWeight: 'bold'}}>147.8</Text>
                </View>
                <View style={ styles.apiLineView }>
                    <Text>Last update: </Text>
                    <Text style={{ fontWeight: 'bold'}}>14 November, 9:27 pm</Text>
                </View>
            </View>
            <View style={ styles.clearDataView }>
                <TouchableOpacity
                    onPress={ _confirmClearData }
                    style={ styles.touchableOpacity }
                >
                    <Icon type="material" name="delete-forever" size={30} color="white" iconStyle={ styles.icon } />
                    <Text style={ styles.buttonText }>Clear data</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const mapStateToProps = (state) => {
    return {
        settings: state.settingsReducer
    }
};

export default connect(mapStateToProps)(Settings);

const styles = StyleSheet.create({
    mainView: {
        flex: 4,
        alignItems: 'center',
        paddingTop: 20,
        paddingRight: 15,
        paddingLeft: 15
    },
    configurationView: {
        flex: 1,
        width: '100%'
    },
    apiView: {
        flex: 1,
        width: '100%'
    },
    clearDataView: {
        flex: 2,
        width: '100%',
        alignItems: 'center'
    },
    touchableOpacity: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: 50,
        width: 160,
        borderRadius: 5,
        margin: 15,
    },
    icon: {
        padding: 8,
        margin: 2,
        height: 45,
        width: 45,
    },
    buttonText: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
        fontSize: 20,
    },
    titleText: {
        color: colors.primary,
        fontSize: 21,
        fontWeight: 'bold'
    },
    configLineView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    configCheckBoxView: {
    },
    configCheckTextView: {
        flexShrink: 1
    },
    apiLineView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    }
});
