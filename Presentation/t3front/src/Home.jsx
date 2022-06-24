import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {   
    return( 
    <div className={styles["wrapper"]}>

        <h1>Escolha o tipo de instituição</h1>

        <div className={styles["insts"]}>

        <Link to="/instEn">
        <div className={`${styles["inst"]} card`}>
            <h2>Instituição de Ensino</h2>
        </div>
        </Link>

        <Link to="/instVali">
        <div className={`${styles["valida"]} card`}>
            <h2>Instituição Validadora</h2>
        </div>
        </Link>

        </div>
    </div>
    )
};

export default Home;