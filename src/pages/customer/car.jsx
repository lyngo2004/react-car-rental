import React, { useEffect, useState, useRef } from "react";
import carApi from "../../utils/customer/carApi";
import FilterSideBar from "../../components/car/filterSideBar";
import CarCard from "../../components/car/carCard";
import FilterBar from "../../components/car/filterBar";
import { Empty, Spin, Button } from "antd";

const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);

    const fetchCars = async () => {
        setLoading(true);
        const res = await carApi.getAllCars();

        if (!res || res.EC !== 0) {
            console.error("Fetch cars error:", res?.EM);
            return;
        }

        setCars(res.DT);
        setLoading(false);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // Apply filters from FilterBar or FilterSideBar
    const handleFiltersChange = (newFilters) => {

        // RESET
        if (newFilters.reset) {
            setFilters(prev => ({
                pickupLocation: prev.pickupLocation || null,
                pickupDate: prev.pickupDate || null,
                pickupTime: prev.pickupTime || null,
                dropoffLocation: prev.dropoffLocation || null,
                dropoffDate: prev.dropoffDate || null,
                dropoffTime: prev.dropoffTime || null
            }));
            fetchCars();
            return;
        }

        setFilters(prev => {
            const merged = { ...prev };

            // ---- PICK / DROP (atomic) ----
            if (
                "pickupDate" in newFilters ||
                "pickupTime" in newFilters ||
                "dropoffDate" in newFilters ||
                "dropoffTime" in newFilters
            ) {
                if (
                    newFilters.pickupDate &&
                    newFilters.pickupTime &&
                    newFilters.dropoffDate &&
                    newFilters.dropoffTime
                ) {
                    merged.pickupDate = newFilters.pickupDate;
                    merged.pickupTime = newFilters.pickupTime;
                    merged.dropoffDate = newFilters.dropoffDate;
                    merged.dropoffTime = newFilters.dropoffTime;
                } else {
                    // nếu thiếu 1 trong 4 → clear hết
                    delete merged.pickupDate;
                    delete merged.pickupTime;
                    delete merged.dropoffDate;
                    delete merged.dropoffTime;
                }
            }

            // ---- TYPE ----
            if ("type" in newFilters) {
                if (newFilters.type?.length) merged.type = newFilters.type;
                else delete merged.type;
            }

            // ---- CAPACITY ----
            if ("capacity" in newFilters) {
                if (newFilters.capacity?.length) merged.capacity = newFilters.capacity;
                else delete merged.capacity;
            }

            // ---- PRICE ----
            // ---- PRICE ----
            if ("min" in newFilters) {
                if (newFilters.min !== undefined) merged.min = newFilters.min;
                else delete merged.min;
            }

            if ("max" in newFilters) {
                if (newFilters.max !== undefined) merged.max = newFilters.max;
                else delete merged.max;
            }


            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(async () => {
                setLoading(true);
                const res = await carApi.filterByFilters(merged);
                if (res?.EC === 0) setCars(res.DT);
                setLoading(false);
            }, 400);

            return merged;
        });
    };

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    return (
        <div style={{ display: "flex", gap: 20, background: "#F9F9F9", minHeight: "100vh" }}>

            <FilterSideBar onFilter={setCars} onFiltersChange={handleFiltersChange} />

            <div style={{
                flex: 1,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>

                {/* Pick-Drop Filter Bar */}
                <FilterBar setCars={setCars} onFiltersChange={handleFiltersChange} />

                {/* Car Cards */}
                {loading ? (
                    <Spin style={{ marginTop: 20 }} />
                ) : cars.length === 0 ? (
                    <Empty style={{ marginTop: 20 }}
                        description="No cars match your current filters"
                    />
                ) : (
                    <CarCard cars={cars} filters={filters} />
                )}
            </div>
        </div>
    );
};

export default CarPage;