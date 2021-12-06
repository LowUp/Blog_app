import React, { useEffect, useState } from "react";

//components
import Article from "../Components/Article";

//redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPosts, getPosts } from "../actions/post.action";

const News = () =>{

    const [newsData, setNewsData] = useState([]);
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const data = useSelector((state) => state.postReducer);

    const dispatch = useDispatch();

      const getData = () =>
      {  
          const dataArray = Object.keys(data).map((i) => data[i]);
          setNewsData(dataArray);  
      } 

    const handleSubmit = async (event) =>{
        
        const information = {
            author,
            content: message,
            date: Date.now(),
        };
        
        event.preventDefault();
        
        if(message.length < 20)
        {
            setError(true);

        }
        else{

           await dispatch(addPosts(information));
            dispatch(getPosts());
            setAuthor("");
            setMessage("");
            getData();
            setError(false);

            }
    };

     useEffect(() =>{

         getData();

     }, [data])

    return(
        <div className="news-container">
            <h1>Blog</h1>

            <form onSubmit={(e) => handleSubmit(e)} >

                <input 
                type="text" 
                placeholder="Name" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} />
                
                <textarea 
                style={error ? {border : "1px solid red"} : {border : "1px solid #31dafb"}}
                placeholder="Message" 
                value={message} onChange={(e) => setMessage(e.target.value)}/>
                
                { error && <p>Needs at least 20 characters</p>}

                <input 
                type="submit" 
                value="Send"/>

            </form>

            <ul>
            {newsData
            .sort((a,b) => a.date < b.date ? 1 : -1)
            .map((article, index) =>(
                <Article 
                key={index} 
                message={article.content} 
                author={article.author === "" ? "Anonymous" : article.author} 
                date={article.date} 
                id={article.id}
                />
            ))} 
            </ul>

        </div>
    );
};

export default News;