import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/aankopen';


const getAllAankopen = (params) => httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}`);

const getAankoop = (id) => httpClient.get(`${END_POINT}/${id}`);

const createAankoop = (item) => httpClient.post(END_POINT, item);

const updateAankoop = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteAankoop = (id) => httpClient.delete(`${END_POINT}/${id}`);

const deliveredAankoop = (id, item) => httpClient.put(`${END_POINT}/delivered/${id}`, item);

const paidAankoop = (id, item) => httpClient.put(`${END_POINT}/paid/${id}`, item);


export {
    getAllAankopen,
    getAankoop,
    createAankoop,
    updateAankoop,
    deleteAankoop,
    deliveredAankoop,
    paidAankoop
}