import axios from "axios";
import { Empresa } from "../interface/empresa.interface";

const BASE_URL = "https://localhost:7031/api/Empresa";

export const getCompany = () => {
    return axios.get(`${BASE_URL}`);
}

export const getCompanyById = (id: string | undefined) => {
    return axios.get(`${BASE_URL}/${id}`);
}

export const addNewCompany = (body: Empresa) => {
    return axios.post(`${BASE_URL}`, body)
}

export const updateCompanyById = (body: Empresa, id: string | undefined) => {
    return axios.put(`${BASE_URL}/${id}`, body);
}

export const deleteCompanyById = (id: string | undefined) => {
    return axios.delete(`${BASE_URL}/${id}`);
}