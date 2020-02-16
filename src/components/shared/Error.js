import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { assets } from '../../definitions/assets';
import { colors } from '../../definitions/colors';

const DisplayError = ( {errorMessage} ) => {
    return (
        <View style={ styles.mainView }>
            <Image style={ styles.errorImage }
                   source={ assets.errorIcon } />
            <Text style={ styles.errorText }>
                { errorMessage }
            </Text>
        </View>
    );
};

export default DisplayError;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorImage: {
        width: 100,
        height: 100,
        tintColor: colors.primary,
        marginBottom: 30,
    },
    errorText: {
        fontSize: 19,
        fontStyle:'italic',
        textAlign: 'center',
        marginBottom: 100,
    },
});
