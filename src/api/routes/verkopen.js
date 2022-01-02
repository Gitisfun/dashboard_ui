import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/verkopen';


const getAllVerkopen = (params) => httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}`);

const getVerkoop = (id) => httpClient.get(`${END_POINT}/${id}`);

const createVerkoop = (item) => httpClient.post(END_POINT, item);

const updateVerkoop = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteVerkoop = (id) => httpClient.delete(`${END_POINT}/${id}`);

const paidVerkoop = (id, item) => httpClient.put(`${END_POINT}/paid/${id}`, item);


export {
    getAllVerkopen,
    getVerkoop,
    createVerkoop,
    updateVerkoop,
    deleteVerkoop,
    paidVerkoop
}