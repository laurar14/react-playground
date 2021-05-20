import { Link } from 'react-router-dom';

//NOTE: The Link component substitutes the anchor element when we don't want the entire page to reload.
const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
