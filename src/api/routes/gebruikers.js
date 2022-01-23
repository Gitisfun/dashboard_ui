import httpClient from '../httpClient';

const END_POINT = '/gebruikers';


const getAllGebruikers = () => httpClient.get(`${END_POINT}`);

const getGebruiker = (id) => httpClient.get(`${END_POINT}/${id}`);

const checkGebruiker = (item) => httpClient.post(`${END_POINT}/check`, item);

const createGebruiker = (item) => httpClient.post(END_POINT, item);

const updateGebruiker = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteGebruiker = (id) => httpClient.delete(`${END_POINT}/${id}`);

const sundropsGebruiker = (id, item) => httpClient.put(`${END_POINT}/sundrops/${id}`, item);

export {
    getAllGebruikers,
    getGebruiker,
    checkGebruiker,
    createGebruiker,
    updateGebruiker,
    deleteGebruiker,
    sundropsGebruiker
}