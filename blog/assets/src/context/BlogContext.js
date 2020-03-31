/* import React, { useState } from "react";

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogPosts, setBlogPosts] = useState([]);

    const addBlogPost = () => {
        setBlogPosts([...blogPosts, { title: `Blog Post #${blogPosts.length + 1}`}]);
    };
    return <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
        {children}
    </BlogContext.Provider>
};

export default BlogContext; */
//To jedna opcja ale teraz zrobimy 2
//Bardziej zoptymalizowana
//No jednak mozna jeszcze lepiej tworzac
//createDataContext
/*
import React, { useReducer } from "react";
//import createDataContext from "./createDataContext";

const BlogContext = React.createContext();

const blogReducer = (state, action) => { //state == blogPosts
    switch (action.type) {
        case "add_blogpost":
            return [...state, { title: `Blog Post # ${state.length + 1}`}];
        default:
            return state;
        
    }

};


export const BlogProvider = ({ children }) => {
    const [blogPosts, dispatch] = useReducer(blogReducer, []);

    const addBlogPost = () => {
        dispatch({ type: "add_blogpost"});
    };
    return <BlogContext.Provider value={{ data: blogPosts, addBlogPost}}>
        {children}
    </BlogContext.Provider>
};

export default BlogContext;*/

import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => { //state == blogPosts
    switch (action.type) {

        case 'get_blogposts':
            return action.payload;

        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload: blogPost }); 

        case "delete_blogpost":
            return state.filter((blogPost) =>  blogPost.id !== action.payload);

            /*
        case "add_blogpost":
            return [...state, { 
                id: Math.floor(Math.random() * 9999),
                title: `Blog Post # ${state.length + 1}`}];
                */ //Pierwsza werjsa

                case "add_blogpost":
                    return [...state, { 
                        id: Math.floor(Math.random() * 9999),
                        title: action.payload.title,
                        content: action.payload.content
                    }];

        default:
            return state;
        
    }

};
/*
const addBlogPost = (dispatch) => {
    return () => {
        dispatch({ type: "add_blogpost"});
    };
}; Pierwsza werja dodaje na ekranie */

const getBlogPost = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');
        //response.data === [ {},{},{}]

        dispatch({type: 'get_blogposts', payload: response.data});
    }
}

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        
        await jsonServer.post('/blogposts',{title, content});
      
        if(callback)
            callback();
        // dispatch({ type: "add_blogpost",
        // payload: {title: title, content: content} });
        // //jak klucz i wartosc taka sama nazwa nie musze podawac dwa razy
        // if(callback)
        //     callback();
        //bez APi

    };
};
const deleteBlogPost = (dispatch) => {
    return async(id) => {

        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: "delete_blogpost", payload: id})
    }
}

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title, content});
        dispatch({ type: 'edit_blogpost',
    payload: { id, title, content }})
    if(callback)
        callback();
    };
};

export const { Context, Provider } = createDataContext(blogReducer, { addBlogPost, deleteBlogPost, editBlogPost, getBlogPost },[]);