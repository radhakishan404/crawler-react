import { axios } from "../../helpers/axios";
import {
  JOBS_ENDPOINT,
} from "./commonConstants";

export const api_queues_get_list = async () => {
  return axios.get(`${JOBS_ENDPOINT}`);
};

export const api_queues_add = async (data) => {
  return axios.post(JOBS_ENDPOINT, data);
};

export const api_queues_get = async (id) => {
  return axios.get(`${JOBS_ENDPOINT}/${id}`);
};
