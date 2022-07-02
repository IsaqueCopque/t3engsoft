import React from 'react';
import LoginPanel from './Components/LoginPanel';
import RegisterPanel from './Components/RegisterPanel';

const Login = ({setCookie, api}) => {

    const [login, setLogin] = React.useState(true);

    const Panel = () => {
        if(login)
            return <LoginPanel setLogin={setLogin} setCookie={setCookie} api={api}/>;
        else return <RegisterPanel setLogin={setLogin} setCookie={setCookie} api={api}/>;
    }

    return <Panel />;
};

export default Login;