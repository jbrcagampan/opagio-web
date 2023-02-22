import axios from "axios";

export const getLeads = () => axios.get(`${process.env.API_URL}/leads`);
export const getStats = () => axios.get(`${process.env.API_URL}/leads/stats`);
