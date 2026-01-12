import instance from "../axios.customize";

const rentalAdminApi = {
    /* ================= LIST ================= */

    // GET /api/v1/admin/rental
    async getAllAdminRentals() {
        try {
            const res = await instance.get("/api/v1/admin/rental");
            return res;
        } catch (error) {
            console.error(
                "getAllAdminRentals error:",
                error.response?.data || error
            );
            return null;
        }
    },

    async getAdminRentalsByStatus(status) {
        try {
            const res = await instance.get(`/api/v1/admin/rental/status/${status}`);
            return res;
        } catch (error) {
            console.error("getAdminRentalsByStatus error:", error);
            return null;
        }
    },
    /* ================= SUMMARY ================= */

    // GET /api/v1/admin/rental/summary
    async getAdminRentalSummary() {
        try {
            const res = await instance.get("/api/v1/admin/rental/summary");
            return res;
        } catch (error) {
            console.error(
                "getAdminRentalSummary error:",
                error.response?.data || error
            );
            return null;
        }
    },

    /* ================= DETAIL ================= */

    // GET /api/v1/admin/rental/:id
    async getAdminRentalById(rentalId) {
        try {
            const res = await instance.get(
                `/api/v1/admin/rental/${rentalId}`
            );
            return res;
        } catch (error) {
            console.error(
                "getAdminRentalById error:",
                error.response?.data || error
            );
            return null;
        }
    },

    /* ================= ACTIONS ================= */

    // PATCH /api/v1/admin/rental/:id/approve
    async approveRental(rentalId) {
        try {
            const res = await instance.patch(
                `/api/v1/admin/rental/${rentalId}/approve`
            );
            return res;
        } catch (error) {
            console.error(
                "approveRental error:",
                error.response?.data || error
            );
            return null;
        }
    },

    // PATCH /api/v1/admin/rental/:id/reject
    async rejectRental(rentalId) {
        try {
            const res = await instance.patch(
                `/api/v1/admin/rental/${rentalId}/reject`
            );
            return res;
        } catch (error) {
            console.error(
                "rejectRental error:",
                error.response?.data || error
            );
            return null;
        }
    },

    // PATCH /api/v1/admin/rental/:id/cancel
    async cancelRental(rentalId) {
        try {
            const res = await instance.patch(
                `/api/v1/admin/rental/${rentalId}/cancel`
            );
            return res;
        } catch (error) {
            console.error(
                "cancelRental error:",
                error.response?.data || error
            );
            return null;
        }
    },
};

export default rentalAdminApi;
