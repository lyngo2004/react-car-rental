import axios from "../axios.customize";
import instance from "../axios.customize";

const carAdminApi = {
    async getAllAdminCars() {
        try {
            const res = await axios.get("api/v1/admin/car");
            return res;
        } catch (error) {
            console.error("getAllAdminCars error:", error.response?.data || error);
            return null;
        }
    },

    async getAdminCarById(id) {
        try {
            const res = await axios.get(`api/v1/admin/car/${id}`);
            return res;
        } catch (error) {
            console.error("getAdminCarById error:", error.response?.data || error);
            return null;
        }
    },

    async createAdminCar(formData) {
        try {
            const res = await instance.post("/api/v1/admin/car", formData);
            return res;
        } catch (error) {
            console.error("createAdminCar error:", error.response?.data || error);
            return null;
        }
    },

    async updateAdminCar(id, formData) {
        try {
            const res = await instance.put(`/api/v1/admin/car/${id}`,formData);
            return res;
        } catch (error) {
            console.error("updateAdminCar error:", error.response?.data || error);
            return null;
        }
    },

    async deleteAdminCar(id) {
        try {
            const res = await axios.delete(`api/v1/admin/car/${id}`);
            return res;
        } catch (error) {
            console.error("deleteAdminCar error:", error.response?.data || error);
            return null;
        }
    },
};

export default carAdminApi;
