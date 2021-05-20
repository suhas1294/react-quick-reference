import {NavLink} from 'react-router-dom';

export default MainHeader = props => {
    return(
        <ul>
            <li>
                {/* activeClassName is a reserved keyword, we need to define which class to show when the path is active */}
                <NavLink activeClassName={classes.active} to="/welcome">Welcome</NavLink>
            </li>
            <li>
                <NavLink to="/products">Products</NavLink>
            </li>
        </ul>
    )
}