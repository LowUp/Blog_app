import React from "react";

//redux
import { useDispatch } from "react-redux";
import { deletePosts, getPosts } from "../actions/post.action";


const DeleteArticle = (props) =>{

    const {id} = props;
    const dispatch = useDispatch();

    const handleDelete = async () =>{
       await dispatch(deletePosts(id));
       dispatch(getPosts());
        //window.location.reload();
    }

    return(
        <React.Fragment>

        <button onClick={() =>{
            if(window.confirm('Are you sure you want to delete this post ?'))
            {
                handleDelete();
            }
        }} >
        Delete
        </button>

        </React.Fragment>
    );
};

export default DeleteArticle;