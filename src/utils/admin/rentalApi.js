import instance from "../axios.customize";

const ADMIN_RENTAL_BASE = "/api/v1/admin/rental";

const rentalAdminApi = {
  /* ================= LIST ================= */

  // GET /api/v1/admin/rental
  getAllRentals() {
    return instance.get(ADMIN_RENTAL_BASE);
  },

  // GET /api/v1/admin/rental/summary
  getRentalSummary() {
    return instance.get(`${ADMIN_RENTAL_BASE}/summary`);
  },

  /* ================= DETAIL ================= */

  // GET /api/v1/admin/rental/:id
  getRentalById(rentalId) {
    return instance.get(`${ADMIN_RENTAL_BASE}/${rentalId}`);
  },

  /* ================= ACTIONS ================= */

  // PATCH /api/v1/admin/rental/:id/approve
  approveRental(rentalId) {
    return instance.patch(`${ADMIN_RENTAL_BASE}/${rentalId}/approve`);
  },

  // PATCH /api/v1/admin/rental/:id/reject
  rejectRental(rentalId) {
    return instance.patch(`${ADMIN_RENTAL_BASE}/${rentalId}/reject`);
  },

  // PATCH /api/v1/admin/rental/:id/cancel
  cancelRental(rentalId) {
    return instance.patch(`${ADMIN_RENTAL_BASE}/${rentalId}/cancel`);
  },
};

export default rentalAdminApi;
