import React from "react";
import ActionButton from "../../actionButton/ActionButton";
import  './SidebarActions.css'

const SidebarActions = ({ actionList  }) => (
    <div className="sidebar_actions">
        <div className="sidebar_actions_list">
            {actionList.map(action => (<ActionButton active={action.active} Icon={action.Icon}/>))}
        </div>
    </div>
)

export default SidebarActions;
