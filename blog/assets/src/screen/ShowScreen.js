import React, {useContext} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Context } from "../context/BlogContext";
import { EvilIcons } from "@expo/vector-icons";


const ShowScreen = (props) => {
    // moge tez użyć (navigation) i skrocić zapis
    //pobiermy parametr, "" bo przekazujemy jako string
    //console.log(props.navigation.getParam("id"));
    //console.log(props);

    const  { state } = useContext(Context);

    //create function to show array
    const blogPost = state.find((blogPost) =>
        blogPost.id === props.navigation.getParam("id"));
 
    return (
        <View>
            <Text>{blogPost.title}</Text>
            <Text>{blogPost.content}</Text>
        </View>
    );
};

ShowScreen.navigationOptions = (props) =>{
    return{
        headerRight: () => (<TouchableOpacity onPress={() => props.navigation.navigate("Edit", { id: props.navigation.getParam("id")})}><EvilIcons name="pencil" size={30}/></TouchableOpacity>)
    };
};
const styles = StyleSheet.create({})

export default ShowScreen;