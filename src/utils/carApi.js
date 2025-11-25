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
    }
}

export default carApi;