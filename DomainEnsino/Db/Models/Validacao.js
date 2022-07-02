//Abstração do modelo do DomainValidador
import axios from 'axios';

const api = axios.create({ baseURL: "http://localhost:8083/validacoes" });

class Validacao{
    static async post(data){//solicitar validacao
        const res = await api.post('/',data);
        if(res.status !== 200) throw res.data.error;
    }
    static async get(instmec,status){//obter validações
        var validacao;
        if(status)
            validacao = await api.get(`/byensino/${instmec}?status=${status}`);
        else
            validacao = await api.get(`/byensino/${instmec}`);

        if(validacao.status !== 200) throw validacao.data.error;
        return validacao.data;
    }
};

export default Validacao;