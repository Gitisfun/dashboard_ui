import httpClient from '../httpClient';

const END_POINT = '/btw';


const getAllBtws = () => httpClient.get(`${END_POINT}`);

const getBtw = (id) => httpClient.get(`${END_POINT}/${id}`);

const createBtw = (item) => httpClient.post(END_POINT, item);

const updateBtw = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteBtw = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllBtws,
    getBtw,
    createBtw,
    updateBtw,
    deleteBtw
}