import axios from 'axios';

const BASE_URL = 'https://deserts-store.b.goit.study/api';

export async function getDesserts(params = {}) {
    const { data } = await axios.get(`${BASE_URL}/desserts`, {params,})
    return data;
}

export async function getDessertById(id) {
    const { data } = await axios.get(`${BASE_URL}/desserts/${id}`);
    return data;
}

export async function getCategories() {
    const { data } = await axios.get(`${BASE_URL}/categories`);
    return data;
}

export async function getFeedbacks(limit, page) {
    const { data } = await axios.get(`${BASE_URL}/feedbacks?limit=${limit}&page=${page}`);
    return data;
}

export async function createOrder(orderData) {
    const { data } = await axios.post(`${BASE_URL}/orders`, orderData);
    return data;
}