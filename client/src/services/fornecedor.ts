import axios from "axios";
import { Fornecedor } from "../interface/fornecedor.interface";

const BASE_URL = "https://localhost:7031/api/Fornecedor";

export const getSupplier = () => {
    return axios.get(`${BASE_URL}`);
}

export const getSupplierById = (id: string | undefined) => {
    return axios.get(`${BASE_URL}/${id}`);
}

export const addNewSupplier = (body: Fornecedor) => {
    return axios.post(`${BASE_URL}`, body);
}

export const updateSupplierById = (body: Fornecedor, id: string | undefined) => {
    return axios.put(`${BASE_URL}/${id}`, body);
}

export const deleteSupplierById = (id: string | undefined) => {
    return axios.delete(`${BASE_URL}/${id}`);
}