import React, {useState} from "react";

//components
import DeleteArticle from "./DeleteArticle";

//redux
import { useDispatch } from "react-redux";
import { editPosts, getPosts } from "../actions/post.action";

const Article = (props) =>{

    const {message,author,date,id} = props
    const [Editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(message);
    const [error, setError] = useState(false);
    
    const dispatch = useDispatch();

    const dateFormat = (date) =>{
        let newDate = new Date(date).toLocaleTimeString("en-EN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        });

        return newDate;
    }

    const handleEdit = async () =>{

        const data = {
            author,
            content: editContent,
            date : Date.now(),
            id
        }

        if(message.length < 20)
        {
            setError(true);
        }
        else
        {
            await dispatch(editPosts(data));
            dispatch(getPosts());
            setEditing(false);
            setError(false);
            console.log(editContent);
        }
          
    }

    return(
        <div className="article" style={{background : Editing ? "#f3feff" : "white"}} >
         <div className="card-header">

         <h3>{author}</h3>
         <em>{dateFormat(date)} </em>
         </div>

         {Editing ? (

            <textarea
            style={error ? {border:"1px solid red"} : {border:"1px solid black"}}
            autoFocus 
            defaultValue={message} 
            onChange={(e) => setEditContent(e.target.value)} />
            

         ):(
            <p>{message}</p>
             
         )}

         <div className="btn-container">

         {!Editing ? (
            <button onClick={() => setEditing(true)} >Edit</button>
         ) : (
            <button onClick={() => handleEdit()} >Validate</button>
         )}
             
             <DeleteArticle id={id}/>

         </div>
        </div>   
    );
};

export default Article;