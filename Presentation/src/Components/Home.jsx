import React from "react";
import HomeNoAuth from './HomeNoAuth';
import InstEnsino from './InstEnsino';
import InstValida from './InstValida';

const Home = ({token, setToken}) => {   
    if(!token.auth)
        return <HomeNoAuth setToken/>;
    else{
        if(token.inst)
            return <InstEnsino token={token} setToken={setToken}/>;
        else 
            return <InstValida token={token} setToken={setToken}/>;
    }
};

export default Home;