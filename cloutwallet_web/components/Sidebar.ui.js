import React from "react";
import { Sidebar, Menu } from "../core/styles/Dashboard.styles";

const SidebarUI = () => {
    return (
        <Sidebar>
            <img
                width="160"
                src="/logo.png"
                style={{ transform: "scale(1.5)" }}
            />
            <Menu>
                <a href="#" className="active">
                    Wallet
                </a>
                <a href="#">Logout</a>
            </Menu>
        </Sidebar>
    );
};

export default SidebarUI;
