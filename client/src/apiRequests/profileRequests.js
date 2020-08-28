import axios from 'axios';

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
            `http://localhost:4010/api/v1/profiles/picture/upload/${id}`,
            formData,
            axiosConfig
        );
        console.log(response.data);
    } catch (err) {
        console.log(err.response.data);
    }
};
