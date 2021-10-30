import httpClient from '../httpClient';

const END_POINT = '/betalingstermijnen';


const getAllBetalingstermijnen = () => httpClient.get(`${END_POINT}`);

const getBetalingstermijn = (id) => httpClient.get(`${END_POINT}/${id}`);

const createBetalingstermijn = (item) => httpClient.post(END_POINT, item);

const updateBetalingstermijn = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);

const deleteBetalingstermijn = (id) => httpClient.delete(`${END_POINT}/${id}`);

export {
    getAllBetalingstermijnen,
    getBetalingstermijn,
    createBetalingstermijn,
    updateBetalingstermijn,
    deleteBetalingstermijn
}