import React from 'react';
import Logo from '../../assets/logo.jpg';

const Header = () => {
    return (
        <div>
            <img src={Logo} alt="logo" style={{ width: '50%', margin: '0% 25% 0 25%' }} />
        </div>
    )
}

export default Header;