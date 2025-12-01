import React, { useEffect, useState, useRef } from "react";
import carApi from "../utils/carApi";
import FilterSideBar from "../components/car/filterSideBar";
import CarCard from "../components/car/carCard";
import FilterBar from "../components/car/filterBar";

const CarPage = () => {
    const [cars, setCars] = useState([]);
    const [filters, setFilters] = useState({});
    const debounceRef = useRef(null);

    const fetchCars = async () => {
        const res = await carApi.getAllCars();

        if (!res || res.EC !== 0) {
            console.error("Fetch cars error:", res?.EM);
            return;
        }

        setCars(res.DT);
    };

    useEffect(() => {
        fetchCars();
    }, []);

    // Apply filters from FilterBar or FilterSideBar
    const handleFiltersChange = (newFilters) => {
        // CASE 1: reset toàn bộ filters
        if (newFilters.reset) {
            setFilters({});
            fetchCars();   // load full list từ backend
            return;
        }

        // CASE 2: merge filter bình thường
        setFilters((prev) => {
            const merged = { ...prev, ...newFilters };

            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(async () => {
                try {
                    const res = await carApi.filterByFilters(merged);
                    if (res?.EC === 0) setCars(res.DT);
                } catch (err) {
                    console.error(err);
                }
            }, 400);

            return merged;
        });
    };

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
                <CarCard cars={cars} />
            </div>
        </div>
    );
};

export default CarPage;