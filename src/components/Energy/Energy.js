import React, {useRef, useLayoutEffect} from 'react';
import './Energy.scss';
import { ReactComponent as Power } from '../../images/power.svg';

const Energy = props => {
    const bar = useRef();
    const insideFill = useRef();

    const getRoundedValue = () => {
        return parseFloat(props.value * 10).toFixed( 2 );
    }

    useLayoutEffect( () => {
        setTimeout(()=>{
            const barSize = bar.current.clientWidth;
            const porcentWidth = barSize;
            const math = ((props.value) * 100 / porcentWidth) * 100;
            insideFill.current.style.width = math + '%';
        }, 300)
    }, []);

    return(
        <div className="energy">
            <Power className="powerSvg"/>
            <div className="indicator">
                <span className="label">Energy</span> 
                <div className="bar" ref={bar}>
                    <div ref={insideFill}></div>
                </div>
                <div className="value">
                    { getRoundedValue() } of 10
                </div>
            </div>

        </div>
    ) 
};

export default Energy;
