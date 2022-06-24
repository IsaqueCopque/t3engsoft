import Login from "./Components/Login";

const Inst = () => {
    var auten = true;
    return(
        <div className="container">
        {
            auten? 
                <Login instV={false}/> 
                : 
                <p>Vc ja esta autenticado</p>
        }
        </div>
    )
};

export default Inst;