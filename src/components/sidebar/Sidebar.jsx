import React from 'react';
import  './sidebar.css';
import SidebarLogo from "./SidebarLogo/SidebarLogo";
import SidebarActions from "./SidebarActions/SidebarActions";
import SidebarUserActions from "./SidebarUserActions/SidebarUserActions";
import {ACTIONS_LIST as actionList} from "../../services/action-list";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <SidebarLogo/>
            <SidebarActions actionList={actionList}/>
            <SidebarUserActions/>
        </div>
    )
};

export default Sidebar;
