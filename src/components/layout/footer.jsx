import React from "react";

const Footer = () => {
    return (
        <div style={{
            background: "#FFFFFF",
            padding: "60px 60px 20px 60px",
            borderTop: "1px solid #eeeeee"
        }}>

            {/* ============ TOP SECTION (4 columns) ============ */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap"
            }}>
                
                {/* LEFT Logo + Text */}
                <div style={{ width: "25%", minWidth: 250 }}>
                    <div style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: "#3563E9",
                    }}>
                        MORENT
                    </div>

                    <p style={{
                        marginTop: 15,
                        lineHeight: "22px",
                        color: "#5F5F5F",
                        fontSize: 15
                    }}>
                        Our vision is to provide convenience <br />
                        and help increase your sales business.
                    </p>
                </div>

                {/* About */}
                <div style={columnStyle}>
                    <h3 style={titleStyle}>About</h3>
                    <p style={itemStyle}>How it works</p>
                    <p style={itemStyle}>Featured</p>
                    <p style={itemStyle}>Partnership</p>
                    <p style={itemStyle}>Bussiness Relation</p>
                </div>

                {/* Community */}
                <div style={columnStyle}>
                    <h3 style={titleStyle}>Community</h3>
                    <p style={itemStyle}>Events</p>
                    <p style={itemStyle}>Blog</p>
                    <p style={itemStyle}>Podcast</p>
                    <p style={itemStyle}>Invite a friend</p>
                </div>

                {/* Socials */}
                <div style={columnStyle}>
                    <h3 style={titleStyle}>Socials</h3>
                    <p style={itemStyle}>Discord</p>
                    <p style={itemStyle}>Instagram</p>
                    <p style={itemStyle}>Twitter</p>
                    <p style={itemStyle}>Facebook</p>
                </div>
            </div>

            {/* ============ LINE ============ */}
            <div
                style={{
                    marginTop: 40,
                    width: "100%",
                    height: 1,
                    background: "#E8E8E8",
                }}
            ></div>

            {/* ============ BOTTOM SECTION ============ */}
            <div style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                color: "#3D3D3D"
            }}>
                <p style={{ margin: 0 }}>©2022 MORENT. All rights reserved</p>

                <div style={{ display: "flex", gap: 40 }}>
                    <p style={bottomLink}>Privacy & Policy</p>
                    <p style={bottomLink}>Terms & Condition</p>
                </div>
            </div>
        </div>
    );
};

const columnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    minWidth: 150
};

const titleStyle = {
    fontSize: 17,
    fontWeight: 600,
    marginBottom: 10
};

const itemStyle = {
    margin: 0,
    fontSize: 15,
    color: "#5F5F5F",
    cursor: "pointer"
};

const bottomLink = {
    margin: 0,
    fontSize: 15,
    cursor: "pointer"
};

export default Footer;
