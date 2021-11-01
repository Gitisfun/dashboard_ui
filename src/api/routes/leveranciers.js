import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/leveranciers';


const getAllLeveranciers = (params) => { console.log(`${END_POINT}${RouteStrings.pagination(params)}`); return httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}` )};

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