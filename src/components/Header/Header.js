import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory()
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory Here</Link>
                {loggedInUser.email ? 
                <button style={{backgroundColor:'red',color:'white',padding:'5px'}} onClick={() =>setLoggedInUser({})}>Sign out</button>:
                <button style={{backgroundColor:'blue',color:'white',padding:'5px'}} onClick={() =>history.push('/login')}>Sign In</button>
            }
            </nav>
        </div>
    );
};

export default Header;