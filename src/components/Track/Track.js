import React from 'react';
import './Track.scss';
import Danceability from '../Danceability/Danceability';
import Energy from '../Energy/Energy';
import ActionsBar from '../ActionsBar/ActionsBar';
import noDataImg from '../../images/noData.gif';

const Track = props => {
    const {id, album, name, danceability, energy} = props.data;
    
    const isHot = () => {
        return (danceability > 0.8 && energy > 0.8) ? 'hot' : '';
    }
    
    const isGoodToDance = () => {
        return (danceability > 0.8 && energy < 0.8) ? 'goodToDance' : '';
    }

    const noData = () => {
        if(!id || !name || !album){
            return true;
        }
    }

    return (
        <li className={['track', noData() ? 'noData' : ''].join(' ')}>
            {noData() ? 
                <div>
                    <img src={noDataImg} alt="not found"/>
                    <div className="label">NO DATA FOUND!</div>
                    <div className="sad">:(</div>
                </div> 
            : (
                <>
                <div className={['ribbon ribbon-top-left', isHot(), isGoodToDance()].join(' ')}>
                    <span> 
                        { isHot() ? 'HOT' : ''}
                        { isGoodToDance() ? '+ DANCE +' : '' }
                    </span>
                </div>
                <div className="imageHolder">
                    <img src={album ? album.images[1].url : ''} alt=""/>
                </div>
                <div className="trackName">{name}</div>
                <div className="trackInfo">
                    <Danceability value={danceability}/>
                    <Energy value={energy}/>
                </div>
                <ActionsBar track={props.data}/>
                </>
            )}
        </li>
    )    
};

export default Track;
