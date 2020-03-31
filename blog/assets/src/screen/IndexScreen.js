import React, { useContext, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";


const IndexScreen = (props) => {
    console.log(props);
    const {state, deleteBlogPost, getBlogPost } = useContext(Context);

    useEffect (() => {
        getBlogPost();

        const listener = props.navigation.addListener('didFocus', () => {
            getBlogPost();
        })

        return () => {
            listener.remove();
        }

    }, [])
    return (
        //skrocony zapis onPress={addBlogPost} - referencja do funkcji
        <View>
        <FlatList 
            data= {state}
            keyExtractor = {(blogPost) => blogPost.title}
            renderItem={({item}) => {
                return (
                    <TouchableOpacity onPress={() => props.navigation.navigate("Show", {id: item.id})}>
                        <View style={styles.row}>
                            <Text
                            style={styles.title}
                            >{item.title} - {item.id}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <Feather 
                                name="trash"
                                style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
        </View>
    );
};

IndexScreen.navigationOptions = (props) => { 

    return {
        headerRight: () => (<TouchableOpacity onPress={() => props.navigation.navigate("Create")}><Feather name="plus" size={30}/></TouchableOpacity>)
    };
};

const styles= StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    title: {
        fontSize: 18
    },
    icon: {
        fontSize: 24
    }
});

export default IndexScreen;