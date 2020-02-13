import React from 'react';
import { View, TextInput, Text, Picker, StyleSheet, Keyboard } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {colors} from '../../definitions/colors';

const Search = () => {
    return (
        <View style={ styles.mainView }>
            <View style={ styles.headerView }>
                <View style={ styles.rowSpaceBetween }>
                    <TextInput
                        placeholder='Recipe name'
                        style={ styles.searchField }
                        onChangeText={ text => console.log( text ) }
                        onSubmitEditing={ console.log("sumbit") }
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
                        onPress={ () => { console.log("search"); Keyboard.dismiss() } }
                        buttonStyle={ styles.searchButton }
                    />
                </View>
                <View style={ styles.rowSpaceBetween }>
                    <Picker
                      mode="dropdown"
                      itemStyle={styles.itemStyle}
                      selectedValue=""
                      style={ styles.picker }
                    >
                        <Picker.Item label="Diet?" value="" />
                        <Picker.Item label="Vegan" value="vegan" />
                        <Picker.Item label="Halal" value="halal" />
                    </Picker>
                    <Picker
                        mode="dropdown"
                        itemStyle={styles.itemStyle}
                        selectedValue=""
                        prompt="Cuisine"
                        style={ styles.picker }
                    >
                        <Picker.Item label="Cuisine?" value="" />
                        <Picker.Item label="Chinese" value="chinese" />
                        <Picker.Item label="Japanese" value="japanese" />
                        <Picker.Item label="French" value="french" />
                        <Picker.Item label="Italian" value="italian" />
                    </Picker>
                </View>
                <View style={ styles.rowCenter }>
                    <Text>OR</Text>
                </View>
                <View style={ styles.rowCenter }>
                    <Button
                        title="What can I cook today?"
                        color={ colors.mainOrangeColor }
                        buttonStyle={ styles.whatCanICookButton}
                        style={ styles.searchButton }
                    />
                </View>
            </View>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({
    mainView: {
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 5
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
        borderColor: colors.mainOrangeColor,
        marginBottom: 5
    },
    searchButton: {
        backgroundColor: colors.mainOrangeColor,
        width: 30,
        height: 30,
    },
    whatCanICookButton: {
        backgroundColor: colors.mainOrangeColor,
        width: '100%',
        height: 30,
    },
    picker: {
        height: 35,
        width: '45%',
        backgroundColor: '#535353',
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
    }
});
