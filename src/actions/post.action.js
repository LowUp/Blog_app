import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";

export const getPosts = () =>{

    return (dispatch) =>{
        return axios.get('http://localhost:3003/articles/')
        .then((res) =>{
            dispatch({type: GET_POSTS, payload: res.data})
        })
        .catch((err) => console.log(err));
    };

};

export const addPosts = (data) =>{

    return (dispatch) =>{
        return axios.post('http://localhost:3003/articles/', {
            author: data.author.length === 0 ? "Anonymous" : data.author,
            content: data.content,
            date: data.date,
        })
        .then((res) =>{
            dispatch({type: ADD_POSTS, payload: data})
        })
        .catch((err) => console.log(err));
    };

};