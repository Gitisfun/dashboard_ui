import httpClient from '../httpClient';

const END_POINT = '/tekst';


const getAllTeksten = () => httpClient.get(`${END_POINT}`);

const getTekst = (id) => httpClient.get(`${END_POINT}/${id}`);

const createTekst = (item) => httpClient.post(END_POINT, item);

const updateTekst = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteTekst = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllTeksten,
    getTekst,
    createTekst,
    updateTekst,
    deleteTekst
}