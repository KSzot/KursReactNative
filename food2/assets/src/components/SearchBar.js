import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
    return (

        <View style={styles.background}>
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput
                autoCapitalize = "none"
                autoCorrect = {false} 
                placeholder="Search"
                style={styles.inputStyle}
                value = {props.term}
                onChangeText ={props.onTermChange}
                onEndEditing = {props.onTermSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#F0EEEE",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 15,
        flexDirection: "row",
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18
    },
    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 10
    }
});

export default SearchBar;