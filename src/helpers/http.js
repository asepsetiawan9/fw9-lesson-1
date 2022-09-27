import axios from 'axios'

const UrlBackEnd = 'http://localhost:3333/'
const http = (token) => {
    const headers = {};
    if (token){
        headers.authorization = `Bearer ${token}`; 
    }
    return axios.create({
        headers,
        baseURL: UrlBackEnd
    });
}

export default http;