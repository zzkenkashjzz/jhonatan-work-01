import './actionButton.css';

const ActionButton = ({Icon, active}) => {
    return (
        <div className={`action_button ${active ? 'active' : ''}`}>
            <Icon size={25} color="#969696"/>
        </div>
    )
}

export default ActionButton;
