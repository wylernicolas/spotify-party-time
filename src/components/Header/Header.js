import React, {useContext} from 'react';
import './Header.scss';
import User from '../User/User';
import { ReactComponent as Hamburger } from '../../images/hamburger.svg';
import { StoreContext } from '../../store/partyTimeStore';
import { TOGGLE_SIDEMENU } from '../../store/types';

const Header = () => {
    const [state, dispatch] = useContext(StoreContext);
    
    const toggleSideMenu = () => {
        dispatch({
            type: TOGGLE_SIDEMENU,
            payload: !state.sideMenu.isOpen
        })
    }

    return (
        <div className="header">
            <div className="hamburger" onClick={toggleSideMenu}>
                <Hamburger/>
            </div>
            <User />
            <span>Party Time</span>
        </div>
    );
};

export default Header;
