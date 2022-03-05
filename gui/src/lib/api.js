import Axios from "axios"
import qs from "query-string"

const instance = Axios.create({
    baseURL: "https://saj7.host.cs.st-andrews.ac.uk/gangs"
})

export async function login(name, password){
    const data = {
        name, password
    }

    const res = await instance.get("login",qs.stringify(data));
    return res.data;
}

export async function register(name, password){
    const data = {
        name, password
    }
    const res = await instance.get("register",qs.stringify(data));
    return res.data;
}
