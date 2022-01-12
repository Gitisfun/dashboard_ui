import httpClient from '../httpClient';

const END_POINT = '/counters';


const getCounter = () => httpClient.get(`${END_POINT}`);

const updateCounter = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);


export {
    getCounter,
    updateCounter,
}