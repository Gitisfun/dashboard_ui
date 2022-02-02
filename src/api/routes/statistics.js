import httpClient from '../httpClient';

const END_POINT = '/statistics';



const aankopen_total = (item) => httpClient.post(`${END_POINT}/aankopen/total`, item);
const aankopen_total_geleverd = (item) => httpClient.post(`${END_POINT}/aankopen/total/geleverd`, item);
const aankopen_total_betaald = (item) => httpClient.post(`${END_POINT}/aankopen/total/betaald`, item);
const aankopen_sum = (item) => httpClient.post(`${END_POINT}/aankopen/sum`, item);
const aankopen_sum_geleverd = (item) => httpClient.post(`${END_POINT}/aankopen/sum/geleverd`, item);
const aankopen_sum_betaald = (item) => httpClient.post(`${END_POINT}/aankopen/sum/betaald`, item);

const aankopen_period_total = (item) => httpClient.post(`${END_POINT}/aankopen/period/total`, item);
const aankopen_period_total_geleverd = (item) => httpClient.post(`${END_POINT}/aankopen/period/total/geleverd`, item);
const aankopen_period_total_betaald = (item) => httpClient.post(`${END_POINT}/aankopen/period/total/betaald`, item);
const aankopen_period_sum = (item) => httpClient.post(`${END_POINT}/aankopen/period/sum`, item);
const aankopen_period_sum_geleverd = (item) => httpClient.post(`${END_POINT}/aankopen/period/sum/geleverd`, item);
const aankopen_period_sum_betaald = (item) => httpClient.post(`${END_POINT}/aankopen/period/sum/betaald`, item);

const verkopen_total = (item) => httpClient.post(`${END_POINT}/verkopen/total`, item);
const verkopen_total_betaald = (item) => httpClient.post(`${END_POINT}/verkopen/total/betaald`, item);
const verkopen_sum = (item) => httpClient.post(`${END_POINT}/verkopen/sum`, item);
const verkopen_sum_betaald = (item) => httpClient.post(`${END_POINT}/verkopen/sum/betaald`, item);

const verkopen_period_total = (item) => httpClient.post(`${END_POINT}/verkopen/period/total`, item);
const verkopen_period_total_betaald = (item) => httpClient.post(`${END_POINT}/verkopen/period/total/betaald`, item);
const verkopen_period_sum = (item) => httpClient.post(`${END_POINT}/verkopen/period/sum`, item);
const verkopen_period_sum_betaald = (item) => httpClient.post(`${END_POINT}/verkopen/period/sum/betaald`, item);

const creditnotas_total = (item) => httpClient.post(`${END_POINT}/creditnotas/total`, item);
const creditnotas_total_betaald = (item) => httpClient.post(`${END_POINT}/creditnotas/total/betaald`, item);
const creditnotas_sum = (item) => httpClient.post(`${END_POINT}/creditnotas/sum`, item);
const creditnotas_sum_betaald = (item) => httpClient.post(`${END_POINT}/creditnotas/sum/betaald`, item);

const creditnotas_period_total = (item) => httpClient.post(`${END_POINT}/creditnotas/period/total`, item);
const creditnotas_period_total_betaald = (item) => httpClient.post(`${END_POINT}/creditnotas/period/total/betaald`, item);
const creditnotas_period_sum = (item) => httpClient.post(`${END_POINT}/creditnotas/period/sum`, item);
const creditnotas_period_sum_betaald = (item) => httpClient.post(`${END_POINT}/creditnotas/period/sum/betaald`, item);


export {
    aankopen_total,
    aankopen_total_geleverd,
    aankopen_total_betaald,
    aankopen_sum,
    aankopen_sum_geleverd,
    aankopen_sum_betaald,
    aankopen_period_total,
    aankopen_period_total_geleverd,
    aankopen_period_total_betaald,
    aankopen_period_sum,
    aankopen_period_sum_geleverd,
    aankopen_period_sum_betaald,
    
    verkopen_total,
    verkopen_total_betaald,
    verkopen_sum,
    verkopen_sum_betaald,
    verkopen_period_total,
    verkopen_period_total_betaald,
    verkopen_period_sum,
    verkopen_period_sum_betaald,

    creditnotas_total,
    creditnotas_total_betaald,
    creditnotas_sum,
    creditnotas_sum_betaald,
    creditnotas_period_total,
    creditnotas_period_total_betaald,
    creditnotas_period_sum,
    creditnotas_period_sum_betaald
}