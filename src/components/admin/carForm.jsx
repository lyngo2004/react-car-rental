const CarForm = ({ mode, initialData, onSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // if (mode === "create") adminCarApi.create(...)
    // if (mode === "edit") adminCarApi.update(...)

    onSuccess?.();
  };

  const handleDelete = () => {
    // TODO: confirm + adminCarApi.delete(...)
  };

  return (
    <form className="car-form" onSubmit={handleSubmit}>
      {mode === "edit" && (
        <div className="form-group">
          <label>Car ID</label>
          <input value={initialData?.id || ""} disabled />
        </div>
      )}

      <div className="form-group">
        <label>Brand</label>
        <input defaultValue={initialData?.brand || ""} />
      </div>

      <div className="form-group">
        <label>Model</label>
        <input defaultValue={initialData?.model || ""} />
      </div>

      <div className="form-group">
        <label>License Plate</label>
        <input defaultValue={initialData?.licensePlate || ""} />
      </div>

      {/* <div className="form-actions">
        {mode === "edit" && (
          <button type="button" className="btn-danger" onClick={handleDelete}>
            Delete
          </button>
        )}

        <button type="submit" className="btn-primary">
          Save
        </button>
      </div> */}
    </form>
  );
};

export default CarForm;