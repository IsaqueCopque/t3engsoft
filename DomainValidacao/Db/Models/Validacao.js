//Abstração do modelo do DomainValidador
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8083/validacoes" });

class Validacao{
    
    static async get(inst,status){//obter validações
        var validacao;
        if(status)
            validacao = await api.get(`/byvalida/${inst}?status=${status}`);
        else
            validacao = await api.get(`/byvalida/${inst}`);

        if(validacao.status !== 200) throw validacao.data.error;
        return validacao.data;
    }

    static async put(data,id){//validar diploma
        const res = await api.put(`/validar/${id}`,data);
        if(res.status !== 200) throw res.data.error;
    }
    
};

export default Validacao;