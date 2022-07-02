//Abstração do modelo do DomainValidador
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8083/cursos" });

class Curso{

    static async get(instid){
        const cursos = await api.get(`/${instid}`);
        if(cursos.status !== 200) throw cursos.data.error;
        return cursos.data;
    }
    static async post(data){
        const res = await api.post('/',data);
        if(res.status !== 200) throw res.data.error;
        return res;
    }
    static async put(data, instid){
        const res = await api.put(`/${instid}`,data)
        if(res.status !== 200) throw res.data.error;
        return res;
    }
    static async delete(instid){
        const res = await api.delete(`/${instid}`);
        if(res.status !== 200) throw res.data.error;
        return res;
    }


};

export default Curso;