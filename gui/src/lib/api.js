import Axios from "axios"
import qs from "query-string"

const instance = Axios.create({
    baseURL: "https://saj7.host.cs.st-andrews.ac.uk/gangs"
})

export async function login(name, password){
    const data = {
        name, password
    }

    const res = await instance.post("login",qs.stringify(data));
    console.dir(res)

}
