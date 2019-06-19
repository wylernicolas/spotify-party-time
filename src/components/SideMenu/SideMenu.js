import React from 'react';
import './SideMenu.scss';
import { ReactComponent as Close } from '../../images/close.svg';
import { TOGGLE_SIDEMENU, REMOVE_FROM_PLAYLIST } from '../../store/types';
import { UseHttp } from '../../hooks/http';

const SideMenu = props => {
    const {state, callApi, dispatch} = UseHttp();
    const { sideMenu } = state;
    const { isOpen } = sideMenu;
    let addedTracks;

    const toggle = () => {
        return isOpen ? 'open' : 'close';
    }

    const removeFromPlaylist = (data) => {
        callApi({
            url: `/playlist/remove`,
            action: REMOVE_FROM_PLAYLIST,
            method: "POST",
            payload: {
                trackId: data.track.id,
                userId: state.user.id,
                partyTimeId: state.playlist.id
            }
        })
    }

    if(!state.playlist.tracks && state.playlist.tracks == null) {
        addedTracks = <div>NO TRACKS IN YOUR PLAYLIST!</div>;
    } else {
        addedTracks = (
            <>
            <h3>Added tracks ({state.playlist.tracks.length})</h3>
            <ul>
                {state.playlist.tracks.map(
                    (data, index) => {
                        return (
                        <li key={index}>
                            {
                                data.track ?
                                    <>
                                        <img src={data.track.album.images[2].url} alt="album art"/>
                                        <p>{data.track.name}</p>
                                        <div className="removeTrack" onClick={ removeFromPlaylist.bind(null, data)}>remove</div>
                                    </>
                                : ''
                            }
                        </li>
                        )
                    }
                )}
            </ul>
            </>
        )
    }
    
    const toggleSideMenu = () => {
        dispatch({
            type: TOGGLE_SIDEMENU,
            payload: !state.sideMenu.isOpen
        })
    }

    return (
        <div className={["sideMenu", toggle() ].join(' ')}>
           <Close className="closeButton" onClick={toggleSideMenu}/>
           <div className="playlist">
                {addedTracks}
           </div>
        </div>
    );
};

export default SideMenu;
