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

export const fetchUserInfo = async () => {
    const token = localStorage.getItem('id_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    const response = await axios.get('https://jumi-api.youchu.io/v1/me', { headers });
    return response.data;
};


//회사 정보 가져오기
export const fetchBusinessInfo = async () => {
    const token = localStorage.getItem('id_token')
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const response = await axios.get(`https://jumi-api.youchu.io/v1/business/${company_id}`, { headers });
    return response.data;
}

export const fetchBusinessItemsInfo = async () => {
    const token = localStorage.getItem('id_token')
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization' : `Bearer ${token}`
    };
    const response = await axios.get(`https://jumi-api.youchu.io/v1/business/${company_id}/items`, { headers });
    return response.data;
}

// 매장 업데이트
const businessUpdate = async (businessData) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.post('https://jumi-api.youchu.io/v1/business', businessData, { headers });
    return response.data;
};


export function useBusinessUpdateMutation(onSuccess, onError){
    return useMutation(businessUpdate, {
        onSuccess,
        onError
    });
}

const businessItemsUpdate = async (businessItemsData) => {
    const token = localStorage.getItem('id_token');
    const company_id = localStorage.getItem('company_id')
    const headers = {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
    };
    const response = await axios.post(`https://jumi-api.youchu.io/v1/business/${company_id}/items`, businessItemsData, { headers });
    return response.data;
};


export function useBusinessItemsUpdateMutation(onSuccess, onError){
    return useMutation(businessItemsUpdate, {
        onSuccess,
        onError
    });
}

// gpt 사용해보기
const GPTChat = async (prompt) => {
    const response = await axios.post('http://127.0.0.1:5002/prompt', prompt);
    return response.data;
};


export function useGPTChatMutation(onSuccess, onError){
    return useMutation(GPTChat, {
        onSuccess,
        onError
    });
}
