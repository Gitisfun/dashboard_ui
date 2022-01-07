import httpClient from '../httpClient';

const END_POINT = '/bedrijven';


const getBedrijf = (id) => httpClient.get(`${END_POINT}/${id}`);

const updateBedrijf = (id, item) => httpClient.put(`${END_POINT}/${id}`, item);


export {
    getBedrijf,
    updateBedrijf,
}