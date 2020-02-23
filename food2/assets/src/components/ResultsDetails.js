import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ResultsList from "./ResultsList";

const ResultsDetails = ({result}) => {

    return (

        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: result.image_url}} />
            <Text style={styles.name}>{result.name}</Text>
            <Text>{result.rating} Stars, {result.review_count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 250,
        borderRadius: 4,
        height: 120,
        marginBottom: 5
    },
    name: {
        fontWeight: "bold",
    },
    container: {
        marginLeft: 15,
    }
});

export default ResultsDetails;