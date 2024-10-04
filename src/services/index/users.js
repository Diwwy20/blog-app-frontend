import axios from 'axios';

export const signup = async ({ name, email, password }) => {
    try {
        const { data } = await axios.post('/api/user/register', {
            name,
            email,
            password,
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const login = async ({ email, password }) => {
    try {
        const { data } = await axios.post('/api/user/login', {
            email,
            password,
        });
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const getUserProfile = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.get('/api/user/profile', config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const updateProfile = async ({ token, userData, userId }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`/api/user/update/profile/${userId}`, userData, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const updateProfilePicture = async ({ token, formData }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.put('/api/user/update/profile/picture', formData, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const getAllUsers = async (token, searchKeyword = "", page = 1, limit = 10) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data, headers } = await axios.get(`/api/user?searchKeyword=${searchKeyword}&
            page=${page}&limit=${limit}`, config);
        return { data, headers };
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};

export const deleteUser = async ({ slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`/api/user/${slug}`, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message) 
            throw new Error(error.response.data.message);
        throw new Error(error.message)
    } 
};