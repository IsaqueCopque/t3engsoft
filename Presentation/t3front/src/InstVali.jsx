import Login from "./Components/Login";

const InstVali = () => {
    var auten = true;
    return(
        <div className="container">
        {
            auten? 
                <Login instV={true}/> 
                : 
                <p>Vc ja esta autenticado</p>
        }
        </div>
    )
};

export default InstVali;