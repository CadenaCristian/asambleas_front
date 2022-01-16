import React from 'react';
import Logo from '../../assets/logo.jpg';

const Header = () => {
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <img src={Logo} alt="logo" style={{ width: '20%' }} />
            </div>
        </div>
    )
}

export default Header;