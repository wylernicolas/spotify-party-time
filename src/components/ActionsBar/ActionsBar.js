import React, {useState, useEffect} from 'react';
import './ActionsBar.scss';
import Switch from '../Switch/Switch';
import {UseHttp} from '../../hooks/http';
import { ADD_TO_PLAYLIST, REMOVE_FROM_PLAYLIST, PREVIEW_SONG } from '../../store/types';
import { ReactComponent as PlayPreview } from '../../images/playPreview.svg';

const ActionsBar = props => {
    const {state, callApi, dispatch} = UseHttp();
    const [preview, setPreview] = useState(false);
    let previewTimeOut;

    const songStatus = (isPlaying) => {
        setPreview(isPlaying);
        dispatch({
            type: PREVIEW_SONG,
            payload: isPlaying
        });
    }

    const previewSong = () => {
        if(state.previewSongPlaying) return;
        songStatus(true);
        previewTimeOut = setTimeout(()=>{
            songStatus(false);
        }, 30 * 1000);
    }
    
    const closePreview = () => {
        songStatus(false);
    }

    useEffect(() => {
        return () =>{
            clearTimeout(previewTimeOut);
        }
    }, [])

    const iframe = () => {
        if(props.track.preview_url) {
            return `<iframe class="player" src="${props.track.preview_url}" width="200" height="100"></iframe>`
        } else{
            return 'No Preview';
        }
    }

    const isAdded = () => {
        const isAdded = state.playlist.tracks.some(playlistTrack => {
            return playlistTrack.track.id === props.track.id;
        })
        return isAdded;
    }

    const removeFromPlaylist = () => {
        callApi({
            url: `/playlist/remove`,
            action: REMOVE_FROM_PLAYLIST,
            method: "POST",
            payload: {
                trackId: props.track.id,
                userId: state.user.id,
                partyTimeId: state.playlist.id
            }
        })
    }

    const addToPlaylist = () => {
        console.log('props.track ========', props)
        callApi({
            url: `/playlist/add`,
            action: ADD_TO_PLAYLIST,
            method: "POST",
            payload: {
                trackId: props.track.id,
                track: props,
                userId: state.user.id,
                partyTimeId: state.playlist ? state.playlist.id : null
            }
        })
    }

    return(
        <div className="actionsBar">
            <Switch label="Added" add={addToPlaylist} remove={removeFromPlaylist} isAdded={isAdded()}/>
            <div className={preview ? 'playerWrapper' : 'play'}>
                {
                    preview ? 
                        <div>
                            <div className="playAnim"></div>
                            <p className="closePreview" onClick={ closePreview }>Close Preview</p>
                            <div dangerouslySetInnerHTML={ {__html:iframe()} }/> 
                        </div>
                    : 
                    props.track.preview_url ? 
                        <PlayPreview className={["playBtn", state.previewSongPlaying ? 'off' : ''].join(' ')} onClick={ previewSong }/>
                        : ''
                }
            </div>
        </div>
    ) 
};

export default ActionsBar;
