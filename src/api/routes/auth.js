import httpClient from '../httpClient';

const END_POINT = '/gebruikers';


const userLogin = (item) => httpClient.post(`${END_POINT}/malibu`, item);


export {
    userLogin
}