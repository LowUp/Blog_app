import axios from "axios";

const url = 'http://localhost:3003/articles';

export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const EDIT_POSTS = "EDIT_POSTS";
export const DELETE_POSTS = "DELETE_POSTS"

export const getPosts = () =>{

    return (dispatch) =>{
        return axios.get(url)
        .then((res) =>{
            dispatch({type: GET_POSTS, payload: res.data})
        })
        .catch((err) => console.log(err));
    };

};

export const addPosts = (data) =>{

    return (dispatch) =>{
        return axios.post(url + "/", {
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

export const editPosts = (data) =>{

    return (dispatch) =>{
        return axios.put(url + "/" + data.id, {...data})
        .then((res) =>{
            dispatch({type: EDIT_POSTS, payload: {...data}})
        })
        .catch((err) => console.log(err));
    };

};

export const deletePosts = (data_id) =>{

    return (dispatch) =>{
        return axios.delete(url + "/" + data_id)
        .then((res) =>{
            dispatch({type: DELETE_POSTS, payload: data_id})
        })
        .catch((err) => console.log(err));
    };

};