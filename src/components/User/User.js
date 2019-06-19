import React from 'react';
import './User.scss';
import {UseHttp} from '../../hooks/http';
import { GET_USER } from '../../store/types';

const User = props => {
    const options = {
        url: '/user',
        action: GET_USER
    }
    const {state} = UseHttp(options, [], true);

    if(state.user && state.user !== null) {
        return (
            <div className="user">
                <img src={state.user.images[0].url} alt="user"/>
                <div className="displayName"> {state.user.display_name} </div>
            </div>
        )
    } else{
        return <div></div>
    }
};

export default React.memo(User);
