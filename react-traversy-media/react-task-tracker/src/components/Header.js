import PropTypes from 'prop-types';
import Button from './Button'

const Header = ({ title }) => {
    const onClick = (e) => {
        console.log("Click")
    }

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button 
                color="green"
                text="Add"
                onClick={onClick}
            />
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
