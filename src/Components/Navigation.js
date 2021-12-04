import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () =>{

    return(
        <div className="navigation">

        <NavLink exact to="/" className={(navData) => navData.isActive ? "nav-active" : "" }>News</NavLink>
        <NavLink exact to="/about" className={(navData) => navData.isActive ? "nav-active" : "" }>About</NavLink>

        </div>
    );
};

export default Navigation;