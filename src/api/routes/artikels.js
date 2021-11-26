import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/artikels';


const getAllArtikels = (params) => httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}`);

const getArtikel = (id) => httpClient.get(`${END_POINT}/${id}`);

const createArtikel = (item) => httpClient.post(END_POINT, item);

const updateArtikel = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteArtikel = (id) => httpClient.delete(`${END_POINT}/${id}`);

const stockArtikel = (id, item) => httpClient.put(`${END_POINT}/stock/${id}`, item);


export {
    getAllArtikels,
    getArtikel,
    createArtikel,
    updateArtikel,
    deleteArtikel,
    stockArtikel
}