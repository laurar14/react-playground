import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === '/' && <Button 
                color={showAdd ? "red" : "green"}
                text={showAdd ? "Close" : "Add"}
                onClick={onAdd}
            />}
        </header>
    )
}

//defaultProps will provide us with a default value should none be passed to our component.
Header.defaultProps = {
    title: "Task Tracker"
}

//Prop types is an alternative to Typescript should we need to enforce strong typing for our props.
Header.propTypes = {
    title: PropTypes.string,
    //title: PropTypes.string.isRequired --> isRequired ensures that it cannot be anything but the type assigned. Strict checking so to speak.
}

export default Header
