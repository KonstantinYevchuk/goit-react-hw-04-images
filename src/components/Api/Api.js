// const axios = require('axios');
import axios from 'axios';
const KEY = '32830280-cd5d8cae887a4565b5001e89e';
const BASE_URL = 'https://pixabay.com/api/';

export const makeFetch = async (name, page=1) => {
    try {
        const resp = await axios.get(`${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        return resp.data
    } catch (error) {
        console.log(error);
    }
    
}