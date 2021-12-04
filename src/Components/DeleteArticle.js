import React from "react";
import axios from "axios";


const DeleteArticle = (props) =>{

    const {id} = props;

    const handleDelete = () =>{
        axios.delete('http://localhost:3003/articles/' + id)
        .then(() => window.location.reload());
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