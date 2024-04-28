import { useMutation } from 'react-query';
import axios from 'axios';


const singUpUser = async (userData) => {
    const response = await axios.post('https://jumi-api.youchu.io/v1/signup', userData);
    return response.data;
};

export function useSignupMutation(onSuccess, onError){
    return useMutation(singUpUser, {
        onSuccess,
        onError
    });
}


const loginUser = async (userData) => {
    const response = await axios.post('https://jumi-api.youchu.io/v1/login', userData);
    return response.data;
};

export function useLoginMutation(onMutate, onSuccess, onError){
    return useMutation(loginUser, {
        onMutate,
        onSuccess,
        onError
    });
}

const uploadImage = async (formData) => {
    const token = localStorage.getItem('id_token');
    const response = await axios.post(
        'https://jumi-api.youchu.io/v1/image-upload',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
                'accept': 'application/json',
            },
        }
    );
    return response.data;
};

export function useImageUploadMutation(onSuccess, onError){
    return useMutation(uploadImage, {
        onSuccess,
        onError
    });
}

const businessCreate = async (businessData) => {
    const token = localStorage.getItem('id_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.post('https://jumi-api.youchu.io/v1/business', businessData, { headers });
    return response.data;
};

export function useBusinessCreateMutation(onSuccess, onError){
    return useMutation(businessCreate, {
        onSuccess,
        onError
    });
}

const businessList = async () => {
    const token = localStorage.getItem('id_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const response = await axios.get('https://jumi-api.youchu.io/v1/business', { headers });
    return response.data;
};

export function useBusinessListMutation(onSuccess, onError){
    return useMutation(businessList, {
        onSuccess,
        onError
    });
}



