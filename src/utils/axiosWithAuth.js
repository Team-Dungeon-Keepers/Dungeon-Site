import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            authorization: JSON.parse(token)
        },
        baseURL: 'https://dungeon-site-api.herokuapp.com/api'
    });
}

export default axiosWithAuth;