import React, {useContext} from 'react';
import './Modal.scss';
import {StoreContext} from '../../store/partyTimeStore';

const Modal = props => {
    const [state] = useContext(StoreContext);

    if(state.sideMenu.isOpen) {
        return <div className={['modal', state.sideMenu.isOpen ? ' active' : ''].join('')}></div> 
    } else {
        return <div className={['modal', !state.sideMenu.isOpen && state.isLoading ? ' active' : ''].join('')}></div>
    }
};

export default Modal;
