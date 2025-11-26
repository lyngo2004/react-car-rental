import { useState, useEffect, useRef } from "react";
import { Select, DatePicker, notification } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import carApi from "../../utils/carApi";
import commonApi from "../../utils/commonApi";
import { normalizeApiResponse } from "../../utils/apiUtils";
import dayjs from "dayjs";

const FilterBar = ({ setCars, onFiltersChange }) => {

    const [pickupLocation, setPickupLocation] = useState(null);
    const [pickupDate, setPickupDate] = useState(null);
    const [pickupTime, setPickupTime] = useState(null);

    const [dropoffLocation, setDropoffLocation] = useState(null);
    const [dropoffDate, setDropoffDate] = useState(null);
    const [dropoffTime, setDropoffTime] = useState(null);

    const [locations, setLocations] = useState([]);
    const [times, setTimes] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(false);
    const [loadingTimes, setLoadingTimes] = useState(false);

    const timeoutRef = useRef(null);

    // =============================
    // RESET DROPOFF NẾU PICKUP THAY ĐỔI
    // =============================
    useEffect(() => {
        if (pickupDate || pickupTime) {
            setDropoffDate(null);
            setDropoffTime(null);
        }
    }, [pickupDate, pickupTime]);


    // =============================
    // FETCH LOCATIONS + TIMES
    // =============================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingLocations(true);
                setLoadingTimes(true);

                const locRes = await commonApi.getLocations();
                const timeRes = await commonApi.getTimeSlots();

                const locs = normalizeApiResponse(locRes);
                const tms = normalizeApiResponse(timeRes);

                if (Array.isArray(locs)) setLocations(locs);
                if (Array.isArray(tms)) setTimes(tms);

            } finally {
                setLoadingLocations(false);
                setLoadingTimes(false);
            }
        };
        fetchData();
    }, []);

    // =============================
    // AUTO SEARCH (DEBOUNCE)
    // =============================
    useEffect(() => {
        if (
            !pickupLocation ||
            !pickupDate ||
            !pickupTime ||
            !dropoffLocation ||
            !dropoffDate ||
            !dropoffTime
        ) return;

        const autoSearch = async () => {
            try {
                const res = await carApi.getAvailableCars({
                    pickupLocation,
                    pickupDate: pickupDate?.format("YYYY-MM-DD"),
                    pickupTime,
                    dropoffLocation,
                    dropoffDate: dropoffDate?.format("YYYY-MM-DD"),
                    dropoffTime
                });

                const dt = normalizeApiResponse(res);
                if (Array.isArray(dt)) setCars(dt);

                onFiltersChange?.({
                    pickupLocation,
                    pickupDate: pickupDate?.format("YYYY-MM-DD"),
                    pickupTime,
                    dropoffLocation,
                    dropoffDate: dropoffDate?.format("YYYY-MM-DD"),
                    dropoffTime
                });

            } catch {
                notification.error({
                    message: "Error",
                    description: "Network error"
                });
            }
        };

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(autoSearch, 500);

    }, [
        pickupLocation, pickupDate, pickupTime,
        dropoffLocation, dropoffDate, dropoffTime
    ]);



    // =============================
    // LOGIC RÀNG BUỘC DROP-OFF DATE
    // =============================

    const disabledDropoffDate = (current) => {
        if (!pickupDate) return true; // ❌ phải chọn pickup trước
        return current && current < pickupDate.startOf("day");
    };

    // =============================
    // LOGIC RÀNG BUỘC DROP-OFF TIME
    // =============================
    const isSameDay = dropoffDate &&
        pickupDate &&
        dropoffDate.format("YYYY-MM-DD") === pickupDate.format("YYYY-MM-DD");


    const disabledDropoffTime = (timeString) => {
        if (!pickupDate || !pickupTime || !dropoffDate) return false;

        // Nếu cùng ngày → dropoffTime > pickupTime
        if (isSameDay) {
            return dayjs(timeString, "HH:mm").isSameOrBefore(
                dayjs(pickupTime, "HH:mm")
            );
        }

        return false;
    };


    // =============================
    // JSX RENDER
    // =============================
    return (
        <div style={{ width: "100%", maxWidth: 1080 }}>
            <div style={{
                display: "flex",
                gap: 20,
                padding: 20,
                background: "#fff",
                borderRadius: 12,
                marginTop: 30
            }}>

                {/* PICKUP SIDE */}
                <div style={{ flex: 1 }}>
                    <h4>Pick - Up</h4>
                    <div style={{ display: "flex", gap: 10 }}>

                        <Select
                            placeholder="Location"
                            style={{ flex: 1 }}
                            onChange={setPickupLocation}
                            loading={loadingLocations}
                        >
                            {locations.map((loc) => {
                                const value = typeof loc === "string"
                                    ? loc
                                    : (loc?.Location || loc?.name);
                                return (
                                    <Select.Option key={value} value={value}>
                                        {value}
                                    </Select.Option>
                                );
                            })}
                        </Select>

                        <DatePicker
                            placeholder="Date"
                            style={{ flex: 1 }}
                            onChange={setPickupDate}
                            disabledDate={(cur) => cur && cur < dayjs().startOf("day")}
                        />

                        <Select
                            placeholder="Time"
                            style={{ flex: 1 }}
                            onChange={setPickupTime}
                            disabled={!pickupDate}
                        >
                            {times.map((t) => {
                                const value = t.time || t;
                                return (
                                    <Select.Option key={value} value={value}>
                                        {value}
                                    </Select.Option>
                                );
                            })}
                        </Select>

                    </div>
                </div>

                {/* SWAP */}
                <div style={{
                    width: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SwapOutlined
                        onClick={() => {
                            const tmpLoc = pickupLocation;
                            const tmpDate = pickupDate;
                            const tmpTime = pickupTime;

                            setPickupLocation(dropoffLocation);
                            setPickupDate(dropoffDate);
                            setPickupTime(dropoffTime);

                            setDropoffLocation(tmpLoc);
                            setDropoffDate(tmpDate);
                            setDropoffTime(tmpTime);
                        }}
                        style={{
                            padding: 10,
                            borderRadius: "50%",
                            background: "#3563E9",
                            color: "#fff",
                            fontSize: 18,
                            cursor: "pointer"
                        }}
                    />
                </div>

                {/* DROPOFF SIDE */}
                <div style={{ flex: 1 }}>
                    <h4>Drop - Off</h4>
                    <div style={{ display: "flex", gap: 10 }}>

                        <Select
                            placeholder="Location"
                            style={{ flex: 1 }}
                            onChange={setDropoffLocation}
                            disabled={!pickupLocation}
                        >
                            {locations.map((loc) => {
                                const value = typeof loc === "string"
                                    ? loc
                                    : (loc?.Location || loc?.name);
                                return (
                                    <Select.Option key={value} value={value}>
                                        {value}
                                    </Select.Option>
                                );
                            })}
                        </Select>

                        <DatePicker
                            placeholder="Date"
                            style={{ flex: 1 }}
                            onChange={setDropoffDate}
                            disabledDate={disabledDropoffDate}
                            disabled={!pickupDate}
                        />

                        <Select
                            placeholder="Time"
                            style={{ flex: 1 }}
                            onChange={setDropoffTime}
                            disabled={!dropoffDate}
                        >
                            {times.map((t) => {
                                const value = t.time || t;
                                return (
                                    <Select.Option
                                        key={value}
                                        value={value}
                                        disabled={disabledDropoffTime(value)}
                                    >
                                        {value}
                                    </Select.Option>
                                );
                            })}
                        </Select>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default FilterBar;
