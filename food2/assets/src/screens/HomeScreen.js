import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const HomeScreen = () => {

    
    const[term, setTerm] = useState("");
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        //price === "$" || 
        return results.filter(result => {
            return result.price === price;
        });
    };

    return (

        <View style={styles.background}>
            <SearchBar 
                term={term}
                onTermChange={setTerm} //to sa funkcje
                onTermSubmit = { () => searchApi(term) }   
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <ResultsList 
                title="Cost Effective"
                results = {filterResultsByPrice("$")}
                />
                <ResultsList 
                title="Bit Pricier" 
                results = {filterResultsByPrice("$$")}
                />
                <ResultsList 
                title="Big Spender"
                results = {filterResultsByPrice("$$$")}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#fff",
        flex: 1
    }
});

export default HomeScreen;