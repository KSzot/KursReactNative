import React, {useContext} from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";
const CreateScreen = (props) => {

    const { addBlogPost } = useContext(Context);
    
    return <BlogPostForm onSubmit={(title,content) =>{
        addBlogPost(title, content, () => props.navigation.pop())
    }}/>
};

const styles = StyleSheet.create({})

export default CreateScreen;