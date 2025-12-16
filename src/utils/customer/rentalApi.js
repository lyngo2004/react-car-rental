// src/utils/rentalApi.js
import axios from "../axios.customize";

const rentalApi = {
    async createRental(rentalData) {
        try {
            const res = await axios.post("api/v1/rental/checkout", rentalData);
            return res;
        } catch (error) {
            console.error("rentalApi.createRental error:", error.response?.data || error);
            return null;
        }
    },

    async getRentalById(id) {
        try {
            const res = await axios.get(`/api/v1/rental/${id}`);
            return res;
        } catch (error) {
            console.error("rentalApi.createRental error:", error.response?.data || error);
            return null;
        }
    }
};

export default rentalApi;
