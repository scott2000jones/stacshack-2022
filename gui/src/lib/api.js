import Axios from "axios"
import qs from "query-string"

import API from "../API";

const instance = Axios.create({
    baseURL: "https://saj7.host.cs.st-andrews.ac.uk/gangs"
})

export async function login(name, password){
    const data = {
        name, password
    }

    const res = await API.get("/login/" + name + "." + password);
    return res.data;
}

export async function register(name, password){
    const data = {
        name, password
    }
    const res = await API.get("/register/" + name + "." + password);
    return res.data;
}

export async function is_user_logged_in(name){
    const data = {
        name
    }
    const res = await API.get("/is_user_logged_in/" + name);
    return res.data;
}

