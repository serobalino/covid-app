import axios from 'axios';

const PREFIJO="https://pomber.github.io/covid19/";

export default {
    tiempo() {
        return axios.get(`${PREFIJO}timeseries.json`);
    }
};
