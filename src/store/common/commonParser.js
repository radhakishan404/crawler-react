import { get } from "lodash-es";

export const parser_queues_get_list = (response) => {
    try {
        let data = {};
        data.count = response.count || 0;
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return [];
        }

        response = response.map((e) => ({
            job_id: get(e, "job_id", ""),
            job_name: get(e, "job_name", ""),
            job_url: get(e, "job_url", ""),
            status: get(e, "status", ""),
            product_data: get(e, "product_data", {}),
            createdAt: get(e, "createdAt", ""),
        }));


        data.data = response;
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const parser_queues_get = (response) => {
    try {
        if (response?.data) {
            response = response.data;
        }
        if (!response) {
            return {};
        }

        return {
            job_id: get(response, "job_id", ""),
            job_name: get(response, "job_name", ""),
            job_url: get(response, "job_url", ""),
            status: get(response, "status", ""),
            product_data: get(response, "product_data", {}),
            createdAt: get(response, "createdAt", ""),
        }

    } catch (error) {
        throw new Error(error);
    }
};