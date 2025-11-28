import axios from "./axios.customize";

const commonApi = {
    async getLocations() {
        return axios.get("api/v1/common/locations");
    },

    async getTimeSlots() {
        return axios.get("api/v1/common/timeslots");
    }
};

export default commonApi;
