import React, { useEffect, useState } from "react";
import axios from 'axios';
import Article from "../Components/Article";

const News = () =>{

    const [newsData, setNewsData] = useState([]);
    const [newsAsc, setNewsAsc] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    
    const [author, setAuthor] = useState("");
    const [message, setMessage] = useState("");

    const [error, setError] = useState(false);

    const getData = () =>{
        axios.get('http://localhost:3003/articles').then((res) => setNewsData(res.data));
    } 

    const handleSubmit = (event) =>{
        event.preventDefault();
        
        if(message.length < 20)
        {
            setError(true);

        }
        else{
        axios.post("http://localhost:3003/articles", {
            author: author.length === 0 ? "Anonymous" : author,
            content: message,
            date: Date.now(),
        }).then(() => {
            setAuthor("");
            setMessage("");
            getData();
            setError(false);
        });

            }
    };

    useEffect(() =>{ 
        
        if(playOnce) 
        {
            getData();
            setPlayOnce(false);
        }
        
        const AscendingOrder = () =>{ 
            setNewsAsc(newsData.sort((a,b) => a.date < b.date ? 1 : -1));
        };

        AscendingOrder();

    }, [newsData, playOnce]);

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
            {newsAsc.map((article) =>(
                <Article key={article.id} 
                message={article.content} 
                author={article.author} 
                date={article.date} 
                id={article.id}
                />
            ))} 
            </ul>

        </div>
    );
};

export default News;