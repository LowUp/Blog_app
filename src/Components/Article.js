import React, {useState} from "react";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = (props) =>{

    const {message,author,date,id} = props
    const [Editing, setEditing] = useState(false);
    const [editContent, setEditContent] = useState(message);
    const [error, setError] = useState(false);

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

    const handleEdit = () =>{

        const data = {
            author,
            content: editContent,
            date : Date.now(),
        }

        if(editContent.length < 20)
        {
            setError(true);
        }
        else
        {
            axios.put('http://localhost:3003/articles/' + id, data)
            .then(() =>{
            setEditing(false);
            setError(false);
            }); 
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
            defaultValue={editContent} 
            onChange={(e) => setEditContent(e.target.value)} />
            

         ):(
            <p>{editContent}</p>
             
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