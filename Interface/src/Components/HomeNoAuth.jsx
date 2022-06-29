import { Link } from "react-router-dom";
import styles from "./HomeNoAuth.module.css";

const noAuth = () => (
    <div className={styles["wrapper"]}>

        <h1>Escolha o tipo de instituição</h1>

        <div className={styles["insts"]}>

        <Link to="/login/ensino">
            <div className={`${styles["inst"]} card`}>
                <h2>Instituição de Ensino</h2>
            </div>
        </Link>

        <Link to="/login/validacao">
            <div className={`${styles["valida"]} card`}>
                <h2>Instituição Validadora</h2>
            </div>
        </Link>

        </div>
    </div>
);

export default noAuth;