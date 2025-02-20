import axios from "axios"

const api = axios.create({
    baseURL:"",
});

export const getData = ()=>{
    return api.get("");
};

