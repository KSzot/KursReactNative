import React,{useState} from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const BlogPostForm = ({onSubmit, initialValue}) => {
    const [title, setTitle] = useState(initialValue.title);
    const [content, setContent] = useState(initialValue.content);

    return (
        <View>
            <Text>Enter title:</Text>
            <TextInput 
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <Text>Enter Content:</Text>
            <TextInput
            value={content}
            onChangeText={(text => setContent(text))} 
            />
            <Button 
            onPress ={() => onSubmit(title, content)}
            title="Save Blog Post" />
        </View>
    );
};

BlogPostForm.defaultProps = {
    initialValue: {
        title: '',
        contnet: ''
    }
}
const styles = StyleSheet.create({

});

export default BlogPostForm;