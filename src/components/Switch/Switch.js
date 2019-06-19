import React, {useState, useLayoutEffect} from 'react';
import './Switch.scss';

const Switch = props => {
    const [state, setState] = useState(false);

    const toggle = () => {
        if(state) props.remove();
        else props.add();
        
        setState(!state);
    }

    useLayoutEffect( () => {
        if(props.isAdded) setState(true);
        else setState(false);
    }, [props.isAdded]);

    return(
        <div className="switch">
        <span>{props.label}</span>
        <div className={['button ', state ? 'on' : 'off'].join('')} onClick={toggle}>
            <div></div>
        </div>
        </div>
    ) 
};

export default Switch;
