import React, { useEffect, useState, useRef } from "react";
import { Checkbox, Slider, Typography, Spin } from "antd";
import carApi from "../../utils/customer/carApi";
import { normalizeApiResponse } from "../../utils/apiUtils";

const { Title, Text } = Typography;

const FilterSideBar = ({ onFilter, onFiltersChange, initialFilters }) => {
    const [types, setTypes] = useState([]);
    const [capacities, setCapacities] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
    const [price, setPrice] = useState(100);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCapacities, setSelectedCapacities] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const debounceRef = useRef(null);
    const [initializedFromProps, setInitializedFromProps] = useState(false);

    useEffect(() => {
        if (!initialFilters || initializedFromProps) return;

        const { type, capacity, min, max } = initialFilters;

        if (Array.isArray(type)) {
            setSelectedTypes(type);
        }
        if (Array.isArray(capacity)) {
            setSelectedCapacities(capacity);
        }
        if (typeof max === "number") {
            setPrice(max);
        }
        if (typeof min === "number" || typeof max === "number") {
            setPriceRange((prev) => ({
                min: typeof min === "number" ? min : prev.min,
                max: typeof max === "number" ? max : prev.max,
            }));
        }

        setInitializedFromProps(true);
    }, [initialFilters, initializedFromProps]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingFilters(true);
                const res = await carApi.getFilterOptions();
                const data = normalizeApiResponse(res);
                if (data) {
                    setTypes(data.types || []);
                    setCapacities(data.capacities || []);
                    const min = Number(data.price?.minPrice ?? 0);
                    const max = Number(data.price?.maxPrice ?? 0);
                    setPriceRange({ min, max });
                    setPrice(max);
                }
            } catch (err) {
                console.error("filterSideBar.fetchData error:", err);
            } finally {
                setLoadingFilters(false);
            }
        };
        fetchData();
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, []);

    const applyFilters = async ({ type, capacity, min, max } = {}) => {
        // Nếu tất cả filter đều rỗng → load full list
        if (
            (!type || type.length === 0) &&
            (!capacity || capacity.length === 0) &&
            min === priceRange.min &&
            max === priceRange.max
        ) {
            onFiltersChange?.({ reset: true });
            return;
        }

        // Normalize price default
        const isDefaultPrice = (min === priceRange.min && max === priceRange.max);
        const effectiveMin = isDefaultPrice ? undefined : min;
        const effectiveMax = isDefaultPrice ? undefined : max;
        const params = {};
        if (type && type.length > 0) params.type = type;
        if (capacity) params.capacity = capacity;
        if (effectiveMin !== undefined && effectiveMin !== null) params.min = effectiveMin;
        if (effectiveMax !== undefined && effectiveMax !== null) params.max = effectiveMax;

        // Notify parent; parent will call filterByFilters and set cars
        onFiltersChange?.(params);
    };

    const applyFiltersDebounced = ({ type, capacity, min, max } = {}) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => applyFilters({ type, capacity, min, max }), 400);
    };

    const handleTypeChange = (checked, value) => {
        setSelectedTypes(prev => {
            const next = checked ? [...prev, value] : prev.filter(v => v !== value);
            applyFiltersDebounced({ type: next, capacity: selectedCapacities, min: priceRange.min, max: price });
            return next;
        });
    };

    const handleCapacityChange = (checked, value) => {
        setSelectedCapacities(prev => {
            const next = checked ? [...prev, value] : prev.filter(v => v !== value);
            applyFiltersDebounced({ type: selectedTypes, capacity: next, min: priceRange.min, max: price });
            return next;
        });
    };

    const handlePriceChange = (value) => {
        setPrice(value);
        applyFiltersDebounced({ type: selectedTypes, capacity: selectedCapacities, min: priceRange.min, max: value });
    };

    return (
        <Spin spinning={loadingFilters}>
            <div style={{ width: 250, height: "100%", background: "#fff", padding: 30 }}>
                {/* TYPE */}
                <div style={{ marginBottom: 30 }}>
                    <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                        TYPE
                    </Title>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {types.map((t) => (
                            <Checkbox
                                key={t.CarType}
                                checked={selectedTypes.includes(t.CarType)}
                                onChange={(e) => handleTypeChange(e.target.checked, t.CarType)}
                            >
                                {t.CarType} ({t.count})
                            </Checkbox>
                        ))}
                    </div>
                </div>

                {/* CAPACITY */}
                <div style={{ marginBottom: 30 }}>
                    <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                        CAPACITY
                    </Title>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {capacities.map((c) => (
                            <Checkbox
                                key={c.Capacity}
                                checked={selectedCapacities.includes(c.Capacity)}
                                onChange={(e) => handleCapacityChange(e.target.checked, c.Capacity)}
                            >
                                {c.Capacity} Person ({c.count})
                            </Checkbox>
                        ))}
                    </div>
                </div>

                {/* PRICE */}
                <div>
                    <Title level={5} style={{ marginBottom: 15, color: "#90A3BF" }}>
                        PRICE
                    </Title>
                    <Slider
                        min={priceRange.min}
                        max={priceRange.max}
                        value={price}
                        onChange={(val) => setPrice(val)}
                        onAfterChange={handlePriceChange}
                        trackStyle={{ backgroundColor: "#3563E9", height: 6 }}
                    />
                    <Text style={{ color: "#1A202C", fontSize: 16 }}>
                        Max. ${price}.00
                    </Text>
                </div>
            </div>
        </Spin>
    );
};

export default FilterSideBar;