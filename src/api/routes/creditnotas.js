import httpClient from '../httpClient';
import RouteStrings from '../routeString';

const END_POINT = '/creditnotas';


const getAllCreditnotas = (params) => httpClient.get(`${END_POINT}${RouteStrings.pagination(params)}`);

const getCreditnota = (id) => httpClient.get(`${END_POINT}/${id}`);

const createCreditnota = (item) => httpClient.post(END_POINT, item);

const updateCreditnota = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteCreditnota = (id) => httpClient.delete(`${END_POINT}/${id}`);

const paidCreditnota = (id, item) => httpClient.put(`${END_POINT}/paid/${id}`, item);


export {
    getAllCreditnotas,
    getCreditnota,
    createCreditnota,
    updateCreditnota,
    deleteCreditnota,
    paidCreditnota
}