import axios from 'axios'

const UrlBackEnd = 'https://contact-lesson-backend.vercel.app/'
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