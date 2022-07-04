import React from 'react';
import Header from './Components/Header';
import Workspace from './Components/Workspace';

const Home = ({cookies, removeCookie, api}) => {

    const [op, setOp] = React.useState(0);
    return(
        <React.Fragment>
            <Header  cargo={cookies.cargo} removeCookie={removeCookie} setOp={setOp} />
            <Workspace cookies={cookies} op={op} api={api}/>
        </React.Fragment>
    )
};

export default Home;
