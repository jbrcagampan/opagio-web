import axios from "axios";

export const getLeads = (query) => axios.post(`${process.env.API_URL}/leads`, query);
export const getStats = () => axios.get(`${process.env.API_URL}/leads/stats`);
export const getStudios = () => axios.get(`${process.env.API_URL}/leads/studios`);
