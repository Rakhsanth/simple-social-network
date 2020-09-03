import axios from 'axios';
import { backendBaseURL } from '../config/config';

export const uploadProfilePicture = async (profilePicture, id) => {
    let token;
    if (localStorage.token) {
        token = localStorage.getItem('token');
    }
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    const axiosConfig = {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    };
    try {
        const response = await axios.put(
            `${backendBaseURL}/api/v1/profiles/picture/upload/${id}`,
            formData,
            axiosConfig
        );
        return true;
    } catch (err) {
        return false;
    }
};
