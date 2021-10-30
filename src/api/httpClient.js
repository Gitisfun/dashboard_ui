import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://localhost:5000/api/", // TODO: change to real api link
    //baseURL: "http://192.168.0.231:5000/api/",
    timeout: 3000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
    }
});

httpClient.defaults.headers.common['authorization'] = `Bearer ${JSON.parse(localStorage.getItem("authtokenws"))}`

export default httpClient;