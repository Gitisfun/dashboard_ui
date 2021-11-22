import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/klanten';


const getAllKlanten = (params) => httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}`);

const getKlant = (id) => httpClient.get(`${END_POINT}/${id}`);

const createKlant = (item) => httpClient.post(END_POINT, item);

const updateKlant = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteKlant = (id) => httpClient.delete(`${END_POINT}/${id}`);

const espKlant = (id, item) => httpClient.put(`${END_POINT}/esp/${id}`, item);

export {
    getAllKlanten,
    getKlant,
    createKlant,
    updateKlant,
    deleteKlant,
    espKlant
}