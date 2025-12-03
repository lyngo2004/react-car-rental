import axios from "../utils/axios.customize";

const carApi = {
    async getAllCars() {
        try {
            const res = await axios.get("api/v1/car");
            return res;       // res.data là dữ liệu backend trả về
        } catch (error) {
            console.error("carApi.getAllCars error:", error.response?.data || error);
            return null;
        }
    },

    async getAvailableCars(params) {
        try {
            const res = await axios.get("api/v1/car/available", { params });
            return res;
        } catch (error) {
            console.error("carApi.getAvailableCars error:", error.response?.data || error);
            return null;
        }
    },

    async getFilterOptions() {
        try {
            const res = await axios.get("api/v1/car/filter-options");
            return res;
        } catch (error) {
            console.error("carApi.getFilterOptions error:", error.response?.data || error);
            return null;
        }
    },

    // FILTER BY MULTIPLE CRITERIA (type[], capacity[], min, max, optional availability)
    async filterByFilters(params) {
        try {
            const res = await axios.get("api/v1/car/filter", { params });
            return res;
        } catch (error) {
            console.error("carApi.filterByFilters error:", error.response?.data || error);
            return null;
        }
    },

    async getCarById(id) {
        try {
            const res = await axios.get(`api/v1/car/${id}`);
            return res;
        } catch (error) {
            console.error("carApi.getCarById error:", error.response?.data || error);
            return null;
        }
    },
}

export default carApi;