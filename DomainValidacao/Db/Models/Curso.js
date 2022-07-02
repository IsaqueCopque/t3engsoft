//Abstração do modelo do DomainValidador
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8083/cursos" });

const getCurso = async(emec) => {
    const res = await api.get(`/emec/${emec}`);
    if(res.status !== 200) throw res.data.error;
    return res.data;
};

export default getCurso;