import React, {useRef, useLayoutEffect} from 'react';
import './Danceability.scss';
import { ReactComponent as DanceSvg } from '../../images/dancing.svg';

const Danceability = props => {
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
        <div className="danceability">
            <DanceSvg className="danceSvg"/>
            <div className="indicator">
                <span className="label">Danceability</span> 
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

export default Danceability;
