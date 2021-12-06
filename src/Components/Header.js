import React from "react";

//import pages
import News from "../Pages/News";
import About from "../Pages/About";
import Error from "../Pages/Error";

//import components
import Navigation from "./Navigation";
import Logo from "./logo";

//Navigation
import {
    BrowserRouter,
    Route,
    Routes,
  } from "react-router-dom";


const Header = () =>{

    return(
        <BrowserRouter>
        <Logo/>
        <Navigation/>
        <Routes>

        <Route path="/" element={<News key={1}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="*" element={<Error/>}/>

        </Routes>
        </BrowserRouter>
    );
}; 

export default Header;