import httpClient from '../httpClient';

const END_POINT = '/leveranciers';


const getAllLeveranciers = (search) => httpClient.get(`${END_POINT}?search=${search}`);

const getLeverancier = (id) => httpClient.get(`${END_POINT}/${id}`);

const createLeverancier = (item) => httpClient.post(END_POINT, item);

const updateLeverancier = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteLeverancier = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllLeveranciers,
    getLeverancier,
    createLeverancier,
    updateLeverancier,
    deleteLeverancier
}